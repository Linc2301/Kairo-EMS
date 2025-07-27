// import { Grid, Paper, Typography } from '@mui/material';

// const stats = [
//     { title: 'Total check-ins', value: '235k', change: '+5.4%', color: 'green' },
//     { title: 'Total check-outs', value: '201k', change: '-2.5%', color: 'red' },
//     { title: 'Other stays', value: '34k' },
// ];

// export default function DashboardStats() {
//     return (
//         <Grid container spacing={2}>
//             {stats.map((s, i) => (
//                 <Grid item xs={12} md={4} key={i}>
//                     <Paper sx={{ p: 2 }}>
//                         <Typography variant="subtitle2">{s.title}</Typography>
//                         <Typography variant="h5">{s.value}</Typography>
//                         {s.change && (
//                             <Typography variant="body2" color={s.color === 'green' ? 'green' : 'red'}>
//                                 {s.change} vs last year
//                             </Typography>
//                         )}
//                     </Paper>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { Grid, Paper, Typography, CircularProgress } from '@mui/material';

// export default function DashboardStats() {
//   const [totalBookings, setTotalBookings] = useState(null);
//   const [totalUsers, setTotalUsers] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const [bookingRes, userRes] = await Promise.all([
//           fetch('/api/booking-info'),
//           fetch('/api/users'),
//         ]);

//         const bookings = await bookingRes.json();
//         const users = await userRes.json();

//         setTotalBookings(bookings.length);
//         setTotalUsers(users.length);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   const stats = [
//     {
//       title: 'Total Bookings',
//       value: totalBookings,
//       change: '+4.2%',
//       color: 'green',
//     },
//     {
//       title: 'Registered Users',
//       value: totalUsers,
//       change: '+2.1%',
//       color: 'green',
//     },
//   ];

//   return (
//     <Grid container spacing={2}>
//       {stats.map((s, i) => (
//         <Grid item xs={12} md={6} key={i}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="subtitle2">{s.title}</Typography>
//             <Typography variant="h5">{s.value}</Typography>
//             {s.change && (
//               <Typography variant="body2" color={s.color === 'green' ? 'green' : 'red'}>
//                 {s.change} vs last month
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';

export default function DashboardStats() {
  const [totalBookings, setTotalBookings] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);
  const [totalContacts, setTotalContacts] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <CircularProgress />;
  }

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      change: '+4.2%',
      color: 'green',
    },
    {
      title: 'Registered Users',
      value: totalUsers,
      change: '+2.1%',
      color: 'green',
    },
    {
      title: 'Total Reviews',
      value: totalReviews,
      change: '+1.8%',
      color: 'green',
    },
    {
      title: 'Total Contacts',
      value: totalContacts,
      change: '+3.5%',
      color: 'green',
    },
  ];

  return (
    <Grid container spacing={8}>
      {stats.map((s, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">{s.title}</Typography>
            <Typography variant="h5">{s.value}</Typography>
            {s.change && (
              <Typography variant="body2" color={s.color === 'green' ? 'green' : 'red'}>
                {s.change} vs last month
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
