import React from 'react';
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

const drawerWidth = 240;

const navItems = [
    { text: 'Dashboard', icon: <Dashboard /> },
    { text: 'Event', icon: <Event /> },
    { text: 'Book Info', icon: <Phone /> },
    { text: 'User Info', icon: <Group /> },
    { text: 'Contact', icon: <ContactSupport /> },
    { text: 'Review', icon: <RateReview /> },
    { text: 'Feedback', icon: <Feedback /> },
];

export default function DashboardLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'white', color: 'black', boxShadow: 1 }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'serif', color: 'black' }}>
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
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', pt: 8 },
                }}
            >
                <Toolbar />
                <List>
                    {navItems.map((item, index) => (
                        <ListItem disablePadding key={item.text}>
                            <ListItemButton
                                selected={index === 0}
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
                                <ListItemIcon sx={{ color: index === 0 ? '#ef6c00' : 'inherit' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#fff',
                    mt: 2,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 2,
                    mx: 2, // Add some horizontal margin
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome to the Dashboard
                </Typography>
            </Box>

        </Box>
    );
}
