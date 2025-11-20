'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Therapist } from '@/lib/data';
import { searchTherapists } from '@/lib/searchService';
import TherapistCard from '@/components/TherapistCard';
import styles from './Search.module.css';

function SearchContent() {
    const searchParams = useSearchParams();
    const [therapists, setTherapists] = useState<Therapist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTherapists = async () => {
            setLoading(true);
            const query = {
                location: searchParams.get('location') || undefined,
                type: searchParams.get('type') || undefined,
                concern: searchParams.get('concern') || undefined,
            };

            try {
                const results = await searchTherapists(query);
                setTherapists(results);
            } catch (error) {
                console.error('Failed to fetch therapists', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapists();
    }, [searchParams]);

    if (loading) {
        return <div className={styles.loading}>Finding the best matches for you...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Search Results</h1>
                <p className={styles.subtitle}>
                    Found {therapists.length} therapist{therapists.length !== 1 ? 's' : ''} matching your criteria
                </p>
            </div>

            {therapists.length > 0 ? (
                <div className={styles.grid}>
                    {therapists.map((therapist) => (
                        <TherapistCard key={therapist.id} therapist={therapist} />
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <p>No therapists found matching your criteria. Try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
