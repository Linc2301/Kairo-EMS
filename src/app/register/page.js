"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function LoginPage() {
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
        <Box component="form" sx={{ m: { xs: 2, md: 10 }, width: "100%", maxWidth: 500 }}>
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
              mb: 2,
              fontSize: { xs: 24, md: 30 },
            }}
          >
            Create an Account
          </Typography>
          <Typography sx={{ color: "black", mb: 0.5 }}>User Name</Typography>
          <TextField
            placeholder="Enter your name"
            hiddenLabel
            fullWidth
            size="small"
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
                transition: "opacity 0.2s",
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0,
              },
            }}
          />

          <Typography sx={{ color: "black", mb: 0.5 }}>Email</Typography>
          <TextField
            placeholder="Enter your email"
            hiddenLabel
            fullWidth
            size="small"
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
                transition: "opacity 0.2s",
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0,
              },
            }}
          />

          <Typography sx={{ color: "black", mb: 0.5 }}>Phone No.</Typography>
          <TextField
            placeholder="Enter your phone no."
            hiddenLabel
            fullWidth
            size="small"
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
                transition: "opacity 0.2s",
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0,
              },
            }}
          />

          <Typography sx={{ color: "black", mb: 0.5 }}>Password</Typography>
          <TextField
            placeholder="Enter your password"
            hiddenLabel
            fullWidth
            size="small"
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
                transition: "opacity 0.2s",
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0,
              },
            }}
          />

          <Typography sx={{ color: "black", mb: 0.5 }}>Confirm Password</Typography>
          <TextField
            placeholder="Confirm your password"
            hiddenLabel
            size="small"
            fullWidth
            sx={{
              mb: 2,
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
                transition: "opacity 0.2s",
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0,
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2, bgcolor: "#E24C00", "&:hover": { bgcolor: "#cc4400" } }}
          >
            Register
          </Button>
          <Typography variant="body2" sx={{ color: "black" }} align="center">
            Already have an account?

            <Link passHref href="/login"  >
              <Box component="span" sx={{ color: '#E24C00', cursor: 'pointer', fontWeight: "bold" ,ml:0.7 }}>
                Login
              </Box>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}