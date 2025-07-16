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
    Collapse,
} from '@mui/material';

import {
    Dashboard,
    Event,
    Phone,
    Group,
    ContactSupport,
    RateReview,
    Person,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const drawerWidth = 240;

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [eventOpen, setEventOpen] = useState(false);

    const handleEventClick = () => {
        setEventOpen(!eventOpen);
    };

    const isSelected = (path) => pathname === path;

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
                    {/* Dashboard */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            href="/admin"
                            selected={isSelected('/admin')}
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
                            <ListItemIcon sx={{ color: isSelected('/admin') ? '#ef6c00' : 'inherit' }}>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>

                    {/* Event with nested items */}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleEventClick} sx={{ pl: 3 }}>
                            <ListItemIcon sx={{ color: pathname.startsWith('/admin/events') ? '#ef6c00' : 'inherit' }}>
                                <Event />
                            </ListItemIcon>
                            <ListItemText primary="Event" />
                            {eventOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>

                    <Collapse in={eventOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/admin/events"
                                    selected={isSelected('/admin/events')}
                                    sx={{
                                        pl: 6,
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText primary="Events" />
                                </ListItemButton>
                            </ListItem>

                            {/* venue */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/admin/venue"
                                    selected={isSelected('/admin/venue')}
                                    sx={{
                                        pl: 6,
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText primary="Venue" />
                                </ListItemButton>
                            </ListItem>

                            {/* venueType */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/admin/venueType"
                                    selected={isSelected('/admin/venueType')}
                                    sx={{
                                        pl: 6,
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText primary="Venue Types" />
                                </ListItemButton>
                            </ListItem>

                            {/* floral_service */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/admin/floralServices"
                                    selected={isSelected('/admin/floralServices')}
                                    sx={{
                                        pl: 6,
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText primary="Floral Service" />
                                </ListItemButton>
                            </ListItem>

                            {/* time package */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href="/admin/timePackage"
                                    selected={isSelected('/admin/timePackage')}
                                    sx={{
                                        pl: 6,
                                        '&.Mui-selected': {
                                            color: '#ef6c00',
                                            borderRight: '4px solid #ef6c00',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <ListItemText primary="Time Package" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Book Info */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            href="/admin/book-info"
                            selected={isSelected('/admin/book-info')}
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
                            <ListItemIcon sx={{ color: isSelected('/admin/book-info') ? '#ef6c00' : 'inherit' }}>
                                <Phone />
                            </ListItemIcon>
                            <ListItemText primary="Book Info" />
                        </ListItemButton>
                    </ListItem>

                    {/* User Info */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            href="/admin/user-info"
                            selected={isSelected('/admin/user-info')}
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
                            <ListItemIcon sx={{ color: isSelected('/admin/user-info') ? '#ef6c00' : 'inherit' }}>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="User Info" />
                        </ListItemButton>
                    </ListItem>

                    {/* Contact */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            href="/admin/contact-info"
                            selected={isSelected('/admin/contact-info')}
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
                            <ListItemIcon sx={{ color: isSelected('/admin/contact-info') ? '#ef6c00' : 'inherit' }}>
                                <ContactSupport />
                            </ListItemIcon>
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>

                    {/* Review */}
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            href="/admin/review"
                            selected={isSelected('/admin/review')}
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
                            <ListItemIcon sx={{ color: isSelected('/admin/review') ? '#ef6c00' : 'inherit' }}>
                                <RateReview />
                            </ListItemIcon>
                            <ListItemText primary="Review" />
                        </ListItemButton>
                    </ListItem>


                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    height: 1100,
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
