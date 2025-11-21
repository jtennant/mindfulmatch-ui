import { searchTherapists } from '@/lib/searchService';
import TherapistCard from '@/components/TherapistCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';

interface SearchParams {
    location?: string;
    type?: string;
    concern?: string;
}

interface Props {
    searchParams: Promise<SearchParams>;
}

export default async function SearchResults({ searchParams }: Props) {
    const params = await searchParams;

    // Convert params to match the expected types for searchTherapists
    const query = {
        location: params.location,
        type: params.type as 'Remote' | 'In-person' | 'Both' | undefined,
        concern: params.concern
    };

    const therapists = await searchTherapists(query);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                component="a"
                href="/"
                variant="outlined"
                sx={{ mb: 3, color: 'text.secondary' }}
            >
                ← Back to Home
            </Button>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                Search Results
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Found {therapists.length} therapist{therapists.length !== 1 ? 's' : ''} matching your criteria
                </Typography>
            </Box>

            {therapists.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No therapists found matching your criteria. Try adjusting your search filters.
                </Alert>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {therapists.map(therapist => (
                        <Box key={therapist.id} sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
                            <TherapistCard therapist={therapist} />
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
}
