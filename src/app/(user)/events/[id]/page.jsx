"use client";

import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Bold } from "lucide-react";


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedList, theme) {
  return {
    fontWeight: selectedList.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}





export default function CategoryPage() {
  const params = useParams();
  const id = params.id;
  const [selectedOption, setSelectedOption] = useState("");
  const theme = useTheme();
const [selectedOptions, setSelectedOptions] = useState([]);

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
};



  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} alignItems="center" sx={{mt: 8}}>
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
          <Box position="relative" mb={24} ml={25}  >
            <Typography sx={{ fontSize: 40, fontWeight: "bold" ,ml: 25}}>
            {categoryData[id]}
          </Typography>
          <Typography sx={{ fontSize: 30, mt: 2 , fontWeight: "bold"}}>
            Your Dream {categoryData[id]}, Perfectly Planned
          </Typography>
          <Typography sx={{ fontSize: 30, mt: 2, ml: 18, fontWeight:"bold" }}>
            Choose {categoryData[id]} Venues
          </Typography>
         <FormControl sx={{ mt: 4, width: 300 }}>
  <InputLabel  id="venue-select-label" sx={{ml: 15, color:"#E24C00"}}>Select</InputLabel>
  <Select sx={{width: "500px", ml: 12 , color: "#E24C00", "& .MuiSelect-icon": {
      color: "#ff5722", // 🔸 dropdown arrow color
    },}}
    labelId="venue-select-label"
    id="venue-select"
    single
    value={selectedOptions}
    onChange={handleChange}
    input={<OutlinedInput label="Venue Type" />}
    MenuProps={MenuProps}
  >
  {(selectOptions[id] || []).map((option) => (
  <MenuItem
    key={option}
    value={option}
    style={{
      color: selectedOptions.includes(option) ? "#E24C00" : "#333",
      fontWeight: selectedOptions.includes(option)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    }}
    sx={{
      "&:hover": {
        backgroundColor: "#fbe9e7",
        color: "#E24C00",
      },
    }}
  >
    {option}
  </MenuItem>
))}

  </Select>
</FormControl>
<Typography sx={{ color: "#E24C00", fontWeight: "bold", ml: 18, fontSize: 17, mt: 3}}>Easiest way to book unique venues for events</Typography>

        

          </Box>
          
        </Grid>
      </Grid>
    </Box>
  );
}