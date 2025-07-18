"use client";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateVenue() {
  const [name, setName] = useState("");
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  const router = useRouter();

  const handleFileChange = (e, setPhoto) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/venue", {
        name,
        photo1,
        photo2,
        photo3,
        eventId,
      });
      alert("Venue created successfully!");
      router.push("/admin/venue");
    } catch (error) {
      console.error(error);
      alert("Failed to create venue.");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  console.log(fetchEvents)
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create New Venue
      </Typography>

      <TextField
        label="Venue Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Stack direction="column" spacing={2} my={2}>
        <Button variant="outlined" component="label">
          Upload Photo 1
          <input hidden type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto1)} />
        </Button>

        <Button variant="outlined" component="label">
          Upload Photo 2
          <input hidden type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto2)} />
        </Button>

        <Button variant="outlined" component="label">
          Upload Photo 3
          <input hidden type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto3)} />
        </Button>
      </Stack>

      <InputLabel id="event-id-label">Event</InputLabel>
      <Select
        labelId="event-id-label"
        fullWidth
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      >
        {events.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.name}
          </MenuItem>
        ))}
      </Select>

      <Stack direction="row" justifyContent="space-between" mt={3}>
        <Button variant="outlined" color="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create Venue
        </Button>
      </Stack>
    </Box>
  );
}
