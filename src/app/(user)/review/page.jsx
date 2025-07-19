"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import CustomerReviewCard from "@/src/components/CustomerReviewCard";

const reviews = [
  {
    name: "Wai Lynn Oo",
    avatar: "/avatars/avatar1.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "3.5.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
  
  },
  {
    name: "Ye Htut Naung",
    avatar: "/avatars/avatar2.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "5.5.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
    
  },
  {
    name: "Su Yadana Tun",
    avatar: "/avatars/avatar3.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "2.5.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
   
  },
  {
    name: "Ash Kidd",
    avatar: "/avatars/avatar4.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "2.5.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
   
  },
  {
    name: "Kaung Htet Lin",
    avatar: "/avatars/avatar5.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "7.6.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
   
  },
  {
    name: "Thiha Oo",
    avatar: "/avatars/avatar6.png",
    venue: "Crystal Ballroom (Corporate Event)",
    date: "6.5.2024",
    feedback:
      "I like the way they plan events and I like their services. It makes me feel like I’m planning by myself.",
    
  },
];

export default function Reviews() {
  return (
    <>
     
      {/* Review Section */}
      <Box sx={{ bgcolor: "black", color: "white", py: 6 }}>
        <Container>
          <Typography variant="h4" align="center" fontWeight="bold" mb={1}>
            Our Happy <span style={{ color: "#7F5AF0" }}>Customers</span>
          </Typography>
          <Typography variant="body1" align="center" mb={5}>
            See how our customers are talking about us
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {reviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)",
                    md: "calc(33.33% - 16px)",
                  },
                  display: "flex",
                }}
              >
                <CustomerReviewCard review={review} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
