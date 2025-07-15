'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Button, Box, Typography, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Review', path: '/review' }
];

export default function Navbar() {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#c0392b' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h5">Kairo</Typography>
                <Box>
                    {navItems.map(({ label, path }) => (
                        <Link key={label} href={path} passHref>
                            <Button color="inherit">{label}</Button>
                        </Link>
                    ))}

                    {session ? (
                        <>
                            <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                                <Avatar
                                    alt={session.user.name || 'Profile'}
                                    src={session.user.image || ''}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        border: '2px solid white',
                                        boxShadow: '0 0 0 2px rgba(255,255,255,0.3)',
                                    }}
                                />

                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            mt: 1.5,
                                            borderRadius: 3,
                                            minWidth: 200,
                                            px: 2,
                                            py: 1.5,
                                            backdropFilter: 'blur(12px)',
                                            backgroundColor: 'rgba(30, 30, 30, 0.8)', //  Darker bg to avoid white bleed-through
                                            border: '1px solid rgba(255, 255, 255, 0.25)',
                                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                                            color: '#fff',
                                            zIndex: 1300, // Make sure it's above other elements
                                        },
                                    },
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, px: 1, pb: 0.5 }}
                                    >
                                        {session.user.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ px: 1, pb: 1, color: 'rgba(255,255,255,0.8)' }}
                                    >
                                        {session.user.email}
                                    </Typography>
                                </Box>

                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <Link
                                        href="/profile"
                                        passHref
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            width: '100%',
                                        }}
                                    >
                                        My Profile
                                    </Link>
                                </MenuItem>

                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>

                        </>
                    ) : (
                        <Link href="/login" passHref>
                            <Button variant="contained" color="secondary" sx={{ ml: 2, color: '#000' }}>
                                Login
                            </Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    );
}
