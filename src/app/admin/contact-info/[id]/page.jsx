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
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactDetailPage({ params }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`/api/contact/${id}`);
                setContact(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch contact details");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchContact();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error || !contact) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                width: '100%',
                p: 4
            }}>
                <Alert severity="error" sx={{ width: '100%', maxWidth: 600, mb: 3 }}>
                    {error || "Contact not found"}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push("/admin/contact-info")}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1.5
                    }}
                >
                    Return to Contacts
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            p: 4
        }}>


            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backgroundColor: 'background.paper'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <PersonIcon fontSize="large" color="primary" />
                    Contact Details
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Stack spacing={3} sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <TextField
                            label="Name"
                            value={contact.name || "Not available"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <PersonIcon sx={{ color: 'text.secondary', mb: -1, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: 'rgba(0,0,0,0.03)'
                                }
                            }}
                            variant="filled"
                        />
                        <TextField
                            label="Email"
                            value={contact.email || "Not available"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <EmailIcon sx={{ color: 'text.secondary', mb: -1, mr: 2 }} />
                                ),
                                sx: {
                                    fontWeight: 500,
                                    backgroundColor: 'rgba(0,0,0,0.03)'
                                }
                            }}
                            variant="filled"
                        />
                    </Box>

                    <TextField
                        label="Subject"
                        value={contact.subject || "Not available"}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <SubjectIcon sx={{ color: 'text.secondary', mb: -1, mr: 2 }} />
                            ),
                            sx: {
                                fontWeight: 500,
                                backgroundColor: 'rgba(0,0,0,0.03)'
                            }
                        }}
                        variant="filled"
                    />

                    <TextField
                        label="Message"
                        value={contact.message || "No message provided"}
                        fullWidth
                        multiline
                        rows={6}
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <MessageIcon sx={{
                                    color: 'text.secondary',
                                    mr: 2,
                                    mt: 0.5
                                }} />
                            ),
                            sx: {
                                fontWeight: 500,
                                backgroundColor: 'rgba(0,0,0,0.03)',
                                alignItems: 'flex-start',
                                p: 2
                            }
                        }}
                        variant="filled"
                    />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => router.push("/admin/contact-info")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
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