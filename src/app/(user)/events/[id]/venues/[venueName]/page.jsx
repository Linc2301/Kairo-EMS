"use client";

import { useParams } from "next/navigation";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const venueData = {
  "Ballroom": {
    title: "Elegant Ballroom",
    images: ["/assets/party-hall.jpg", "/assets/party-hall.jpg", "/assets/party-hall.jpg"]
  },
  "Garden Venue": {
    title: "Beautiful Garden Venue",
    images: ["/assets/party-hall.jpg", "/assets/party-hall.jpg", "/assets/party-hall.jpg"]
  },
  "Rooft Top": {
    title: "Stylish Rooftop Venue",
    images: ["/assets/party-hall.jpg", "/assets/party-hall.jpg", "/assets/party-hall.jpg"]
  },
  // Add more venues
};

export default function VenuePage() {
  const params = useParams();
  const { id, venueName } = params;
  const decodedVenueName = decodeURIComponent(venueName);
  const venue = venueData[decodedVenueName];

  return (
    <Box sx={{ bgcolor: "black", p: 5, minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="center" sx={{ ml: 10 }}>
        {/* Left big image */}
        <Grid item xs={12} md={6}>
          <Image
            src={venue?.images[0] || "/assets/fallback.jpg"}
            alt="Main Venue"
            width={800}
            height={800}
            style={{
              width: 500,
              height: 500,
              borderRadius: "20px",
            }}
          />
        </Grid>

        {/* Right 2 images stacked */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Image
              src={venue?.images[1] || "/assets/fallback.jpg"}
              alt="Top Right"
              width={400}
              height={250}
              style={{ width: 300, height: 300, borderRadius: "20px" }}
            />
            <Image
              src={venue?.images[2] || "/assets/fallback.jpg"}
              alt="Bottom Right"
              width={400}
              height={250}
              style={{ width: 300, height: 300, borderRadius: "20px" }}
            />
          </Box>
        </Grid>

        {/* Text and button */}
        <Grid item xs={12} md={3}>
          <Box sx={{ ml: 5 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#d1d5db"
              sx={{ mb: 3 }}
            >
              {venue?.title || "Unknown Venue"}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e65100",
                ml: 6,
                color: "white",
                px: 5,
                py: 1.5,
                fontSize: "18px",
                borderRadius: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#bf360c",
                },
              }}
            >
              Book
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
