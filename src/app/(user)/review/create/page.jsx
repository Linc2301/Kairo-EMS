// "use client";

// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   MenuItem,
//   Stack,
//   Alert,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function CreateReview() {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   // Form state
//   const [formData, setFormData] = useState({
//     user_id: "",
//     venue_id: "",
//     rating: "",
//     review_date: "",
//     description: "",
//   });

//   const [venues, setVenues] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Set user_id from session
//   useEffect(() => {
//     if (session?.user?.id) {
//       setFormData((prev) => ({
//         ...prev,
//         user_id: session.user.id,
//       }));
//     }
//   }, [session]);

//   // Fetch venues
//   useEffect(() => {
//     axios
//       .get("/api/venue")
//       .then((res) => setVenues(res.data))
//       .catch(() => setError("Failed to load venues"));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { user_id, venue_id, rating, review_date, description } = formData;
//     if (!user_id || !venue_id || !rating || !review_date || !description.trim()) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       await axios.post("/api/review", {
//         user_id: parseInt(user_id),
//         venue_id: parseInt(venue_id),
//         rating: parseInt(rating),
//         review_date,
//         description,
//       });
//       setSuccess("Review created successfully!");
//       router.push("/review");
//     } catch (err) {
//       setError("Failed to create review.");
//       console.error(err);
//     }
//   };

//   // Show loading or unauthorized messages
//   if (status === "loading") {
//     return <Container><Typography>Loading...</Typography></Container>;
//   }

//   if (!session) {
//     return (
//       <Container>
//         <Alert severity="warning">You must be logged in to submit a review.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ py: 6 }}>
//       <Typography variant="h4" mb={4} fontWeight="bold" align="center">
//         Create a New Review
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Stack spacing={3}>
//           {/* Venue Select */}
//           <TextField
//             select
//             label="Select Venue"
//             name="venue_id"
//             value={formData.venue_id}
//             onChange={handleChange}
//             required
//           >
//             {venues.map((venue) => (
//               <MenuItem key={venue.id} value={venue.id}>
//                 {venue.name}
//               </MenuItem>
//             ))}
//           </TextField>

//           {/* Rating */}
//           <TextField
//             label="Rating (1-5)"
//             name="rating"
//             type="number"
//             inputProps={{ min: 1, max: 5 }}
//             value={formData.rating}
//             onChange={handleChange}
//             required
//           />

//           {/* Review Date */}
//           <TextField
//             label="Review Date"
//             name="review_date"
//             type="date"
//             value={formData.review_date}
//             onChange={handleChange}
//             required
//             InputLabelProps={{ shrink: true }}
//           />

//           {/* Description */}
//           <TextField
//             label="Description"
//             name="description"
//             multiline
//             rows={4}
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           {error && <Alert severity="error">{error}</Alert>}
//           {success && <Alert severity="success">{success}</Alert>}

//           <Button variant="contained" type="submit" size="large">
//             Submit Review
//           </Button>
//         </Stack>
//       </Box>
//     </Container>
//   );
// }

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
    eventId: "",
    rating: "",
    review_date: "",
    description: "",
  });

  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: session.user.id,
      }));
    }
  }, [session]);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => setVenues(res.data))
      .catch(() => setError("Failed to load venues"));
  }, []);

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

    const { user_id, eventId, rating, review_date, description } = formData;
    if (!user_id || !eventId || !rating || !review_date || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Show confirmation dialog
    setOpenConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setOpenConfirm(false);
    try {
      const { user_id, eventId, rating, review_date, description } = formData;
      await axios.post("/api/review", {
        user_id: parseInt(user_id),
        eventId: parseInt(eventId),
        rating: parseInt(rating),
        review_date,
        description,
      });
      setSuccess("Review created successfully!");
      setOpenSuccess(true); // Open success dialog
    } catch (err) {
      setError("Failed to create review.");
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
        <Alert severity="warning">You must be logged in to submit a review.</Alert>
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
          <TextField
            select
            label="Select Event"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
          >
            {venues.map((venue) => (
              <MenuItem key={venue.id} value={venue.id}>
                {venue.name}
              </MenuItem>
            ))}
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

