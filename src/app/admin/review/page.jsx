"use client";

import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Alert,
    TextField,
    InputAdornment,
} from "@mui/material";
import Link from 'next/link';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useEffect, useState } from "react";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchRating, setSearchRating] = useState("");

    // Only allow numeric input
    const handleRatingChange = (e) => {
        const value = e.target.value;
        // Only set state if the input is a number or empty string
        if (/^\d*$/.test(value)) {
            setSearchRating(value);
        }
    };

    // Fetch reviews
    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/review");
            setReviews(response.data);
            setFilteredReviews(response.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    };

    // Delete review
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this review?"
        );
        if (!confirmed) return;

        try {
            await axios.delete(`/api/review/${id}`);
            setReviews((prev) => prev.filter((review) => review.id !== id));
            setFilteredReviews((prev) => prev.filter((review) => review.id !== id));
            alert("Review deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete review.");
        }
    };

    // Filter reviews by rating
    useEffect(() => {
        if (searchRating === "") {
            setFilteredReviews(reviews);
        } else {
            const filtered = reviews.filter(review =>
                review.rating.toString().includes(searchRating)
            );
            setFilteredReviews(filtered);
        }
    }, [searchRating, reviews]);

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Reviews
                </Typography>

                <TextField
                    placeholder="Search by rating..."
                    variant="outlined"
                    size="small"
                    value={searchRating}
                    onChange={handleRatingChange}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 250 }}
                />
            </Box>

            {filteredReviews.length === 0 ? (
                <Alert severity="info">No reviews available.</Alert>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "primary.main" }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    No
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    User
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    Event
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    Rating
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    Date
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    Description
                                </TableCell>
                                <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredReviews.map((review, index) => (
                                <TableRow
                                    key={review.id}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                                    }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">
                                        <strong>{review.user?.name || "N/A"}</strong>
                                        <br />
                                        <small>{review.user?.email || ""}</small>
                                    </TableCell>
                                    <TableCell align="center">
                                        {review.Booking?.venue?.Event?.name || "N/A"}
                                    </TableCell>
                                    <TableCell align="center">{review.rating}</TableCell>
                                    <TableCell align="center">
                                        {new Date(review.review_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center" sx={{ maxWidth: 250, whiteSpace: "normal" }}>
                                        {review.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link href={`/admin/review/${review.id}`} passHref>
                                            <IconButton color="primary">
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            sx={{ color: "red" }}
                                            onClick={() => handleDelete(review.id)}
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