"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import Loading from "@/src/components/Loading";

export default function WhyKairo() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/description");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items.length > 0 ? items[currentIndex] : null;

  if (!currentItem) {
    return <Loading open={true}/>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin:2
      }}
    >
      {/* Left side: Photo (80%) */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src={currentItem.photo}
          alt="Why Kairo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Right side: Description (20%) */}
      <Box
        sx={{
          width: "50%",
          height: "80%",
          backgroundColor: "white",
          p: 3,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          marginLeft:5
        }}
      >
        <Typography sx={{ fontSize: 120, fontWeight: "bold", lineHeight: 1,mt:6 }}>
          Why
        </Typography>
        <Typography sx={{ fontSize: 120, fontWeight: "bold", lineHeight: 1, mb: 6,ml:30,mt:2 }}>
          Kairo?
        </Typography>

        <Typography sx={{ fontSize: 40, mt:2 }}>
          New and never-ending <br /> possibilities
        </Typography>

        <Typography sx={{ mt: 5, fontSize: 20 }}>
          {currentItem.description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 4 }}>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
