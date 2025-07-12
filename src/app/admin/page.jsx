'use client';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DashboardCard from '@/src/app/admin/components/DashboardCard';
import VisitorChart from '@/src/app/admin/components/VisitorChart';
import TaskChart from '@/src/app/admin/components/TaskChart';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

export default function DashboardPage() {
  return (
    <Box sx={{ bgcolor: '#0c0b1a', px: 4 }}>
      <Typography variant="h4" color="white" mb={2}>
        Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Total Customers"
            value="153"
            icon={<GroupIcon fontSize="large" />}
            bgColor="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="New Customers"
            value="5"
            icon={<PersonIcon fontSize="large" />}
            bgColor="#fbc02d"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Total Events"
            value="10"
            icon={<EventIcon fontSize="large" />}
            bgColor="#0288d1"
          />
        </Grid>
      </Grid>

      <Grid  spacing={3}>
        <Grid >
          <VisitorChart />
        </Grid>
        <Grid  >
          <TaskChart />
        </Grid>
      </Grid>
    </Box>
  );
}
