import { getTherapistById } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Profile.module.css';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function TherapistProfile({ params }: Props) {
    const { id } = await params;
    const therapist = getTherapistById(id);

    if (!therapist) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/search" className={styles.backLink}>
                ← Back to Search Results
            </Link>

            <div className={styles.header}>
                <div className={styles.imageContainer}>
                    <Image
                        src={therapist.imageUrl}
                        alt={therapist.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.headerInfo}>
                    <h1 className={styles.name}>{therapist.name}</h1>
                    <p className={styles.title}>{therapist.title}</p>
                    <div className={styles.meta}>
                        <span>📍 {therapist.location}</span>
                        <span>💰 £{therapist.hourlyRate} / hr</span>
                        <span>🏠 {therapist.type}</span>
                    </div>
                    {therapist.onlineBooking && (
                        <Link href={`/therapist/${therapist.id}/book`} style={{
                            display: 'inline-block',
                            marginTop: 'var(--spacing-sm)',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}>
                            📅 Book Appointment
                        </Link>
                    )}
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>About</h2>
                <p className={styles.bio}>{therapist.longBio || therapist.bio}</p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Qualifications</h2>
                <ul className={styles.list}>
                    {therapist.qualifications?.map((qual, index) => (
                        <li key={index} className={styles.listItem}>{qual}</li>
                    )) || <p>No qualifications listed.</p>}
                </ul>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Therapy Techniques</h2>
                <div className={styles.tagContainer}>
                    {therapist.techniques?.map((tech, index) => (
                        <span key={index} className={styles.tag}>{tech}</span>
                    )) || <p>No techniques listed.</p>}
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Insurance Accepted</h2>
                <ul className={styles.list}>
                    {therapist.insuranceAccepted?.map((ins, index) => (
                        <li key={index} className={styles.listItem}>{ins}</li>
                    )) || <p>No insurance information available.</p>}
                </ul>
            </div>
        </div>
    );
}
