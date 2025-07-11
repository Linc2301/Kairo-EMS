// // components/EventCardCarousel.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

// // Dummy Event Data
// const events = [
//    { title: 'Baby Shower', image: '/assets/b5.png' },
//   { title: 'Private Party', image: '/assets/party.png' },
//   { title: 'Wedding Party', image: '/assets/w6.png' },
//   { title: 'Birthday Party', image: '/assets/birthday.png' },
//   // Changed "Bride to Be" to "Bridal Shower" to match the image
//   { title: 'Bridal Shower', image: '/assets/birdal.png' },
// ];

// const EventCard = ({ title, image }) => (
//   <Card
//     sx={{
//       width: 250,
//       height: 270,
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       borderRadius: 2,
//       boxShadow: 3,
//       margin: '0 auto',
//       bgcolor: "black"
//     }}
//   >
//     <CardMedia
//       component="img"
//       image={image}
//       alt={title}
//       sx={{
//         height: 140,
//         objectFit: 'cover',
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//       }}
//     />
//     <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Typography variant="h6" fontWeight={600} align="center" noWrap>
//         {title}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 600,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   pauseOnHover: true,
//   responsive: [
//     { breakpoint: 960, settings: { slidesToShow: 2 } },
//     { breakpoint: 600, settings: { slidesToShow: 1 } },
//   ],
// };

// const EventCardCarousel = () => (
//   <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 2 }}>
//     <Slider {...sliderSettings}>
//       {events.map((event) => (
//         <Box key={event.title} px={1}>
//           <EventCard title={event.title} image={event.image} />
//         </Box>
//       ))}
//     </Slider>
//   </Box>
// );

// export default EventCardCarousel;