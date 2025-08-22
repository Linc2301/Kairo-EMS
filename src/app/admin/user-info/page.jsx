"use client"

import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Tooltip, TextField, Pagination } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [statusUpdating, setStatusUpdating] = useState({}); // Track which users are being updated
    const rowsPerPage = 5;

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setPage(1); // Reset to first page when searching

        if (term === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(term)
            );
            setFilteredUsers(filtered);
        }
    };

    const handleDelete = async (id, isActive, isAdmin) => {
        if (isActive) {
            alert("Cannot delete active users. Please deactivate first.");
            return;
        }
        if (isAdmin) {
            alert("Cannot delete admin users.");
            return;
        }

        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
            setFilteredUsers(prev => prev.filter(user => user.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete user");
        }
    };

    // New function to handle status toggle
    const handleStatusToggle = async (userId, currentStatus) => {
        const isAdmin = users.find(u => u.id === userId)?.isAdmin === 'admin';

        if (isAdmin) {
            alert("Cannot change status of admin users.");
            return;
        }

        setStatusUpdating(prev => ({ ...prev, [userId]: true }));

        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

            const response = await axios.patch(`/api/users/${userId}`, {
                status: newStatus
            });

            if (response.data) {
                // Update both users and filteredUsers arrays
                const updateUserStatus = (userList) =>
                    userList.map(user =>
                        user.id === userId
                            ? { ...user, status: newStatus }
                            : user
                    );

                setUsers(updateUserStatus);
                setFilteredUsers(updateUserStatus);
            }
        } catch (error) {
            console.error("Status update error:", error);
            alert("Failed to update user status");
        } finally {
            setStatusUpdating(prev => ({ ...prev, [userId]: false }));
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => { fetchUsers(); }, []);

    // Calculate paginated users
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>User Management</Typography>
                <TextField
                    size="small"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: 300 }}
                />
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "primary.main" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    {searchTerm ? "No matching users found" : "No users available"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedUsers.map((user) => {
                                const isActive = user.status === 'active';
                                const isAdmin = user.isAdmin === 'admin';
                                const cannotDelete = isActive || isAdmin;
                                const isUpdating = statusUpdating[user.id];

                                const tooltipMessage = isActive
                                    ? "Cannot delete active users. Deactivate first."
                                    : isAdmin
                                        ? "Cannot delete admin users."
                                        : "";

                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email || 'N/A'}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            {isActive ? (
                                                <Chip
                                                    icon={<CheckCircleIcon sx={{ color: 'white' }} />}
                                                    label="Active"
                                                    color="success"
                                                    variant="contained"
                                                    sx={{
                                                        '& .MuiChip-label': { color: 'white' }
                                                    }}
                                                />
                                            ) : (
                                                <Chip
                                                    icon={<CancelIcon sx={{ color: 'white' }} />}
                                                    label="Inactive"
                                                    color="error"
                                                    variant="contained"
                                                    sx={{
                                                        '& .MuiChip-label': { color: 'white' }
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.isAdmin}
                                                color={isAdmin ? 'warning' : 'primary'}
                                                variant="outlined"
                                                sx={{
                                                    borderWidth: 2,
                                                    backgroundColor: isAdmin ? 'rgba(255, 152, 0, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                                                    '& .MuiChip-label': {
                                                        color: isAdmin ? 'rgb(255, 152, 0)' : 'rgb(25, 118, 210)'
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {/* View Button */}
                                            <Link href={`/admin/user-info/${user.id}`} passHref>
                                                <IconButton color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Link>

                                            {/* Status Toggle Button */}
                                            {isAdmin ? (
                                                <Tooltip title="Cannot change status of admin users">
                                                    <span>
                                                        <IconButton disabled>
                                                            {isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title={`${isActive ? 'Deactivate' : 'Activate'} user`}>
                                                    <IconButton
                                                        color={isActive ? 'success' : 'warning'}
                                                        onClick={() => handleStatusToggle(user.id, user.status)}
                                                        disabled={isUpdating}
                                                    >
                                                        {isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                            {/* Delete Button */}
                                            {cannotDelete ? (
                                                <Tooltip title={tooltipMessage}>
                                                    <span>
                                                        <IconButton
                                                            color="error"
                                                            disabled
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(user.id, isActive, isAdmin)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            {filteredUsers.length > rowsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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