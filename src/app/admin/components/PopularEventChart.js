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
  LabelList,
  Cell
} from 'recharts';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import dayjs from 'dayjs';

export default function PopularEventsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const res = await fetch('/api/booking-info');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const bookings = await res.json();

        let filteredBookings = bookings;
        const now = dayjs();

        if (filter === 'month') {
          filteredBookings = bookings.filter((b) =>
            dayjs(b.booking_date).isSame(now, 'month')
          );
        } else if (filter === 'week') {
          filteredBookings = bookings.filter((b) =>
            dayjs(b.booking_date).isSame(now, 'week')
          );
        }

        const eventCounts = {};
        filteredBookings.forEach((b) => {
          const eventName = b.Event?.name || 'Unknown Event';
          eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
        });

        const formatted = Object.entries(eventCounts)
          .map(([name, count]) => ({ name, bookings: count }))
          .sort((a, b) => b.bookings - a.bookings);

        setChartData(formatted);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [filter]);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter) setFilter(newFilter);
  };

  const topEvent = chartData.length > 0 ? chartData[0] : null;

  return (
    <Paper elevation={6} sx={{ p: 3, backgroundColor: '#f9f9fb', borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          📊 Popular Events by Bookings
        </Typography>
        <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} size="small">
          <ToggleButton value="all">All Time</ToggleButton>
          <ToggleButton value="month">This Month</ToggleButton>
          <ToggleButton value="week">This Week</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {topEvent && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          🏆 Top Event ({filter === 'all' ? 'All Time' : filter === 'month' ? 'This Month' : 'This Week'}):{' '}
          <strong>{topEvent.name}</strong> ({topEvent.bookings} bookings)
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12, fill: '#555' }}
            />
            <YAxis tick={{ fontSize: 12, fill: '#555' }} />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              contentStyle={{ borderRadius: 8, border: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="bookings" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="bookings" position="top" style={{ fontSize: 12, fill: '#1976d2' }} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`rgba(25, 118, 210, ${0.7 + index * 0.05})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
