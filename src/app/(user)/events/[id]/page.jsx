
// "use client";

// import {
//   Box,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function EventDetailPage() {
//   const params = useParams();
//   const id = params.id;
//   const [event, setEvent] = useState(null);
//   const [venues, setVenues] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState("");
//   const router = useRouter();




//   // Fetch event details
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`/api/events/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch event");
//         const data = await res.json();
//         setEvent(data);
//       } catch (err) {
//         console.error("Error fetching event:", err);
//       }
//     };

//     if (id) fetchEvent();
//   }, [id]);

//   // Fetch venues for this event
//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const res = await fetch(`/api/venue?eventId=${id}`); // your API for venues by event
//         if (!res.ok) throw new Error("Failed to fetch venues");
//         const data = await res.json();
//         setVenues(data);
//       } catch (err) {
//         console.error("Error fetching venues:", err);
//       }
//     };

//     if (id) fetchVenues();
//   }, [id]);

//   const handleSelectChange = (e) => {
//     const venueId = e.target.value;
//     setSelectedVenue(venueId);
//     router.push(`/venue/${venueId}`);  // <-- changed here to route to venue page
//   };

//   if (!event) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
//         {/* Event Image */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ position: "relative", width: 350, height: 500, ml: 12 }}>
//             <Image
//               src={event.photo}
//               alt={event.name}
//               fill
//               style={{ objectFit: "cover", borderRadius: 20 }}
//             />
//           </Box>
//         </Grid>

//         {/* Event Info and Venue Select */}
//         <Grid item xs={12} md={6}>
//           <Box position="relative" mb={20} ml={15} mt={10}>
//             <Typography sx={{ fontSize: 45, fontWeight: "bold", ml: 25 }}>
//               {event.name}
//             </Typography>
//             <Typography sx={{ fontSize: 25, mt: 4, fontWeight: "bold" , ml: 25}}>
//               {event.description}
//             </Typography>
//             <Typography sx={{ fontSize: 35, mt: 4, ml: 18, fontWeight: "bold" }}>
//               Choose {event.name} Venues
//             </Typography>

//             <FormControl fullWidth sx={{ mt: 4, width: 300 }}>
//               <InputLabel sx={{ ml: 20 }}>Select</InputLabel>
//               {/* <Select
//                 value={selectedVenue}
//                 label="Select"
//                 onChange={handleSelectChange}
//                 sx={{
//                   ml: 20,
//                   width: 400,
//                   backgroundColor: "#fff",
//                   borderRadius: 2,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderWidth: "3px",
//                     borderColor: "#1976d2",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                 }}
//               >
//                 {venues.map((venue, idx) => (
//                   <MenuItem
//                     key={venue.id}
//                     value={venue.id}
//                     sx={{
//                       backgroundColor: idx % 2 === 0 ? "#fce4ec" : "#e8f5e9",
//                       color: "#333",
//                       fontWeight: "bold",
//                       "&:hover": {
//                         backgroundColor: "#E24C00",
//                         color: "#fff",
//                       },
//                     }}
//                   >
//                     {venue.name}
//                   </MenuItem>
//                 ))}
//               </Select> */}

//               <Select
//                 value={selectedVenue}
//                 label="Select"
//                 onChange={handleSelectChange}
//                 sx={{
//                   ml: 20,
//                   width: 400,
//                   backgroundColor: "#fff",
//                   borderRadius: 2,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderWidth: "3px",
//                     borderColor: "#1976d2",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                 }}
//               >
//                 {venues
//                   .filter((venue) => venue.eventId === event.id)
//                   .map((venue, idx) => (
//                     <MenuItem
//                       key={venue.id}
//                       value={venue.id}
//                       sx={{
//                         backgroundColor: idx % 2 === 0 ? "#fce4ec" : "#e8f5e9",
//                         color: "#333",
//                         fontWeight: "bold",
//                         "&:hover": {
//                           backgroundColor: "#E24C00",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       {venue.name}
//                     </MenuItem>
//                   ))}
//               </Select>

//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// "use client";

// import {
//   Box,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function EventDetailPage() {
//   const params = useParams();
//   const id = params.id;
//   const [event, setEvent] = useState(null);
//   const [venues, setVenues] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState("");
//   const router = useRouter();

//   // Fetch event details
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`/api/events/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch event");
//         const data = await res.json();
//         setEvent(data);
//       } catch (err) {
//         console.error("Error fetching event:", err);
//       }
//     };

