'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { paymentService } from '@/services/paymentService';
import Link from 'next/link';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const therapistId = searchParams.get('therapistId');
    const date = searchParams.get('date');
    const slot = searchParams.get('slot');

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await paymentService.processPayment({
                cardNumber,
                expiryDate,
                cvc,
                amount: 100 // Mock amount
            });

            if (result.success) {
                const confirmationParams = new URLSearchParams({
                    therapistId: therapistId!,
                    date: date!,
                    slot: slot!,
                    transactionId: result.transactionId!
                });
                router.push(`/booking/confirmation?${confirmationParams.toString()}`);
            } else {
                setError(result.error || 'Payment failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: 'var(--spacing-lg)' }}>
                Payment
            </h1>

            <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: 'var(--spacing-xl)',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                            Card Number
                        </label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem'
                            }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                                CVC
                            </label>
                            <input
                                type="text"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="123"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-md)' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'opacity 0.2s'
                            }}
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
                    <Link href={`/booking/summary?therapistId=${therapistId}&date=${date}&slot=${slot}`} style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>
                        Back to Summary
                    </Link>
                </div>
            </div>
        </main>
    );
}
