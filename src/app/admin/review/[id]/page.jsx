"use client";

import React, { useEffect, useState, use } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Paper,
    Divider,
    Stack
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ReviewDetailPage({ params }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/api/review/${id}`);
                setReview(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch review details");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchReview();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error || !review) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    width: "100%",
                    p: 4
                }}
            >
                <Alert severity="error" sx={{ width: "100%", maxWidth: 600, mb: 3 }}>
                    {error || "Review not found"}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push("/admin/review")}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1.5
                    }}
                >
                    Return to Reviews
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1000,
                mx: "auto",
                p: 4
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    backgroundColor: "background.paper"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <StarIcon fontSize="large" color="primary" />
                    Review Details
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Stack spacing={3} sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            label="User"
                            value={review.user?.name || "N/A"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <PersonIcon sx={{ color: "text.secondary", mb: -1, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: "rgba(0,0,0,0.03)"
                                }
                            }}
                            variant="filled"
                        />
                        <TextField
                            label="Event"
                            value={review.Booking?.venue?.Event?.name || "N/A"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <EventIcon sx={{ color: "text.secondary", mb: -1.5, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: "rgba(0,0,0,0.03)"
                                }
                            }}
                            variant="filled"
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            label="Rating"
                            value={review.rating || "N/A"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <StarIcon sx={{ color: "text.secondary", mb: -1, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: "rgba(0,0,0,0.03)"
                                }
                            }}
                            variant="filled"
                        />
                        <TextField
                            label="Date"
                            value={
                                review.review_date
                                    ? new Date(review.review_date).toLocaleDateString()
                                    : "N/A"
                            }
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <EventIcon sx={{ color: "text.secondary", mb: -1.5, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: "rgba(0,0,0,0.03)"
                                }
                            }}
                            variant="filled"
                        />
                    </Box>

                    <TextField
                        label="Description"
                        value={review.description || "No description provided"}
                        fullWidth
                        multiline
                        rows={6}
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <DescriptionIcon
                                    sx={{
                                        color: "text.secondary",
                                        mr: 2,
                                        mt: 0.5
                                    }}
                                />
                            ),
                            sx: {
                                fontWeight: 500,
                                backgroundColor: "rgba(0,0,0,0.03)",
                                alignItems: "flex-start",
                                p: 2.5
                            }
                        }}
                        variant="filled"
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => router.push("/admin/review")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
