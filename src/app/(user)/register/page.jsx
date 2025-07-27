"use client";

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // 👈 import icons

export default function RegisterPage() {
  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const onSubmit = async (formData) => {
    try {
      const bodyData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_pass: formData.confirm_pass,
      };

      await axios.post("/api/users", bodyData);

      reset();
      setSnackbar({
        open: true,
        message: "User registered successfully!",
        severity: "success",
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed. Try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
        }}
      >
        {/* Left side - Image */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            backgroundImage: 'url("/login.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "30vh", md: "100%" },
            width: "100%",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right side - Form */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            bgcolor: "white",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box
            component="form"
            sx={{ m: { xs: 2, md: 10 }, width: "100%", maxWidth: 500 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              sx={{
                color: "red",
                textAlign: "center",
                fontSize: { xs: 40, md: 60 },
                mb: 1,
              }}
            >
              Kairo
            </Typography>
            <Typography
              sx={{
                color: "black",
                textAlign: "start",
                fontSize: { xs: 24, md: 30 },
              }}
            >
              Create an Account
            </Typography>

            {/* Name */}
            <Typography sx={{ color: "black", mb: 0.5 }}>User Name</Typography>
            <TextField
              placeholder="Enter your name"
              hiddenLabel
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  opacity: 0.3,
                  transition: "opacity 0.2s",
                },
                "& .MuiInputBase-input:focus::placeholder": {
                  opacity: 0,
                },
              }}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message || " "}
            />

            {/* Email */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Email</Typography>
            <TextField
              placeholder="Enter your email"
              hiddenLabel
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  opacity: 0.3,
                  transition: "opacity 0.2s",
                },
                "& .MuiInputBase-input:focus::placeholder": {
                  opacity: 0,
                },
              }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message || " "}
            />

            {/* Phone */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Phone No.</Typography>
            <TextField
              placeholder="Enter your phone no."
              hiddenLabel
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  opacity: 0.3,
                  transition: "opacity 0.2s",
                },
                "& .MuiInputBase-input:focus::placeholder": {
                  opacity: 0,
                },
              }}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message || " "}
            />

            {/* Password */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Password</Typography>
            <TextField
              placeholder="Enter your password"
              hiddenLabel
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  opacity: 0.3,
                  transition: "opacity 0.2s",
                },
                "& .MuiInputBase-input:focus::placeholder": {
                  opacity: 0,
                },
              }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message || " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Confirm Password</Typography>
            <TextField
              placeholder="Confirm your password"
              hiddenLabel
              fullWidth
              size="small"
              type={showConfirmPassword ? "text" : "password"}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  opacity: 0.3,
                  transition: "opacity 0.2s",
                },
                "& .MuiInputBase-input:focus::placeholder": {
                  opacity: 0,
                },
              }}
              {...register("confirm_pass")}
              error={!!errors.confirm_pass}
              helperText={errors.confirm_pass?.message || " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mb: 0.5,
                bgcolor: "#E24C00",
                "&:hover": { bgcolor: "#cc4400" },
              }}
            >
              Register
            </Button>

            {/* Link to login */}
            <Typography variant="body2" sx={{ color: "black" }} align="center">
              Already have an account?
              <Link passHref href="/login">
                <Box
                  component="span"
                  sx={{
                    color: "#E24C00",
                    cursor: "pointer",
                    fontWeight: "bold",
                    ml: 0.7,
                    "&:hover": {
                      color: "#cc4400",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Login
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        sx={{ mb: 6 }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

//