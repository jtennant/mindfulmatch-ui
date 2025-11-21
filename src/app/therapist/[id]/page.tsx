import { getTherapistById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function TherapistProfile({ params }: Props) {
    const { id } = await params;
    const therapist = getTherapistById(id);

    if (!therapist) {
        notFound();
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                component="a"
                href="/search"
                variant="outlined"
                sx={{ mb: 3, color: 'text.secondary' }}
            >
                ← Back to Search
            </Button>

            <Paper elevation={0} sx={{ p: 0, overflow: 'hidden', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Left Column: Image and Key Info */}
                    <Box sx={{
                        width: { xs: '100%', md: '33.33%' },
                        bgcolor: 'grey.50',
                        p: 4,
                        borderRight: { md: '1px solid #e0e0e0' },
                        borderBottom: { xs: '1px solid #e0e0e0', md: 'none' }
                    }}>
                        <Box
                            component="img"
                            src={therapist.imageUrl}
                            alt={therapist.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                mb: 3,
                                boxShadow: 2
                            }}
                        />

                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Hourly Rate
                                </Typography>
                                <Typography variant="h5" color="primary.main" fontWeight="bold">
                                    £{therapist.hourlyRate}
                                </Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Location
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {therapist.location}
                                </Typography>
                            </Box>

                            <Divider />

                            {therapist.onlineBooking && (
                                <Button
                                    component="a"
                                    href={`/therapist/${therapist.id}/book`}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 2, color: 'white', fontWeight: 700 }}
                                >
                                    📅  Book Appointment
                                </Button>
                            )}
                            <Button
                                component="a"
                                href={`/therapist/${therapist.id}/message`}
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                size="large"
                                sx={{ mt: 2, fontWeight: 700 }}
                            >
                                ✉️  Send Message
                            </Button>
                        </Stack>
                    </Box>

                    {/* Right Column: Details */}
                    <Box sx={{ width: { xs: '100%', md: '66.66%' }, p: 4 }}>
                        <Box sx={{ mb: 4 }}>
                            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                                <Typography variant="h3" component="h1" fontWeight="bold">
                                    {therapist.name}
                                </Typography>
                                {therapist.tier === 'Premium' && (
                                    <Chip
                                        label="PREMIUM"
                                        sx={{
                                            bgcolor: '#FFD700',
                                            color: '#856404',
                                            fontWeight: 800
                                        }}
                                    />
                                )}
                            </Stack>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                {therapist.title}
                            </Typography>
                            <Chip
                                label={therapist.type}
                                sx={{
                                    bgcolor: 'rgba(94, 156, 160, 0.1)',
                                    color: 'secondary.main',
                                    fontWeight: 600
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                About
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {therapist.longBio || therapist.bio}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Specialties
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {therapist.specialties.map((specialty, index) => (
                                    <Chip key={index} label={specialty} sx={{ bgcolor: 'grey.100' }} />
                                ))}
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Qualifications
                                </Typography>
                                <List dense disablePadding>
                                    {therapist.qualifications.map((qual, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemText primary={`• ${qual}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Insurance Accepted
                                </Typography>
                                <List dense disablePadding>
                                    {therapist.insuranceAccepted.map((insurance, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemText primary={`• ${insurance}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
