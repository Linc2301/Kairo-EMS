'use client';

import { useEffect, useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  CircularProgress,
  Box,
  useTheme
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  RateReview as ReviewIcon,
  ContactMail as ContactIcon
} from '@mui/icons-material';

export default function DashboardStats() {
  const [totalBookings, setTotalBookings] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);
  const [totalContacts, setTotalContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    async function fetchStats() {
      try {
        const [bookingRes, userRes, reviewRes, contactRes] = await Promise.all([
          fetch('/api/booking-info'),
          fetch('/api/users'),
          fetch('/api/review'),
          fetch('/api/contact'),
        ]);

        const bookings = await bookingRes.json();
        const users = await userRes.json();
        const reviews = await reviewRes.json();
        const contacts = await contactRes.json();

        setTotalBookings(bookings.length);
        setTotalUsers(users.length);
        setTotalReviews(reviews.length);
        setTotalContacts(contacts.length);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      bgColor: 'rgba(25, 118, 210, 0.1)'
    },
    {
      title: 'Registered Users',
      value: totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      bgColor: 'rgba(46, 125, 50, 0.1)'
    },
    {
      title: 'Total Reviews',
      value: totalReviews,
      icon: <ReviewIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.main,
      bgColor: 'rgba(237, 108, 2, 0.1)'
    },
    {
      title: 'Total Contacts',
      value: totalContacts,
      icon: <ContactIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      bgColor: 'rgba(2, 136, 209, 0.1)'
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {stats.map((s, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              },
              backgroundColor: s.bgColor,
              position: 'relative',
              overflow: 'hidden'
            }}
            elevation={2}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '80px', 
                height: '80px', 
                borderRadius: '0 0 0 80px', 
                backgroundColor: s.color,
                opacity: 0.1
              }} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ color: s.color, mr: 3 }}>
                {s.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {s.title}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: s.color }}>
              {s.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}