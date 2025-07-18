

// "use client";

// import React from "react";
// import Slider from "react-slick";
// import { Box, Typography } from "@mui/material";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./carousel.css"; // Make sure styles don’t override your layout

// const eventData = [
//   { title: 'Baby Shower', image: '/assets/b5.png' },
//   { title: 'Private Party', image: '/assets/party.png' },
//   { title: 'Wedding Party', image: '/assets/w6.png' },
//   { title: 'Birthday Party', image: '/assets/birthday.png' },
//   // Changed "Bride to Be" to "Bridal Shower" to match the image
//   { title: 'Bridal Shower', image: '/assets/birdal.png' },
  
// ];

// const settings = {
//   centerMode: true,
//   centerPadding: "0px",
//   slidesToShow: 3, // This determines how many slides are visible at once
//   infinite: true,
//   autoplay: true,
//   autoplaySpeed: 2500,
//   speed: 500,
//   arrows: false,
//   dots: false,
//   responsive: [
//     {
//       breakpoint: 900,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//       },
//     },
//   ],
// };

// export default function EventCarousel() {
//   return (

//     <>
//      <Box sx={{ textAlign: 'center', pt: 2, bgcolor: '#000', color: '#fff' }}>
//                <Typography variant="h3" gutterBottom>Let’s discover the events</Typography>
//                <Typography variant="subtitle1" color="orange">
//                     Enjoying the process of creating unforgettable moments...
//                 </Typography>
//           </Box>
//       <Box sx={{ py: 5, bgcolor: "black" }}>
//       <Slider {...settings}>
//         {eventData.map((event, index) => (
//           <Box
//             key={index}
//             className="carousel-card"
//             sx={{
//               position: "relative",
//               // Adjusted width for a more visually appealing card size, similar to the image.
//               // You might need to fine-tune this value further based on your desired exact look.
//               // A percentage like '90%' or 'calc(100% - 20px)' (if you add margin) can also work.
//               width: '450px !important', // Example responsive widths
//               height: 450,
//               borderRadius: 20, // Reduced border-radius to match the image more closely (it's less rounded than 20)
//               overflow: "hidden",
//               flexShrink: 0,
//               mx: 1, // Add horizontal margin between cards for spacing as seen in the image
//             }}
//           >
//             <img
//               src={event.image}
//               alt={event.title}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 borderRadius: "15px", // Match the parent border-radius
//               }}
//             />
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: 0,
//                 width: "100%",
//                 bgcolor: "rgba(255, 255, 255, 0.12)",
//                 color: "#000",
//                 textAlign: "center",
//                 py: 1,
//               }}
//             >
//               <Typography fontSize="0.8rem">{event.title}</Typography>
//             </Box>
//           </Box>
//         ))}
//       </Slider>
//     </Box>

//     <Box sx={{ textAlign: 'center',pb: 2, bgcolor: '#000', color: '#fff' }}>
//                  <Typography variant="h5" color='orange' gutterBottom>Join Our Events</Typography>
//                  <Typography variant="subtitle1" color="white">
//                     We will give a very special celebration for you
//                  </Typography>
//             </Box>
//     </>
    
  
//   );
// }



"use client";
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"; // Must contain the styles above

const eventData = [
  { title: 'Baby Shower', image: '/assets/b5.png' },
  { title: 'Private Party', image: '/assets/party.png' },
  { title: 'Wedding Party', image: '/assets/w6.png' },
  { title: 'Birthday Party', image: '/assets/birthday.png' },
  { title: 'Bridal Shower', image: '/assets/birdal.png' },
];

const settings = {
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 3,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 500,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function EventCarousel() {
  return (
    <>
      <Box sx={{ textAlign: 'center', pt: 2, bgcolor: '#000', color: '#fff' }}>
        <Typography variant="h3" gutterBottom>
          Let’s discover the events
        </Typography>
        <Typography variant="subtitle1" color="orange">
          Enjoying the process of creating unforgettable moments...
        </Typography>
      </Box>

      <Box sx={{ py: 5, bgcolor: "black" }}>
        <Slider {...settings}>
          {eventData.map((event, index) => (
            <Box
              key={index}
              className="carousel-card"
              sx={{
                width: '450px !important', // Example responsive widths
                height: 450,
                position: "relative",
                borderRadius: "20px",
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  textAlign: "center",
                  py: 1,
                }}
              >
                <Typography fontSize="0.9rem">{event.title}</Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ textAlign: 'center', pb: 2, bgcolor: '#000', color: '#fff' }}>
        <Typography variant="h5" color="orange" gutterBottom>
          Join Our Events
        </Typography>
        <Typography variant="subtitle1" color="white">
          We will give a very special celebration for you
        </Typography>
      </Box>
    </>
  );
}
