"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

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

  const [showPassword, setShowPassword] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData) => {
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.ok) {
        const session = await getSession();

        if (session?.user?.isAdmin === "admin") {
          router.push("/admin/");
        } else {
          router.push("/");
        }

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        reset();
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
            flex: 1,
            backgroundImage: 'url("/login.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right side - Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 500 }}
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

            {/* Email Field */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Email</Typography>
            <TextField
              placeholder="Enter your email"
              fullWidth
              type="email"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message || " "}
              sx={{ mb: 1 }}
            />

            {/* Password Field */}
            <Typography sx={{ color: "black", mb: 0.5 }}>Password</Typography>
            <TextField
              placeholder="Enter your password"
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message || " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
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

            <Typography variant="body2" align="center">
              Don&apos;t have an account?{" "}
              <Link href="/register" passHref>
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

      {/* Snackbar */}
      <Snackbar
        sx={{ mb: 6 }}
        open={snackbar.open}
        autoHideDuration={3000}
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

//