// 'use client';

// import React from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { schema } from "./validationSchema";
// import { useEffect } from "react";
// import axios from "axios";

// import {
//     Box,
//     Button,
//     Grid,
//     Paper,
//     TextField,
//     Typography,
//     Stack,
// } from '@mui/material';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import AddIcCallIcon from '@mui/icons-material/AddIcCall';
// import FmdGoodIcon from '@mui/icons-material/FmdGood';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// export default function ContactPage() {

//     const {
//         handleSubmit,
//         register,
//         reset,
//         clearErrors,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     useEffect(() => {
//         if (Object.keys(errors).length > 0) {
//             const timer = setTimeout(() => {
//                 clearErrors();
//             }, 2000); // 2000ms = 2 seconds

//             return () => clearTimeout(timer); // Cleanup on unmount or errors change
//         }
//     }, [errors, clearErrors]);

//     const onSubmit = async (formData) => {
//         try {
//             console.log("formData", formData);
//             const bodyData = {
//                 name: formData.name,
//                 email: formData.email,
//                 subject: formData.subject,
//                 message: formData.message,
//             };
//             const response = await axios.post("http://localhost:3000/api/contact", bodyData);
//             reset();
//             console.log("Successfully Saved.");
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return (
//         <Box px={10} py={2}>
//             <Typography variant="h4" fontWeight="bold" mb={4} sx={{ textAlign: "center" }}>
//                 Contact Us
//             </Typography>

//             <Grid container spacing={4} >
//                 {/* Contact Form */}
//                 <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//                     <Grid item md={6}>
//                         <Paper elevation={6} sx={{ p: 3, borderRadius: 2 }}>
//                             <Stack spacing={3}>
//                                 <TextField label="Name"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...register("name")}
//                                     error={!!errors.name}
//                                     helperText={errors.name?.message || " "}
//                                 />
//                                 <TextField label="Email"
//                                     type="email"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...register("email")}
//                                     error={!!errors.email}
//                                     helperText={errors.email?.message || " "}
//                                 />
//                                 <TextField label="Subject"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...register("subject")}
//                                     error={!!errors.subject}
//                                     helperText={errors.subject?.message || " "}
//                                 />
//                                 <TextField label="Message"
//                                     variant="outlined"
//                                     fullWidth
//                                     multiline rows={4}
//                                     {...register("message")}
//                                     error={!!errors.message}
//                                     helperText={errors.message?.message || " "}
//                                 />
//                                 <Button variant="contained" color="primary" size="large" type='submit'>
//                                     Send Message
//                                 </Button>
//                             </Stack>
//                         </Paper>
//                     </Grid>
//                 </Box>
//                 {/* Contact Info */}
//                 <Grid item md={6} mt={8}>
//                     <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//                         <Typography variant="h5" fontWeight="bold" gutterBottom>
//                             Contact
//                         </Typography>
//                         <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
//                             Get in touch with us
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary" mb={3}>
//                             Whether you have a question, a suggestion, or just want to say hello,
//                             feel free to reach out. Our team is always ready to assist you<br /> and will response as soon as possible.
//                         </Typography>

//                         {/* Four contact blocks in a flex row */}
//                         <Box
//                             mt={2}
//                             display="flex"
//                             justifyContent="space-between"
//                             flexWrap="wrap"
//                             gap={3}
//                         >
//                             {/* Email */}
//                             <Box
//                                 mt={2}
//                                 flex="1 1 200px"
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 textAlign="center"
//                             >
//                                 <Box
//                                     bgcolor="primary.main"
//                                     color="white"
//                                     width={64}
//                                     height={64}
//                                     display="flex"
//                                     justifyContent="center"
//                                     alignItems="center"
//                                     borderRadius="50%"
//                                     mb={3}
//                                 >
//                                     <MarkEmailUnreadIcon fontSize="large" />
//                                 </Box>
//                                 <Typography fontWeight="bold" mb={2}>Email Address</Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     kairo@gmail.com
//                                 </Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     business-kairo@gmail.com
//                                 </Typography>
//                             </Box>

//                             {/* Phone */}
//                             <Box
//                                 mt={2}
//                                 flex="1 1 200px"
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 textAlign="center"
//                             >
//                                 <Box
//                                     bgcolor="primary.main"
//                                     color="white"
//                                     width={64}
//                                     height={64}
//                                     display="flex"
//                                     justifyContent="center"
//                                     alignItems="center"
//                                     borderRadius="50%"
//                                     mb={3}
//                                 >
//                                     <AddIcCallIcon fontSize="large" />
//                                 </Box>
//                                 <Typography fontWeight="bold" mb={2}>Phone Number</Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     09774234382
//                                 </Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     09774234382
//                                 </Typography>
//                             </Box>

//                             {/* Location */}
//                             <Box
//                                 mt={2}
//                                 flex="1 1 200px"
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 textAlign="center"
//                             >
//                                 <Box
//                                     bgcolor="primary.main"
//                                     color="white"
//                                     width={64}
//                                     height={64}
//                                     display="flex"
//                                     justifyContent="center"
//                                     alignItems="center"
//                                     borderRadius="50%"
//                                     mb={3}
//                                 >
//                                     <FmdGoodIcon fontSize="large" />
//                                 </Box>
//                                 <Typography fontWeight="bold" mb={2}>Location</Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     Yangon, MICT Park
//                                 </Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     Hlaing, MICT Park
//                                 </Typography>
//                             </Box>

//                             {/* Work Day */}
//                             <Box
//                                 mt={2}
//                                 flex="1 1 200px"
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 textAlign="center"
//                             >
//                                 <Box
//                                     bgcolor="primary.main"
//                                     color="white"
//                                     width={64}
//                                     height={64}
//                                     display="flex"
//                                     justifyContent="center"
//                                     alignItems="center"
//                                     borderRadius="50%"
//                                     mb={3}
//                                 >
//                                     <AccessTimeFilledIcon fontSize="large" />
//                                 </Box>
//                                 <Typography fontWeight="bold" mb={2}>Work Day</Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     Mon-Fri : 9:00 - 17:00
//                                 </Typography>
//                                 <Typography color="text.secondary" variant="body2">
//                                     Sat-Sun : 10:00 - 16:00
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 </Grid>

//             </Grid>

//         </Box>
//     );
// }

// 'use client';

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { schema } from "./validationSchema";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Stack,
// } from "@mui/material";
// import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
// import AddIcCallIcon from "@mui/icons-material/AddIcCall";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

// export default function ContactPage() {
//   const {
//     handleSubmit,
//     register,
//     reset,
//     clearErrors,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       const timer = setTimeout(() => {
//         clearErrors();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [errors, clearErrors]);

//   const onSubmit = async (formData) => {
//     try {
//       const bodyData = {
//         name: formData.name,
//         email: formData.email,
//         subject: formData.subject,
//         message: formData.message,
//       };
//       await axios.post("http://localhost:3000/api/contact", bodyData);
//       reset();
//       console.log("Successfully Saved.");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       {/* 🔷 Full-width Top Hero Section */}
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "450px",
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/contact.avif")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           px: 2,
//           py: { xs: 6, md: 10 },
//           color: "white",

//         }}
//       >
//         <Box maxWidth="700px">
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//           Contact Us
//           </Typography>
//           {/* <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//             Have questions or ideas? We’d love to hear from you. Reach out and
//             we’ll respond as soon as we can.
//           </Typography> */}
//         </Box>
//       </Box>

//       {/* 🔶 Main Section: Form + Info */}
//       <Box px={{ xs: 2, md: 10 }} py={8} sx={{mt: 10}}>
//         <Grid container spacing={15}>

//           {/* 📞 Contact Info */}
//           <Grid item xs={12} md={6} sx={{mt: 10}}>

//               <Typography variant="h3" fontWeight="bold" gutterBottom>
//                 Contact Info
//               </Typography>
//               {/* <Typography variant="body1" color="text.secondary" mb={3}>
//                 You can also reach us through the following channels. Our team
//                 is happy to assist you!
//               </Typography> */}
//                  <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//                     At Kairo, we believe that great events start with great communication.
//           </Typography>
//              <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>

//                      Whether you have questions about our services,

//           </Typography>

//               <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>

//                 want to discuss a custom event plan, or just want to say hello, we’re here for you.

//           </Typography>

//            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>

//       Choose the contact method that suits you best:

//           </Typography>

//               <Box
//                 display="flex"
//                 flexDirection="row"
//                 gap={3}
//                 mt={2}
//               >
//                 {[
//                   {
//                     icon: <MarkEmailUnreadIcon fontSize="small" />,
//                     title: "Email Address",
//                     lines: ["kairo@gmail.com", "business-kairo@gmail.com"],
//                   },
//                   {
//                     icon: <AddIcCallIcon fontSize="small" />,
//                     title: "Phone Number",
//                     lines: ["09774234382", "09774234382"],
//                   },
//                   {
//                     icon: <FmdGoodIcon fontSize="small" />,
//                     title: "Location",
//                     lines: ["Yangon, MICT Park", "Hlaing, MICT Park"],
//                   },
//                   {
//                     icon: <AccessTimeFilledIcon fontSize="small" />,
//                     title: "Work Day",
//                     lines: ["Mon-Fri: 9:00 - 17:00", "Sat-Sun: 10:00 - 16:00"],
//                   },
//                 ].map(({ icon, title, lines }, index) => (
//                   <Box key={index} display="flex" alignItems="flex-start">
//                     <Box
//                       sx={{
//                         width: 30,
//                         height: 30,
//                         bgcolor: "primary.main",
//                         color: "white",
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         mr: 2,
//                         mt: 0.5,
//                       }}
//                     >
//                       {icon}
//                     </Box>
//                     <Box>
//                       <Typography fontWeight="bold" gutterBottom>
//                         {title}
//                       </Typography>
//                       {lines.map((line, idx) => (
//                         <Typography
//                           key={idx}
//                           variant="body2"
//                           color="text.secondary"
//                         >
//                           {line}
//                         </Typography>
//                       ))}
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>

//           </Grid>

//            {/* 📝 Contact Form */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={6} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 gutterBottom
//                 textAlign="center"
//               >
//                 Send Us a Message
//               </Typography>
//               <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//                 <Stack spacing={3} >
//                   <TextField
//                     label="Name"
//                     fullWidth
//                     {...register("name")}
//                     error={!!errors.name}
//                     helperText={errors.name?.message || " "}
//                   />
//                   <TextField
//                     label="Email"
//                     type="email"
//                     fullWidth
//                     {...register("email")}
//                     error={!!errors.email}
//                     helperText={errors.email?.message || " "}
//                   />
//                   <TextField
//                     label="Subject"
//                     fullWidth
//                     {...register("subject")}
//                     error={!!errors.subject}
//                     helperText={errors.subject?.message || " "}
//                   />
//                   <TextField
//                     label="Message"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     {...register("message")}
//                     error={!!errors.message}
//                     helperText={errors.message?.message || " "}
//                   />
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     color="primary"
//                     fullWidth
//                     size="large"
//                   >
//                     Send Message
//                   </Button>
//                 </Stack>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// "use client";

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { schema } from "./validationSchema";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Stack,
// } from "@mui/material";
// import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
// import AddIcCallIcon from "@mui/icons-material/AddIcCall";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
// import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import { useState } from "react";


// export default function ContactPage() {
//   const {
//     handleSubmit,
//     register,
//     reset,
//     clearErrors,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [openConfirm, setOpenConfirm] = useState(false);
// const [openSuccess, setOpenSuccess] = useState(false);
// const [formDataCache, setFormDataCache] = useState(null);


//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       const timer = setTimeout(() => {
//         clearErrors();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [errors, clearErrors]);

// //   const onSubmit = async (formData) => {
// //     try {
// //       const bodyData = {
// //         name: formData.name,
// //         email: formData.email,
// //         subject: formData.subject,
// //         message: formData.message,
// //       };
// //       await axios.post("http://localhost:3000/api/contact", bodyData);
// //       reset();
// //       console.log("Successfully Saved.");
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// const submitFinalForm = async () => {
//   try {
//     const bodyData = {
//       name: formDataCache.name,
//       email: formDataCache.email,
//       subject: formDataCache.subject,
//       message: formDataCache.message,
//     };
//     await axios.post("http://localhost:3000/api/contact", bodyData);
//     reset();
//     setOpenConfirm(false);
//     setOpenSuccess(true);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//     <>
//       {/* 🔷 Hero Section */}
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "450px",
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/contact.avif")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           px: 2,
//           py: { xs: 6, md: 10 },
//           color: "white",
//         }}
//       >
//         <Box maxWidth="700px">
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//             Contact Us
//           </Typography>
//           <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//             Whether you're planning your dream event or simply have a few
//             questions, we’re here to help
//           </Typography>
//         </Box>
//       </Box>

//       {/* 🔶 Main Section */}
//       <Box sx={{ mt: 8, mb: 2 }}>
//         <Grid container spacing={5} alignItems="flex-start">
//           {/* 📞 Contact Info */}
//           <Grid item xs={12} md={6} sx={{ mt: 15, ml: 5 }}>
//             <Typography variant="h3" fontWeight="bold" gutterBottom>
//               Contact Info
//             </Typography>
//             <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//               At Kairo, we believe that great events start with great
//               communication.
//             </Typography>
//             <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//               Whether you have questions about our services,
//             </Typography>

//             <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//               want to discuss a custom event plan, or just want to say hello —
//               we’re here for you.
//             </Typography>
//             <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
//               Choose the contact method that suits you best:
//             </Typography>

//             <Box display="flex" flexWrap="wrap" gap={4} mt={4}>
//               {[
//                 {
//                   icon: <MarkEmailUnreadIcon fontSize="medium" />,
//                   title: "Email Address",
//                   lines: ["kairo@gmail.com", "business-kairo@gmail.com"],
//                 },
//                 {
//                   icon: <AddIcCallIcon fontSize="medium" />,
//                   title: "Phone Number",
//                   lines: ["09774234382", "09774234382"],
//                 },
//                 {
//                   icon: <FmdGoodIcon fontSize="medium" />,
//                   title: "Location",
//                   lines: ["Yangon, MICT Park", "Hlaing, MICT Park"],
//                 },
//                 {
//                   icon: <AccessTimeFilledIcon fontSize="medium" />,
//                   title: "Work Hours",
//                   lines: ["Mon–Fri: 9:00–17:00", "Sat–Sun: 10:00–16:00"],
//                 },
//               ].map(({ icon, title, lines }, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   alignItems="flex-start"
//                   width={{ xs: "100%", sm: "45%" }}
//                 >
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       bgcolor: "primary.main",
//                       color: "white",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mr: 2,
//                       mt: 0.5,
//                     }}
//                   >
//                     {icon}
//                   </Box>
//                   <Box>
//                     <Typography fontWeight="bold">{title}</Typography>
//                     {lines.map((line, idx) => (
//                       <Typography
//                         key={idx}
//                         variant="body2"
//                         color="text.secondary"
//                       >
//                         {line}
//                       </Typography>
//                     ))}
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>

//           {/* 📝 Contact Form */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={6}
//               sx={{
//                 p: { xs: 3, md: 4 },
//                 borderRadius: 3,
//                 width: 500,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 gutterBottom
//                 textAlign="center"
//               >
//                 Send Us a Message
//               </Typography>
//               <Box
//                 component="form"
//                 onSubmit={(data) => {
//   setFormDataCache(data); // cache data to submit later
//   setOpenConfirm(true);   // open confirm dialog
// }}

//                 noValidate
//               >
//                 <Stack>
//                   <TextField
//                     label="Name"
//                     fullWidth
//                     {...register("name")}
//                     error={!!errors.name}
//                     helperText={errors.name?.message || " "}
//                   />
//                   <TextField
//                     label="Email"
//                     type="email"
//                     fullWidth
//                     {...register("email")}
//                     error={!!errors.email}
//                     helperText={errors.email?.message || " "}
//                   />
//                   <TextField
//                     label="Subject"
//                     fullWidth
//                     {...register("subject")}
//                     error={!!errors.subject}
//                     helperText={errors.subject?.message || " "}
//                   />
//                   <TextField
//                     label="Message"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     {...register("message")}
//                     error={!!errors.message}
//                     helperText={errors.message?.message || " "}
//                   />
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     color="primary"
//                     fullWidth
//                     size="large"
//                   >
//                     Send Message
//                   </Button>
//                 </Stack>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//             {/* Confirmation Dialog */}
// <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
//   <DialogTitle>Confirm Submission</DialogTitle>
//   <DialogContent>
//     Are you sure you want to send this message?
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
//     <Button onClick={submitFinalForm} variant="contained">Confirm</Button>
//   </DialogActions>
// </Dialog>

// {/* Success Dialog */}
// <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
//   <DialogTitle>Message Sent!</DialogTitle>
//   <DialogContent>
//     Your message has been successfully sent. We’ll get back to you soon.
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenSuccess(false)} autoFocus>
//       Close
//     </Button>
//   </DialogActions>
// </Dialog>