//     if (id) fetchEvent();
//   }, [id]);

//   // Fetch venues for this event
//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const res = await fetch(`/api/venue?eventId=${id}`);
//         if (!res.ok) throw new Error("Failed to fetch venues");
//         const data = await res.json();
//         setVenues(data);
//       } catch (err) {
//         console.error("Error fetching venues:", err);
//       }
//     };

//     if (id) fetchVenues();
//   }, [id]);

//   const handleSelectChange = (e) => {
//     const venueId = e.target.value;
//     setSelectedVenue(venueId);
//     router.push(`/venue/${venueId}`);
//   };

//   if (!event) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={26} alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
//         {/* Event Image */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ position: "relative", width: 350, height: 500, mx: "auto" }}>
//             <Image
//               src={event.photo}
//               alt={event.name}
//               fill
//               style={{ objectFit: "cover", borderRadius: 20 }}
//             />
//           </Box>
//         </Grid>

//         {/* Event Info and Venue Select */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ textAlign: "center", maxWidth: 500, mx: "auto", mt: 5 }}>
//             <Typography sx={{ fontSize: 45, fontWeight: "bold", wordBreak: "break-word" }}>
//               {event.name}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 30,
//                 mt: 3,
//                 fontWeight: 400,
//                 whiteSpace: "pre-line",
//                 wordBreak: "break-word",
//               }}
//             >
//               {event.description}
//             </Typography>

//             <Typography sx={{ fontSize: 30, mt: 5, fontWeight: "bold" }}>
//               Choose {event.name} Venues
//             </Typography>

//             <FormControl sx={{ mt: 4, width: 300, mx: "auto" }}>
//               <InputLabel>Select</InputLabel>
//               <Select
//                 value={selectedVenue}
//                 label="Select"
//                 onChange={handleSelectChange}
//                 sx={{
//                   backgroundColor: "#fff",
//                   borderRadius: 2,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderWidth: "3px",
//                     borderColor: "#1976d2",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                 }}
//               >
//                 {venues
//                   .filter((venue) => venue.eventId === event.id)
//                   .map((venue, idx) => (
//                     <MenuItem
//                       key={venue.id}
//                       value={venue.id}
//                       sx={{
//                         backgroundColor: idx % 2 === 0 ? "#fce4ec" : "#e8f5e9",
//                         color: "#333",
//                         fontWeight: "bold",
//                         "&:hover": {
//                           backgroundColor: "#E24C00",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       {venue.name}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// "use client";

// import {
//   Box,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function EventDetailPage() {
//   const params = useParams();
//   const id = params.id;
//   const [event, setEvent] = useState(null);
//   const [venues, setVenues] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState("");
//   const router = useRouter();

