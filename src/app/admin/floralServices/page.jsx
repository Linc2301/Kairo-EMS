
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
    CircularProgress,
    Typography,
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const response = await axios.get("/api/floralServices");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/floralServices/${id}`);
            setServices(prev => prev.filter(service => service.id !== id));
            alert("Service deleted successfully.");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">Floral Services</Typography>
                <Link href="/admin/floralServices/create" passHref>
                    <Button sx={{ mb: 2 }} variant="contained">
                        Add New Floral Service
                    </Button>
                </Link>
            </Stack>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Photo</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Venue</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No floral services found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                services.map((service, index) => (
                                    <TableRow key={service.id}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{service.name}</TableCell>
                                        <TableCell align="center">
                                            {service.photo ? (
                                                <img
                                                    src={service.photo}
                                                    alt="floral"
                                                    style={{
                                                        width: 80,
                                                        height: 60,
                                                        objectFit: "cover",
                                                        borderRadius: 4,
                                                    }}
                                                />
                                            ) : "No Photo"}
                                        </TableCell>
                                        <TableCell align="center">{service.description}</TableCell>
                                        <TableCell align="center">{service.price}</TableCell>
                                        <TableCell align="center">{service.venueName}</TableCell>
                                        <TableCell align="center">
                                            <Link href={`/admin/floralServices/${service.id}/edit`} passHref>
                                                <IconButton sx={{ color: "blue" }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton sx={{ color: "red" }} onClick={() => handleDelete(service.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
