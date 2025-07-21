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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const { id: eventId } = useParams();
    const router = useRouter();

    const [value, setValue] = useState(0);
    const [venueTypes, setVenueTypes] = useState([]);
    const [floralServices, setFloralServices] = useState([]);
    const [timePackages, setTimePackages] = useState([]);
    const [bookingData, setBookingData] = useState({
        venue: null,
        floral: null,
        timePackage: null,
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const [loading, setLoading] = useState({
        venueTypes: true,
        floralServices: true,
        timePackages: true,
        confirm: false,
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    useEffect(() => {
        if (!eventId) return;

        const fetchData = async () => {
            try {
                const [venueRes, floralRes, timeRes] = await Promise.all([
                    fetch(`/api/venueType?venueId=${eventId}`),
                    fetch(`/api/floralServices?venueId=${eventId}`),
                    fetch(`/api/timePackages?venueId=${eventId}`),
                ]);

                if (!venueRes.ok || !floralRes.ok || !timeRes.ok) {
                    throw new Error("Failed to fetch some data");
                }

                const [venueData, floralData, timeData] = await Promise.all([
                    venueRes.json(),
                    floralRes.json(),
                    timeRes.json(),
                ]);

                setVenueTypes(venueData);
                setFloralServices(floralData);
                setTimePackages(timeData);
            } catch (err) {
                console.error(err);
                setError("Failed to load delivery data.");
            } finally {
                setLoading({
                    venueTypes: false,
                    floralServices: false,
                    timePackages: false,
                    confirm: false,
                });
            }
        };

        fetchData();
    }, [eventId]);

    const handleTabChange = (event, newValue) => {
        if (newValue !== value) {
            event.preventDefault();
            return;
        }
    };

    const selectVenue = (venue) => {
        setBookingData((prev) => ({
            ...prev,
            venue,
            floral: null,
            timePackage: null,
        }));
        setValue(1);
    };

    const selectFloral = (floral) => {
        setBookingData((prev) => ({
            ...prev,
            floral,
            timePackage: null,
        }));
        setValue(2);
    };

    const selectTimePackage = (timePackage) => {
        setBookingData((prev) => ({
            ...prev,
            timePackage,
        }));
        setValue(3);
    };

    const handleConfirm = async () => {
        setError(null);

        if (!bookingData.venue || !bookingData.floral || !bookingData.timePackage) {
            alert("Please complete all selections before confirming.");
            return;
        }

        if (!selectedDate) {
            setDateError("⚠️ Please select a booking date before confirming.");
            return;
        } else {
            setDateError("");
        }

        const payload = {
            venue_id: bookingData.venue.venue_id || bookingData.venue.id,
            venueTypeId: bookingData.venue.id,
            floral_service_id: bookingData.floral.id,
            timePackageId: bookingData.timePackage.id,
            user_id: 1,
            booking_date: selectedDate.toISOString(),
            total_amount:
                (bookingData.venue.price || 0) + (bookingData.floral.price || 0),
        };

        setLoading((prev) => ({ ...prev, confirm: true }));

        try {
            const res = await fetch("/api/booking-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errBody = await res.json();
                setError(errBody.error || errBody.message || "Booking failed");
                alert("Booking failed: " + (errBody.error || errBody.message));
                return;
            }

            const data = await res.json();
            setSuccessMessage("Booking confirmed!");
            setSuccessDialogOpen(true);
            setBookingData({ venue: null, floral: null, timePackage: null });
            setValue(0);
        } catch (err) {
            setError(err.message);
            alert("Booking error: " + err.message);
        } finally {
            setLoading((prev) => ({ ...prev, confirm: false }));
        }
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
                                color: "black", // Make all tabs black
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
                        <Tab label="Venue" {...a11yProps(0)} />
                        <Tab label="Floral Service" {...a11yProps(1)} />
                        <Tab label="Date & Time" {...a11yProps(2)} />
                        <Tab label="Receipt" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                {/* Venue selection */}
                <CustomTabPanel value={value} index={0}>
                    {loading.venueTypes ? (
                        <Box display="flex" justifyContent="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
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
                                        src={venue.photo || undefined}
                                        alt={venue.name}
                                        style={{ width: "100%", height: 160, objectFit: "cover" }}
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
                                                borderColor: "orange",
                                                color: "orange",
                                                width: "100%",
                                                borderRadius: "20px",
                                                py: 1,
                                                textTransform: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    borderColor: "darkorange",
                                                    backgroundColor: "rgba(255, 165, 0, 0.08)",
                                                },
                                            }}
                                            onClick={() => selectVenue(venue)}
                                        >
                                            Select
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CustomTabPanel>

                {/* Floral service selection */}
                <CustomTabPanel value={value} index={1}>
                    {loading.floralServices ? (
                        <Box display="flex" justifyContent="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
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
                                        src={floral.photo || undefined}
                                        alt={floral.name}
                                        style={{ width: "100%", height: 160, objectFit: "cover" }}
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
                                                borderColor: "orange",
                                                color: "orange",
                                                width: "100%",
                                                borderRadius: "20px",
                                                py: 1,
                                                textTransform: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    borderColor: "darkorange",
                                                    backgroundColor: "rgba(255, 165, 0, 0.08)",
                                                },
                                            }}
                                            onClick={() => selectFloral(floral)}
                                        >
                                            Select
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CustomTabPanel>

                {/* Time package selection */}
                <CustomTabPanel value={value} index={2}>
                    {loading.timePackages ? (
                        <Box display="flex" justifyContent="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                            {timePackages.map((tp) => (
                                <Box
                                    key={tp.id}
                                    sx={{
                                        width: 270,
                                        bgcolor: "white",
                                        color: "black",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Typography>
                                            {tp.venueName}: {tp.startTime} - {tp.endTime}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mt: 2,
                                                borderColor: "orange",
                                                color: "orange",
                                                width: "100%",
                                                borderRadius: "20px",
                                                py: 1,
                                                textTransform: "none",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    borderColor: "darkorange",
                                                    backgroundColor: "rgba(255, 165, 0, 0.08)",
                                                },
                                            }}
                                            onClick={() => selectTimePackage(tp)}
                                        >
                                            Select
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CustomTabPanel>

                {/* Receipt */}
                <CustomTabPanel value={value} index={3}>
                    <Box
                        sx={{
                            bgcolor: "white",
                            color: "black",
                            p: 4,
                            borderRadius: 2,
                            maxWidth: 500,
                            mx: "auto",
                            boxShadow: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mb={4}
                            sx={{
                                fontSize: "1.5rem",
                                textAlign: "center",
                            }}
                        >
                            Receipt
                        </Typography>

                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                Venue
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                                {bookingData.venue?.name || "Not selected"}
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                                Price: {bookingData.venue?.price?.toLocaleString() || 0} MMK
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                Floral Service
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                                {bookingData.floral?.name || "Not selected"}
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                                Price: {bookingData.floral?.price?.toLocaleString() || 0} MMK
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                Date & Time
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select Booking Date"
                                    value={selectedDate}
                                    onChange={(newDate) => setSelectedDate(newDate)}
                                    shouldDisableDate={(date) => {
                                        const today = new Date();
                                        return (
                                            date.getDate() === today.getDate() &&
                                            date.getMonth() === today.getMonth() &&
                                            date.getFullYear() === today.getFullYear()
                                        );
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                            sx: { mb: 1 },
                                        },
                                    }}
                                />
                            </LocalizationProvider>

                            {dateError && (
                                <Typography color="error" sx={{ mb: 1 }}>
                                    {dateError}
                                </Typography>
                            )}

                            <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                                {bookingData.timePackage
                                    ? `${bookingData.timePackage.venueName}: ${bookingData.timePackage.startTime} - ${bookingData.timePackage.endTime}`
                                    : "Not selected"}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 3,
                                mb: 4,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Total Price
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {(
                                    (bookingData.venue?.price || 0) +
                                    (bookingData.floral?.price || 0)
                                ).toLocaleString()}{" "}
                                MMK
                            </Typography>
                        </Box>

                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                mt: 4,
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    borderColor: "orange",
                                    color: "orange",
                                    py: 1.5,
                                    "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255, 165, 0, 0.04)",
                                    },
                                }}
                                onClick={() => setValue(0)}
                                disabled={loading.confirm}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    flex: 1,
                                    backgroundColor: "orange",
                                    color: "white",
                                    py: 1.5,
                                    "&:hover": {
                                        backgroundColor: "darkorange",
                                    },
                                }}
                                onClick={handleConfirm}
                                disabled={loading.confirm}
                            >
                                {loading.confirm ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Confirm"
                                )}
                            </Button>
                        </Box>
                    </Box>
                </CustomTabPanel>
                <Dialog
                    open={successDialogOpen}
                    onClose={() => setSuccessDialogOpen(false)}
                >
                    <DialogTitle sx={{ color: "green", fontWeight: "bold" }}>
                        Booking Success
                    </DialogTitle>
                    <DialogContent>
                        <Typography>{successMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setSuccessDialogOpen(false);
                                router.push("/events"); // change path
                            }}
                            autoFocus
                            sx={{
                                color: "white",
                                backgroundColor: "orange",
                                "&:hover": { backgroundColor: "darkorange" },
                            }}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Only Back button */}
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
        </Box>

    );
}