//       </Box>

//     </>
    

    
//   );
  
// }


"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function ContactPage() {
  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const handleOpenConfirm = (data) => {
    setFormData(data);
    setOpenConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/contact", formData);
      setOpenConfirm(false);
      setOpenSuccess(true);
      reset();
      console.log("Successfully Sent.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* 🔷 Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "450px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/contact.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: { xs: 6, md: 10 },
          color: "white",
        }}
      >
        <Box maxWidth="500px">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
            Whether you're planning your dream event or simply have a few
            questions, we’re here to help
          </Typography>
        </Box>
      </Box>

      {/* 🔶 Main Section */}
      <Box sx={{ mt: 8, mb: 2 }}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* 📞 Contact Info */}
          <Grid item xs={12} md={6} sx={{ mt: 23, ml: 4 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
              At Kairo, we believe that great events start with great
              communication.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
              Whether you have questions about our services,
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
              want to discuss a custom event plan, or just want to say hello —
              we’re here for you.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
              Choose the contact method that suits you best:
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={4} mt={4}>
              {[
                {
                  icon: <MarkEmailUnreadIcon fontSize="medium" />,
                  title: "Email Address",
                  lines: ["kairo@gmail.com", "business-kairo@gmail.com"],
                },
                {
                  icon: <AddIcCallIcon fontSize="medium" />,
                  title: "Phone Number",
                  lines: ["09774234382", "09774234382"],
                },
                {
                  icon: <FmdGoodIcon fontSize="medium" />,
                  title: "Location",
                  lines: ["Yangon, MICT Park", "Hlaing, MICT Park"],
                },
                {
                  icon: <AccessTimeFilledIcon fontSize="medium" />,
                  title: "Work Hours",
                  lines: ["Mon–Fri: 9:00–17:00", "Sat–Sun: 10:00–16:00"],
                },
              ].map(({ icon, title, lines }, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="flex-start"
                  width={{ xs: "100%", sm: "45%" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      mt: 0.5,
                    }}
                  >
                    {icon}
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">{title}</Typography>
                    {lines.map((line, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        color="text.secondary"
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* 📝 Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                width: 430,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
              >
                Send Us a Message
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleOpenConfirm)}
                noValidate
              >
                <Stack spacing={3}>
                  <TextField
                    label="Name"
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message || " "}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message || " "}
                  />
                  <TextField
                    label="Subject"
                    fullWidth
                    {...register("subject")}
                    error={!!errors.subject}
                    helperText={errors.subject?.message || " "}
                  />
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    {...register("message")}
                    error={!!errors.message}
                    helperText={errors.message?.message || " "}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ✅ Confirm Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to send this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🎉 Success Dialog */}
      <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <DialogTitle>Message Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for reaching out to us! We’ll get back to you soon.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccess(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
