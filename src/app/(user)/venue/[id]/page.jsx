
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/venue/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setVenue)
      .catch(console.error);
  }, [id]);

  if (!venue) return <Typography>Loading venue details...</Typography>;

  return (
    <Box sx={{ bgcolor: "black", p: 5, minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="center" sx={{ ml: 10 }}>
        <Grid item xs={12} md={6}>
          <Image
            src={venue.photo1 || "/assets/fallback.jpg"}
            alt={venue.name || "Main Venue"}
            width={500}
            height={500}
            style={{ borderRadius: "20px" }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Image
              src={venue.photo2 || "/assets/fallback.jpg"}
              alt="Top Right"
              width={300}
              height={300}
              style={{ borderRadius: "20px" }}
            />
            <Image
              src={venue.photo3 || "/assets/fallback.jpg"}
              alt="Bottom Right"
              width={300}
              height={300}
              style={{ borderRadius: "20px" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ ml: 5 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#d1d5db"
              sx={{ mb: 3 }}
            >
              {venue.name || "Unknown Venue"}
            </Typography>
            <Link href="/deliveries" passHref>
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
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
