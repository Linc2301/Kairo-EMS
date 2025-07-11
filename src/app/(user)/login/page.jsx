"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = async (formData) => {
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        reset();
        router.push("/home");
      } else {
        setSnackbar({
          open: true,
          message: "Invalid email or password",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Login failed. Please try again later.",
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
            height: { xs: "auto", md: "100%" },
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
                mb: 2,
              }}
            >
              Kairo
            </Typography>
            <Typography
              sx={{
                color: "black",
                textAlign: "start",
                mb: 1,
                fontSize: { xs: 24, md: 30 },
              }}
            >
              Let's login to your account
            </Typography>

            <Typography sx={{ color: "black", mb: 0.5 }}>Email</Typography>
            <TextField
              placeholder="Enter your email"
              hiddenLabel
              fullWidth
              type="email"
              size="small"
              sx={{
                mb: 0.5,
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

            <Typography sx={{ color: "black", mb: 0.5 }}>Password</Typography>
            <TextField
              placeholder="Enter your password"
              hiddenLabel
              fullWidth
              size="small"
              type="password"
              sx={{
                mb: 0.5,
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
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#E24C00",
                "&:hover": { bgcolor: "#cc4400" },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ color: "black" }} align="center">
              Don't you have an account?{" "}
              <Link passHref href="/register">
                <Box
                  component="span"
                  sx={{
                    color: "#E24C00",
                    cursor: "pointer",
                    fontWeight: "bold",
                    ml: 0.5,
                    "&:hover": {
                      color: "#cc4400",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Register
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        sx={{ mb: 6 }}
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
