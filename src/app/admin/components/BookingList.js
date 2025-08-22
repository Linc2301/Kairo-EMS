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
  alpha,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function BookingList({ selectedDate }) {
  const theme = useTheme();
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
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            mr: 2,
          }}
        >
          <EventIcon sx={{ color: 'info.main', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Bookings for {dayjs(selectedDate).format('MMMM D, YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>
      </Box>

      {/* States */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, flexDirection: 'column', gap: 2 }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Loading bookings...
          </Typography>
        </Box>
      ) : filteredBookings.length === 0 ? (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', gap: 1 }}>
          <EventIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            No bookings found for this date.
          </Typography>
        </Box>
      ) : (
        <>
          {/* List */}
          <List sx={{ py: 0 }}>
            {paginatedBookings.map((booking, index) => {
              const userName = booking.user?.name || 'Unknown User';
              const venueName = booking.venue?.name || 'Unknown Venue';

              const bookingDate = new Date(booking.booking_date);
              const isMidnight =
                bookingDate.getHours() === 0 &&
                bookingDate.getMinutes() === 0 &&
                bookingDate.getSeconds() === 0;

              const time = isMidnight ? null : dayjs(bookingDate).format('h:mm A');

              return (
                <ListItem
                  key={index}
                  sx={{
                    minHeight: 72,
                    py: 2,
                    px: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      width: 42,
                      height: 42,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                  >
                    {userName.charAt(0)}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="subtitle2" component="span" fontWeight="500">
                          {userName}
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ mx: 0.5 }}>
                          booked
                        </Typography>
                        <PlaceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="subtitle2" component="span" color="primary.main" fontWeight="500">
                          {venueName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      time && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <ScheduleIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {time}
                          </Typography>
                        </Box>
                      )
                    }
                    sx={{ m: 0 }}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="medium"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                    fontWeight: 500,
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
