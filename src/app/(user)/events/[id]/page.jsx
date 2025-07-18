

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
//     router.push(`/events/${id}/venues/${venueId}`);
//   };

//   if (!event) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
//         {/* Event Image */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ position: "relative", width: 350, height: 500, ml: 15 }}>
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
//           <Box position="relative" mb={20} ml={25} mt={10}>
//             <Typography sx={{ fontSize: 40, fontWeight: "bold", ml: 25 }}>
//               {event.name}
//             </Typography>
//             <Typography sx={{ fontSize: 30, mt: 4, fontWeight: "bold" }}>
//               Your Dream {event.name}, Perfectly Planned
//             </Typography>
//             <Typography sx={{ fontSize: 30, mt: 4, ml: 18, fontWeight: "bold" }}>
//               Choose {event.name} Venues
//             </Typography>

//             <FormControl fullWidth sx={{ mt: 4, width: 300 }}>
//               <InputLabel sx={{ ml: 20 }}>Select</InputLabel>
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
//   const eventId = params.id;
//   const router = useRouter();

//   const [selectedOption, setSelectedOption] = useState("");
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     if (!eventId) return;

//     async function fetchEvent() {
//       try {
//         const res = await fetch(`/api/events/${eventId}`);
//         if (!res.ok) throw new Error("Failed to fetch event");

//         const data = await res.json();
//         setEvent(data);

//         // Optionally preselect first venue if any
//         if (data.venues && data.venues.length > 0) {
//           setSelectedOption(data.venues[0].id);
//         }
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       }
//     }

//     fetchEvent();
//   }, [eventId]);

//   const handleSelectChange = (e) => {
//     const venueId = e.target.value;
//     setSelectedOption(venueId);
//     console.log("Selected venue ID:", venueId); // debug
//     router.push(`/venues/${venueId}`);
//   };

//   if (!event) return <Typography>Loading event...</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
//         {/* Left side image */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ position: "relative", width: 350, height: 500, ml: 15 }}>
//             <Image
//               src={event.photo || "/assets/fallback.jpg"}
//               alt={event.name}
//               fill
//               style={{ objectFit: "cover", borderRadius: 20 }}
//             />
//           </Box>
//         </Grid>

//         {/* Right side details and venue select */}
//         <Grid item xs={12} md={6}>
//           <Box position="relative" mb={20} ml={25} mt={10}>
//             <Typography sx={{ fontSize: 40, fontWeight: "bold", ml: 25 }}>
//               {event.name}
//             </Typography>
//             <Typography sx={{ fontSize: 30, mt: 4, fontWeight: "bold" }}>
//               Your Dream {event.name}, Perfectly Planned
//             </Typography>
//             <Typography sx={{ fontSize: 30, mt: 4, ml: 18, fontWeight: "bold" }}>
//               Choose {event.name} Venues
//             </Typography>

//             {/* Venue select dropdown */}
//             <FormControl fullWidth sx={{ mt: 4, width: 300 }}>
//               <InputLabel sx={{ ml: 20 }}>Select Venue</InputLabel>
//               <Select
//                 value={selectedOption}
//                 label="Select Venue"
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
//                 {(event.venues || []).map((venue) => (
//                   <MenuItem
//                     key={venue.id}
//                     value={venue.id}
//                     sx={{
//                       backgroundColor: venue.id % 2 === 0 ? "#fce4ec" : "#e8f5e9",
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
//               </Select>
//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


"use client";

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




  // Fetch event details
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

  // Fetch venues for this event
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`/api/venue?eventId=${id}`); // your API for venues by event
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
    router.push(`/venue/${venueId}`);  // <-- changed here to route to venue page
  };

  if (!event) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
        {/* Event Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", width: 350, height: 500, ml: 15 }}>
            <Image
              src={event.photo}
              alt={event.name}
              fill
              style={{ objectFit: "cover", borderRadius: 20 }}
            />
          </Box>
        </Grid>

        {/* Event Info and Venue Select */}
        <Grid item xs={12} md={6}>
          <Box position="relative" mb={20} ml={25} mt={10}>
            <Typography sx={{ fontSize: 40, fontWeight: "bold", ml: 25 }}>
              {event.name}
            </Typography>
            <Typography sx={{ fontSize: 30, mt: 4, fontWeight: "bold" }}>
              Your Dream {event.name}, Perfectly Planned
            </Typography>
            <Typography sx={{ fontSize: 30, mt: 4, ml: 18, fontWeight: "bold" }}>
              Choose {event.name} Venues
            </Typography>

            <FormControl fullWidth sx={{ mt: 4, width: 300 }}>
              <InputLabel sx={{ ml: 20 }}>Select</InputLabel>
              <Select
                value={selectedVenue}
                label="Select"
                onChange={handleSelectChange}
                sx={{
                  ml: 20,
                  width: 400,
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
                {venues.map((venue, idx) => (
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