//   // Fetch event details
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`/api/events/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch event");
//         const data = await res.json();
//         setEvent(data);
//       } catch (err) {
//         console.error("Error fetching event:", err);
//       }
//     };

//     if (id) fetchEvent();
//   }, [id]);

//   // Fetch venues for this event
//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const res = await fetch(`/api/venue?eventId=${id}`);
//         if (!res.ok) throw new Error("Failed to fetch venues");
//         const data = await res.json();
//         setVenues(data);
//       } catch (err) {
//         console.error("Error fetching venues:", err);
//       }
//     };

//     if (id) fetchVenues();
//   }, [id]);

//   const handleSelectChange = (e) => {
//     const venueId = e.target.value;
//     setSelectedVenue(venueId);
//     router.push(`/venue/${venueId}`);
//   };

//   if (!event) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
//         {/* Event Image */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ position: "relative", width: 350, height: 500, mx: "auto" }}>
//             <Image
//               src={event.photo}
//               alt={event.name}
//               fill
//               style={{ objectFit: "cover", borderRadius: 20 }}
//             />
//           </Box>
//         </Grid>

//         {/* Event Info and Venue Select */}
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               textAlign: "center",
//               maxWidth: 500,
//               mt: 5,
//               ml: { md: 8, xs: 0 }, // pushes text to the right only on medium+ screens
//             }}
//           >
//             <Typography sx={{ fontSize: 45, fontWeight: "bold", wordBreak: "break-word" }}>
//               {event.name}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 20,
//                 mt: 3,
//                 fontWeight: 400,
//                 whiteSpace: "pre-line",
//                 wordBreak: "break-word",
//               }}
//             >
//               {event.description}
//             </Typography>

//             <Typography sx={{ fontSize: 30, mt: 5, fontWeight: "bold" }}>
//               Choose {event.name} Venues
//             </Typography>

//             <FormControl sx={{ mt: 4, width: 300, mx: "auto" }}>
//               <InputLabel>Select</InputLabel>
//               <Select
//                 value={selectedVenue}
//                 label="Select"
//                 onChange={handleSelectChange}
//                 sx={{
//                   backgroundColor: "#fff",
//                   borderRadius: 2,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderWidth: "3px",
//                     borderColor: "#1976d2",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#E24C00",
//                   },
//                 }}
//               >
//                 {venues
//                   .filter((venue) => venue.eventId === event.id)
//                   .map((venue, idx) => (
//                     <MenuItem
//                       key={venue.id}
//                       value={venue.id}
//                       sx={{
//                         backgroundColor: idx % 2 === 0 ? "#fce4ec" : "#e8f5e9",
//                         color: "#333",
//                         fontWeight: "bold",
//                         "&:hover": {
//                           backgroundColor: "#E24C00",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       {venue.name}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

"use client";

import Loading from "@/src/components/Loading";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id;
  const [event, setEvent] = useState(null);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`/api/venue?eventId=${id}`);
        if (!res.ok) throw new Error("Failed to fetch venues");
        const data = await res.json();
        setVenues(data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    if (id) fetchVenues();
  }, [id]);

  const handleSelectChange = (e) => {
    const venueId = e.target.value;
    setSelectedVenue(venueId);
    router.push(`/venue/${venueId}`);
  };

  if (!event) return <Loading open={true}/>;

  return (
    <Box sx={{ p: 4 , bgcolor: "black"}}>
      <Grid container spacing={0} alignItems="flex-start" sx={{ mt: 3 , mb: 4}}>
        {/* Event Image (fixed to the left) */}
        <Grid item xs={12} md={6} sx={{ml: 10}}>
          <Box
            sx={{
              position: "relative",
              width: 350,
              height: 500,
              display: "flex",
              justifyContent: "flex-start",
              ml: 0, // no margin
            }}
          >
            <Image
              src={event.photo}
              alt={event.name}
              fill
              style={{ objectFit: "cover", borderRadius: 20 }}
            />
          </Box>
        </Grid>

        {/* Event Info and Venue Select */}
        <Grid item xs={12} md={6} sx={{ml: 25}}>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 500,
              mt: 5,
              ml: { md: 8, xs: 0 }, // creates space from the image on medium+ screens
            }}
          >
            <Typography sx={{ fontSize: 45, fontWeight: "bold", wordBreak: "break-word", color: "#ec7921ff" }}>
              {event.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 25,
                mt: 3,
                fontWeight: 400,
                whiteSpace: "pre-line",
                wordBreak: "break-word",
                color: "#d1d5db"
              }}
            >
              {event.description}
            </Typography>

            <Typography sx={{ fontSize: 30, mt: 5, fontWeight: "bold", color: "#d1d5db"}}>
              Choose {event.name} Venues
            </Typography>

            <FormControl sx={{ mt: 4, width: 300, mx: "auto", }}>
              <InputLabel>Select</InputLabel>
              <Select
                value={selectedVenue}
                label="Select"
                onChange={handleSelectChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "3px",
                    borderColor: "#1976d2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E24C00",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E24C00",
                  },
                }}
              >
                {venues
                  .filter((venue) => venue.eventId === event.id)
                  .map((venue, idx) => (
                    <MenuItem
                      key={venue.id}
                      value={venue.id}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#fce4ec" : "#e8f5e9",
                        color: "#333",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#E24C00",
                          color: "#fff",
                        },
                      }}
                    >
                      {venue.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
