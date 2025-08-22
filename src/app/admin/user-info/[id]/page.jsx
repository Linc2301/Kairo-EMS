"use client";

import {
    Box,
    Card,
    Typography,
    Grid,
    Avatar,
    Chip,
    IconButton,
    Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserProfilePage({ params }) {
    // Unwrap the params promise
    const unwrappedParams = use(params);
    const userId = unwrappedParams.id;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <Typography sx={{ p: 3 }}>Loading user data...</Typography>;
    if (error) return <Typography color="error" sx={{ p: 3 }}>{error}</Typography>;
    if (!user) return <Typography sx={{ p: 3 }}>User not found</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/admin/user-info')}
                sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
            >
                Back
            </Button>

            <Card
                sx={{
                    p: 5,
                    borderRadius: 4,
                    maxWidth: 800,
                    mx: 'auto',
                    boxShadow: 6,
                    background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        textAlign: "center",
                        color: "primary.main"
                    }}
                    gutterBottom
                >
                    User Profile
                </Typography>

                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4} textAlign="center">
                        <Avatar
                            alt={user.name}
                            src={user.photo || "/default-avatar.png"}
                            sx={{
                                width: 150,
                                height: 150,
                                mx: "auto",
                                fontSize: '3rem',
                                bgcolor: 'primary.main',
                                boxShadow: 3
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box display="flex" flexDirection="column" gap={2.5}>
                            <Typography variant="h6">
                                <strong>Name:</strong> {user.name || "Not available"}
                            </Typography>

                            <Typography variant="h6">
                                <strong>Email:</strong> {user.email || "Not available"}
                            </Typography>

                            <Typography variant="h6">
                                <strong>Phone:</strong> {user.phone || "Not available"}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6" component="span">
                                    <strong>Status:</strong>
                                </Typography>
                                <Chip
                                    label={user.status === 'active' ? 'Active' : 'Inactive'}
                                    color={user.status === 'active' ? 'success' : 'error'}
                                    size="medium"
                                    sx={{
                                        fontWeight: 'bold',
                                        px: 1,
                                        '& .MuiChip-label': { color: 'white' }
                                    }}
                                />
                            </Box>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6" component="span">
                                    <strong>Role:</strong>
                                </Typography>
                                <Chip
                                    label={user.isAdmin === 'admin' ? 'Admin' : 'User'}
                                    color={user.isAdmin === 'admin' ? 'warning' : 'primary'}
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        fontWeight: 'bold',
                                        px: 1,
                                        borderWidth: 2,
                                        backgroundColor: user.isAdmin === 'admin'
                                            ? 'rgba(255, 152, 0, 0.1)'
                                            : 'rgba(25, 118, 210, 0.1)',
                                        '& .MuiChip-label': {
                                            color: user.isAdmin === 'admin'
                                                ? 'rgb(255, 152, 0)'
                                                : 'rgb(25, 118, 210)'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}
