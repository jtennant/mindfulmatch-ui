'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { MOCK_THERAPISTS } from '@/lib/data';
import Link from 'next/link';

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const therapist = MOCK_THERAPISTS.find(t => t.id === id);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    if (!therapist) {
        return <div>Therapist not found</div>;
    }

    // Parse available slots into Dayjs objects
    const availableSlots = therapist.availableSlots.map(slot => dayjs(slot));

    // Function to check if a date has available slots
    const shouldDisableDate = (date: Dayjs) => {
        return !availableSlots.some(slot => slot.isSame(date, 'day'));
    };

    // Get slots for the selected date
    const slotsForDate = selectedDate
        ? availableSlots.filter(slot => slot.isSame(selectedDate, 'day')).sort((a, b) => a.valueOf() - b.valueOf())
        : [];

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
            <Link href={`/therapist/${id}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', marginBottom: 'var(--spacing-md)', display: 'inline-block' }}>
                ← Back to Profile
            </Link>

            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: 'var(--spacing-md)' }}>
                Book with {therapist.name}
            </h1>

            <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', border: '1px solid #e5e7eb', borderRadius: '12px', padding: 'var(--spacing-md)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)', color: 'var(--text-main)' }}>Select a Date</h2>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            shouldDisableDate={shouldDisableDate}
                            disablePast
                            value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                                setSelectedSlot(null);
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)', color: 'var(--text-main)' }}>
                        {selectedDate ? `Available Times for ${selectedDate.format('MMMM D, YYYY')}` : 'Select a date to see times'}
                    </h2>

                    {selectedDate && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                            {slotsForDate.length > 0 ? (
                                slotsForDate.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSlot(slot.toISOString())}
                                        style={{
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: selectedSlot === slot.toISOString() ? '2px solid var(--accent-color)' : '1px solid #e5e7eb',
                                            backgroundColor: selectedSlot === slot.toISOString() ? 'rgba(94, 156, 160, 0.1)' : 'white',
                                            color: selectedSlot === slot.toISOString() ? 'var(--accent-color)' : 'var(--text-main)',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {slot.format('HH:mm')}
                                    </button>
                                ))
                            ) : (
                                <p>No slots available for this date.</p>
                            )}
                        </div>
                    )}

                    {selectedSlot && (
                        <div style={{ marginTop: 'var(--spacing-lg)' }}>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'not-allowed', // Disabled as per requirements
                                opacity: 0.7
                            }} disabled>
                                Continue to Payment (Coming Soon)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
