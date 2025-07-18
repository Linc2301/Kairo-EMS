"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id;

  const [formData, setFormData] = useState({
    description: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      alert("No event ID provided.");
      router.push("/admin/description");
      return;
    }

    axios
      .get(`/api/description/${eventId}`)
      .then((res) => {
        const event = res.data;
        setFormData({
          description: event.description || "",
        });
        setPhotoPreview(event.photo || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        alert("Failed to load event data.");
        router.push("/admin/description");
      });
  }, [eventId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let photoUrl = photoPreview;

    if (photoFile) {
      try {
        photoUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(photoFile);
        });
      } catch (err) {
        console.error("Error reading image file:", err);
        alert("Failed to read image file.");
        return;
      }
    }

    try {
      const res = await axios.put(`/api/description/${eventId}`, {

        description: formData.description,
        photo: photoUrl,
      });

      if (res.status === 200) {
        alert("Event updated successfully!");
        router.push("/admin/description");
      } else {
        alert("Unexpected server response.");
      }
    } catch (err) {
      console.error("Error updating event:", err);
      alert(err.response?.data?.message || "Failed to update event.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Description
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>

            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
            />

            <Button variant="outlined" component="label">
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Button>

            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 250,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.push("/admin/description")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update Event
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
