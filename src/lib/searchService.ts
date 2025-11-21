import { MOCK_THERAPISTS, Therapist } from './data';

export interface SearchQuery {
    location?: string;
    type?: string;
    concern?: string;
    distance?: number;
}

export async function searchTherapists(query: SearchQuery): Promise<Therapist[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return MOCK_THERAPISTS.filter(therapist => {
        const matchLocation = !query.location ||
            therapist.location.toLowerCase().includes(query.location.toLowerCase());

        const matchType = !query.type || query.type === 'Any' ||
            therapist.type === 'Both' ||
            therapist.type.toLowerCase() === query.type.toLowerCase();

        const matchConcern = !query.concern || query.concern === 'Any' ||
            therapist.specialties.some(s => s.toLowerCase() === query.concern?.toLowerCase());

        return matchLocation && matchType && matchConcern;
    });
}
