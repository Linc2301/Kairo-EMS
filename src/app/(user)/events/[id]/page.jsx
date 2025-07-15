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
import { Bold } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// အမျိုးအစားများ
const categoryData = {
  1: "Engagement",
  2: "Bridal Shower",
  3: "Wedding",
  4: "Birthday",
  5: "Baby Shower",
  6: "Private Party",
  7: "Corporate Events",
  8: "Business Meeting",
  9: "Art Gallery",
};

// Image ဖိုင်တွေအတွက်
const categoryImages = {
  1: "/assets/w6.png",
  2: "/assets/b5.png",
  3: "/assets/birthday.png",
  4: "/assets/party-hall.jpg",
  5: "/assets/party.png",
  6: "/assets/room.jpg",
  7: "/assets/web-indoor.jpg",
  8: "/assets/birdal.png",
  9: "/assets/Why-kairo.jpg",
};

// Venue အမျိုးအစားများ
const selectOptions = {
  1: ["Ballroom", "Garden Venue", "Rooft Top"],
  2: ["Ballroom", "Outdoor"],
  3: ["Private Room", "Ballroom", "Outdoor"],
  4: ["Private Room", "Outdoor"],
  5: ["Private Room", "Outdoor"],
  6: ["Private Room", "Rooft Top"],
  7: ["Private Room", "Ballroom", "Outdoor"],
  8: ["Private Room"],
  9: ["Indoor Space"],
};

export default function CategoryPage() {
  const params = useParams();
  const id = params.id;
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();



  const handleSelectChange = (e) => {
    const selectedVenue = e.target.value;
    setSelectedOption(selectedVenue);

    router.push(`/events/${id}/venues/${encodeURIComponent(selectedVenue)}`);
    


  
  };


  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
        {/* left grid */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", width: 350, height: 500, ml: 15 }}>
            <Image
              src={categoryImages[id] || "/assets/w6.png"}
              alt=""
              fill
              style={{ objectFit: "cover", borderRadius: 20 }}
            />
          </Box>
        </Grid>

        {/* right grid */}
        <Grid item xs={12} md={6} >
          <Box position="relative" mb={20} ml={25} mt={10}>
            <Typography sx={{ fontSize: 40, fontWeight: "bold", ml: 25 }}>
              {categoryData[id]}
            </Typography>
            <Typography sx={{ fontSize: 30, mt: 4, fontWeight: "bold" }}>
              Your Dream {categoryData[id]}, Perfectly Planned
            </Typography>
            <Typography
              sx={{ fontSize: 30, mt: 4, ml: 18, fontWeight: "bold" }}
            >
              Choose {categoryData[id]} Venues
            </Typography>

            {/* Select Dropdown */}
            <FormControl fullWidth sx={{ mt: 4, width: 300 }}>
             

<InputLabel sx={{ ml: 20 }}>Select</InputLabel>
<Select
  value={selectedOption}
  label="Select Option"
  onChange={handleSelectChange}
  sx={{
    ml: 20,
    width: 400,
    backgroundColor: "#fff", // white fill inside
    borderRadius: 2,         // slightly rounded corners
    // make sure variant="outlined" is default or add it explicitly
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "3px",     // thick border
      borderColor: "#1976d2", // blue border color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "3px",
      borderColor: "#E24C00", // change border color on hover (your hover orange)
      backgroundColor: "#fff", // keep fill white on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "3px",
      borderColor: "#E24C00", // border color when focused
    },
  }}
>
  {(selectOptions[id] || []).map((option, idx) => (
    <MenuItem
      key={idx}
      value={option}
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
      {option}
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
