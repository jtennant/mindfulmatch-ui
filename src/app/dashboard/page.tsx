'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { getUser, User } from '@/lib/userService';
import { getDashboardData, DashboardData } from '@/services/dashboardService';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatBox from '@/components/dashboard/widgets/StatBox';
import ImpressionGraph from '@/components/dashboard/widgets/ImpressionGraph';
import ActivityFeed from '@/components/dashboard/widgets/ActivityFeed';
import SessionList from '@/components/dashboard/widgets/SessionList';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAndFetchData = async () => {
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

            // Fetch dashboard data
            try {
                const data = await getDashboardData(userData);
                setDashboardData(data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        checkUserAndFetchData();
    }, [router]);

    if (loading || !user || !dashboardData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const isProfessional = user.role === 'professional';

    return (
        <DashboardLayout user={user}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome back, {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Here's what's happening with your account today.
            </Typography>

            <Grid container spacing={3}>
                {/* Professional Only Widgets */}
                {isProfessional && (
                    <>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatBox title="Upcoming Appointments (7 Days)" value={dashboardData.stats.appointments7Days} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatBox title="Upcoming Appointments (30 Days)" value={dashboardData.stats.appointments30Days} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StatBox title="Earnings (30 Days)" value={dashboardData.stats.earnings30Days} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <ImpressionGraph data={dashboardData.impressions} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <SessionList
                                title="Upcoming Supervisor Sessions"
                                sessions={dashboardData.sessions.filter(s => s.type === 'Supervisor')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <SessionList
                                title="Upcoming Client Sessions"
                                sessions={dashboardData.sessions.filter(s => s.type === 'Client')}
                            />
                        </Grid>
                    </>
                )}

                {/* Common Widgets */}
                <Grid size={{ xs: 12, md: isProfessional ? 6 : 8 }}>
                    <ActivityFeed activities={dashboardData.activities} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SessionList
                        title="Your Therapy Sessions"
                        sessions={dashboardData.sessions.filter(s => s.type === 'Therapy')}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
