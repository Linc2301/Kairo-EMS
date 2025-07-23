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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/review");
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/review/${id}`);
            setReviews((prev) => prev.filter((review) => review.id !== id));
            alert("Review deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete review.");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Reviews
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Venue</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((review, index) => (
                            <TableRow key={review.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                    {review.user?.name || "N/A"}<br />
                                    <small>{review.user?.email}</small>
                                </TableCell>
                                <TableCell align="center">{review.Venue?.name || "N/A"}</TableCell>
                                <TableCell align="center">{review.rating}</TableCell>
                                <TableCell align="center">
                                    {new Date(review.review_date).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center">{review.description}</TableCell>
                                <TableCell align="center">
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
        </Box>
    );
}
