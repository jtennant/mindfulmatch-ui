'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { User } from '@/lib/userService';

interface SidebarProps {
    user: User | null;
    onClose?: () => void;
}

export default function Sidebar({ user, onClose }: SidebarProps) {
    const pathname = usePathname();

    const commonLinks = [
        { text: 'My Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Account Details', href: '/dashboard/account', icon: <PersonIcon /> },
        { text: 'Find a Therapist', href: '/search', icon: <SearchIcon /> },
        { text: 'Bookings', href: '/dashboard/bookings', icon: <EventNoteIcon /> },
    ];

    const professionalLinks = [
        { text: 'Find a Supervisor', href: '/dashboard/supervisor-search', icon: <SupervisorAccountIcon /> },
        { text: 'Analytics', href: '/dashboard/analytics', icon: <AnalyticsIcon /> },
        { text: 'Calendar', href: '/dashboard/calendar', icon: <CalendarMonthIcon /> },
    ];

    const links = user?.role === 'professional'
        ? [...commonLinks, ...professionalLinks]
        : commonLinks;

    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <List>
                {links.map((link) => (
                    <ListItem key={link.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={link.href}
                            selected={pathname === link.href}
                        >
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
}
