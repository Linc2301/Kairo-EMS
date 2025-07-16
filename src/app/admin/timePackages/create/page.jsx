"use client";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateTimePackagePage() {
  const router = useRouter();

  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    startTime: null,
    endTime: null,
    venue_id: "",
  });

  const [errors, setErrors] = useState({});

  const handleStartTimeChange = (newValue) => {
    setFormData((prev) => ({ ...prev, startTime: newValue }));
  };

  const handleEndTimeChange = (newValue) => {
    setFormData((prev) => ({ ...prev, endTime: newValue }));
  };

  const handleVenueChange = (e) => {
    setFormData((prev) => ({ ...prev, venue_id: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.venue_id) newErrors.venue_id = "Venue selection is required";

    if (
      formData.startTime &&
      formData.endTime &&
      formData.endTime.isBefore(formData.startTime)
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (!formData.startTime || !formData.endTime) {
        alert("Start and End time are required");
        return;
      }

      const startTime = dayjs(`${today} ${dayjs(formData.startTime).format("HH:mm")}`).toISOString();
      const endTime = dayjs(`${today} ${dayjs(formData.endTime).format("HH:mm")}`).toISOString();

      const payload = {
        startTime,
        endTime,
        venue_id: Number(formData.venue_id),
      };

      console.log("Submitting payload:", payload);

      const res = await axios.post("/api/timePackages", payload);

      if (res.status === 201) {
        alert("Time package created!");
        router.push("/admin/timePackages");
      } else {
        alert("Unexpected server response");
      }
    } catch (error) {
      console.error("Submit error:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);
        alert(
          error.response.data.message ||
          "Server responded with an error."
        );
      } else {
        alert(error.message || "Unexpected error occurred.");
      }
    }
  }

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/venue");
        setVenues(res.data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Time Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.startTime,
                    helperText: errors.startTime,
                  },
                }}
              />

              <TimePicker
                label="End Time"
                value={formData.endTime}
                onChange={handleEndTimeChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.endTime,
                    helperText: errors.endTime,
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              select
              name="venue_id"
              label="Select Venue"
              value={formData.venue_id}
              onChange={handleVenueChange}
              error={!!errors.venue_id}
              helperText={errors.venue_id}
              fullWidth
            >
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  {venue.name}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.push("/admin/timePackages")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Create Time Package
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
