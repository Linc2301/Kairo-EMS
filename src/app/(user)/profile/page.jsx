// 'use client';

// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Container,
//   Grid,
//   IconButton,
//   TextField,
//   Typography,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import UploadIcon from '@mui/icons-material/Upload';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function ProfilePage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     photoFile: null,
//     password: '',
//   });

//   useEffect(() => {
//     if (!session) {
//       router.push('/login');
//     }
//   }, [session, router]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const res = await axios.get(`/api/users/${session.user.id}`);
//         setProfile(res.data);
//         setFormData({
//           name: res.data.name || '',
//           email: res.data.email || '',
//           phone: res.data.phone || '',
//           photoFile: null,
//           password: '',
//         });
//       } catch (err) {
//         console.error('Failed to load profile:', err);
//       }
//     };

//     fetchProfile();
//   }, [session?.user?.id]);

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
//       const data = new FormData();
//       data.append('name', formData.name);
//       data.append('phone', formData.phone);
//       if (formData.password.trim()) {
//         data.append('password', formData.password);
//       }
//       if (formData.photoFile) {
//         data.append('photo', formData.photoFile);
//       }

//       const res = await axios.put(`/api/users/${session.user.id}`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const updatedUser = res.data.user;
//       setProfile(updatedUser);

//       // ✅ Manually patch session user photo (temporary in memory)
//       session.user.photo = updatedUser.photo;
//       session.user.image = updatedUser.photo;

//       // Trigger navbar update
//       window.dispatchEvent(new CustomEvent('profilePhotoUpdated', {
//         detail: updatedUser.photo
//       }));

//       setEditMode(false);
//       setFormData({
//         name: updatedUser.name || '',
//         email: updatedUser.email || '',
//         phone: updatedUser.phone || '',
//         photoFile: null,
//         password: '',
//       });
//     } catch (error) {
//       console.error('❌ Failed to update profile:', error);
//       alert(error?.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: profile.name,
//       email: profile.email,
//       phone: profile.phone,
//       photoFile: null,
//       password: '',
//     });
//     setEditMode(false);
//   };

//   if (!profile) {
//     return <Typography textAlign="center">Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
//       <Card sx={{ p: 5, borderRadius: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3 }}>
//           {editMode ? 'Edit Profile' : 'Profile'}
//         </Typography>

//         <Grid container spacing={4} alignItems="center" minHeight={300}>
//           <Grid item xs={12} md={4} textAlign="center">
//             <Avatar
//               alt="User"
//               src={
//                 editMode
//                   ? formData.photoFile
//                     ? URL.createObjectURL(formData.photoFile)
//                     : profile.photo || 'https://i.pravatar.cc/150?img=3'
//                   : profile.photo || 'https://i.pravatar.cc/150?img=3'
//               }
//               sx={{ width: 130, height: 130, mx: 'auto', mb: 2 }}
//             />
//             {editMode && (
//               <IconButton component="label" color="primary">
//                 <UploadIcon />
//                 <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
//               </IconButton>
//             )}
//           </Grid>

//           <Grid item xs={12} md={8}>
//             {editMode ? (
//               <>
//                 <TextField fullWidth label="Name" value={formData.name} onChange={handleChange('name')} margin="normal" />
//                 <TextField fullWidth label="Email" value={formData.email} margin="normal" disabled />
//                 <TextField fullWidth label="Phone Number" value={formData.phone} onChange={handleChange('phone')} margin="normal" />
//                 <TextField fullWidth label="New Password" type="password" value={formData.password} onChange={handleChange('password')} margin="normal" helperText="Leave blank to keep current password" />

//                 <Box mt={3} display="flex" gap={2}>
//                   <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
//                     Save
//                   </Button>
//                   <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={handleCancel}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box display="flex" flexDirection="column" gap={2} mt={2}>
//                 <Typography>
//                   <strong>Name:</strong> {profile.name}
//                 </Typography>
//                 <Typography>
//                   <strong>Email:</strong> {profile.email}
//                 </Typography>
//                 <Typography>
//                   <strong>Phone Number:</strong> {profile.phone}
//                 </Typography>

//                 <Box mt={4}>
//                   <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
//                     Edit Profile
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </Grid>
//         </Grid>
//       </Card>
//     </Container>
//   );
// }

// 'use client';

// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useState } from 'react';

// export default function FacebookStyleProfile() {
//   const [coverPhoto, setCoverPhoto] = useState('/card1.jpg');
//   const [profilePhoto, setProfilePhoto] = useState('/login.jpg');

//   return (
//     <Box sx={{ bgcolor: '#18191a', color: 'white', pb: 5 }}>
//       <Box sx={{ position: 'relative', width: '100%', height: 320 }}>
//         {/* Cover Photo */}
//         <Box
//           sx={{
//             width: '100%',
//             height: '100%',
//             backgroundImage: `url(${coverPhoto})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />

//         {/* Edit Cover Button */}
//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//             position: 'absolute',
//             bottom: 16,
//             right: 16,
//             bgcolor: '#3a3b3c',
//             color: 'white',
//             textTransform: 'none',
//             ':hover': { bgcolor: '#4e4f50' },
//           }}
//           startIcon={<EditIcon />}
//         >
//           Edit cover photo
//         </Button>

