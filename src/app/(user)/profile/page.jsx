
// 'use client';

// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Card,
//   Grid,
//   IconButton,
//   TextField,
//   Typography,
//   ListItem,
//   Paper,
//   List,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Badge,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import UploadIcon from "@mui/icons-material/Upload";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import { formatDistanceToNow } from 'date-fns';

// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Loading from "@/src/components/Loading";

// const menuItems = ["Profile", "Notification", "History", "Log Out"];

// const formatTime = (timeString) => {
//   if (!timeString) return "N/A";
//   const date = new Date(timeString);
//   return isNaN(date) ? "Invalid time" : date.toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });
// };

// export default function ProfileSettingsPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [editMode, setEditMode] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("Profile");
//   const [profile, setProfile] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const [loading, setLoading] = useState({
//     profile: false,
//     history: false,
//     notifications: false,
//   });

//   useEffect(() => {
//     const section = searchParams.get("section");
//     if (section) {
//       setSelectedSection(section);
//     }
//   }, [searchParams]);

//   // Fetch notifications when Notification section is selected
//   const fetchNotifications = async () => {
//     try {
//       setLoading(prev => ({ ...prev, notifications: true }));
//       setError(null);
//       const response = await axios.get('/api/notifications');

//       if (Array.isArray(response.data)) {
//         setNotifications(response.data);
//       } else {
//         throw new Error('Invalid notifications data format');
//       }
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//       setError(err.response?.data?.error || 'Failed to load notifications');
//       setNotifications([]);
//     } finally {
//       setLoading(prev => ({ ...prev, notifications: false }));
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`/api/notifications/${id}`, { read: true }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setNotifications(prev => prev.map(n =>
//         n.id === id ? { ...n, read: true } : n
//       ));
//       showSnackbar('Notification marked as read', 'success');
//     } catch (err) {
//       console.error('Error marking as read:', err);
//       showSnackbar(err.response?.data?.error || 'Failed to mark as read', 'error');
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await axios.patch('/api/notifications', {}, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//       showSnackbar('All notifications marked as read', 'success');
//     } catch (err) {
//       console.error('Error marking all as read:', err);
//       showSnackbar(err.response?.data?.error || 'Failed to mark all as read', 'error');
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   useEffect(() => {
//     if (selectedSection === "Notification") {
//       fetchNotifications();
//     }
//   }, [selectedSection]);

//   // Fetch booking history
//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       if (selectedSection !== "History" || !session?.user?.id) return;

//       try {
//         setLoading(prev => ({ ...prev, history: true }));
//         setError(null);

//         const userId = session.user.id;
//         const response = await fetch(`/api/booking-info?userId=${userId}`);

//         if (!response.ok) {
//           let errorData = {};
//           try {
//             errorData = await response.json();
//           } catch (jsonErr) {
//             console.warn("Failed to parse error JSON:", jsonErr);
//           }
//           throw new Error(errorData?.error || response.statusText || 'Unknown error occurred');
//         }

//         const data = await response.json();
//         setBookingHistory(data);
//       } catch (error) {
//         console.error("Booking history fetch error:", error);
//         setError(error.message || 'Failed to fetch booking history');
//       } finally {
//         setLoading(prev => ({ ...prev, history: false }));
//       }
//     };

//     fetchBookingHistory();
//   }, [selectedSection, session?.user?.id]);

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!session?.user?.id) return;

//       try {
//         setLoading(prev => ({ ...prev, profile: true }));
//         const res = await axios.get(`/api/users/${session.user.id}`);
//         setProfile(res.data);
//         setFormData({
//           name: res.data.name || "",
//           email: res.data.email || "",
//           phone: res.data.phone || "",
//           photoFile: null,
//           password: "",
//         });
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//         setError("Failed to load profile");
//       } finally {
//         setLoading(prev => ({ ...prev, profile: false }));
//       }
//     };

//     fetchProfile();
//   }, [session?.user?.id]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     photoFile: null,
//     password: "",
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     router.push("/login");
//   };

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//   };

//   const handlePhotoChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFormData({ ...formData, photoFile: e.target.files[0] });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(prev => ({ ...prev, profile: true }));
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("phone", formData.phone);
//       if (formData.password.trim()) {
//         data.append("password", formData.password);
//       }
//       if (formData.photoFile) {
//         data.append("photo", formData.photoFile);
//       }

//       const res = await axios.put(`/api/users/${session.user.id}`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const updatedUser = res.data.user;
//       setProfile(updatedUser);

//       session.user.photo = updatedUser.photo;
//       session.user.image = updatedUser.photo;

//       window.dispatchEvent(
//         new CustomEvent("profilePhotoUpdated", {
//           detail: updatedUser.photo,
//         })
//       );

//       setEditMode(false);
//       setFormData({
//         name: updatedUser.name || "",
//         email: updatedUser.email || "",
//         phone: updatedUser.phone || "",
//         photoFile: null,
//         password: "",
//       });
//       setSuccessMessage("Profile updated successfully");
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 5000);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       setError(error?.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(prev => ({ ...prev, profile: false }));
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: profile.name,
//       email: profile.email,
//       phone: profile.phone,
//       photoFile: null,
//       password: "",
//     });
//     setEditMode(false);
//   };

//   if (!profile) {
//     return <Loading open={true} />;
//   }

//   // Safely check if all notifications are read
//   const allRead = notifications.length > 0 ? notifications.every(n => n.read) : true;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
//       <Box sx={{ display: "flex", gap: 4 }}>
//         {/* Sidebar Menu */}
//         <Box sx={{
//           width: 260, pr: 4, p: 2,
//           border: "1px solid #ddd",
//           borderRadius: 2,
//           backgroundColor: "#f5f5f5",
//         }}>
//           {menuItems.map((item, index) => (
//             <Typography
//               key={index}
//               onClick={() => setSelectedSection(item)}
//               sx={{
//                 p: 1.5,
//                 borderRadius: 1,
//                 fontWeight: selectedSection === item ? "bold" : "normal",
//                 bgcolor: selectedSection === item ? "#d1d5db" : "transparent",
//                 cursor: "pointer",
//                 "&:hover": { bgcolor: "#e5e7eb" },
//               }}
//             >
//               {item === "Notification" ? (
//                 <Badge
//                   color="primary"
//                   variant="dot"
//                   invisible={allRead || notifications.length === 0}
//                   sx={{ mr: 1 }}
//                 >
//                   {item}
//                 </Badge>
//               ) : (
//                 item
//               )}
//             </Typography>
//           ))}
//         </Box>

//         {/* Main Content */}
//         <Box sx={{
//           flex: 1,
//           p: 2,
//           border: "1px solid #ddd",
//           borderRadius: 2,
//           backgroundColor: "#fff",
//         }}>
//           {/* Error and Success Messages */}
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
//           {successMessage && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {successMessage}
//             </Alert>
//           )}

//           {/* Profile Section */}
//           {selectedSection === "Profile" && (
//             <Card sx={{ p: 5, borderRadius: 4 }}>
//               <Typography variant="h6" sx={{ mb: 3 }}>
//                 {editMode ? "Edit Profile" : "Profile"}
//               </Typography>
//               <Grid container spacing={4} alignItems="center" minHeight={300}>
//                 <Grid item xs={12} md={4} textAlign="center">
//                   <Avatar
//                     alt="User"
//                     src={
//                       editMode
//                         ? formData.photoFile
//                           ? URL.createObjectURL(formData.photoFile)
//                           : profile.photo || "https://i.pravatar.cc/150?img=3"
//                         : profile.photo || "https://i.pravatar.cc/150?img=3"
//                     }
//                     sx={{ width: 130, height: 130, mx: "auto", mb: 2 }}
//                   />
//                   {editMode && (
//                     <IconButton component="label" color="primary">
//                       <UploadIcon />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         hidden
//                         onChange={handlePhotoChange}
//                       />
//                     </IconButton>
//                   )}
//                 </Grid>

//                 <Grid item xs={12} md={8}>
//                   {editMode ? (
//                     <>
//                       <TextField
//                         fullWidth
//                         label="Name"
//                         value={formData.name}
//                         onChange={handleChange("name")}
//                         margin="normal"
//                       />
//                       <TextField
//                         fullWidth
//                         label="Email"
//                         value={formData.email}
//                         margin="normal"
//                         disabled
//                       />
//                       <TextField
//                         fullWidth
//                         label="Phone Number"
//                         value={formData.phone}
//                         onChange={handleChange("phone")}
//                         margin="normal"
//                       />
//                       <TextField
//                         fullWidth
//                         label="New Password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange("password")}
//                         margin="normal"
//                         helperText="Leave blank to keep current password"
//                       />
//                       <Box mt={3} display="flex" gap={2}>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           startIcon={<SaveIcon />}
//                           onClick={handleSave}
//                           disabled={loading.profile}
//                         >
//                           {loading.profile ? <CircularProgress size={24} /> : "Save"}
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           startIcon={<CancelIcon />}
//                           onClick={handleCancel}
//                           disabled={loading.profile}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     </>
//                   ) : (
//                     <Box display="flex" flexDirection="column" gap={2} mt={2}>
//                       <Typography>
//                         <strong>Name:</strong> {profile.name}
//                       </Typography>
//                       <Typography>
//                         <strong>Email:</strong> {profile.email}
//                       </Typography>
//                       <Typography>
//                         <strong>Phone Number:</strong> {profile.phone}
//                       </Typography>
//                       <Box mt={4}>
//                         <Button
//                           variant="outlined"
//                           startIcon={<EditIcon />}
//                           onClick={() => setEditMode(true)}
//                         >
//                           Edit Profile
//                         </Button>
//                       </Box>
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>
//             </Card>
//           )}

//           {/* Notifications Section */}
//           {selectedSection === "Notification" && (
//             <Box>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6" component="div">Notifications</Typography>
//                 <Box>
//                   <Button
//                     variant="outlined"
//                     onClick={fetchNotifications}
//                     sx={{ mr: 2 }}
//                     disabled={loading.notifications}
//                   >
//                     Refresh
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={markAllAsRead}
//                     disabled={allRead || loading.notifications}
//                     startIcon={<CheckCircleIcon />}
//                   >
//                     Mark All as Read
//                   </Button>
//                 </Box>
//               </Box>

//               {loading.notifications ? (
//                 <Box display="flex" justifyContent="center" py={3}>
//                   <CircularProgress />
//                 </Box>
//               ) : notifications.length === 0 ? (
//                 <Alert severity="info">
//                   No notifications found. Notifications you create should appear here.
//                 </Alert>
//               ) : (
//                 <Paper elevation={3}>
//                   <List>
//                     {notifications.map((notification, index) => {
//                       const isRead = notification.read || false;
//                       return (
//                         <Box key={notification.id}>
//                           <ListItem
//                             alignItems="flex-start"
//                             sx={{
//                               backgroundColor: isRead ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
//                               position: 'relative',
//                               '&:hover': {
//                                 backgroundColor: 'action.hover',
//                               },
//                             }}
//                             onClick={() => !isRead && markAsRead(notification.id)}
//                           >
//                             <Badge
//                               color="primary"
//                               variant="dot"
//                               invisible={isRead}
//                               sx={{
//                                 position: 'absolute',
//                                 left: 8,
//                                 top: '50%',
//                                 transform: 'translateY(-50%)',
//                               }}
//                             />
//                             <ListItemText
//                               primaryTypographyProps={{
//                                 component: "div",
//                                 fontWeight: isRead ? 'normal' : 'bold',
//                                 sx: { ml: 3 }
//                               }}
//                               primary={notification.title}
//                               secondaryTypographyProps={{ component: "div" }}
//                               secondary={
//                                 <>
//                                   <Typography component="span" variant="body2" color="text.primary" display="block" gutterBottom sx={{ ml: 3 }}>
//                                     {notification.message}
//                                   </Typography>
//                                   <Typography component="span" variant="caption" display="block" color="text.secondary" sx={{ ml: 3 }}>
//                                     {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                                   </Typography>
//                                 </>
//                               }
//                             />
//                             {!isRead && (
//                               <IconButton
//                                 edge="end"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   markAsRead(notification.id);
//                                 }}
//                               >
//                                 <CheckCircleIcon color="primary" />
//                               </IconButton>
//                             )}
//                           </ListItem>
//                           {index < notifications.length - 1 && <Divider />}
//                         </Box>
//                       );
//                     })}
//                   </List>
//                 </Paper>
//               )}
//             </Box>
//           )}
//           {/* History Section */}
//           {selectedSection === "History" && (
//             <Box>
//               <Typography variant="h6" gutterBottom>
//                 Your Booking History
//               </Typography>

//               {loading.history ? (
//                 <Box display="flex" justifyContent="center" py={3}>
//                   <CircularProgress />
//                 </Box>
//               ) : bookingHistory.length > 0 ? (
//                 bookingHistory.map((booking) => (
//                   <Box
//                     key={booking.id}
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       border: "1px solid #ccc",
//                       borderRadius: 2,
//                       backgroundColor: "#f9f9f9",
//                     }}
//                   >
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Venue: {booking.VenueType?.name || "Unknown"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Location: {booking.venue?.name || "Unknown venue"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Date: {new Date(booking.booking_date).toLocaleDateString()}
//                     </Typography>
//                     <Typography variant="body2">
//                       Time: {booking.TimePackage ?
//                         `${formatTime(booking.TimePackage.startTime)} - ${formatTime(booking.TimePackage.endTime)}` :
//                         "N/A"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Floral Service: {booking.floralService?.name || "None selected"}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="bold">
//                       Total: {booking.total_amount?.toLocaleString()} MMK
//                     </Typography>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography color="text.secondary">No booking history found.</Typography>
//               )}
//             </Box>
//           )}


//            {/* Favourite Section */}
//           {selectedSection === "History" && (
//             <Box>
//               <Typography variant="h6" gutterBottom>
//                 Your Booking History
//               </Typography>

//               {loading.history ? (
//                 <Box display="flex" justifyContent="center" py={3}>
//                   <CircularProgress />
//                 </Box>
//               ) : bookingHistory.length > 0 ? (
//                 bookingHistory.map((booking) => (
//                   <Box
//                     key={booking.id}
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       border: "1px solid #ccc",
//                       borderRadius: 2,
//                       backgroundColor: "#f9f9f9",
//                     }}
//                   >
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Venue: {booking.VenueType?.name || "Unknown"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Location: {booking.venue?.name || "Unknown venue"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Date: {new Date(booking.booking_date).toLocaleDateString()}
//                     </Typography>
//                     <Typography variant="body2">
//                       Time: {booking.TimePackage ?
//                         `${formatTime(booking.TimePackage.startTime)} - ${formatTime(booking.TimePackage.endTime)}` :
//                         "N/A"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Floral Service: {booking.floralService?.name || "None selected"}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="bold">
//                       Total: {booking.total_amount?.toLocaleString()} MMK
//                     </Typography>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography color="text.secondary">No booking history found.</Typography>
//               )}
//             </Box>
//           )}

//           {/* Logout Section */}
//           {selectedSection === "Log Out" && (
//             <Dialog open={true}>
//               <DialogTitle>Confirm Logout</DialogTitle>
//               <DialogContent>
//                 <Typography>Are you sure you want to log out?</Typography>
//               </DialogContent>
//               <DialogActions>
//                 <Button
//                   onClick={() => setSelectedSection("Profile")}
//                   color="inherit"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleLogout}
//                   color="error"
//                   variant="contained"
//                 >
//                   Confirm
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           )}
//         </Box>
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }




'use client';

import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  TextField,
  Typography,
  ListItem,
  Paper,
  List,
  ListItemText,
  Divider,
  CircularProgress,
  Badge,
  Alert,
  Snackbar,
  Pagination,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Loading from "@/src/components/Loading";
import Link from "next/link";

const formatTime = (timeString) => {
  if (!timeString) return "N/A";
  const date = new Date(timeString);
  return isNaN(date) ? "Invalid time" : date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editMode, setEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [loading, setLoading] = useState({
    profile: false,
    history: false,
    notifications: false,
    favourite: false,
  });

  const [pagination, setPagination] = useState({
    notification: { page: 1, itemsPerPage: 5 },
    history: { page: 1, itemsPerPage: 3 },
    favourite: { page: 1, itemsPerPage: 3 },
  });

  const menuItems = ["Profile", "Notification", "History", "Favourite", "Log Out"];

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setSelectedSection(section);
    }
  }, [searchParams]);

  const fetchNotifications = async () => {
    try {
      setLoading(prev => ({ ...prev, notifications: true }));
      setError(null);
      const response = await axios.get('/api/notifications');

      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        throw new Error('Invalid notifications data format');
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.response?.data?.error || 'Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoading(prev => ({ ...prev, notifications: false }));
    }
  };

  const fetchFavourites = async () => {
    try {
      setLoading(prev => ({ ...prev, favourite: true }));
      const userId = session.user.id;
      const response = await axios.get(`/api/favourite?userId=${userId}`);
      setFavourites(response.data);
    } catch (err) {
      console.error('Error fetching favourites:', err);
      setError(err.response?.data?.error || 'Failed to load favourites');
    } finally {
      setLoading(prev => ({ ...prev, favourite: false }));
    }
  };

  const removeFavourite = async (favouriteId) => {
    try {
      await axios.delete(`/api/favourite/${favouriteId}`);
      setFavourites(favourites.filter(fav => fav.id !== favouriteId));
      showSnackbar('Removed from favourites', 'success');
    } catch (err) {
      console.error('Error removing favourite:', err);
      showSnackbar(err.response?.data?.error || 'Failed to remove favourite', 'error');
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}`, { read: true });
      setNotifications(prev => prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      ));
      showSnackbar('Notification marked as read', 'success');
    } catch (err) {
      console.error('Error marking as read:', err);
      showSnackbar(err.response?.data?.error || 'Failed to mark as read', 'error');
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('/api/notifications', { read: true });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      showSnackbar('All notifications marked as read', 'success');
    } catch (err) {
      console.error('Error marking all as read:', err);
      showSnackbar(err.response?.data?.error || 'Failed to mark all as read', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (selectedSection === "Notification") {
      fetchNotifications();
    } else if (selectedSection === "Favourite") {
      fetchFavourites();
    }
  }, [selectedSection]);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (selectedSection !== "History" || !session?.user?.id) return;

      try {
        setLoading(prev => ({ ...prev, history: true }));
        setError(null);

        const userId = session.user.id;
        const response = await fetch(`/api/booking-info?userId=${userId}`);

        if (!response.ok) {
          throw new Error(response.statusText || 'Unknown error occurred');
        }

        const data = await response.json();
        setBookingHistory(data);
      } catch (error) {
        console.error("Booking history fetch error:", error);
        setError(error.message || 'Failed to fetch booking history');
      } finally {
        setLoading(prev => ({ ...prev, history: false }));
      }
    };

    fetchBookingHistory();
  }, [selectedSection, session?.user?.id]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(prev => ({ ...prev, profile: true }));
        const res = await axios.get(`/api/users/${session.user.id}`);
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          photoFile: null,
          password: "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(prev => ({ ...prev, profile: false }));
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photoFile: null,
    password: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    router.push("/login");
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, photoFile: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (formData.password.trim()) {
        data.append("password", formData.password);
      }
      if (formData.photoFile) {
        data.append("photo", formData.photoFile);
      }

      const res = await axios.put(`/api/users/${session.user.id}`, data);
      const updatedUser = res.data.user;
      setProfile(updatedUser);

      session.user.photo = updatedUser.photo;
      session.user.image = updatedUser.photo;

      window.dispatchEvent(
        new CustomEvent("profilePhotoUpdated", {
          detail: updatedUser.photo,
        })
      );

      setEditMode(false);
      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        photoFile: null,
        password: "",
      });
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      photoFile: null,
      password: "",
    });
    setEditMode(false);
  };

  const handlePaginationChange = (section, page) => {
    setPagination(prev => ({
      ...prev,
      [section]: { ...prev[section], page }
    }));
  };

  const getPaginatedData = (data, section) => {
    const { page, itemsPerPage } = pagination[section];
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getPageCount = (data, section) => {
    return Math.ceil(data.length / pagination[section].itemsPerPage);
  };

  const allRead = notifications.length > 0 ? notifications.every(n => n.read) : true;

  if (!profile) {
    return <Loading open={true} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Sidebar Menu */}
        <Box sx={{
          width: 260, pr: 4, p: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}>
          {menuItems.map((item, index) => (
            <Typography
              key={index}
              onClick={() => setSelectedSection(item)}
              sx={{
                p: 1.5,
                borderRadius: 1,
                fontWeight: selectedSection === item ? "bold" : "normal",
                bgcolor: selectedSection === item ? "#d1d5db" : "transparent",
                cursor: "pointer",
                "&:hover": { bgcolor: "#e5e7eb" },
              }}
            >
              {item === "Notification" ? (
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={allRead || notifications.length === 0}
                  sx={{ mr: 1 }}
                >
                  {item}
                </Badge>
              ) : (
                item
              )}
            </Typography>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{
          flex: 1,
          p: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}>
          {/* Error and Success Messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {/* Profile Section */}
          {selectedSection === "Profile" && (
            <Box>
              <Card sx={{ p: 5, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold' }} gutterBottom >
                  {editMode ? "Edit Profile" : "Profile"}
                </Typography>
                <Grid container spacing={4} alignItems="center" minHeight={300}>
                  <Grid item xs={12} md={4} textAlign="center">
                    <Avatar
                      alt="User"
                      src={
                        editMode
                          ? formData.photoFile
                            ? URL.createObjectURL(formData.photoFile)
                            : profile.photo || "https://i.pravatar.cc/150?img=3"
                          : profile.photo || "https://i.pravatar.cc/150?img=3"
                      }
                      sx={{ width: 130, height: 130, mx: "auto", mb: 2 }}
                    />
                    {editMode && (
                      <IconButton component="label" color="primary">
                        <UploadIcon />
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handlePhotoChange}
                        />
                      </IconButton>
                    )}
                  </Grid>

                  <Grid item xs={12} md={8}>
                    {editMode ? (
                      <>
                        <TextField
                          fullWidth
                          label="Name"
                          value={formData.name}
                          onChange={handleChange("name")}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          value={formData.email}
                          margin="normal"
                          disabled
                        />
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={formData.phone}
                          onChange={handleChange("phone")}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="New Password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange("password")}
                          margin="normal"
                          helperText="Leave blank to keep current password"
                        />
                        <Box mt={3} display="flex" gap={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={loading.profile}
                          >
                            {loading.profile ? <CircularProgress size={24} /> : "Save"}
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            disabled={loading.profile}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <Typography>
                          <strong>Name:</strong> {profile.name}
                        </Typography>
                        <Typography>
                          <strong>Email:</strong> {profile.email}
                        </Typography>
                        <Typography>
                          <strong>Phone Number:</strong> {profile.phone}
                        </Typography>
                        <Box mt={4}>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => setEditMode(true)}
                          >
                            Edit Profile
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Card>

            </Box>
          )}

          {selectedSection === "Notification" && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh', // total section height
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                  Notifications
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={fetchNotifications}
                    sx={{ mr: 2 }}
                    disabled={loading.notifications}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={markAllAsRead}
                    disabled={allRead || loading.notifications}
                    startIcon={<CheckCircleIcon />}
                  >
                    Mark All as Read
                  </Button>
                </Box>
              </Box>

              {/* Notification list area with fixed height */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {loading.notifications ? (
                  <Box display="flex" justifyContent="center" py={3} flex={1}>
                    <CircularProgress />
                  </Box>
                ) : notifications.length === 0 ? (
                  <Alert severity="info" sx={{ flex: 1 }}>
                    No notifications found.
                  </Alert>
                ) : (
                  <Paper
                    elevation={3}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '510px', // 🔹 fixed height for list area
                    }}
                  >
                    <List sx={{ flex: 1 }}>
                      {getPaginatedData(notifications, 'notification').map((notification, index) => {
                        const isRead = notification.read || false;
                        return (
                          <Box key={notification.id}>
                            <ListItem
                              alignItems="flex-start"
                              sx={{
                                backgroundColor: isRead ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
                                position: 'relative',
                                '&:hover': { backgroundColor: 'action.hover' },
                              }}
                              onClick={() => !isRead && markAsRead(notification.id)}
                            >
                              <Badge
                                color="primary"
                                variant="dot"
                                invisible={isRead}
                                sx={{
                                  position: 'absolute',
                                  left: 8,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                }}
                              />
                              <ListItemText
                                primaryTypographyProps={{
                                  component: "div",
                                  fontWeight: isRead ? 'normal' : 'bold',
                                  sx: { ml: 3 }
                                }}
                                primary={notification.title}
                                secondary={
                                  <>
                                    <Typography variant="body2" display="block" gutterBottom sx={{ ml: 3 }}>
                                      {notification.message}
                                    </Typography>
                                    <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 3 }}>
                                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                    </Typography>
                                  </>
                                }
                              />
                              {!isRead && (
                                <IconButton
                                  edge="end"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <CheckCircleIcon color="primary" />
                                </IconButton>
                              )}
                            </ListItem>
                            {index < getPaginatedData(notifications, 'notification').length - 1 && <Divider />}
                          </Box>
                        );
                      })}
                    </List>
                  </Paper>
                )}
              </Box>

              {/* Pagination */}
              {notifications.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Pagination
                    count={getPageCount(notifications, 'notification')}
                    page={pagination.notification.page}
                    onChange={(e, page) => handlePaginationChange('notification', page)}
                    color="primary"
                  />
                </Box>
              )}
            </Box>
          )}


          {/* History Section */}
          {selectedSection === "History" && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh', // same total height as Notifications section for consistent UI
              }}
            >
              {/* Header */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 4, fontWeight: 'bold' }}
              >
                Your Booking History
              </Typography>

              {/* Content area with fixed height so pagination position stays consistent */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '540px', // matches fixed list height from Notifications
                }}
              >
                {loading.history ? (
                  <Box display="flex" justifyContent="center" py={3} flex={1}>
                    <CircularProgress />
                  </Box>
                ) : bookingHistory.length > 0 ? (
                  <Box sx={{ flex: 1 }}>
                    {getPaginatedData(bookingHistory, 'history').map((booking) => (
                      <Box
                        key={booking.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          Venue: {booking.VenueType?.name || "Unknown"}
                        </Typography>
                        <Typography variant="body2">
                          Location: {booking.venue?.name || "Unknown venue"}
                        </Typography>
                        <Typography variant="body2">
                          Date: {new Date(booking.booking_date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          Time: {booking.TimePackage
                            ? `${formatTime(booking.TimePackage.startTime)} - ${formatTime(booking.TimePackage.endTime)}`
                            : "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Floral Service: {booking.floralService?.name || "None selected"}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Total: {booking.total_amount?.toLocaleString()} MMK
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    No booking history found.
                  </Typography>
                )}
              </Box>

              {/* Pagination fixed in section */}
              {bookingHistory.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Pagination
                    count={getPageCount(bookingHistory, 'history')}
                    page={pagination.history.page}
                    onChange={(e, page) => handlePaginationChange('history', page)}
                    color="primary"
                  />
                </Box>
              )}
            </Box>
          )}


          {/* Favourite Section */}
          {selectedSection === "Favourite" && (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 4, fontWeight: "bold" }}
              >
                Your Favourite Events
              </Typography>

              {loading.favourite ? (
                <Box display="flex" justifyContent="center" py={3}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              ) : favourites.length > 0 ? (
                <>
                  <Grid container spacing={4} justifyContent="center">
                    {getPaginatedData(favourites, "favourite").map((favourite) => (
                      <Grid item key={favourite.id}>
                        <Card
                          sx={{
                            width: 220,
                            height: 360,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            boxShadow: "0 2px 8px rgba(234, 226, 226, 0.3)",
                            borderRadius: "16px",
                            border: "3px solid transparent",
                            borderColor: "white",
                            transition: "all 0.5s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              borderColor: "#ff6f00",
                              boxShadow: "0 4px 12px rgba(255, 111, 0, 0.9)",
                            },
                            backgroundColor: "#111",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          {/* Remove Favourite Button */}
                          <IconButton
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              try {
                                await axios.delete(`/api/favourite/${favourite.id}`);
                                setFavourites(
                                  favourites.filter((fav) => fav.id !== favourite.id)
                                );
                                showSnackbar("Removed from favorites", "success");
                              } catch (err) {
                                console.error("Error removing favorite:", err);
                                showSnackbar(
                                  err.response?.data?.error ||
                                  "Failed to remove favorite",
                                  "error"
                                );
                              }
                            }}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              zIndex: 2,
                              color: "#ff1744",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                              },
                            }}
                          >
                            <FavoriteIcon />
                          </IconButton>

                          {/* Event Link */}
                          <Link
                            href={`/events/${favourite.eventId}`}
                            passHref
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                            }}
                          >
                            {/* Event Image */}
                            <Box sx={{ height: 180, overflow: "hidden" }}>
                              <CardMedia
                                component="img"
                                image={
                                  favourite.Event?.photo || "/images/default.jpg"
                                }
                                alt={favourite.Event?.name}
                                sx={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>

                            {/* Event Details */}
                            <CardContent
                              sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                px: 2,
                                py: 1,
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: "bold",
                                    color: "#ec7921ff",
                                    mb: 1,
                                  }}
                                >
                                  {favourite.Event?.name || "Untitled Event"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#aaa",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {favourite.Event?.description ||
                                    "No description available"}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mt: 2,
                                }}
                              >
                                <Chip
                                  label="Event"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#fff3e0",
                                    color: "#ff6f00",
                                  }}
                                />
                              </Box>
                            </CardContent>
                          </Link>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Pagination */}
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                      count={getPageCount(favourites, "favourite")}
                      page={pagination.favourite.page}
                      onChange={(e, page) =>
                        handlePaginationChange("favourite", page)
                      }
                      color="primary"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "black",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "primary.main",
                          color: "white",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        },
                      }}
                    />
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary">
                  No favourite events found.
                </Typography>
              )}
            </Box>
          )}


          {/* Log Out Section */}
          {selectedSection === "Log Out" && (
            <Dialog open={true}>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogContent>
                <Typography>Are you sure you want to log out?</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setSelectedSection("Profile")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  color="error"
                  variant="contained"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}