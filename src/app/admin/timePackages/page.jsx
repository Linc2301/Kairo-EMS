"use client";

// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function formatTimeToAmPm(time24) {
//   if (!time24) return "";
//   const [hourStr, minute] = time24.split(":");
//   let hour = parseInt(hourStr, 10);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
// }

// export default function TimePackagesPage() {
//   const router = useRouter();
//   const [timePackages, setTimePackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTimePackages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/timePackages");
//       setTimePackages(response.data);
//     } catch (error) {
//       console.error("Error fetching time packages:", error);
//       alert("Failed to load time packages. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this time package?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/api/timePackages/${id}`);
//       setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
//       alert("Time package deleted successfully.");
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Something went wrong while deleting.");
//     }
//   };

//   useEffect(() => {
//     fetchTimePackages();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h4">Time Packages</Typography>
//         <Button
//           variant="contained"
//           onClick={() => router.push("/admin/timePackages/create")}
//         >
//           Create New
//         </Button>
//       </Stack>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">ID</TableCell>
//                 <TableCell align="center">Start Time</TableCell>
//                 <TableCell align="center">End Time</TableCell>
//                 <TableCell align="center">Venue</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {timePackages.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No time packages found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 timePackages.map((tp) => (
//                   <TableRow key={tp.id}>
//                     <TableCell align="center">{tp.id}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
//                     <TableCell align="center">{tp.venueName}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => router.push(`/admin/timePackages/${tp.id}/edit`)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(tp.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }


// "use client";

// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function formatTimeToAmPm(time24) {
//   if (!time24 || !time24.includes(":")) return "";
//   const [hourStr, minute] = time24.split(":");
//   let hour = parseInt(hourStr, 10);
//   if (isNaN(hour)) return "";
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12;
//   return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
// }

// export default function TimePackagesPage() {
//   const router = useRouter();
//   const [timePackages, setTimePackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTimePackages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/timePackages");
//       setTimePackages(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching time packages:", error);
//       alert("Failed to load time packages. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this time package?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/api/timePackages/${id}`);
//       setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
//       alert("Time package deleted successfully.");
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Something went wrong while deleting.");
//     }
//   };

//   useEffect(() => {
//     fetchTimePackages();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h4">Time Packages</Typography>
//         <Button
//           variant="contained"
//           onClick={() => router.push("/admin/timePackages/create")}
//         >
//           Create New
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">ID</TableCell>
//                 <TableCell align="center">Start Time</TableCell>
//                 <TableCell align="center">End Time</TableCell>
//                 <TableCell align="center">Venue</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {timePackages.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No time packages found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 timePackages.map((tp) => (
//                   <TableRow key={tp.id}>
//                     <TableCell align="center">{tp.id}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
//                     <TableCell align="center">{tp.venue?.name || "Unknown"}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => router.push(`/admin/timePackages/${tp.id}/edit`)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(tp.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import dayjs from "dayjs";

// function formatTimeToAmPm(isoString) {
//   return dayjs(isoString).format("hh:mm A");
// }

// export default function TimePackagesPage() {
//   const [timePackages, setTimePackages] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadTimePackages() {
//       try {
//         const res = await axios.get("/api/timePackages");
//         setTimePackages(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         alert("Failed to load time packages");
//       }
//     }

//     loadTimePackages();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this time package?")) return;
//     try {
//       await axios.delete(`/api/timePackages/${id}`);
//       setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
//     } catch (error) {
//       alert("Failed to delete time package");
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5">Time Packages</Typography>
//         <Button variant="contained" onClick={() => router.push("/admin/timePackages/create")}>
//           Create New
//         </Button>
//       </Stack>

//       <Paper>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">ID</TableCell>
//                 <TableCell align="center">Start Time</TableCell>
//                 <TableCell align="center">End Time</TableCell>
//                 <TableCell align="center">Venue</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {timePackages.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No time packages found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 timePackages.map((tp) => (
//                   <TableRow key={tp.id}>
//                     <TableCell align="center">{tp.id}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
//                     <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
//                     <TableCell align="center">{tp.venueName || "Unknown"}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => router.push(`/admin/timePackages/${tp.id}/edit`)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(tp.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// }


//


// "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

// Format time like 02:00 AM
function formatTimeToAmPm(isoString) {
  return dayjs(isoString).format("hh:mm A");
}

// Format date like 2025-07-27
function formatDate(isoString) {
  return dayjs(isoString).format("YYYY-MM-DD");
}

export default function TimePackagesPage() {
  const [timePackages, setTimePackages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadTimePackages() {
      try {
        const res = await axios.get("/api/timePackages");
        setTimePackages(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        alert("Failed to load time packages");
      }
    }

    loadTimePackages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this time package?")) return;
    try {
      await axios.delete(`/api/timePackages/${id}`);
      setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
    } catch (error) {
      alert("Failed to delete time package");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Time Packages</Typography>
        <Button variant="contained" onClick={() => router.push("/admin/timePackages/create")}>
          Create New
        </Button>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timePackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No time packages found.
                  </TableCell>
                </TableRow>
              ) : (
                timePackages.map((tp) => (
                
                  <TableRow key={tp.id}>
                    <TableCell align="center">{tp.id}</TableCell>
                    <TableCell align="center">{formatDate(tp.startTime)}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
                    <TableCell align="center">{tp.venueName || "Unknown"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => router.push(`/admin/timePackages/${tp.id}/edit`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(tp.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
