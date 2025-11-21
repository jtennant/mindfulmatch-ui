'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { sendMessage } from '@/lib/messageService';
import { useAuth } from '@/context/AuthContext';

interface Props {
    params: Promise<{ id: string }>;
}

export default function SendMessagePage({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        subject: '',
        email: '',
        message: '',
        createAccount: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await sendMessage({
                therapistId: id,
                ...formData
            });

            const queryParams = formData.createAccount ? '?accountCreated=true' : '';
            router.push(`/therapist/${id}/message/sent${queryParams}`);
        } catch (err) {
            setError('Failed to send message. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                component="a"
                href={`/therapist/${id}`}
                variant="text"
                sx={{ mb: 3, color: 'text.secondary' }}
            >
                ← Back to Therapist Profile
            </Button>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Send Message
                </Typography>

                <Box sx={{ mb: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                        Tips for your message
                    </Typography>
                    <Typography variant="body2" paragraph>
                        • Introduce yourself briefly and explain why you're seeking therapy.
                    </Typography>
                    <Typography variant="body2">
                        • Ask any specific questions you have about their approach or availability.
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Subject"
                            required
                            fullWidth
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />

                        <TextField
                            label="Your Email"
                            type="email"
                            required
                            fullWidth
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <TextField
                            label="Message"
                            multiline
                            rows={6}
                            required
                            fullWidth
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />

                        {/* FIXME: Displays the checkbox momenteraly sometimes */}
                        {!user && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.createAccount}
                                            onChange={(e) => setFormData({ ...formData, createAccount: e.target.checked })}
                                        />
                                    }
                                    label="Create an account after sending message"
                                />
                                <Tooltip title="An account will be created allowing you to track activity and making it easier to book sessions with therapists in the future.">
                                    <InfoIcon color="action" sx={{ fontSize: 20, ml: 1, cursor: 'help' }} />
                                </Tooltip>
                            </Box>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ py: 1.5, fontWeight: 700 }}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}
