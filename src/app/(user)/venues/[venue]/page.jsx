"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";

export default function VenuePage() {
  const { venue } = useParams();
  const router = useRouter();

  const handleGoToEvent = () => {
    router.push(`/(user)/events/venue/${venue}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Venue: {venue.replace("-", " ").toUpperCase()}
      </Typography>
      <Button variant="contained" onClick={handleGoToEvent}>
        Go to Event Page
      </Button>
    </Box>
  );
}
