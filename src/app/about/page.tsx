import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function AboutPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                    About MindMatch
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
                    We&apos;re on a mission to make mental health support accessible, personalized, and effective for everyone.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 8 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Why Choose Us?
                    </Typography>
                    <Typography variant="body1" paragraph fontSize="1.1rem" color="text.secondary">
                        Finding the right therapist shouldn&apos;t be a struggle. MindMatch simplifies the process by connecting you with licensed professionals who specialize in your specific needs.
                    </Typography>
                    <Typography variant="body1" paragraph fontSize="1.1rem" color="text.secondary">
                        We believe that the therapeutic relationship is key to success, which is why our matching system focuses on compatibility, not just availability.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.light', borderRadius: 4, color: 'primary.contrastText' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Our Promise
                        </Typography>
                        <ul style={{ paddingLeft: '20px', fontSize: '1.1rem' }}>
                            <li style={{ marginBottom: '10px' }}>Verified, licensed professionals</li>
                            <li style={{ marginBottom: '10px' }}>Secure and confidential</li>
                            <li style={{ marginBottom: '10px' }}>Personalized matches</li>
                            <li>Support every step of the way</li>
                        </ul>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}
