// "use client";

// import {
//   Box,
//   Button,
//   MenuItem,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
//   InputAdornment,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function CreateVenueTypePage() {
//   const router = useRouter();

//   const [venues, setVenues] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     eventId: "",
//   });

//   const [photoFile, setPhotoFile] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setPhotoFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPhotoPreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setPhotoPreview(null);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Service name is required";
//     if (!photoFile) newErrors.photo = "Service photo is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.price.trim()) newErrors.price = "Price is required";
//     if (!String(formData.eventId).trim()) newErrors.eventId = "Event ID is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result;

//       try {
//         const res = await axios.post("/api/floralServices", {
//           name: formData.name,
//           description: formData.description,
//           price: formData.price,
//           eventId: formData.eventId,
//           photo: base64Image,
//         });

//         if (res.status === 201) {
//           alert("Service created!");
//           router.push("/admin/floralServices");
//         } else {
//           alert("Unexpected server response");
//         }
//       } catch (error) {
//         console.error("Form submission error:", error);
//         alert(error?.response?.data?.message || "An unexpected error occurred.");
//       }
//     };

//     reader.readAsDataURL(photoFile);
//   };

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const res = await axios.get("/api/events");
//         setVenues(res.data);
//       } catch (error) {
//         console.error("Failed to fetch venues:", error);
//       }
//     };
//     fetchVenues();
//   }, []);

//   return (
//     <Box sx={{ maxWidth: 600, mx: "auto" }}>
//       <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Create New Service
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Stack spacing={3}>
//             <TextField
//               name="name"
//               label="Event Name"
//               value={formData.name}
//               onChange={handleChange}
//               error={!!errors.name}
//               helperText={errors.name}
//               fullWidth
//             />

//             <Button variant="outlined" component="label">
//               Upload Photo
//               <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
//             </Button>
//             {errors.photo && (
//               <Typography color="error" variant="body2">
//                 {errors.photo}
//               </Typography>
//             )}
//             {photoPreview && (
//               <img
//                 src={photoPreview}
//                 alt="Preview"
//                 style={{
//                   width: "100%",
//                   maxHeight: 250,
//                   objectFit: "cover",
//                   borderRadius: 8,
//                 }}
//               />
//             )}

//             <TextField
//               name="description"
//               label="Description"
//               value={formData.description}
//               onChange={handleChange}
//               error={!!errors.description}
//               helperText={errors.description}
//               multiline
//               rows={4}
//               fullWidth
//             />

//             <TextField
//               name="price"
//               label="Price"
//               value={formData.price}
//               onChange={handleChange}
//               error={!!errors.price}
//               helperText={errors.price}
//               InputProps={{
//                 endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
//               }}
//               fullWidth
//             />

//             <TextField
//               select
//               name="eventId"
//               label="Select Event"
//               value={formData.eventId}
//               onChange={handleChange}
//               error={!!errors.eventId}
//               helperText={errors.eventId}
//               fullWidth
//             >
//               {venues.map((venue) => (
//                 <MenuItem key={venue.id} value={venue.id}>
//                   {venue.name}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <Stack direction="row" justifyContent="flex-end" spacing={2}>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => router.push("/admin/floralServices")}
//               >
//                 Cancel
//               </Button>
//               <Button variant="contained" type="submit">
//                 Create Venue Type
//               </Button>
//             </Stack>
//           </Stack>
//         </form>
//       </Paper>
//     </Box>
//   );
// }


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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateVenueTypePage() {
  const router = useRouter();
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    eventId: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    // Clear photo error when file is selected
    if (errors.photo) {
      setErrors((prev) => ({ ...prev, photo: "" }));
    }

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
    if (!photoFile) newErrors.photo = "Service photo is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!String(formData.eventId).trim()) newErrors.eventId = "Event ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const res = await axios.post("/api/floralServices", {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          eventId: formData.eventId,
          photo: base64Image,
        });

        if (res.status === 201) {
          setDialogMessage("Service created successfully!");
          setOpenSuccessDialog(true);
        } else {
          setDialogMessage("Unexpected server response");
          setOpenErrorDialog(true);
        }
      };
      reader.readAsDataURL(photoFile);
    } catch (error) {
      console.error("Form submission error:", error);
      setDialogMessage(error?.response?.data?.message || "An unexpected error occurred.");
      setOpenErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    router.push("/admin/floralServices");
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/events");
        setVenues(res.data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setDialogMessage("Failed to load events. Please try again later.");
        setOpenErrorDialog(true);
      }
    };
    fetchVenues();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Create New Floral Service
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="name"
              label="Service Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              variant="outlined"
              size="small"
            />

            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ py: 1.5 }}
              >
                {photoFile ? "Change Photo" : "Upload Service Photo"}
                <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
              </Button>
              {errors.photo && (
                <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>
                  {errors.photo}
                </Typography>
              )}
              {photoPreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Photo Preview:
                  </Typography>
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "contain",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                    }}
                  />
                </Box>
              )}
            </Box>

            <TextField
              name="description"
              label="Service Description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              size="small"
            />

            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                endAdornment: <InputAdornment position="end">MMK</InputAdornment>,
                inputProps: { min: 0 }
              }}
              fullWidth
              variant="outlined"
              size="small"
            />

            <TextField
              select
              name="eventId"
              label="Select Event"
              value={formData.eventId}
              onChange={handleChange}
              error={!!errors.eventId}
              helperText={errors.eventId}
              fullWidth
              variant="outlined"
              size="small"
            >
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  {venue.name}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => router.push("/admin/floralServices")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                sx={{ minWidth: 150 }}
              >
                {isLoading ? "Creating..." : "Create Service"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title" sx={{ color: "success.main" }}>
          Success!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title" sx={{ color: "error.main" }}>
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}