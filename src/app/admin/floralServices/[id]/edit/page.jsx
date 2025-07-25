"use client";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditVenueTypePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    venue_id: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [venueRes, typeRes] = await Promise.all([
          axios.get("/api/venue"),
          axios.get(`/api/floralServices/${id}`),
        ]);

        setVenues(venueRes.data);

        const { name, description, price, venue_id, photo } = typeRes.data;
        setFormData({ name, description, price: String(price), venue_id });
        setPhotoPreview(photo);
      } catch (error) {
        console.error("Error loading venue type:", error);
        alert("Failed to load venue type data.");
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Service name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!String(formData.venue_id).trim()) newErrors.venue_id = "Venue ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    const submitRequest = async (finalPayload) => {
      try {
        await axios.put(`/api/floralServices/${id}`, finalPayload);
        alert("Service  updated!");
        router.push("/admin/floralServices");
      } catch (err) {
        console.error("Update failed:", err);
        alert("Failed to update Service");
      }
    };

    if (newPhotoFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        payload.photo = reader.result;
        await submitRequest(payload);
      };
      reader.readAsDataURL(newPhotoFile);
    } else {
      payload.photo = photoPreview; // keep existing photo
      await submitRequest(payload);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Service
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="name"
              label="Event Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />

            <Button variant="outlined" component="label">
              Upload New Photo
              <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
            </Button>
            {errors.photo && (
              <Typography color="error" variant="body2">
                {errors.photo}
              </Typography>
            )}
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

            <TextField
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
              }}
              fullWidth
            />

            <TextField
              select
              name="venue_id"
              label="Select Venue"
              value={formData.venue_id}
              onChange={handleChange}
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
                onClick={() => router.push("/admin/venueType")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update Service
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
