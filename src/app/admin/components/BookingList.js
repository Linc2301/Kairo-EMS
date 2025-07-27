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
// import dayjs from 'dayjs';

// export default function BookingList({ selectedDate }) {
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

//   const filteredBookings = bookings.filter(booking =>
//     dayjs(booking.booking_date).isSame(selectedDate, 'day')
//   );

//   return (
//     <Paper sx={{ p: 2, mt: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Bookings on {dayjs(selectedDate).format('MMMM D, YYYY')}
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : filteredBookings.length === 0 ? (
//         <Typography variant="body2">No bookings found.</Typography>
//       ) : (
//         <List>
//           {filteredBookings.map((booking, index) => {
//             const userName = booking.user?.name || 'Unknown User';
//             const venueName = booking.venue?.name || 'Unknown Venue';
//             const time = new Date(booking.booking_date).toLocaleTimeString();

//             return (
//               <ListItem key={index}>
//                 <Avatar sx={{ mr: 2 }}>{userName.charAt(0)}</Avatar>
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
//   Pagination,
//   Box,
// } from '@mui/material';
// import dayjs from 'dayjs';

// export default function BookingList({ selectedDate }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const bookingsPerPage = 5;

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

//   // Reset page when date changes
//   useEffect(() => {
//     setPage(1);
//   }, [selectedDate]);

//   const filteredBookings = bookings.filter(booking =>
//     dayjs(booking.booking_date).isSame(selectedDate, 'day')
//   );

//   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
//   const paginatedBookings = filteredBookings.slice(
//     (page - 1) * bookingsPerPage,
//     page * bookingsPerPage
//   );

//   return (
//     <Paper sx={{ p: 2, mt: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Bookings on {dayjs(selectedDate).format('MMMM D, YYYY')}
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : filteredBookings.length === 0 ? (
//         <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant="body2">No bookings found.</Typography>
//         </Box>
//       ) : (
//         <>
//           {/* Fixed height list with scrolling */}
//           <Box
//             sx={{
//               height: 280,
//               overflowY: 'auto',
//               border: '1px solid #ccc',
//               borderRadius: 1,
//               mt: 1,
//             }}
//           >
//             <List>
//               {paginatedBookings.map((booking, index) => {
//                 const userName = booking.user?.name || 'Unknown User';
//                 const venueName = booking.venue?.name || 'Unknown Venue';
//                 const time = new Date(booking.booking_date).toLocaleTimeString();

//                 return (
//                   <ListItem key={index} sx={{ minHeight: 60 }}>
//                     <Avatar sx={{ mr: 2 }}>{userName.charAt(0)}</Avatar>
//                     <ListItemText
//                       primary={`${userName} booked ${venueName}`}
//                       secondary={
//                         <Typography variant="caption" color="text.secondary">
//                           {time}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           {totalPages > 1 && (
//             <Box mt={2} display="flex" justifyContent="center">
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(e, value) => setPage(value)}
//                 color="primary"
//               />
//             </Box>
//           )}
//         </>
//       )}
//     </Paper>
//   );
// }

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
//   Pagination,
//   Box,
// } from '@mui/material';
// import dayjs from 'dayjs';

// export default function BookingList({ selectedDate }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const bookingsPerPage = 5;

//   useEffect(() => {
//     fetch('/api/booking-info')
//       .then(res => res.json())
//       .then(data => {
//         // Attach static fallback time at fetch time
//         const processed = data.map((booking) => {
//           const date = new Date(booking.booking_date);
//           const isMidnight =
//             date.getHours() === 0 &&
//             date.getMinutes() === 0 &&
//             date.getSeconds() === 0;

//           return {
//             ...booking,
//             fallbackTime: isMidnight ? dayjs().format('h:mm A') : null,
//           };
//         });

//         setBookings(processed);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Failed to load bookings:', error);
//         setLoading(false);
//       });
//   }, []);

//   // Reset page when date changes
//   useEffect(() => {
//     setPage(1);
//   }, [selectedDate]);

//   const filteredBookings = bookings.filter(booking =>
//     dayjs(booking.booking_date).isSame(selectedDate, 'day')
//   );

//   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
//   const paginatedBookings = filteredBookings.slice(
//     (page - 1) * bookingsPerPage,
//     page * bookingsPerPage
//   );

//   return (
//     <Paper sx={{ p: 2, mt: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Bookings on {dayjs(selectedDate).format('MMMM D, YYYY')}
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : filteredBookings.length === 0 ? (
//         <Box
//           sx={{
//             height: 300,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Typography variant="body2">No bookings found.</Typography>
//         </Box>
//       ) : (
//         <>
//           <Box
//             sx={{
//               height: 300,
//               overflowY: 'auto',
//               border: '1px solid #ccc',
//               borderRadius: 1,
//               mt: 1,
//             }}
//           >
//             <List>
//               {paginatedBookings.map((booking, index) => {
//                 const userName = booking.user?.name || 'Unknown User';
//                 const venueName = booking.venue?.name || 'Unknown Venue';

//                 const time =
//                   booking.fallbackTime ||
//                   dayjs(booking.booking_date).format('h:mm A');

//                 return (
//                   <ListItem key={index} sx={{ minHeight: 60 }}>
//                     <Avatar sx={{ mr: 2 }}>{userName.charAt(0)}</Avatar>
//                     <ListItemText
//                       primary={`${userName} booked ${venueName}`}
//                       secondary={
//                         <Typography variant="caption" color="text.secondary">
//                           {time}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           {totalPages > 1 && (
//             <Box mt={2} display="flex" justifyContent="center">
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={(e, value) => setPage(value)}
//                 color="primary"
//               />
//             </Box>
//           )}
//         </>
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
  Pagination,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

export default function BookingList({ selectedDate }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const bookingsPerPage = 5;

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

  useEffect(() => {
    setPage(1);
  }, [selectedDate]);

  const filteredBookings = bookings.filter(booking =>
    dayjs(booking.booking_date).isSame(selectedDate, 'day')
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (page - 1) * bookingsPerPage,
    page * bookingsPerPage
  );

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bookings on {dayjs(selectedDate).format('MMMM D, YYYY')}
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredBookings.length === 0 ? (
        <Box
          sx={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2">No bookings found.</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: 300,
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: 1,
              mt: 1,
            }}
          >
            <List>
              {paginatedBookings.map((booking, index) => {
                const userName = booking.user?.name || 'Unknown User';
                const venueName = booking.venue?.name || 'Unknown Venue';

                const bookingDate = new Date(booking.booking_date);
                const isMidnight =
                  bookingDate.getHours() === 0 &&
                  bookingDate.getMinutes() === 0 &&
                  bookingDate.getSeconds() === 0;

                const time = isMidnight
                  ? null
                  : dayjs(bookingDate).format('h:mm A');

                return (
                  <ListItem key={index} sx={{ minHeight: 60 }}>
                    <Avatar sx={{ mr: 2 }}>{userName.charAt(0)}</Avatar>
                    <ListItemText
                      primary={`${userName} booked ${venueName}`}
                      secondary={
                        time && (
                          <Typography variant="caption" color="text.secondary">
                            {time}
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {totalPages > 1 && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
