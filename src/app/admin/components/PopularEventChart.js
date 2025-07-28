'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';

export default function PopularEventsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch('/api/booking-info');

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Expected JSON, got:', text);
          throw new Error('Invalid response from server');
        }

        const bookings = await res.json();

        // Count bookings per venue
        const venueCounts = {};
        bookings.forEach((booking) => {
          const venueName = booking.venue?.name || 'Unknown';
          venueCounts[venueName] = (venueCounts[venueName] || 0) + 1;
        });

        // Format for chart
        const formatted = Object.entries(venueCounts).map(([name, count]) => ({
          name,
          bookings: count,
        }));

        setChartData(formatted);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📊 Popular Venue by Bookings
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
//