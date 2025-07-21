

"use client";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function EventPage() {
  const pyramidRows = [
    [{ type: "text", name: "Engagement", id: 2, highlighted: true }],

    [
      { type: "image", src: "/Event Main Page/cheers.jpg" },
      { type: "text", name: "Bridal Shower", id: 4 },
      { type: "text", name: "Wedding", id: 1 },
      { type: "image", src: "/Event Main Page/balloons.jpg" },
    ],

    [
      { type: "text", name: "Birthday", id: 3, highlighted: true },
      { type: "text", name: "Baby Shower", id: 5, highlighted: true },
      { type: "text", name: "Private Party", id: 6, highlighted: true },
    ],

    [
      { type: "image", src: "/Event Main Page/celebrate.jpg" },
      { type: "text", name: "Corporate Events", id: 7 },
      { type: "text", name: "Business Meeting", id: 8 },
      { type: "text", name: "Art Gallery", id: 9 },
      { type: "image", src: "/Event Main Page/gallery.jpg" },
    ],
  ];

  return (
    <Box sx={{ backgroundColor: "#000", py: 8, px: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#ccc", fontWeight: "bold", mb: 2 }}>
        A space for every moment
      </Typography>
      <Typography variant="h6" sx={{ color: "#aaa", mb: 15 }}>
        Book a unique space for your activity
      </Typography>

      {pyramidRows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          {row.map((item, idx) =>
            item.type === "text" ? (
              <Link key={idx} href={`/events/${item.id}`} passHref>
                <Typography
                  sx={{
                    color: item.highlighted ? "#E24C00" : "#fff",
                    fontWeight: item.highlighted ? "bold" : "normal",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "#FF6600",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
            ) : (
              <Box
                key={idx}
                component="img"
                src={item.src}
                alt=""
                sx={{ width: 85, height: 80, borderRadius: 7 }}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
}
