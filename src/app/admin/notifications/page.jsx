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
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NotificationList() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("/api/notifications");
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError("Failed to load notifications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this notification?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/notifications/${id}`);
            setNotifications(prev => prev.filter(notification => notification.id !== id));
        } catch (error) {
            console.error("Failed to delete notification:", error);
            alert("Failed to delete notification. Please try again.");
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
                <Button onClick={fetchNotifications} variant="contained" sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Notifications</Typography>
                <Link passHref href="/admin/notifications/create">
                    <Button variant="contained">
                        Create Notification
                    </Button>
                </Link>
            </Stack>

            {notifications.length === 0 ? (
                <Typography>No notifications found</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Message</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notifications.map((notification, index) => (
                                <TableRow key={notification.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{notification.title}</TableCell>
                                    <TableCell align="center" sx={{ maxWidth: 300 }}>
                                        <Typography
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {notification.message}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            href={`/admin/notifications/edit/${notification.id}`}
                                        >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: "red" }}
                                            onClick={() => handleDelete(notification.id)}
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