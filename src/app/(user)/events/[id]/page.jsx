// "use client";

// import { Box, Typography } from "@mui/material";
// import { useParams } from "next/navigation";

// //Dynamic Route Page
// //Params : id


// export default function EventDetail() {
//     const params = useParams();
//     const id = params.id
//     console.log('EventID: ', params.id);
    
//     return(
//         <Box>
//             <Typography>EventDetail:{id}</Typography>
//         </Box>
//     );

// }

"use client";

import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";

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

export default function CategoryPage() {
  const params = useParams();
  const id = params.id;

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
            
        </Grid>
      
    </Box>
  );
}
