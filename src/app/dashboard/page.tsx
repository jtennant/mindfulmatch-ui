'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getUser, User } from '@/lib/userService';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const email = localStorage.getItem('user_email');
            if (!email) {
                router.push('/login');
                return;
            }

            const userData = await getUser(email);
            if (!userData) {
                localStorage.removeItem('user_email');
                router.push('/login');
                return;
            }

            setUser(userData);
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user_email');
        router.push('/login');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Dashboard
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={handleLogout}>
                        Sign Out
                    </Button>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Welcome, {user?.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        You are logged in as a <strong>{user?.role === 'professional' ? 'Professional' : 'Client'}</strong>.
                    </Typography>
                </Box>

                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {user?.role === 'professional' ? 'Professional Workspace' : 'Client Portal'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.role === 'professional'
                            ? 'Here you will be able to manage your profile, view appointments, and communicate with clients.'
                            : 'Here you will be able to search for therapists, manage your appointments, and view your history.'}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
