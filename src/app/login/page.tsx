'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/context/AuthContext';

interface PageProps {
    searchParams: Promise<{
        redirect?: string;
    }>;
}

export default function LoginPage({ searchParams }: PageProps) {
    const params = use(searchParams);
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email);

            if (success) {
                router.push(params.redirect || '/dashboard');
            } else {
                setError('Invalid email address. Try therapist@example.com or client@example.com');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 12 }}>
            <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please sign in to your account
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText="Any password will work for now"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={loading}
                        sx={{ py: 1.5, mt: 2 }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                        (Try <strong>therapist@example.com</strong> or <strong>client@example.com</strong>)
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
