import { User } from '@/lib/userService';

export interface ImpressionData {
    date: string;
    value: number;
}

export interface ActivityItem {
    id: string;
    type: 'notification' | 'booking';
    message: string;
    date: string;
}

export interface Session {
    id: string;
    name: string;
    date: string;
    time: string;
    type: 'Client' | 'Supervisor' | 'Therapy';
    status: 'Confirmed' | 'Pending';
}

export interface DashboardData {
    stats: {
        appointments7Days: number;
        appointments30Days: number;
        earnings30Days: string;
    };
    impressions: ImpressionData[];
    activities: ActivityItem[];
    sessions: Session[];
}

// Mock Data moved from page
const mockImpressions: ImpressionData[] = [
    { date: '1', value: 10 },
    { date: '5', value: 25 },
    { date: '10', value: 45 },
    { date: '15', value: 80 },
    { date: '20', value: 120 },
    { date: '25', value: 160 },
    { date: '30', value: 210 },
];

const mockActivities: ActivityItem[] = [
    { id: '1', type: 'notification', message: 'New message from Sarah', date: '2 hours ago' },
    { id: '2', type: 'booking', message: 'Appointment confirmed with John Doe', date: 'Yesterday' },
    { id: '3', type: 'notification', message: 'Your profile was viewed 5 times', date: '2 days ago' },
];

const mockSessions: Session[] = [
    { id: '1', name: 'Sarah Smith', date: 'Nov 24', time: '10:00 AM', type: 'Client', status: 'Confirmed' },
    { id: '2', name: 'Dr. Jones (Supervisor)', date: 'Nov 25', time: '2:00 PM', type: 'Supervisor', status: 'Confirmed' },
    { id: '3', name: 'Therapy Session', date: 'Nov 28', time: '4:00 PM', type: 'Therapy', status: 'Pending' },
];

export const getDashboardData = async (user: User): Promise<DashboardData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, we would filter data based on the user ID or role here
    // For now, we return the same mock data for everyone, but structured

    return {
        stats: {
            appointments7Days: 5,
            appointments30Days: 12,
            earnings30Days: '£1,250',
        },
        impressions: mockImpressions,
        activities: mockActivities,
        sessions: mockSessions,
    };
};
