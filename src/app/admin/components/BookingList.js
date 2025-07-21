// // 'use client';

// // import { List, ListItem, ListItemText, Avatar, Typography, Paper } from '@mui/material';

// // const bookings = [
// //     { user: 'Apartment Booked', time: '19 minutes ago' },
// //     { user: 'Camp Booked', time: '30 minutes ago' },
// //     { user: 'Cottage Booked', time: '1 hour ago' },
// // ];

// // export default function BookingList() {
// //     return (
// //         <Paper sx={{ p: 2, mt: 2 }}>
// //             <List>
// //                 {bookings.map((b, i) => (
// //                     <ListItem key={i}>
// //                         <Avatar sx={{ mr: 2 }} />
// //                         <ListItemText
// //                             primary={b.user}
// //                             secondary={<Typography variant="caption" color="text.secondary">{b.time}</Typography>}
// //                         />
// //                     </ListItem>
// //                 ))}
// //             </List>
// //         </Paper>
// //     );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   Typography,
//   Paper,
//   CircularProgress,
// } from '@mui/material';

// export default function BookingList() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/booking-info')
//       .then(res => res.json())
//       .then(data => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Failed to load bookings:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Paper sx={{ p: 2, mt: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Recent Bookings
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <List>
//           {bookings.slice(0, 6).map((booking, index) => {
//             const userName = booking.user?.name || 'Unknown User';
//             const venueName = booking.venue?.name || 'Unknown Venue';
//             const time = new Date(booking.booking_date).toLocaleString();

//             return (
//               <ListItem key={index}>
//                 <Avatar sx={{ mr: 2 }}>
//                   {userName.charAt(0)}
//                 </Avatar>
//                 <ListItemText
//                   primary={`${userName} booked ${venueName}`}
//                   secondary={
//                     <Typography variant="caption" color="text.secondary">
//                       {time}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             );
//           })}
//         </List>
//       )}
//     </Paper>
//   );
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
import dayjs from 'dayjs';

export default function BookingList({ selectedDate }) {
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

  const filteredBookings = bookings.filter(booking =>
    dayjs(booking.booking_date).isSame(selectedDate, 'day')
  );

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bookings on {dayjs(selectedDate).format('MMMM D, YYYY')}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : filteredBookings.length === 0 ? (
        <Typography variant="body2">No bookings found.</Typography>
      ) : (
        <List>
          {filteredBookings.map((booking, index) => {
            const userName = booking.user?.name || 'Unknown User';
            const venueName = booking.venue?.name || 'Unknown Venue';
            const time = new Date(booking.booking_date).toLocaleTimeString();

            return (
              <ListItem key={index}>
                <Avatar sx={{ mr: 2 }}>{userName.charAt(0)}</Avatar>
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
