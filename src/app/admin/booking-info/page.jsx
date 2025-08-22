"use client";

import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Pagination,
    Chip,
    Tooltip,
    TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentIcon from "@mui/icons-material/Payment";
import PendingIcon from "@mui/icons-material/Pending";

import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const rowsPerPage = 5;

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("/api/booking-info");
            setBookings(response.data);
            setFilteredBookings(response.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load bookings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSearch = (e) => {
        const rawValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
        setSearchTerm(rawValue);
        setPage(1);

        if (!rawValue) {
            setFilteredBookings(bookings);
            return;
        }

        const term = rawValue.toLowerCase();
        const filtered = bookings.filter((b) =>
            b.bookingId?.toLowerCase().includes(term) ||
            b.user?.name?.toLowerCase().includes(term) ||
            b.venue?.name?.toLowerCase().includes(term) ||
            b.status?.toLowerCase().includes(term) ||
            b.venue?.Event?.name?.toLowerCase().includes(term)
        );
        setFilteredBookings(filtered);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this booking?"
        );
        if (!confirmed) return;

        try {
            await axios.delete(`/api/booking-info/${id}`);
            setBookings((prev) => prev.filter((b) => b.id !== id));
            setFilteredBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error("Failed to delete booking:", err);
            alert("Failed to delete booking. Please try again.");
        }
    };

    const handleConfirmBooking = async (id) => {
        try {
            await axios.patch(`/api/booking-info/${id}`, { status: "confirmed" });
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
            );
            setFilteredBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
            );
        } catch (err) {
            console.error("Failed to confirm booking:", err);
            alert("Failed to confirm booking. Please try again.");
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const getStatusChip = (status) => {
        switch (status) {
            case "confirmed":
                return (
                    <Chip
                        icon={<CheckCircleIcon sx={{ color: "white" }} />}
                        label="Confirmed"
                        color="success"
                        variant="contained"
                        sx={{ "& .MuiChip-label": { color: "white" } }}
                    />
                );
            case "cancelled":
                return (
                    <Chip
                        icon={<CancelIcon sx={{ color: "white" }} />}
                        label="Cancelled"
                        color="error"
                        variant="contained"
                        sx={{ "& .MuiChip-label": { color: "white" } }}
                    />
                );
            default:
                return (
                    <Chip
                        icon={<PendingIcon sx={{ color: "white" }} />}
                        label="Pending"
                        color="warning"
                        variant="contained"
                        sx={{ "& .MuiChip-label": { color: "white" } }}
                    />
                );
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
                <Button onClick={fetchBookings} variant="contained" sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, pb: 10 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h4">Bookings</Typography>
                <TextField
                    size="small"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: 300 }}
                />
            </Stack>

            {filteredBookings.length === 0 ? (
                <Typography>
                    {searchTerm ? "No matching bookings found" : "No bookings available"}
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.main" }}>
                            <TableRow>
                                {[
                                    "No",
                                    "Booking ID",
                                    "User",
                                    "Venue",
                                    "Event Name", // ✅ Added Event Name column
                                    "Date",
                                    "Amount",
                                    "Status",
                                    "Actions",
                                ].map((header) => (
                                    <TableCell
                                        key={header}
                                        align="center"
                                        sx={{ color: "white", fontWeight: 600 }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedBookings.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell align="center">
                                        {(page - 1) * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center">{booking.bookingId}</TableCell>
                                    <TableCell align="center">
                                        <strong>{booking.user?.name || "N/A"}</strong>
                                        <br />
                                        <small>{booking.user?.email || ""}</small>
                                    </TableCell>
                                    <TableCell align="center">{booking.venue?.name || "N/A"}</TableCell>
                                    {/* ✅ Display Event Name from Venue relation */}
                                    <TableCell align="center">
                                        {booking.venue?.Event?.name || "N/A"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(booking.booking_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">{booking.total_amount} MMK</TableCell>
                                    <TableCell align="center">{getStatusChip(booking.status)}</TableCell>

                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            {booking.status === "pending" && (
                                                <Tooltip title="Confirm Booking">
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => handleConfirmBooking(booking.id)}
                                                    >
                                                        <CheckCircleIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {/* ✅ Fixed: Only show delete button for pending bookings */}
                                            {booking.status === "confirmed" && (
                                                <Tooltip title="Delete Booking">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(booking.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {filteredBookings.length > rowsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Box>
    );
}