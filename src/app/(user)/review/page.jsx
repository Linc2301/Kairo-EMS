"use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   Stack,
//   Rating,
//   Button,
// } from "@mui/material";
// import Link from "next/link";

// export default function ReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch reviews from API
//   const getReviewList = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/review");
//       setReviews(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load reviews");
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getReviewList();
//   }, []);

//   if (loading)
//     return (
//       <Container sx={{ py: 6 }}>
//         <Typography align="center">Loading reviews...</Typography>
//       </Container>
//     );

//   if (error)
//     return (
//       <Container sx={{ py: 6 }}>
//         <Typography color="error" align="center">
//           {error}
//         </Typography>
//       </Container>
//     );

//   return (
//     <Box sx={{ bgcolor: "black", color: "white", py: 6, width: '80 %', height: '80 %' }}>
//       <Container>
//         <Typography
//           variant="h4"
//           align="center"
//           fontWeight="bold"
//           mb={2}
//           sx={{ color: "#7F5AF0" }}
//         >
//           Our Happy Customers
//         </Typography>


//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} ml={45}>
//           <Typography
//             variant="h6"
//             align="center"
//             fontWeight="bold"
//             mb={3}
//             sx={{ color: "orange" }}
//           >
//             See how our customers are talking about us
//           </Typography>
//           <Link passHref href="/review/create">
//             <Button sx={{ mb: 2 }} variant="contained">
//               Give Review
//             </Button>
//           </Link>
//         </Stack>




//         <Stack
//           direction="row"
//           flexWrap="wrap"
//           gap={2}
//           justifyContent="center"
//         >
//           {reviews.length === 0 && (
//             <Typography>No reviews available.</Typography>
//           )}

//           {reviews.map((review) => (
//             <Card
//               key={review.id}
//               sx={{
//                 width: { xs: "100%", sm: 350 },
//                 bgcolor: "#1E1E1E",
//                 color: "white",
//                 borderRadius: 2,
//               }}
//             >
//               <CardContent>
//                 <Stack direction="row" spacing={2} alignItems="center" mb={1}>
//                   <Avatar
//                     alt={review.user?.name || "User"}
//                     src={review.user?.photo || ""}
//                   />
//                   <Box>
//                     <Typography fontWeight="bold">
//                       {review.user?.name || "Anonymous"}
//                     </Typography>
//                     <Typography variant="body2" color="gray">
//                       {review.Venue?.name || "Unknown Venue"}
//                     </Typography>
//                     <Typography variant="caption" color="gray">
//                       {new Date(review.review_date).toLocaleDateString()}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Rating
//                   value={review.rating || 0}
//                   readOnly
//                   size="small"
//                   sx={{ mb: 1 }}
//                 />

//                 <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
//                   {review.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Stack>
//       </Container>
//     </Box>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Rating,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "@/src/components/Loading";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  // Fetch reviews
  const getReviewList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/review");
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load reviews");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    getReviewList();
  }, []);

  if (loading)
    return (
      <Loading open={true}/>
    );

  if (error)
    return (
      <Container sx={{ py: 6 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        py: 6,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#7F5AF0" }}
        >
          Our Happy Customers
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2} ml={45}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "orange" }}
          >
            See how our customers are talking about us
          </Typography>

          {session ? (
            <Link passHref href="/review/create">
              <Button sx={{ mb: 2 }} variant="contained">
                Give Review
              </Button>
            </Link>
          ) : (
            <Button sx={{ mb: 2 }} variant="contained" disabled>
              Login to Give Review
            </Button>
          )}
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
          {reviews.length === 0 ? (
            <Typography>No reviews available.</Typography>
          ) : (
            reviews.map((review) => (
              <Card
                key={review.id}
                sx={{
                  width: { xs: "100%", sm: 350 },
                  bgcolor: "#1E1E1E",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Avatar
                      alt={review.user?.name || "User"}
                      src={review.user?.photo || ""}
                    />
                    <Box>
                      <Typography fontWeight="bold">
                        {review.user?.name || "Anonymous"}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {review.Venue?.name || "Unknown Venue"}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {new Date(review.review_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <Rating
                    value={review.rating || 0}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />

                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {review.description}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
}

