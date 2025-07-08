"use client";

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Box,
} from "@mui/material";
import Image from "next/image";

const CustomerReviewCard = ({ review }) => {
  return (
    <>
      <Card
        sx={{
          border: "1px solid orange",
          borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          {/* Top row */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={review.avatar} />
              <Box>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Rating value={5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {review.venue}
                </Typography>
              </Box>
            </Box>
            <Typography  variant="body2" color="text.secondary">
              {review.date}
            </Typography>
          </Box>

          {/* Feedback */}
          <Typography sx={{paddingX:2}} mt={2} color="text.primary">
            {review.feedback}
          </Typography>

          {/* Event image */}
          <Box mt={2}sx={{paddingX:2}} >
            <Image
              src={review.image}
              alt="event"
              width={500}
              height={300}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 10,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomerReviewCard;
