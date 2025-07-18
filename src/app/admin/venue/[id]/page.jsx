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
import { useParams, useRouter } from "next/navigation";

export default function EditVenue() {
  const { id } = useParams(); // get venue ID from URL
  const router = useRouter();

  const [name, setName] = useState("");
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  // fetch venue data for editing
  const fetchVenue = async () => {
    try {
      const res = await axios.get(`/api/venue/${id}`);
      const venue = res.data;

      setName(venue.name);
      setPhoto1(venue.photo1);
      setPhoto2(venue.photo2);
      setPhoto3(venue.photo3);
      setEventId(venue.eventId);
    } catch (error) {
      console.error("Failed to load venue:", error);
      alert("Failed to load venue.");
    }
  };

  // fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  // handle file change
  const handleFileChange = (e, setPhoto) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // submit update
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/venue/${id}`, {
        name,
        photo1,
        photo2,
        photo3,
        eventId,
      });

      alert("Venue updated successfully!");
      router.push("/admin/venue");
    } catch (error) {
      console.error(error);
      alert("Failed to update venue.");
    }
  };

  useEffect(() => {
    fetchVenue();
    fetchEvents();
  }, [id]);

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
        Edit Venue
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
          Upload New Photo 1
          <input hidden type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto1)} />
        </Button>

        <Button variant="outlined" component="label">
          Upload New Photo 2
          <input hidden type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto2)} />
        </Button>

        <Button variant="outlined" component="label">
          Upload New Photo 3
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
        <Button variant="contained" onClick={handleUpdate}>
          Update Venue
        </Button>
      </Stack>
    </Box>
  );
}
