'use client';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';


export default function NotificationPage() {
  const mockNotifications = [
    {
      id: 1,
      title: 'New Event Added',
      message: 'Check out the new event “Summer Gala” happening next week!',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your booking for Floral Design has been confirmed.',
      time: 'Yesterday',
    },
    {
      id: 3,
      title: 'Profile Updated',
      message: 'You successfully updated your profile information.',
      time: '2 days ago',
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Paper elevation={3} sx={{ mt: 2 }}>
        <List>
          {mockNotifications.map((n, index) => (
            <Box key={n.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={n.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {n.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        {n.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < mockNotifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
