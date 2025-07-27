// "use client";

// import {
//     Box,
//     Button,
//     IconButton,
//     Paper,
//     Stack,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
// } from "@mui/material";
// import Link from "next/link";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function BookingList() {
//     const [bookings, setBookings] = useState([]);

//     const fetchBookings = async () => {
//         try {
//             const response = await axios.get("/api/booking-info");
//             setBookings(response.data);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmed = window.confirm("Are you sure you want to delete this booking?");
//         if (!confirmed) return;

//         try {
//             await axios.delete(`/api/booking-info/${id}`);
//             setBookings((prev) => prev.filter((booking) => booking.id !== id));
//             alert("Booking deleted successfully!");
//         } catch (error) {
//             console.error("Failed to delete booking:", error);
//             alert("Something went wrong while deleting.");
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     return (
//         <Box sx={{ p: 3 }}>
//             <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h4">Bookings</Typography>

//             </Stack>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="center">No</TableCell>
//                             <TableCell align="center">User</TableCell>
//                             <TableCell align="center">Venue</TableCell>
//                             <TableCell align="center">Venue Type</TableCell>
//                             <TableCell align="center">Floral Service</TableCell>
//                             <TableCell align="center">Date</TableCell>
//                             <TableCell align="center">Total Amount</TableCell>
//                             <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {bookings.map((booking, index) => (
//                             <TableRow key={booking.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{booking.user?.name || "N/A"}</TableCell>
//                                 <TableCell align="center">{booking.venue?.name || "N/A"}</TableCell>
//                                 <TableCell align="center">{booking.VenueType?.name || "N/A"}</TableCell>
//                                 <TableCell align="center">{booking.floralService?.name || "N/A"}</TableCell>
//                                 <TableCell align="center">{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
//                                 <TableCell align="center">{booking.total_amount}MMK</TableCell>
//                                 <TableCell align="center">

//                                     <IconButton sx={{ color: "red" }} onClick={() => handleDelete(booking.id)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// }



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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("/api/booking-info");
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("Failed to load bookings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/booking-info/${id}`);
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
        } catch (error) {
            console.error("Failed to delete booking:", error);
            alert("Failed to delete booking. Please try again.");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Bookings</Typography>
            </Stack>

            {bookings.length === 0 ? (
                <Typography>No bookings found</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">User</TableCell>
                                <TableCell align="center">Venue</TableCell>
                                <TableCell align="center">Venue Type</TableCell>
                                <TableCell align="center">Floral Service</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Total Amount</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{booking.user?.name || "N/A"}</TableCell>
                                    <TableCell align="center">{booking.venue?.name || "N/A"}</TableCell>
                                    <TableCell align="center">{booking.VenueType?.name || "N/A"}</TableCell>
                                    <TableCell align="center">{booking.floralService?.name || "N/A"}</TableCell>
                                    <TableCell align="center">
                                        {new Date(booking.booking_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">{booking.total_amount} MMK</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            sx={{ color: "red" }}
                                            onClick={() => handleDelete(booking.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}