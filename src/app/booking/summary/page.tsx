'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { MOCK_THERAPISTS } from '@/lib/data';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function BookingSummaryPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const therapistId = searchParams.get('therapistId');
    const date = searchParams.get('date');
    const slot = searchParams.get('slot');

    const therapist = MOCK_THERAPISTS.find(t => t.id === therapistId);
    const bookingDate = date ? dayjs(date) : null;
    const bookingSlot = slot ? dayjs(slot) : null;

    if (!therapist || !bookingDate || !bookingSlot) {
        return (
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
                <h1>Invalid Booking Details</h1>
                <p>Please go back and try again.</p>
                <Link href="/" style={{ color: 'var(--primary-color)' }}>Return Home</Link>
            </main>
        );
    }

    const handleContinueToPayment = () => {
        const paymentParams = new URLSearchParams({
            therapistId: therapistId!,
            date: date!,
            slot: slot!
        });
        router.push(`/payment?${paymentParams.toString()}`);
    };

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: 'var(--spacing-lg)' }}>
                Booking Summary
            </h1>

            <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: 'var(--spacing-xl)',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: 'var(--spacing-sm)' }}>
                        Appointment Details
                    </h2>
                    <div style={{ display: 'grid', gap: 'var(--spacing-sm)', color: 'var(--text-light)' }}>
                        <p><strong>Therapist:</strong> {therapist.name}</p>
                        <p><strong>Date:</strong> {bookingDate.format('MMMM D, YYYY')}</p>
                        <p><strong>Time:</strong> {bookingSlot.format('HH:mm')} - {bookingSlot.add(50, 'minute').format('HH:mm')} (50 mins)</p>
                        <p><strong>Type:</strong> Online Video Call</p>
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#f3f4f6',
                    padding: 'var(--spacing-md)',
                    borderRadius: '8px',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>Important Notes</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        <li>Please join the call 5 minutes before the scheduled time.</li>
                        <li>Ensure you have a stable internet connection.</li>
                        <li>Cancellation is free up to 24 hours before the appointment.</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href={`/therapist/${therapistId}/book`} style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>
                        Back to Booking
                    </Link>
                    <button
                        onClick={handleContinueToPayment}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        </main>
    );
}
