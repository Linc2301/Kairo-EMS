import { Box, Typography, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const CustomerReviewCard = ({ review }) => {
  const { name, avatar, venue, date, feedback, rating } = review;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} sx={{ color: "#FFD700" }} />
        ) : (
          <StarBorderIcon key={i} sx={{ color: "#FFD700" }} />
        )
      );
    }
    return stars;
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #333",
        borderRadius: 2,
        backgroundColor: "#1a1a1a",
        width: "100%",
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar src={avatar} alt={name} sx={{ mr: 2 }} />
        <Box>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography variant="body2" color="gray">
            {venue} — {date}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" mb={1}>{renderStars(rating)}</Box>

      <Typography>{feedback}</Typography>
    </Box>
  );
};

export default CustomerReviewCard;
