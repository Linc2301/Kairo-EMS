"use client";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateReview() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    user_id: "",
    bookingId: "",
    rating: "",
    review_date: "",
    description: "",
  });

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // Attach user_id when session is ready
  useEffect(() => {
  if (session?.user?.id) {
    setFormData((prev) => ({
      ...prev,
      user_id: session.user.id,
    }));

    // Call the booking-info endpoint
    axios
      .get("/api/booking-info", { params: { userId: session.user.id } })
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load your bookings"));
  }
}, [session]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { user_id, bookingId, rating, review_date, description } = formData;
    if (!user_id || !bookingId || !rating || !review_date || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setOpenConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setOpenConfirm(false);
    try {
      const { user_id, bookingId, rating, review_date, description } = formData;

      // Find the eventId from the selected booking
      const booking = bookings.find((b) => b.id === parseInt(bookingId));

      await axios.post("/api/review", {
        user_id: parseInt(user_id),
        bookingId: parseInt(bookingId),
        eventId: booking?.eventId,
        rating: parseInt(rating),
        review_date,
        description,
      });

      setSuccess("Review created successfully!");
      setOpenSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create review.");
      console.error(err);
    }
  };

  if (status === "loading") {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container>
        <Alert severity="warning">
          You must be logged in to submit a review.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" mb={4} fontWeight="bold" align="center">
        Create a New Review
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* Booking dropdown */}
          <TextField
            select
            label="Select Booking"
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
            required
          >
            {bookings.length === 0 ? (
              <MenuItem disabled>You have no bookings</MenuItem>
            ) : (
              bookings.map((booking) => (
                <MenuItem key={booking.id} value={booking.id}>
                  {booking.Event?.name || "No Event Linked"} — booked on{" "}
                  {new Date(booking.booking_date).toLocaleDateString()}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            label="Rating (1-5)"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <TextField
            label="Review Date"
            name="review_date"
            type="date"
            value={formData.review_date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Button variant="contained" type="submit" size="large">
            Submit Review
          </Button>
        </Stack>
      </Box>

      {/* Confirm Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          Are you sure you want to submit this review?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <DialogTitle>Review Submitted</DialogTitle>
        <DialogContent>
          Your review has been submitted successfully.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenSuccess(false);
              router.push("/review");
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
