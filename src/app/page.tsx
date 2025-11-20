'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Any');
  const [concern, setConcern] = useState('Any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type !== 'Any') params.append('type', type);
    if (concern !== 'Any') params.append('concern', concern);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Find Your Perfect Match</h1>
      <p className={styles.subtitle}>
        Connect with professional therapists who understand your needs and can help you thrive.
      </p>

      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="location">Location</label>
          <input
            id="location"
            className={styles.input}
            type="text"
            placeholder="e.g. London, UK"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="type">Type</label>
          <select
            id="type"
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Remote">Remote</option>
            <option value="In-person">In-person</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="concern">Concern</label>
          <select
            id="concern"
            className={styles.select}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Stress">Stress</option>
            <option value="Depression">Depression</option>
            <option value="Relationships">Relationships</option>
            <option value="Trauma">Trauma</option>
            <option value="Career Counseling">Career Counseling</option>
          </select>
        </div>

        <button type="submit" className={`btn btn-primary ${styles.searchButton}`}>
          Search
        </button>
      </form>
    </div>
  );
}
