"use client";

import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { schema } from "../login/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

export default function LoginPage() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    clearErrors,
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

  const onSubmit = (formData) => {
    console.log("formData", formData);
    console.log(("Name Input Data,", formData.name));
    console.log(("form Data", formData.password));

    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stacks vertically on small, rows on medium+
        height: "100vh", // Makes the container take full viewport height
      }}
    >
      {/* Left side - Image */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 }, // On medium+, takes available space
          backgroundImage: 'url("/login.jpg")',

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "30vh", md: "100%" }, // Adjust height for mobile view if image is shown
          width: "100%",
          display: { xs: "none", md: "block" }, // Hide on small screens, show on medium and up
        }}
      />

      {/* Right side - Form */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 }, // On medium+, takes available space
          bgcolor: "white",
          height: { xs: "auto", md: "100%" }, // Auto height on mobile, full on desktop
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3, // Add some padding
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
          <Typography sx={{ color: "black", mb: 0.5 }}>User Name</Typography>
          <TextField
            placeholder="Enter your name"
            hiddenLabel
            fullWidth
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
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message || " "}
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
            Don't you have account?{" "}
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
  );
}
