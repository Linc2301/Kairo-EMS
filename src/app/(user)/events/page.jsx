

// "use client";
// import Link from "next/link";
// import { Box, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";


// export default function EventPage() {
//   const pyramidRows = [
//     [{ type: "text", name: "Engagement", id: 2, highlighted: true }],

//     [
//       { type: "image", src: "/Event Main Page/cheers.jpg" },
//       { type: "text", name: "Bridal Shower", id: 4 },
//       { type: "text", name: "Wedding", id: 1 },
//       { type: "image", src: "/Event Main Page/balloons.jpg" },
//     ],

//     [
//       { type: "text", name: "Birthday", id: 3, highlighted: true },
//       { type: "text", name: "Baby Shower", id: 5, highlighted: true },
//       { type: "text", name: "Private Party", id: 6, highlighted: true },
//     ],

//     [
//       { type: "image", src: "/Event Main Page/celebrate.jpg" },
//       { type: "text", name: "Corporate Events", id: 7 },
//       { type: "text", name: "Business Meeting", id: 8 },
//       { type: "text", name: "Art Gallery", id: 9 },
//       { type: "image", src: "/Event Main Page/gallery.jpg" },
//     ],
//   ];
//    const router = useRouter();

//   return (
//     <Box sx={{ backgroundColor: "#000", py: 8, px: 2, textAlign: "center" }}>
//       <Typography variant="h4" sx={{ color: "#ccc", fontWeight: "bold", mb: 2 }}>
//         A space for every moment
//       </Typography>
//       <Typography variant="h6" sx={{ color: "#aaa", mb: 15 }}>
//         Book a unique space for your activity
//       </Typography>

//       {pyramidRows.map((row, rowIndex) => (
//         <Box
//           key={rowIndex}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: 8,
//             mb: 4,
//             flexWrap: "wrap",
//           }}
//         >
//           {row.map((item, idx) =>
//             item.type === "text" ? (
//               <Link key={idx} href={`/events/${item.id}`} passHref>
//                 <Typography
//                   sx={{
//                     color: item.highlighted ? "#E24C00" : "#fff",
//                     fontWeight: item.highlighted ? "bold" : "normal",
//                     fontSize: "1.1rem",
//                     cursor: "pointer",
//                     transition: "color 0.2s",
//                     whiteSpace: "nowrap",
//                     "&:hover": {
//                       color: "#FF6600",
//                     },
//                   }}
//                 >
//                   {item.name}
//                 </Typography>
//               </Link>
//             ) : (
//               <Box
//                 key={idx}
//                 component="img"
//                 src={item.src}
//                 alt=""
//                 sx={{ width: 90, height: 90, borderRadius: 7 }}
//               />
//             )
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  const pageCount = Math.ceil(events.length / cardsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const topRow = paginatedEvents.slice(0, 3);
  const bottomRow = paginatedEvents.slice(3, 6);

  const renderCard = (event) => (
    <Card
      key={event.id}
      sx={{
        width: 260,
        height: 400,
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
      }}
    >
      <Link
        href={`/events/${event.id}`}
        passHref
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image with fixed height */}
        <Box sx={{ height: 235, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={event.photo || "/images/default.jpg"}
            alt={event.name}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Content */}
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
              sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}
            >
              {event.name}
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
              {event.description}
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
            <IconButton
              size="small"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": { color: "#ff1744" },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "silver", py: 8, px: 2, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ color: "#ccc", fontWeight: "bold", mb: 2 }}
      >
        A space for every moment
      </Typography>
      <Typography variant="h6" sx={{ color: "#aaa", mb: 10 }}>
        Book a unique space for your activity
      </Typography>

      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
        {topRow.map(renderCard)}
      </Box>

      {/* Bottom Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {bottomRow.map(renderCard)}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 8 }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ color: "#fff", mt: 1 }}>{`Page ${currentPage}`}</Typography>
        <Button
          variant="outlined"
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
