
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
//