

"use client";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function EventPage() {
  const pyramidRows = [
    [{ type: "text", name: "Engagement", id: 1, highlighted: true }],

    [
      { type: "image", src: "/assets/w6.png" },
      { type: "text", name: "Bridal Shower", id: 2 },
      { type: "text", name: "Wedding", id: 3 },
      { type: "image", src: "/images/img2.png" },
    ],

    [
      { type: "text", name: "Birthday", id: 4, highlighted: true },
      { type: "text", name: "Baby Shower", id: 5, highlighted: true },
      { type: "text", name: "Private Party", id: 6, highlighted: true },
    ],

    [
      { type: "image", src: "/images/img3.png" },
      { type: "text", name: "Corporate Events", id: 7 },
      { type: "text", name: "Business Meeting", id: 8 },
      { type: "text", name: "Art Gallery", id: 9 },
      { type: "image", src: "/images/img4.png" },
    ],
  ];

  return (
    <Box sx={{ backgroundColor: "#000", py: 6, px: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#ccc", fontWeight: "bold", mb: 2 }}>
        A space for every moment
      </Typography>
      <Typography variant="h6" sx={{ color: "#aaa", mb: 8 }}>
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
                sx={{ width: 40, height: 40, objectFit: "contain" }}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
}
