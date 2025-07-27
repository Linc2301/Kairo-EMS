
'use client';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    console.log('Fetching notifications...');
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/notifications');

      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Received invalid data format from server');
        setNotifications([]);
      }
    } catch (err) {
      console.error('Fetch error details:', {
        message: err.message,
        response: err.response?.data,
        config: err.config,
      });
      setError(err.response?.data?.error || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading notifications...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchNotifications}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Button
        variant="outlined"
        onClick={fetchNotifications}
        sx={{ mb: 2 }}
      >
        Refresh Notifications
      </Button>

      {notifications.length === 0 ? (
        <Alert severity="info">
          No notifications found. Notifications you create should appear here.
        </Alert>
      ) : (
        <Paper elevation={3}>
          <List>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                          gutterBottom
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}