'use client';

import { useSearchParams } from 'next/navigation';
import { MOCK_THERAPISTS } from '@/lib/data';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function BookingConfirmationPage() {
    const searchParams = useSearchParams();

    const therapistId = searchParams.get('therapistId');
    const date = searchParams.get('date');
    const slot = searchParams.get('slot');
    const transactionId = searchParams.get('transactionId');

    const therapist = MOCK_THERAPISTS.find(t => t.id === therapistId);
    const bookingDate = date ? dayjs(date) : null;
    const bookingSlot = slot ? dayjs(slot) : null;

    if (!therapist || !bookingDate || !bookingSlot) {
        return <div>Loading...</div>;
    }

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                padding: 'var(--spacing-xl)',
                borderRadius: '12px',
                marginBottom: 'var(--spacing-xl)',
                border: '1px solid #a7f3d0'
            }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
                    Booking Confirmed!
                </h1>
                <p style={{ fontSize: '1.1rem' }}>
                    Your appointment has been successfully booked.
                </p>
            </div>

            <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: 'var(--spacing-xl)',
                backgroundColor: 'white',
                textAlign: 'left',
                marginBottom: 'var(--spacing-xl)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: 'var(--spacing-lg)' }}>
                    Booking Details
                </h2>

                <div style={{ display: 'grid', gap: 'var(--spacing-md)', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Therapist</span>
                        <span style={{ fontWeight: '600' }}>{therapist.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Date</span>
                        <span style={{ fontWeight: '600' }}>{bookingDate.format('MMMM D, YYYY')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Time</span>
                        <span style={{ fontWeight: '600' }}>{bookingSlot.format('HH:mm')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
                        <span style={{ color: 'var(--text-light)' }}>Transaction ID</span>
                        <span style={{ fontFamily: 'monospace' }}>{transactionId}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                <Link
                    href="/dashboard"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '700',
                        transition: 'opacity 0.2s'
                    }}
                >
                    Go to Dashboard
                </Link>
                <Link
                    href="/"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'white',
                        color: 'var(--primary-color)',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '700',
                        border: '2px solid var(--primary-color)',
                        transition: 'all 0.2s'
                    }}
                >
                    Book Another
                </Link>
            </div>
        </main>
    );
}
