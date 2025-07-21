
// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";

// export default function VenuePage() {
//   const { id } = useParams();
//   const [venue, setVenue] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/venue/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then(setVenue)
//       .catch(console.error);
//   }, [id]);

//   if (!venue) return <Typography>Loading venue details...</Typography>;

//   return (
//     <Box sx={{ bgcolor: "black", p: 5, minHeight: "100vh" }}>
//       <Grid container spacing={4} alignItems="center" sx={{ ml: 10 }}>
//         <Grid item xs={12} md={6}>
//           <Image
//             src={venue.photo1 || "/assets/fallback.jpg"}
//             alt={venue.name || "Main Venue"}
//             width={500}
//             height={500}
//             style={{ borderRadius: "20px" }}
//           />
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             <Image
//               src={venue.photo2 || "/assets/fallback.jpg"}
//               alt="Top Right"
//               width={300}
//               height={300}
//               style={{ borderRadius: "20px" }}
//             />
//             <Image
//               src={venue.photo3 || "/assets/fallback.jpg"}
//               alt="Bottom Right"
//               width={300}
//               height={300}
//               style={{ borderRadius: "20px" }}
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Box sx={{ ml: 5 }}>
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               color="#d1d5db"
//               sx={{ mb: 3 }}
//             >
//               {venue.name || "Unknown Venue"}
//             </Typography>
//             <Link href="/deliveries" passHref>
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#e65100",
//                   ml: 6,
//                   color: "white",
//                   px: 5,
//                   py: 1.5,
//                   fontSize: "18px",
//                   borderRadius: "16px",
//                   textTransform: "none",
//                   "&:hover": {
//                     backgroundColor: "#bf360c",
//                   },
//                 }}
//               >
//                 Book
//               </Button>
//             </Link>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // ✅ import session
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Image from "next/image";

export default function VenuePage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, status } = useSession(); // ✅ get session
  const isLoggedIn = !!session;

  const [venue, setVenue] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch venue details
  useEffect(() => {
    if (!id) return;

    fetch(`/api/venue/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch venue");
        return res.json();
      })
      .then(setVenue)
      .catch(console.error);
  }, [id]);

  const handleBookClick = () => {
    if (status === "loading") return; // still checking session
    if (isLoggedIn) {
      router.push("/deliveries");
    } else {
      setDialogOpen(true);
    }
  };

  const handleLogin = () => {
    setDialogOpen(false);
    router.push("/login");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (!venue) return <Typography>Loading venue details...</Typography>;
  if (status === "loading") return <Typography>Checking login status...</Typography>;

  return (
    <Box sx={{ bgcolor: "black", p: 5, minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="center" sx={{ ml: 10 }}>
        <Grid item xs={12} md={6}>
          <Image
            src={venue.photo1 || "/assets/fallback.jpg"}
            alt={venue.name || "Main Venue"}
            width={500}
            height={500}
            style={{ borderRadius: "20px" }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Image
              src={venue.photo2 || "/assets/fallback.jpg"}
              alt="Top Right"
              width={300}
              height={300}
              style={{ borderRadius: "20px" }}
            />
            <Image
              src={venue.photo3 || "/assets/fallback.jpg"}
              alt="Bottom Right"
              width={300}
              height={300}
              style={{ borderRadius: "20px" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ ml: 5 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#d1d5db"
              sx={{ mb: 3 }}
            >
              {venue.name || "Unknown Venue"}
            </Typography>
            <Button
              onClick={handleBookClick}
              variant="contained"
              sx={{
                backgroundColor: "#e65100",
                ml: 6,
                color: "white",
                px: 5,
                py: 1.5,
                fontSize: "18px",
                borderRadius: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#bf360c",
                },
              }}
            >
              Book
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Login Required Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to login first to book this venue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained">
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
