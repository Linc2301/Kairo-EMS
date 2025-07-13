'use client';
import React from 'react';
import { Box, Grid, Typography, Container, Paper } from '@mui/material';
import DashboardCard from '@/src/app/admin/components/DashboardCard';
import VisitorChart from '@/src/app/admin/components/VisitorChart';
import TaskChart from '@/src/app/admin/components/TaskChart';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

export default function DashboardPage() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h4" mb={2}>
          Dashboard
        </Typography>

        {/* Top Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item md={4}>
            <DashboardCard
              title="Total Customers"
              value="153"
              icon={<GroupIcon fontSize="large" />}
              bgColor="#3f51b5"
            />
          </Grid>
          <Grid item md={4}>
            <DashboardCard
              title="New Customers"
              value="5"
              icon={<PersonIcon fontSize="large" />}
              bgColor="#fbc02d"
            />
          </Grid>
          <Grid item md={4}>
            <DashboardCard
              title="Total Events"
              value="10"
              icon={<EventIcon fontSize="large" />}
              bgColor="#0288d1"
            />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={6} mt={2}>
        {/* Visitor Statistics - 8/12 */}
        <Grid item md={8}>
            <VisitorChart />
        </Grid>

        {/* Task This Month - 4/12 */}
        <Grid item md={4}>
          
            <TaskChart />
        </Grid>
      </Grid>

      </Container>
    </Box>
  );
}
