'use client';
// import React from 'react';
// import { Box, Grid, Typography, Container, Paper } from '@mui/material';
// import DashboardCard from '@/src/app/admin/components/DashboardCard';
// import VisitorChart from '@/src/app/admin/components/VisitorChart';
// import TaskChart from '@/src/app/admin/components/TaskChart';
// import GroupIcon from '@mui/icons-material/Group';
// import PersonIcon from '@mui/icons-material/Person';
// import EventIcon from '@mui/icons-material/Event';

// export default function DashboardPage() {
//   return (
//     <Box>
//       <Container maxWidth="xl">
//         <Typography variant="h4" mb={2}>
//           Dashboard
//         </Typography>

//         {/* Top Cards */}
//         <Grid container spacing={3} mb={4}>
//           <Grid item md={4}>
//             <DashboardCard
//               title="Total Customers"
//               value="153"
//               icon={<GroupIcon fontSize="large" />}
//               bgColor="#3f51b5"
//             />
//           </Grid>
//           <Grid item md={4}>
//             <DashboardCard
//               title="New Customers"
//               value="5"
//               icon={<PersonIcon fontSize="large" />}
//               bgColor="#fbc02d"
//             />
//           </Grid>
//           <Grid item md={4}>
//             <DashboardCard
//               title="Total Events"
//               value="10"
//               icon={<EventIcon fontSize="large" />}
//               bgColor="#0288d1"
//             />
//           </Grid>
//         </Grid>

//         {/* Charts Section */}
//         <Grid container spacing={6} mt={2}>
//         {/* Visitor Statistics - 8/12 */}
//         <Grid item md={8}>
//             <VisitorChart />
//         </Grid>

//         {/* Task This Month - 4/12 */}
//         <Grid item md={4}>
          
//             <TaskChart />
//         </Grid>
//       </Grid>

//       </Container>
//     </Box>
//   );
// }


// import DashboardStats from '@/src/app/admin/components/DashboardStats';
// import RevenueChart from '@/src/app/admin/components/RevenueChart';
// import BookingCalendar from '@/src/app/admin/components/BookingCalendar';
// import BookingList from '@/src/app/admin/components/BookingList';
// import { Container, Grid } from '@mui/material';
// import TaskChart from './components/TaskChart';
// import { Box } from 'lucide-react';

// export default function Dashboard() {
//   return (
//     // <Container maxWidth="lg" sx={{ mt: 4 }}>
//     //   <DashboardStats />
//     //   <Grid container spacing={2} sx={{ mt: 2 }}>
//     //     <Grid item xs={12} md={8}>
//     //       <RevenueChart />
//     //     </Grid>
//     //     <Grid item xs={12} md={4}>
//     //       <BookingCalendar />
//     //       <BookingList />
//     //       <TaskChart/>
//     //     </Grid>
//     //   </Grid>
//     // </Container>


//   );
// }

import { Box, Container } from '@mui/material';
import BookingCalendar from './components/BookingCalendar';
import BookingList from './components/BookingList';
import DashboardStats from './components/DashboardStats';
import TimePackagePieChart from './components/TImeChart';

export default function AdminDashboardPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box>
             <DashboardStats/>
      </Box>
 
         <Box flex={1} minWidth="300px">
          <TimePackagePieChart />
        </Box>
      
      <Box display="flex" gap={2} flexWrap="wrap" sx={{mt: 5}}>
        {/* Left side - Calendar */}
        <Box flex={1} minWidth="300px">
          <BookingCalendar />
        </Box>
    
        {/* Right side - Booking List */}
        <Box flex={1} minWidth="300px">
          <BookingList />
       
        </Box>
      </Box>
    
    </Container>
  );
}