//         {/* Profile Photo */}
//         <Avatar
//           src={profilePhoto}
//           sx={{
//             position: 'absolute',
//             bottom: -50,
//             left: 32,
//             width: 120,
//             height: 120,
//             border: '4px solid #18191a',
//           }}
//         />
//       </Box>

//       {/* Info & Buttons */}
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             mt: 6,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             flexWrap: 'wrap',
//           }}
//         >
//           <Box sx={{ ml: 1 }}>
//             <Typography variant="h5" fontWeight="bold">
//               Ye Htut Naung
//             </Typography>

//           </Box>

//           <Box
//             sx={{
//               display: 'flex',
//               gap: 1,
//               mt: { xs: 2, sm: 0 },
//               flexWrap: 'wrap',
//             }}
//           >

//             <Button
//               variant="outlined"
//               sx={{
//                 textTransform: 'none',
//                 color: 'white',
//                 borderColor: '#3e4042',
//                 bgcolor: '#3a3b3c',
//                 ':hover': { bgcolor: '#4e4f50' },
//               }}
//               startIcon={<EditIcon />}
//             >
//               Edit profile
//             </Button>

//           </Box>
//         </Box>

//         {/* Tabs Placeholder */}
//         <Box
//           sx={{
//             display: 'flex',
//             mt: 4,
//             borderBottom: '1px solid #3e4042',
//             gap: 3,
//             pb: 1,
//           }}
//         >
//           {['Notification', 'Review'].map((tab) => (
//             <Typography
//               key={tab}
//               sx={{
//                 color: '#b0b3b8',
//                 fontWeight: 500,
//                 cursor: 'pointer',
//                 '&:hover': { color: 'white' },
//               }}
//             >
//               {tab}
//             </Typography>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// "use client";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Divider,
//   FormControl,
//   Card,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Grid,
//   IconButton,
// } from '@mui/material';

// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import UploadIcon from '@mui/icons-material/Upload';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const menuItems = [
//   'Profile',
//   'Photo',
//   'Notifications',
//   'History',

//   'Close account',
// ];

// export default function ProfileSettingsPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [editMode, setEditMode] = useState(false);
//   const [selectedSection, setSelectedSection] = useState('Profile');
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     photoFile: null,
//     password: '',
//   });

//   useEffect(() => {
//     if (!session) {
//       router.push('/login');
//     }
//   }, [session, router]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const res = await axios.get(`/api/users/${session.user.id}`);
//         setProfile(res.data);
//         setFormData({
//           name: res.data.name || '',
//           email: res.data.email || '',
//           phone: res.data.phone || '',
//           photoFile: null,
//           password: '',
//         });
//       } catch (err) {
//         console.error('Failed to load profile:', err);
//       }
//     };

//     fetchProfile();
//   }, [session?.user?.id]);

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
//       const data = new FormData();
//       data.append('name', formData.name);
//       data.append('phone', formData.phone);
//       if (formData.password.trim()) {
//         data.append('password', formData.password);
//       }
//       if (formData.photoFile) {
//         data.append('photo', formData.photoFile);
//       }

//       const res = await axios.put(`/api/users/${session.user.id}`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const updatedUser = res.data.user;
//       setProfile(updatedUser);

//       session.user.photo = updatedUser.photo;
//       session.user.image = updatedUser.photo;

//       window.dispatchEvent(new CustomEvent('profilePhotoUpdated', {
//         detail: updatedUser.photo,
//       }));

