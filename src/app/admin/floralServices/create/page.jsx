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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateVenueTypePage() {
  const router = useRouter();

  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    venue_id: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);

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
    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!photoFile) newErrors.photo = "Event photo is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!String(formData.venue_id).trim()) newErrors.venue_id = "Venue ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const res = await axios.post("/api/floralServices", {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          venue_id: formData.venue_id,
          photo: base64Image,
        });

        if (res.status === 201) {
          alert("Venue type created!");
          router.push("/admin/floralServices");
        } else {
          alert("Unexpected server response");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert(error?.response?.data?.message || "An unexpected error occurred.");
      }
    };

    reader.readAsDataURL(photoFile);
  };

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
          Create New Floral Service
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
              Upload Photo
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
                onClick={() => router.push("/admin/floralServices")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Create Venue Type
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
