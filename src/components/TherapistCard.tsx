import Link from 'next/link';
import { Therapist } from '@/lib/data';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Props {
    therapist: Therapist;
}

export default function TherapistCard({ therapist }: Props) {
    return (
        <Link href={`/therapist/${therapist.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                }
            }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 200, sm: 'auto' } }}
                    image={therapist.imageUrl}
                    alt={therapist.name}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                <Typography variant="h6" component="h3" fontWeight="bold" color="text.primary">
                                    {therapist.name}
                                </Typography>
                                {therapist.tier === 'Premium' && (
                                    <Chip
                                        label="PREMIUM"
                                        size="small"
                                        sx={{
                                            bgcolor: '#FFD700',
                                            color: '#856404',
                                            fontWeight: 800,
                                            height: 20,
                                            fontSize: '0.65rem'
                                        }}
                                    />
                                )}
                            </Stack>
                            <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                                {therapist.title}
                            </Typography>
                        </Box>
                        <Chip
                            label={therapist.type}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(94, 156, 160, 0.1)',
                                color: 'secondary.main',
                                fontWeight: 600
                            }}
                        />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                        {therapist.bio}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                        {therapist.specialties.map((specialty, index) => (
                            <Chip
                                key={index}
                                label={specialty}
                                size="small"
                                sx={{ bgcolor: '#f3f4f6' }}
                            />
                        ))}
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 2, borderTop: '1px solid #f3f4f6' }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                <Box component="span" fontWeight="bold" color="text.primary">£{therapist.hourlyRate}</Box> / hr
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                📍 {therapist.location}
                            </Typography>
                        </Box>
                        {therapist.onlineBooking && (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                sx={{ color: 'white', fontWeight: 600 }}
                            >
                                📅 Book Now
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
}
