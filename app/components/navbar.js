'use client';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Log in', path: '/login' },
];

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#c0392b' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h5">Kairo</Typography>
                <Box>
                    {navItems.map(({ label, path }) => (
                        <Link key={label} href={path} passHref>
                            <Button color="inherit">{label}</Button>
                        </Link>
                    ))}
                    <Link href="/register" passHref>
                        <Button variant="contained" color="secondary" sx={{ ml: 2, color: '#000' }}>
                            Register now
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
