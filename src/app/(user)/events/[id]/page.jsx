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

import { Box, Grid, Typography } from "@mui/material";
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
    <Box sx={{ p: 4 }} width="100%" height="100%">
        <Grid container>
            {/* left grid */}
            <Grid >
                <Image 
                src="/assets/w6.png"
                alt="">
                </Image>
                <Image 
                src="/assets/w6.png"
                alt="">
                </Image>
                <Image 
                src="/assets/w6.png"
                alt="">
                </Image>
                
            </Grid>

            {/* right grid */}
            <Grid>
                  <Typography>Name </Typography>


                  <Button>Book</Button>
            </Grid>
            
        </Grid>
      
    </Box>
  );
}
