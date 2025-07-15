"use client";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditVenuePage() {
  const { id } = useParams(); // Correctly fetch URL param
  const router = useRouter();

  const [name, setName] = useState("");
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  const handleFileChange = (e, setPhoto) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchVenue = async () => {
    try {
      const res = await axios.get(`/api/venue/${id}`);
      const data = res.data;
      setName(data.name);
      setPhoto1(data.photo1);
      setPhoto2(data.photo2);
      setPhoto3(data.photo3);
      setEventId(data.eventId.toString()); // Ensure it's a string for Select
    } catch (error) {
      console.error("Failed to load venue:", error);
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
      console.error("Update failed:", error);
      alert("Failed to update venue.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchVenue();
      fetchEvents();
    }
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
        <Button variant="contained" onClick={handleUpdate}>
          Update Venue
        </Button>
      </Stack>
    </Box>
  );
}
