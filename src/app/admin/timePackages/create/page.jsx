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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartTimeChange = (newValue) => {
    setFormData((prev) => ({ ...prev, startTime: newValue }));
    if (errors.startTime) setErrors(prev => ({ ...prev, startTime: '' }));
  };

  const handleEndTimeChange = (newValue) => {
    setFormData((prev) => ({ ...prev, endTime: newValue }));
    if (errors.endTime) setErrors(prev => ({ ...prev, endTime: '' }));
  };

  const handleVenueChange = (e) => {
    setFormData((prev) => ({ ...prev, venue_id: e.target.value }));
    if (errors.venue_id) setErrors(prev => ({ ...prev, venue_id: '' }));
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


    try {
      const payload = {
        startTime: formData.startTime.format("HH:mm"), // Send as HH:mm
        endTime: formData.endTime.format("HH:mm"),     // Send as HH:mm
        venue_id: formData.venue_id,
      };

      const response = await axios.post("/api/timePackages", payload);

      if (response.data.success) {
        alert("Time package created successfully!");
        router.push("/admin/timePackages");
      }
    } catch (error) {
      console.error("Error creating time package:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/venue");
        setVenues(res.data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        alert("Failed to load venues");
      }
    };
    fetchVenues();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
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
                ampm={true}
                format="hh:mm A"
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
                ampm={true}
                format="hh:mm A"
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Time Package"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}