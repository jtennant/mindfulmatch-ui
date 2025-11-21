'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        logout();
        handleCloseNavMenu();
        router.push('/');
    };

    const navLinks = [
        { title: 'Find a therapist', path: '/search' },
        { title: 'About us', path: '/about' },
        { title: 'Help and advice', path: '/advice' },
        { title: 'For Professionals', path: '/professionals' },
    ];

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* Logo - Desktop & Mobile */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.5rem' }}>
                            MindMatch
                        </Typography>
                    </Link>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
                        {navLinks.map((link) => (
                            <Link key={link.path} href={link.path} style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    sx={{
                                        fontWeight: 500,
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    {link.title}
                                </Typography>
                            </Link>
                        ))}
                    </Box>

                    {/* Desktop Login/User Buttons */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto', gap: 2 }}>
                        {user ? (
                            <>
                                <Button component={Link} href="/dashboard" variant="contained" color="primary">
                                    My Dashboard
                                </Button>
                                <Button onClick={handleLogout} variant="outlined" color="error">
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <Button component={Link} href="/login" variant="outlined" color="primary">
                                Login
                            </Button>
                        )}
                    </Box>

                    {/* Mobile Menu Icon */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navLinks.map((link) => (
                                <MenuItem key={link.path} onClick={handleCloseNavMenu} component={Link} href={link.path}>
                                    <Typography textAlign="center">{link.title}</Typography>
                                </MenuItem>
                            ))}
                            {user ? (
                                [
                                    <MenuItem key="dashboard" onClick={handleCloseNavMenu} component={Link} href="/dashboard">
                                        <Typography textAlign="center" color="primary" fontWeight="bold">My Dashboard</Typography>
                                    </MenuItem>,
                                    <MenuItem key="logout" onClick={handleLogout}>
                                        <Typography textAlign="center" color="primary">Sign Out</Typography>
                                    </MenuItem>
                                ]
                            ) : (
                                <MenuItem onClick={handleCloseNavMenu} component={Link} href="/login">
                                    <Typography textAlign="center" color="primary" fontWeight="bold">Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

