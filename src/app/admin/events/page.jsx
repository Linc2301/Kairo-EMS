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
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
    const [events, setEvents] = useState([]);

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

    useEffect(() => {
        getEventList();
    }, []);

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
                        {events.map((event, index) => (
                            <TableRow key={event.id}>
                                <TableCell align="center">{index + 1}</TableCell>
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
        </Box>
    );
}
