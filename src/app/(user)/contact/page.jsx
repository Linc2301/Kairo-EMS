'use client';

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useEffect } from "react";
import axios from "axios";

import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function ContactPage() {

    const {
        handleSubmit,
        register,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 2000); // 2000ms = 2 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or errors change
        }
    }, [errors, clearErrors]);

    const onSubmit = async (formData) => {
        try {
            console.log("formData", formData);
            const bodyData = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            };
            const response = await axios.post("http://localhost:3000/api/contact", bodyData);
            reset();
            console.log("Successfully Saved.");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Box px={10} py={2}>
            <Typography variant="h4" fontWeight="bold" mb={4} sx={{ textAlign: "center" }}>
                Contact Us
            </Typography>

            <Grid container spacing={4} >
                {/* Contact Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid item md={6}>
                        <Paper elevation={6} sx={{ p: 3, borderRadius: 2 }}>
                            <Stack spacing={3}>
                                <TextField label="Name"
                                    variant="outlined"
                                    fullWidth
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message || " "}
                                />
                                <TextField label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    {...register("email")}
                                    error={!!errors.email}
                                    helperText={errors.email?.message || " "}
                                />
                                <TextField label="Subject"
                                    variant="outlined"
                                    fullWidth
                                    {...register("subject")}
                                    error={!!errors.subject}
                                    helperText={errors.subject?.message || " "}
                                />
                                <TextField label="Message"
                                    variant="outlined"
                                    fullWidth
                                    multiline rows={4}
                                    {...register("message")}
                                    error={!!errors.message}
                                    helperText={errors.message?.message || " "}
                                />
                                <Button variant="contained" color="primary" size="large" type='submit'>
                                    Send Message
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Box>
                {/* Contact Info */}
                <Grid item md={6} mt={8}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                            Get in touch with us
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Whether you have a question, a suggestion, or just want to say hello,
                            feel free to reach out. Our team is always ready to assist you<br /> and will response as soon as possible.
                        </Typography>

                        {/* Four contact blocks in a flex row */}
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            gap={3}
                        >
                            {/* Email */}
                            <Box
                                mt={2}
                                flex="1 1 200px"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                            >
                                <Box
                                    bgcolor="primary.main"
                                    color="white"
                                    width={64}
                                    height={64}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="50%"
                                    mb={3}
                                >
                                    <MarkEmailUnreadIcon fontSize="large" />
                                </Box>
                                <Typography fontWeight="bold" mb={2}>Email Address</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    kairo@gmail.com
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    business-kairo@gmail.com
                                </Typography>
                            </Box>

                            {/* Phone */}
                            <Box
                                mt={2}
                                flex="1 1 200px"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                            >
                                <Box
                                    bgcolor="primary.main"
                                    color="white"
                                    width={64}
                                    height={64}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="50%"
                                    mb={3}
                                >
                                    <AddIcCallIcon fontSize="large" />
                                </Box>
                                <Typography fontWeight="bold" mb={2}>Phone Number</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    09774234382
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    09774234382
                                </Typography>
                            </Box>

                            {/* Location */}
                            <Box
                                mt={2}
                                flex="1 1 200px"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                            >
                                <Box
                                    bgcolor="primary.main"
                                    color="white"
                                    width={64}
                                    height={64}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="50%"
                                    mb={3}
                                >
                                    <FmdGoodIcon fontSize="large" />
                                </Box>
                                <Typography fontWeight="bold" mb={2}>Location</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Yangon, MICT Park
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Hlaing, MICT Park
                                </Typography>
                            </Box>

                            {/* Work Day */}
                            <Box
                                mt={2}
                                flex="1 1 200px"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                            >
                                <Box
                                    bgcolor="primary.main"
                                    color="white"
                                    width={64}
                                    height={64}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="50%"
                                    mb={3}
                                >
                                    <AccessTimeFilledIcon fontSize="large" />
                                </Box>
                                <Typography fontWeight="bold" mb={2}>Work Day</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Mon-Fri : 9:00 - 17:00
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Sat-Sun : 10:00 - 16:00
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </Box>
    );
}
