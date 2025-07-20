// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   CircularProgress,
// } from '@mui/material';

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="80vh"
//       p={3}
//     >
//       <Avatar
//         src={session?.user?.image || ''}
//         alt={session?.user?.name}
//         sx={{ width: 80, height: 80, mb: 2 }}
//       />
//       <Typography variant="h5" gutterBottom>
//         {session?.user?.name || 'User'}
//       </Typography>
//       <Typography variant="body1" color="textSecondary" gutterBottom>
//         {session?.user?.email}
//       </Typography>

//       <Button
//         variant="contained"
//         color="error"
//         onClick={() => signOut({ callbackUrl: '/login' })}
//         sx={{ mt: 3 }}
//       >
//         Logout
//       </Button>
//     </Box>
//   );
// }

// app/profile/page.jsx or pages/profile.jsx
// "use client";

// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Grid,
//   TextField,
//   Typography,
//   Card,
//   IconButton,
// } from "@mui/material";
// import { useState } from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import UploadIcon from "@mui/icons-material/Upload";

// export default function ProfilePage() {
//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "User name",
//     email: "mi@xpaytech.co",
//     phone: "+20-01274318900",
//     address: "285 N Broad St, Elizabeth, NJ 07208, USA",
//   });

//   const [formData, setFormData] = useState({ ...profile });

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//   };

//   const handleSave = () => {
//     setProfile({ ...formData });
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setFormData({ ...profile });
//     setEditMode(false);
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 , mb: 5, p:8}}>
//       <Card sx={{ p: 5, borderRadius: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3 }}>
//           {editMode ? "Edit Profile" : "Profile"}
//         </Typography>

//         <Grid container spacing={4} alignItems="center" minHeight={300}>
//           {/* Avatar Section */}
//           <Grid item xs={12} md={4} textAlign="center">
//             <Avatar
//               alt="User"
//               src="https://i.pravatar.cc/150?img=3"
//               sx={{ width: 130, height: 130, mx: "auto", mb: 2 }}
//             />
//             <IconButton component="label" color="primary">
//               <UploadIcon />
//               <input type="file" hidden />
//             </IconButton>

//             <Box mt={3}>
//               <Button variant="outlined" size="small">
//                 Logo
//               </Button>
//               <Button variant="outlined" size="small" sx={{ ml: 2 }}>
//                 Vendor Documents
//               </Button>
//             </Box>
//           </Grid>

//           {/* Info Section */}
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
//                   onChange={handleChange("email")}
//                   margin="normal"
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
//                   label="Address"
//                   value={formData.address}
//                   onChange={handleChange("address")}
//                   margin="normal"
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
//                 <Typography>
//                   <strong>Address:</strong> {profile.address}
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



"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

export default function ProfilePage() {
  const userId = 1; // replace with dynamic user id

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photoFile: null,
    password: "", // new password field
  });

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          photoFile: null,
          password: "",
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

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
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      if (formData.photoFile) {
        data.append("photo", formData.photoFile);
      }
      if (formData.password.trim() !== "") {
        data.append("password", formData.password);
      }

      const res = await axios.put(`/api/users/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data.user);
      setEditMode(false);
      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        photoFile: null,
        password: "",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
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

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
      <Card sx={{ p: 5, borderRadius: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {editMode ? "Edit Profile" : "Profile"}
        </Typography>

        <Grid container spacing={4} alignItems="center" minHeight={300}>
          {/* Avatar Section */}
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

          {/* Info Section */}
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
                  onChange={handleChange("email")}
                  margin="normal"
                  disabled // email usually uneditable
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
    </Container>
  );
}
