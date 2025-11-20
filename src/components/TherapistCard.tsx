import Image from 'next/image';
import Link from 'next/link';
import { Therapist } from '@/lib/data';

interface TherapistCardProps {
    therapist: Therapist;
}

export default function TherapistCard({ therapist }: TherapistCardProps) {
    return (
        <Link href={`/therapist/${therapist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
                display: 'flex',
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                marginBottom: 'var(--spacing-md)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer'
            }}
                className="therapist-card"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
            >
                <div style={{ position: 'relative', width: '200px', minWidth: '200px', height: 'auto' }}>
                    <Image
                        src={therapist.imageUrl}
                        alt={therapist.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xs)' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{therapist.name}</h3>
                                {therapist.tier === 'Premium' && (
                                    <span style={{
                                        backgroundColor: '#FFD700',
                                        color: '#856404',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Premium
                                    </span>
                                )}
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--primary-color)', fontWeight: '600' }}>{therapist.title}</p>
                        </div>
                        <span style={{
                            backgroundColor: 'rgba(94, 156, 160, 0.1)',
                            color: 'var(--secondary-color)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                        }}>
                            {therapist.type}
                        </span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--spacing-sm)', lineHeight: '1.5' }}>
                        {therapist.bio}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--spacing-sm)' }}>
                        {therapist.specialties.map((specialty, index) => (
                            <span key={index} style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-light)',
                                backgroundColor: '#f3f4f6',
                                padding: '2px 8px',
                                borderRadius: '4px'
                            }}>
                                {specialty}
                            </span>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>£{therapist.hourlyRate}</span> / hr
                            </span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                📍 {therapist.location}
                            </span>
                        </div>
                        {therapist.onlineBooking && (
                            <span style={{
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                📅 Book Now
                            </span>
                        )}
                    </div>
                </div>            </div>
        </Link>
    );
}