//       setEditMode(false);
//       setFormData({
//         name: updatedUser.name || '',
//         email: updatedUser.email || '',
//         phone: updatedUser.phone || '',
//         photoFile: null,
//         password: '',
//       });
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       alert(error?.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: profile.name,
//       email: profile.email,
//       phone: profile.phone,
//       photoFile: null,
//       password: '',
//     });
//     setEditMode(false);
//   };

//   if (!profile) {
//     return <Typography textAlign="center">Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
//       <Box sx={{ display: 'flex' }}>
//         <Box sx={{ width: 260, pr: 4 }}>
//           {menuItems.map((item, index) => (
//             <Typography
//               key={index}
//               onClick={() => setSelectedSection(item)}
//               sx={{
//                 p: 1.5,
//                 borderRadius: 1,
//                 fontWeight: selectedSection === item ? 'bold' : 'normal',
//                 bgcolor: selectedSection === item ? '#d1d5db' : 'transparent',
//                 cursor: 'pointer',
//                 '&:hover': { bgcolor: '#e5e7eb' },
//               }}
//             >
//               {item}
//             </Typography>
//           ))}
//         </Box>

//         <Box sx={{ flex: 1 }}>
//           {selectedSection === 'Profile' && (
//             <Card sx={{ p: 5, borderRadius: 4 }}>
//               <Typography variant="h6" sx={{ mb: 3 }}>
//                 {editMode ? 'Edit Profile' : 'Profile'}
//               </Typography>
//               <Grid container spacing={4} alignItems="center" minHeight={300}>
//                 <Grid item xs={12} md={4} textAlign="center">
//                   <Avatar
//                     alt="User"
//                     src={
//                       editMode
//                         ? formData.photoFile
//                           ? URL.createObjectURL(formData.photoFile)
//                           : profile.photo || 'https://i.pravatar.cc/150?img=3'
//                         : profile.photo || 'https://i.pravatar.cc/150?img=3'
//                     }
//                     sx={{ width: 130, height: 130, mx: 'auto', mb: 2 }}
//                   />
//                   {editMode && (
//                     <IconButton component="label" color="primary">
//                       <UploadIcon />
//                       <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
//                     </IconButton>
//                   )}
//                 </Grid>

//                 <Grid item xs={12} md={8}>
//                   {editMode ? (
//                     <>
//                       <TextField fullWidth label="Name" value={formData.name} onChange={handleChange('name')} margin="normal" />
//                       <TextField fullWidth label="Email" value={formData.email} margin="normal" disabled />
//                       <TextField fullWidth label="Phone Number" value={formData.phone} onChange={handleChange('phone')} margin="normal" />
//                       <TextField fullWidth label="New Password" type="password" value={formData.password} onChange={handleChange('password')} margin="normal" helperText="Leave blank to keep current password" />

//                       <Box mt={3} display="flex" gap={2}>
//                         <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
//                           Save
//                         </Button>
//                         <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={handleCancel}>
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
//                         <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
//                           Edit Profile
//                         </Button>
//                       </Box>
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>
//             </Card>
//           )}

//           {selectedSection === 'Photo' && (
//             <Card sx={{ p: 5, borderRadius: 4 }}>
//               <Typography variant="h5" fontWeight="bold" mb={3}>
//                 Profile Photo Settings
//               </Typography>
//               <Button variant="contained" component="label">
//                 Upload New Photo
//                 <input type="file" hidden />
//               </Button>
//             </Card>
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// }

"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
  ListItem,
  Paper,
  List,
  ListItemText,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Loading from "@/src/components/Loading";

const menuItems = ["Profile", "Notification", "History", "Log Out"];

const mockHistory = [
  { id: 1, action: "Booked 'Floral Package A'", date: "2025-07-01" },
  { id: 2, action: "Updated profile information", date: "2025-07-15" },
  { id: 3, action: "Cancelled 'Venue 3'", date: "2025-07-20" },
];

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    // Clear auth info – depends on how you're storing it
    localStorage.removeItem("token"); // Example if you're storing a token
    sessionStorage.clear(); // optional
    router.push("/login"); // Redirect to login page
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photoFile: null,
    password: "",
  });

  const mockNotifications = [
    {
      id: 1,
      title: "New Event Added",
      message: "Check out the new event “Summer Gala” happening next week!",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "Your booking for Floral Design has been confirmed.",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Profile Updated",
      message: "You successfully updated your profile information.",
      time: "2 days ago",
    },
  ];

  // Protect route
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      try {
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
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  // Poll for notifications
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     if (!session?.user?.id) return;

  //     try {
  //       const res = await axios.get(`/api/notifications/${session.user.id}`);
  //       console.log("Notifications fetched:", res.data); // <- Add this
  //       setNotifications(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch notifications:", err);
  //     }
  //   };

  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 1000);
  //   return () => clearInterval(interval);
  // }, [session?.user?.id]);

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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (formData.password.trim()) {
        data.append("password", formData.password);
      }
      if (formData.photoFile) {
        data.append("photo", formData.photoFile);
      }

      const res = await axios.put(`/api/users/${session.user.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error?.response?.data?.message || "Something went wrong.");
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

  if (!profile) {
    return <Loading open={true}/>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Sidebar Menu */}
        <Box sx={{ width: 260, pr: 4 ,p: 2,
      border: "1px solid #ddd",
      borderRadius: 2,
      backgroundColor: "#f5f5f5",}}>
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
              {item}
            </Typography>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1,
           p: 2,
      border: "1px solid #ddd",
      borderRadius: 2,
      backgroundColor: "#fff",
         }}>
          {/* === Profile Section === */}
          {selectedSection === "Profile" && (
            <Card sx={{ p: 5, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
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
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
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
          )}

          {/* === Notifications Section ===
          {notifications.map((notif, idx) => (
            <div key={idx}>
              <p>{notif.message}</p>
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
            </div>
          ))} */}

          {/* === Photo (Optional Stub) === */}
          {selectedSection === "Notification" && (
            <Paper elevation={3} sx={{ mt: 2 }}>
              <List>
                {mockNotifications.map((n, index) => (
                  <Box key={n.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={n.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {n.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              color="text.secondary"
                            >
                              {n.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < mockNotifications.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          )}

          {selectedSection === "History" && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Your Activity History
              </Typography>

              {mockHistory.length > 0 ? (
                mockHistory.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <Typography variant="body1">{item.action}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">No history yet.</Typography>
              )}
            </Box>
          )}

          {selectedSection === "Log Out" && (
            <>
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
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
