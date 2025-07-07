'use client';

import { Card, CardContent, Typography, Avatar, Rating, Box } from '@mui/material';
import Image from 'next/image';

const CustomerReviewCard = ({ review }) => {
  return (
    <Card sx={{ border: '2px solid orange', borderRadius: 2, backgroundColor: 'white' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={review.avatar} />
            <Box>
              <Typography fontWeight="bold">{review.name}</Typography>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2">{review.venue}</Typography>
            </Box>
          </Box>
          <Typography variant="body2">{review.date}</Typography>
        </Box>
        <Typography mt={2}>{review.feedback}</Typography>
        <Box mt={2}>
          <Image
            src={review.image}
            alt="event"
            width={500}
            height={300}
            style={{ width: '100%', borderRadius: 10 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;
