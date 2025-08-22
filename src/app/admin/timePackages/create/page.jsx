"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone
const MYANMAR_TZ = "Asia/Yangon";

export default function CreateTimePackagePage() {
  const router = useRouter();
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    date: null,
    startTime: null,
    endTime: null,
    venue_id: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadVenues() {
      try {
        const res = await axios.get("/api/venue");
        setVenues(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        alert("Failed to load venues");
      }
    }
    loadVenues();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
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
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        date: dayjs(formData.date).tz(MYANMAR_TZ).format("YYYY-MM-DD"),
        startTime: dayjs(formData.startTime).tz(MYANMAR_TZ).format("HH:mm"),
        endTime: dayjs(formData.endTime).tz(MYANMAR_TZ).format("HH:mm"),
        venue_id: parseInt(formData.venue_id, 10),
      };

      const response = await axios.post("/api/timePackages", payload);

      if (response.status === 201) {
        alert("Time Package Create Successful!");
        router.push("/admin/timePackages");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Error in the  Time Package Creation! ";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create New Time Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newVal) =>
                  setFormData((prev) => ({ ...prev, date: newVal }))
                }
                format="YYYY-MM-DD"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
              />

              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newVal) =>
                  setFormData((prev) => ({ ...prev, startTime: newVal }))
                }
                ampm
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
                onChange={(newVal) =>
                  setFormData((prev) => ({ ...prev, endTime: newVal }))
                }
                ampm
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
              label="Select Venue"
              value={formData.venue_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  venue_id: parseInt(e.target.value, 10),
                }))
              }
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
                onClick={() => router.push("/admin/timePackages")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Time Package"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
