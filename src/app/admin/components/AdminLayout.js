'use client';

import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
} from '@mui/material';

import {
    Dashboard,
    Event,
    Phone,
    Group,
    ContactSupport,
    RateReview,
    Feedback,
    Person,
} from '@mui/icons-material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const navItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Event', icon: <Event />, path: '/admin/events' },
    { text: 'Book Info', icon: <Phone />, path: '/admin/book-info' },
    { text: 'User Info', icon: <Group />, path: '/admin/user-info' },
    { text: 'Contact', icon: <ContactSupport />, path: '/admin/contact-info' },
    { text: 'Review', icon: <RateReview />, path: '/admin/review' },
    { text: 'Feedback', icon: <Feedback />, path: '/admin/feedback' },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    bgcolor: 'white',
                    color: 'black',
                    boxShadow: 1,
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'serif' }}>
                        <span style={{ color: '#ef6c00', fontWeight: 'bold', fontSize: '32px' }}>K</span>airo
                    </Typography>
                    <IconButton>
                        <Avatar sx={{ border: '2px solid black' }}>
                            <Person />
                        </Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        pt: 8,
                    },
                }}
            >
                <Toolbar />
                <List>
                    {navItems.map((item) => {
                        const isSelected = pathname === item.path;

                        return (
                            <ListItem disablePadding key={item.text}>
                                <ListItemButton
                                    component={Link}
                                    href={item.path}
                                    selected={isSelected}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                        pl: 3,
                                    }}
                                >
                                    <ListItemIcon sx={{ color: isSelected ? '#ef6c00' : 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#fff',
                    mt: 8,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 2,
                    mx: 1,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
