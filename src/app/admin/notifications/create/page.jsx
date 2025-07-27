"use client";

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateNotificationPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/notifications", {
                title: formData.title,
                message: formData.message,
            });

            if (response.status === 201) {
                setSnackbar({
                    open: true,
                    message: "Notification created successfully!",
                    severity: "success",
                });
                setTimeout(() => router.push("/admin/notifications"), 1500);
            }
        } catch (error) {
            console.error("Error creating notification:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.error || "Failed to create notification",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Notification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            name="title"
                            label="Title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                        />

                        <TextField
                            name="message"
                            label="Message"
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors.message}
                            helperText={errors.message}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => router.push("/admin/notifications")}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Create Notification"}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Box>
    );
}