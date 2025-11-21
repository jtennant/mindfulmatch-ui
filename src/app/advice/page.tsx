import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function AdvicePage() {
    const topics = [
        {
            title: "What is Therapy?",
            content: "Therapy is a collaborative process where you work with a trained professional to address mental health concerns, emotional challenges, or life transitions."
        },
        {
            title: "Types of Services",
            content: "We offer various approaches including CBT, Psychodynamic therapy, Mindfulness-based stress reduction, and more, tailored to your unique needs."
        },
        {
            title: "When to Seek Help",
            content: "If you're feeling overwhelmed, stuck, or experiencing persistent sadness or anxiety, speaking with a professional can provide clarity and relief."
        },
        {
            title: "What to Expect",
            content: "Your first session is usually about getting to know each other. You'll discuss your history, current challenges, and goals for therapy."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                    Help & Advice
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
                    Understanding mental health and therapy shouldn&apos;t be complicated. Here&apos;s what you need to know.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                {topics.map((topic, index) => (
                    <Box key={index} sx={{ height: '100%' }}>
                        <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary.main">
                                    {topic.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
                                    {topic.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
