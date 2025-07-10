"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 2000); // 2000ms = 2 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or errors change
    }
  }, [errors, clearErrors]);

  // const onSubmit = (formData) => {
  //   console.log(formData);
  //   console.log("Name input Data", formData.name);
  //   console.log("formdata", formData.password);
  //   reset();
  // };
  const onSubmit = async (formData) => {
        try {
            console.log("formData", formData);
            const bodyData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                confirm_pass: formData.confirm_pass,
            };
            const response = await axios.post("http://localhost:3000/api/users", bodyData);
            reset();
            console.log("Successfully Saved.");
        } catch (error) {
            console.error(error);
        }
    }

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
          // flex: { xs: "none", md: 1 }, // On medium+, takes available space
          // bgcolor: "white",
          // minHeight: "100vh",
          // // height: { xs: "auto", md: "100%" }, // Auto height on mobile, full on desktop
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // p: 3, // Add some padding

          flex: { xs: "none", md: 1 },
          bgcolor: "white",
          minHeight: "100vh", // ✅ fixes shrinking
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

          <Typography sx={{ color: "black", mb: 0.5 }}>Password</Typography>
          <TextField
            placeholder="Enter your password"
            hiddenLabel
            fullWidth
            size="small"
            type="password"
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

          />

          <Typography sx={{ color: "black", mb: 0.5 }}>
            Confirm Password
          </Typography>
          <TextField
            placeholder="Confirm your password"
            hiddenLabel
            size="small"
            fullWidth
            type="password"
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
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || " "}
          />

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
  );
}
