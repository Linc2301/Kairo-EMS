
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
// import { useState, useEffect } from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import UploadIcon from "@mui/icons-material/Upload";
// import axios from "axios";

// export default function ProfilePage() {
//   const userId = 1; // replace with dynamic user id

//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     photo: "",
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     photoFile: null,
//     password: "", // new password field
//   });

//   // Fetch user data on mount
//   useEffect(() => {
//     axios
//       .get(`/api/users/${userId}`)
//       .then((res) => {
//         setProfile(res.data);
//         setFormData({
//           name: res.data.name || "",
//           email: res.data.email || "",
//           phone: res.data.phone || "",
//           photoFile: null,
//           password: "",
//         });
//       })
//       .catch((err) => console.error(err));
//   }, [userId]);

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
//       data.append("email", formData.email);
//       data.append("phone", formData.phone);
//       if (formData.photoFile) {
//         data.append("photo", formData.photoFile);
//       }
//       if (formData.password.trim() !== "") {
//         data.append("password", formData.password);
//       }

//       const res = await axios.put(`/api/users/${userId}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
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
//     } catch (error) {
//       console.error("Failed to update profile:", error);
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

//   return (
//     <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
//       <Card sx={{ p: 5, borderRadius: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3 }}>
//           {editMode ? "Edit Profile" : "Profile"}
//         </Typography>

//         <Grid container spacing={4} alignItems="center" minHeight={300}>
//           {/* Avatar Section */}
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
//                   disabled // email usually uneditable
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

"use client";

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
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    password: "",
  });

  const userId = session?.user?.id;

  // Redirect unauthenticated users & load profile data
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated" && userId) {
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
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, [status, userId, router]);

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
      if (formData.photoFile) {
        data.append("photo", formData.photoFile);
      }
      if (formData.password.trim() !== "") {
        data.append("password", formData.password);
      }

      // <-- IMPORTANT: withCredentials true to send cookies (JWT)
      const res = await axios.put(`/api/users/${userId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
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
      alert("Failed to update profile");
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

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5, p: 8 }}>
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
    </Container>
  );
}
