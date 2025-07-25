"use client";

import {
    Box,
    Button,
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
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const getEventList = async () => {
        try {
            const response = await axios.get("/api/events");
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    console.log("events", events);
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this event?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/events/${id}`);
            setEvents((prev) => prev.filter((event) => event.id !== id));
            alert("Event deleted successfully!");
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Something went wrong while deleting.");
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getEventList();
    }, []);

    // Calculate which events to show on the current page
    const paginatedEvents = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(events.length / rowsPerPage);

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Events</Typography>
                <Link passHref href="/admin/events/create">
                    <Button sx={{ mb: 2 }} variant="contained">
                        ADD Events
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Photo</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedEvents.map((event, index) => (
                            <TableRow key={event.id}>
                                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="center">{event.name}</TableCell>
                                <TableCell align="center">{event.description}</TableCell>
                                <TableCell align="center">
                                    {event.photo ? (
                                        <img
                                            src={event.photo}
                                            alt="event"
                                            style={{
                                                width: 80,
                                                height: 60,
                                                objectFit: "cover",
                                                borderRadius: 4,
                                            }}
                                        />
                                    ) : (
                                        "No Photo"
                                    )}
                                </TableCell>
                                <TableCell align="center">

                                    <Link passHref href={`/admin/events/${event.id}/edit`}>
                                        <IconButton sx={{ color: "blue" }}>
                                            <EditIcon />
                                        </IconButton>

                                    </Link>
                                    <IconButton sx={{ color: "red" }} onClick={() => handleDelete(event.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Control */}
            {events.length > rowsPerPage && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'white', // Optional: match page background
                        py: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)', // optional: subtle shadow
                    }}
                >
                    <Pagination
                        sx={{ ml: 16 }}
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}

        </Box>
    );
}
