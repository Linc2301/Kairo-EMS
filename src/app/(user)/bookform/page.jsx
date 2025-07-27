"use client";

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    CircularProgress,
    Grid,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [datePackages, setDatePackages] = useState([]);
    const [timePackages, setTimePackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const venueId = 2; // Replace with actual venue ID selection

    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/availability/date?venueId=${venueId}`);
                const data = await res.json();
                setDatePackages(data);
            } catch (error) {
                console.error('Failed to load available dates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAvailability();
    }, [venueId]);

    useEffect(() => {
        if (selectedDate) {
            const fetchTimeSlotsForDate = async () => {
                try {
                    const dateStr = selectedDate.format('YYYY-MM-DD');
                    const res = await fetch(`/api/availability/timeslots?date=${dateStr}&venueId=${venueId}`);
                    const data = await res.json();
                    setTimePackages(data);
                } catch (error) {
                    console.error('Failed to load time slots:', error);
                }
            };
            fetchTimeSlotsForDate();
        }
    }, [selectedDate, venueId]);

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setOpenDialog(true);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch('/api/booking-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    venue_id: selectedSlot.venue_id,
                    venueTypeId: 1,
                    floral_service_id: 1,
                    timePackageId: selectedSlot.id,
                    user_id: 1,
                    booking_date: new Date(),
                    total_amount: 5000,
                }),
            });

            if (response.ok) {
                alert(`Booking confirmed for ${formatTime(selectedSlot.startTime)}`);
                const dateStr = selectedDate.format('YYYY-MM-DD');
                const res = await fetch(`/api/availability/timeslots?date=${dateStr}&venueId=${venueId}`);
                const data = await res.json();
                setTimePackages(data);
            } else {
                throw new Error('Booking failed');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        } finally {
            setOpenDialog(false);
            setSelectedSlot(null);
        }
    };

    const CustomDay = (props) => {
        const { day, outsideCurrentMonth, ...other } = props;
        const dateStr = dayjs(day).format('YYYY-MM-DD');
        // const isAvailable = datePackages.some(pkg => pkg.date === dateStr);
        const isAvailable = datePackages.some(pkg => {
            // normalize both sides to "YYYY-MM-DD"
            const pkgDate = dayjs(pkg.date).format("YYYY-MM-DD");
            return pkgDate === dateStr;
        });

        return (
            <DateCalendar
                value={selectedDate}
                onChange={(newDate) => {
                    const dateStr = dayjs(newDate).format("YYYY-MM-DD");
                    const isAvailable = datePackages.some(pkg => dayjs(pkg.date).format("YYYY-MM-DD") === dateStr);
                    if (isAvailable) {
                        setSelectedDate(newDate);
                    } else {
                        // Ignore or alert invalid date selection
                        alert("This date is not available.");
                    }
                }}
                slots={{ day: CustomDay }}
            />

        );
    };

    const formatTime = (timeStr) => {
        const parsed = dayjs(timeStr);
        return parsed.isValid() ? parsed.format('h:mm a') : 'Invalid time';
    };

    return (
        <Box p={isMobile ? 2 : 4}>
            <Typography variant="h4" gutterBottom>
                Select Date & Time
            </Typography>
            <Typography variant="body1" gutterBottom>
                Please select date and time for your appointment
            </Typography>

            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                justifyContent="center"
                gap={4}
                mt={4}
            >
                <Box flex={1}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            <CalendarMonthIcon sx={{ mr: 1 }} />
                            Select a Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                slots={{ day: CustomDay }}
                            />
                        </LocalizationProvider>
                    </Paper>
                </Box>

                {selectedDate && (
                    <Box flex={1}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                <AccessTimeIcon sx={{ mr: 1 }} />
                                Pick a time for {selectedDate.format('MMMM D, YYYY')}
                            </Typography>

                            {loading ? (
                                <Box mt={3} textAlign="center">
                                    <CircularProgress />
                                </Box>
                            ) : timePackages.length > 0 ? (
                                <Grid container spacing={2} mt={2}>
                                    {timePackages.map((slot) => (
                                        <Grid item xs={6} sm={4} key={slot.id}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => handleSlotClick(slot)}
                                            >
                                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography color="text.secondary" mt={2}>
                                    No available slots for this date.
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                )}
            </Box>

            <Typography variant="body2" sx={{ mt: 4 }}>
                Questions? Call (858) 939-3746 for help
            </Typography>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Booking</DialogTitle>
                <DialogContent>
                    <Typography>
                        Confirm your booking for <strong>{selectedSlot && formatTime(selectedSlot.startTime)} to {selectedSlot && formatTime(selectedSlot.endTime)}</strong> at <strong>{selectedSlot?.venueName}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        Confirm Booking
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
