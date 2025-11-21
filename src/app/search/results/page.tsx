import { searchTherapists } from '@/lib/searchService';
import TherapistCard from '@/components/TherapistCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Button, Grid } from '@mui/material';
import RefineSearchBox from '@/components/RefineSearchBox';

interface SearchParams {
    location?: string;
    type?: string;
    concern?: string;
    distance?: string;
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
        concern: params.concern,
        distance: params.distance ? Number(params.distance) : undefined
    };

    const therapists = await searchTherapists(query);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                Search Results
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <RefineSearchBox />
                </Grid>
                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {therapists.map(therapist => (
                                <Box key={therapist.id} sx={{ width: '100%' }}>
                                    <TherapistCard therapist={therapist} />
                                </Box>
                            ))}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
