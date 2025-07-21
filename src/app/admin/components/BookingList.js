// 'use client';

// import { List, ListItem, ListItemText, Avatar, Typography, Paper } from '@mui/material';

// const bookings = [
//     { user: 'Apartment Booked', time: '19 minutes ago' },
//     { user: 'Camp Booked', time: '30 minutes ago' },
//     { user: 'Cottage Booked', time: '1 hour ago' },
// ];

// export default function BookingList() {
//     return (
//         <Paper sx={{ p: 2, mt: 2 }}>
//             <List>
//                 {bookings.map((b, i) => (
//                     <ListItem key={i}>
//                         <Avatar sx={{ mr: 2 }} />
//                         <ListItemText
//                             primary={b.user}
//                             secondary={<Typography variant="caption" color="text.secondary">{b.time}</Typography>}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Paper>
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/booking-info')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load bookings:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Bookings
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {bookings.slice(0, 6).map((booking, index) => {
            const userName = booking.user?.name || 'Unknown User';
            const venueName = booking.venue?.name || 'Unknown Venue';
            const time = new Date(booking.booking_date).toLocaleString();

            return (
              <ListItem key={index}>
                <Avatar sx={{ mr: 2 }}>
                  {userName.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={`${userName} booked ${venueName}`}
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {time}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
