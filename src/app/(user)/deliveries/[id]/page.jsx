"use client";

import * as React from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Button,
    Divider,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Paper,
    Snackbar,
    Alert
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FakePayment from "../../payment/page";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

export default function DeliveryPage() {
    const { data: session } = useSession();
    const { id: venueId } = useParams();
    const router = useRouter();

    const [value, setValue] = useState(0);
    const [venueTypes, setVenueTypes] = useState([]);
    const [floralServices, setFloralServices] = useState([]);
    const [timePackages, setTimePackages] = useState([]);
    const [datePackages, setDatePackages] = useState([]);
    const [bookingData, setBookingData] = useState({
        timePackage: null,
        venue: null,
        floral: null,
    });
    const [showPayment, setShowPayment] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const [loading, setLoading] = useState({
        venueTypes: true,
        floralServices: true,
        timePackages: true,
        datePackages: true,
        confirm: false,
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const fetchWithErrorHandling = async (url) => {
        try {
            const res = await fetch(url);
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') === -1) {
                const text = await res.text();
                if (text.startsWith('<!DOCTYPE html>')) {
                    throw new Error('Server returned HTML error page');
                }
            }

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            return await res.json();
        } catch (err) {
            console.error(`Fetch error for ${url}:`, err);
            throw err;
        }
    };

    useEffect(() => {
        if (!venueId) return;

        const fetchData = async () => {
            try {
                setLoading(prev => ({
                    ...prev,
                    venueTypes: true,
                    floralServices: true,
                    timePackages: true,
                    datePackages: true
                }));

                // Fetch all data related to this specific venueId
                const [dateData, venueData, floralData] = await Promise.all([
                    fetchWithErrorHandling(`/api/availability/date?venueId=${venueId}`),
                    fetchWithErrorHandling(`/api/venueType?venueId=${venueId}`),
                    fetchWithErrorHandling(`/api/floralServices?venueId=${venueId}`)
                ]);

                setVenueTypes(venueData);
                setFloralServices(floralData);
                setDatePackages(dateData);

                // Time packages will be fetched when a date is selected
                setTimePackages([]);
            } catch (err) {
                console.error(err);
                setError("Failed to load delivery data. Please try again later.");
                setSnackbarOpen(true);
            } finally {
                setLoading({
                    venueTypes: false,
                    floralServices: false,
                    timePackages: false,
                    datePackages: false,
                    confirm: false,
                });
            }
        };

        fetchData();
    }, [venueId]);

    const handleTabChange = (event, newValue) => {
        if (newValue !== value) {
            event.preventDefault();
            return;
        }
    };

    const selectTimePackage = (timePackage) => {
        setBookingData((prev) => ({
            ...prev,
            timePackage,
            venue: null,
            floral: null,
        }));
        setValue(1);
    };

    const selectVenue = (venue) => {
        setBookingData((prev) => ({
            ...prev,
            venue,
            floral: null,
        }));
        setValue(2);
    };

    const selectFloral = (floral) => {
        setBookingData((prev) => ({
            ...prev,
            floral,
        }));
        setValue(3);
    };

    // const handleDateChange = async (newDate) => {
    //     if (!newDate) return;

    //     setSelectedDate(newDate);
    //     setDateError("");

    //     try {
    //         setLoading(prev => ({ ...prev, timePackages: true }));
    //         const dateStr = newDate.toISOString().split('T')[0];

    //         // Fetch available (unbooked) time packages for the selected date and venue
    //         const timeData = await fetchWithErrorHandling(
    //             `/api/timePackages?date=${dateStr}&venueId=${venueId}`
    //         );

    //         if (timeData.length === 0) {
    //             setError("No available time slots for this date");
    //             setSnackbarOpen(true);
    //         }
    //         setTimePackages(timeData);
    //     } catch (err) {
    //         console.error(err);
    //         setError(err.message || "Failed to load time slots");
    //         setSnackbarOpen(true);
    //     } finally {
    //         setLoading(prev => ({ ...prev, timePackages: false }));
    //     }
    // };


    const handleDateChange = async (newDate) => {
        if (!newDate) return;

        setSelectedDate(newDate);
        setDateError("");

        try {
            setLoading((prev) => ({ ...prev, timePackages: true }));
            const dateStr = newDate.toISOString().split("T")[0];

            // Now fetch from the new dynamic route
            const timeData = await fetchWithErrorHandling(
                `/api/timePackages/${venueId}?date=${dateStr}`
            );

            if (timeData.length === 0) {
                setError("No available time slots for this date");
                setSnackbarOpen(true);
            }
            setTimePackages(timeData);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load time slots");
            setSnackbarOpen(true);
        } finally {
            setLoading((prev) => ({ ...prev, timePackages: false }));
        }
    };


    const formatTime = (timeStr) => {
        const time = new Date(timeStr);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleConfirm = () => {
        setError(null);

        if (!bookingData.timePackage || !bookingData.venue || !bookingData.floral) {
            setError("Please complete all selections before confirming.");
            setSnackbarOpen(true);
            return;
        }

        if (!selectedDate) {
            setDateError("⚠️ Please select a booking date before confirming.");
            return;
        }

        setShowPayment(true);
    };

    const handlePaymentSuccess = async (paymentDetails) => {
        setLoading((prev) => ({ ...prev, confirm: true }));

        const userId = session?.user?.id;
        if (!userId) {
            setError("Please log in to confirm booking.");
            setSnackbarOpen(true);
            setShowPayment(false);
            return;
        }

        try {
            const payload = {
                venue_id: Number(venueId),
                venueTypeId: Number(bookingData.venue.id),
                floral_service_id: Number(bookingData.floral.id),
                timePackageId: Number(bookingData.timePackage.id),
                booking_date: selectedDate.toISOString(),
                total_amount: (bookingData.venue.price || 0) + (bookingData.floral.price || 0),
                user_id: Number(userId),
                status: "pending"
            };

            console.log("Booking payload:", payload);

            const res = await fetch("/api/booking-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Booking failed");
            }

            const data = await res.json();
            setSuccessMessage(`Booking confirmed! Your booking ID: ${data.bookingId}`);
            setSuccessDialogOpen(true);
            resetForm();
        } catch (err) {
            console.error("Booking error:", err);
            setError(err.message || "Failed to create booking");
            setSnackbarOpen(true);
        } finally {
            setLoading((prev) => ({ ...prev, confirm: false }));
            setShowPayment(false);
        }
    };

    const resetForm = () => {
        setBookingData({
            timePackage: null,
            venue: null,
            floral: null,
        });
        setSelectedDate(null);
        setValue(0);
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
        router.push("/events");
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Check if date is available
    const isDateAvailable = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return datePackages.some(pkg => pkg.date === dateStr);
    };

    return (
        <Box sx={{ bgcolor: "black", minHeight: "100vh", py: 4 }}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "1200px",
                    margin: "auto",
                    bgcolor: "black",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "white",
                        px: 2,
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="primary"
                        variant="fullWidth"
                        sx={{
                            minHeight: 48,
                            "& .MuiTabs-indicator": {
                                backgroundColor: "orange",
                                height: 3,
                            },
                            "& .MuiTab-root": {
                                minHeight: 48,
                                fontSize: "1rem",
                                textTransform: "none",
                                padding: "12px 16px",
                                color: "black",
                                fontWeight: "normal",
                                cursor: "default",
                                "&.Mui-selected": {
                                    color: "orange",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                },
                                "&:hover": {
                                    color: "darkorange",
                                },
                            },
                        }}
                    >
                        <Tab label="Date & Time" {...a11yProps(0)} />
                        <Tab label="Venue" {...a11yProps(1)} />
                        <Tab label="Service" {...a11yProps(2)} />
                        <Tab label="Receipt" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <Box p={4} sx={{ bgcolor: "white", color: "black", borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Select Date & Time
                        </Typography>
                        <Typography variant="body1" mb={4}>
                            Please select date and time for your booking
                        </Typography>

                        <Box display="flex" gap={4} mt={4}>
                            <Box flex={1}>
                                <Paper elevation={3} sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        <CalendarMonthIcon sx={{ mr: 1 }} />
                                        Select a Date
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            shouldDisableDate={(date) => !isDateAvailable(date)}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <input
                                                        ref={inputRef}
                                                        {...inputProps}
                                                        style={{
                                                            padding: '10px',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '4px',
                                                            width: '100%'
                                                        }}
                                                    />
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                    {dateError && (
                                        <Typography color="error" mt={1}>
                                            {dateError}
                                        </Typography>
                                    )}
                                </Paper>
                            </Box>

                            {selectedDate && (
                                <Box flex={1}>
                                    <Paper elevation={3} sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            <AccessTimeIcon sx={{ mr: 1 }} />
                                            Pick a time for {selectedDate.toLocaleDateString()}
                                        </Typography>

                                        {loading.timePackages ? (
                                            <Box mt={3} textAlign="center">
                                                <CircularProgress />
                                            </Box>
                                        ) : timePackages.length > 0 ? (
                                            <Grid container spacing={2} mt={2}>
                                                {timePackages.map((slot) => (
                                                    <Grid item xs={6} key={slot.id}>
                                                        <Button
                                                            variant={bookingData.timePackage?.id === slot.id ? "contained" : "outlined"}
                                                            fullWidth
                                                            onClick={() => selectTimePackage(slot)}
                                                            sx={{
                                                                backgroundColor: bookingData.timePackage?.id === slot.id ? "orange" : undefined,
                                                                color: bookingData.timePackage?.id === slot.id ? "white" : undefined,
                                                                '&:hover': {
                                                                    backgroundColor: bookingData.timePackage?.id === slot.id ? "darkorange" : undefined,
                                                                }
                                                            }}
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
                    </Box>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    {loading.venueTypes ? (
                        <Box display="flex" justifyContent="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : venueTypes.length === 0 ? (
                        <Typography color="text.secondary" textAlign="center" py={5}>
                            No venue types available for this venue.
                        </Typography>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 3,
                                justifyContent: "center",
                            }}
                        >
                            {venueTypes.map((venue) => (
                                <Box
                                    key={venue.id}
                                    sx={{
                                        width: 270,
                                        bgcolor: "white",
                                        color: "black",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={venue.photo || "/placeholder-image.jpg"}
                                        alt={venue.name}
                                        style={{ width: "100%", height: 160, objectFit: "cover" }}
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.jpg";
                                        }}
                                    />
                                    <Box sx={{ p: 2 }}>
                                        <Typography fontWeight="bold" color="orange">
                                            {venue.name}
                                        </Typography>
                                        <Typography variant="body2" mt={0.5}>
                                            {venue.description}
                                        </Typography>
                                        <Typography variant="body2" mt={0.5}>
                                            Price - {venue.price.toLocaleString()} MMK
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mt: 2,
                                                borderColor: bookingData.venue?.id === venue.id
                                                    ? "orange"
                                                    : "orange",
                                                backgroundColor:
                                                    bookingData.venue?.id === venue.id
                                                        ? "orange"
                                                        : "transparent",
                                                color:
                                                    bookingData.venue?.id === venue.id
                                                        ? "white"
                                                        : "orange",
                                                width: "100%",
                                                borderRadius: "20px",
                                                py: 1,
                                                textTransform: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    borderColor: "darkorange",
                                                    backgroundColor: bookingData.venue?.id === venue.id
                                                        ? "darkorange"
                                                        : "rgba(255, 165, 0, 0.08)",
                                                },
                                            }}
                                            onClick={() => selectVenue(venue)}
                                        >
                                            {bookingData.venue?.id === venue.id
                                                ? "Selected"
                                                : "Select"}
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    {loading.floralServices ? (
                        <Box display="flex" justifyContent="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : floralServices.length === 0 ? (
                        <Typography color="text.secondary" textAlign="center" py={5}>
                            No floral services available for this venue.
                        </Typography>
                    ) : (
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                            {floralServices.map((floral) => (
                                <Box
                                    key={floral.id}
                                    sx={{
                                        width: 270,
                                        bgcolor: "white",
                                        color: "black",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={floral.photo || "/placeholder-image.jpg"}
                                        alt={floral.name}
                                        style={{ width: "100%", height: 160, objectFit: "cover" }}
                                        onError={(e) => {
                                            e.target.src = "/placeholder-image.jpg";
                                        }}
                                    />
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="h6">{floral.name}</Typography>
                                        <Typography>
                                            Price: {floral.price.toLocaleString()} MMK
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mt: 2,
                                                borderColor: bookingData.floral?.id === floral.id
                                                    ? "orange"
                                                    : "orange",
                                                backgroundColor:
                                                    bookingData.floral?.id === floral.id
                                                        ? "orange"
                                                        : "transparent",
                                                color:
                                                    bookingData.floral?.id === floral.id
                                                        ? "white"
                                                        : "orange",
                                                width: "100%",
                                                borderRadius: "20px",
                                                py: 1,
                                                textTransform: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    borderColor: "darkorange",
                                                    backgroundColor: bookingData.floral?.id === floral.id
                                                        ? "darkorange"
                                                        : "rgba(255, 165, 0, 0.08)",
                                                },
                                            }}
                                            onClick={() => selectFloral(floral)}
                                        >
                                            {bookingData.floral?.id === floral.id
                                                ? "Selected"
                                                : "Select"}
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    {!showPayment ? (
                        <Box sx={{ bgcolor: "white", color: "black", p: 4, borderRadius: 2, maxWidth: 500, mx: "auto", boxShadow: 3 }}>
                            <Typography variant="h5" fontWeight="bold" mb={4} sx={{ fontSize: "1.5rem", textAlign: "center" }}>Receipt</Typography>

                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Date & Time</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>Date: {selectedDate ? selectedDate.toLocaleDateString() : "Not selected"}</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>Time: {bookingData.timePackage ? `${formatTime(bookingData.timePackage.startTime)} - ${formatTime(bookingData.timePackage.endTime)}` : "Not selected"}</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Venue</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>{bookingData.venue?.name || "Not selected"}</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>Price: {bookingData.venue?.price?.toLocaleString() || 0} MMK</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Floral Service</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>{bookingData.floral?.name || "Not selected"}</Typography>
                                <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>Price: {bookingData.floral?.price?.toLocaleString() || 0} MMK</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, mb: 4 }}>
                                <Typography variant="h6" fontWeight="bold">Total Price</Typography>
                                <Typography variant="h6" fontWeight="bold">{((bookingData.venue?.price || 0) + (bookingData.floral?.price || 0)).toLocaleString()} MMK</Typography>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 4 }}>
                                <Button
                                    variant="outlined"
                                    sx={{ flex: 1, borderColor: "orange", color: "orange", py: 1.5, "&:hover": { borderColor: "darkorange", backgroundColor: "rgba(255, 165, 0, 0.04)" } }}
                                    onClick={() => setValue(2)}
                                    disabled={loading.confirm}
                                >Back</Button>
                                <Button
                                    variant="contained"
                                    sx={{ flex: 1, backgroundColor: "orange", color: "white", py: 1.5, "&:hover": { backgroundColor: "darkorange" } }}
                                    onClick={handleConfirm}
                                    disabled={loading.confirm}
                                >Confirm & Pay</Button>
                            </Box>
                        </Box>
                    ) : (
                        <FakePayment
                            totalAmount={((bookingData.venue?.price || 0) + (bookingData.floral?.price || 0))}
                            bookingId={bookingData.bookingId}
                            bookingData={bookingData}
                            onSuccess={handlePaymentSuccess}
                            onCancel={() => setShowPayment(false)}
                        />
                    )}
                </CustomTabPanel>

                <Box display="flex" justifyContent="flex-start" p={2}>
                    <Button
                        disabled={value === 0}
                        onClick={() => setValue((v) => v - 1)}
                        color="inherit"
                    >
                        Back
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={error ? "error" : "success"}
                    sx={{ width: '100%' }}
                >
                    {error || successMessage}
                </Alert>
            </Snackbar>

            <Dialog
                open={successDialogOpen}
                onClose={handleCloseSuccessDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Booking Confirmed!</DialogTitle>
                <DialogContent>
                    <Typography>{successMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

