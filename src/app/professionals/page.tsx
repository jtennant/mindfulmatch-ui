import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ProfessionalsPage() {
    const benefits = [
        "Expand your practice with high-quality referrals",
        "Streamlined scheduling and billing",
        "Secure, HIPAA-compliant platform",
        "Professional community and support",
        "Flexible hours - work when you want",
        "Zero overhead costs"
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="overline" color="primary" fontWeight="bold" fontSize="1rem">
                        FOR THERAPISTS
                    </Typography>
                    <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ mt: 1 }}>
                        Grow Your Practice with MindMatch
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Join our network of licensed professionals and connect with clients who need your expertise.
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        {benefits.map((benefit, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                                <Typography variant="body1" fontSize="1.1rem">
                                    {benefit}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Button variant="contained" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}>
                        Join Network
                    </Button>
                </Box>
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Box
                        sx={{
                            bgcolor: 'grey.100',
                            height: '500px',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Professional Image Placeholder
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
