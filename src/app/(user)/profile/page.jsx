
// "use client";

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
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import UploadIcon from "@mui/icons-material/Upload";
// import { useSession, update } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     photoFile: null,
//     password: "",
//   });

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/login");
//     }
//   }, [status, session, router]);

//   // Load user profile from DB
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!session?.user?.id) return;

//       try {
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

//       setProfile(res.data.user);
//       setEditMode(false);
//       setFormData({
//         name: res.data.user.name || "",
//         email: res.data.user.email || "",
//         phone: res.data.user.phone || "",
//         photoFile: null,
//         password: "",
//       });

//       // ✅ Refresh the session to get updated photo
//       await update();

//     } catch (error) {
//       console.error("❌ Failed to update profile:", error);
//       alert(error?.response?.data?.message || "Something went wrong.");
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

//   if (status === "loading" || !profile) {
//     return <Typography textAlign="center">Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
//       <Card sx={{ p: 5, borderRadius: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3 }}>
//           {editMode ? "Edit Profile" : "Profile"}
//         </Typography>

//         <Grid container spacing={4} alignItems="center" minHeight={300}>
//           <Grid item xs={12} md={4} textAlign="center">
//             <Avatar
//               alt="User"
//               src={
//                 editMode
//                   ? formData.photoFile
//                     ? URL.createObjectURL(formData.photoFile)
//                     : profile.photo || "https://i.pravatar.cc/150?img=3"
//                   : profile.photo || "https://i.pravatar.cc/150?img=3"
//               }
//               sx={{ width: 130, height: 130, mx: "auto", mb: 2 }}
//             />
//             {editMode && (
//               <IconButton component="label" color="primary">
//                 <UploadIcon />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={handlePhotoChange}
//                 />
//               </IconButton>
//             )}
//           </Grid>

//           <Grid item xs={12} md={8}>
//             {editMode ? (
//               <>
//                 <TextField
//                   fullWidth
//                   label="Name"
//                   value={formData.name}
//                   onChange={handleChange("name")}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   value={formData.email}
//                   margin="normal"
//                   disabled
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange("phone")}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="New Password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange("password")}
//                   margin="normal"
//                   helperText="Leave blank to keep current password"
//                 />

//                 <Box mt={3} display="flex" gap={2}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SaveIcon />}
//                     onClick={handleSave}
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     startIcon={<CancelIcon />}
//                     onClick={handleCancel}
//                   >
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
//                   <Button
//                     variant="outlined"
//                     startIcon={<EditIcon />}
//                     onClick={() => setEditMode(true)}
//                   >
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


'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photoFile: null,
    password: '',
  });

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await axios.get(`/api/users/${session.user.id}`);
        setProfile(res.data);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          photoFile: null,
          password: '',
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

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
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      if (formData.password.trim()) {
        data.append('password', formData.password);
      }
      if (formData.photoFile) {
        data.append('photo', formData.photoFile);
      }

      const res = await axios.put(`/api/users/${session.user.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = res.data.user;
      setProfile(updatedUser);

      // ✅ Manually patch session user photo (temporary in memory)
      session.user.photo = updatedUser.photo;
      session.user.image = updatedUser.photo;

      // Trigger navbar update
      window.dispatchEvent(new CustomEvent('profilePhotoUpdated', {
        detail: updatedUser.photo
      }));

      setEditMode(false);
      setFormData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        photoFile: null,
        password: '',
      });
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      alert(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      photoFile: null,
      password: '',
    });
    setEditMode(false);
  };

  if (!profile) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
      <Card sx={{ p: 5, borderRadius: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {editMode ? 'Edit Profile' : 'Profile'}
        </Typography>

        <Grid container spacing={4} alignItems="center" minHeight={300}>
          <Grid item xs={12} md={4} textAlign="center">
            <Avatar
              alt="User"
              src={
                editMode
                  ? formData.photoFile
                    ? URL.createObjectURL(formData.photoFile)
                    : profile.photo || 'https://i.pravatar.cc/150?img=3'
                  : profile.photo || 'https://i.pravatar.cc/150?img=3'
              }
              sx={{ width: 130, height: 130, mx: 'auto', mb: 2 }}
            />
            {editMode && (
              <IconButton component="label" color="primary">
                <UploadIcon />
                <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            {editMode ? (
              <>
                <TextField fullWidth label="Name" value={formData.name} onChange={handleChange('name')} margin="normal" />
                <TextField fullWidth label="Email" value={formData.email} margin="normal" disabled />
                <TextField fullWidth label="Phone Number" value={formData.phone} onChange={handleChange('phone')} margin="normal" />
                <TextField fullWidth label="New Password" type="password" value={formData.password} onChange={handleChange('password')} margin="normal" helperText="Leave blank to keep current password" />

                <Box mt={3} display="flex" gap={2}>
                  <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={handleCancel}>
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
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
