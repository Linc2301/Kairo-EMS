"use client";
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"; // Custom CSS for scale effect

const eventData = [
  { title: "Baby Shower", image: "/assets/home4.jpg" },
  { title: "Private Party", image: "/assets/home6.jpg" },
  { title: "Wedding Party", image: "/assets/home5.jpg" },
  { title: "Birthday Party", image: "/assets/home2.jpg" },
  { title: "Bridal Shower", image: "/assets/home1.jpg" },
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
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};

export default function EventCarousel() {
  return (
    <>
      {/* Top Header */}
      <Box sx={{ textAlign: "center", pt: 2, bgcolor: "#000", color: "#fff" }}>
        <Typography variant="h3" gutterBottom>
          Let’s discover the events
        </Typography>
        <Typography variant="subtitle1" color="orange">
          Enjoying the process of creating unforgettable moments...
        </Typography>
      </Box>

      {/* Carousel */}
      <Box sx={{  bgcolor: "#000", px: 18, py: 10}}>
        <Slider {...settings}>
          {eventData.map((event, index) => (
            <Box
              key={index}
              className="carousel-card"
              sx={{
                width: 250,
                height: 370,
                position: "relative",
                // borderRadius: "30px",
                overflow: "hidden",
                
                // borderRadius: 10,
                // borderColo: "white"
                  borderRadius: 12,// Rounded corners}\
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
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

      {/* Footer Text */}
      <Box sx={{ textAlign: "center", pb: 2, bgcolor: "#000", color: "#fff" }}>
        <Typography variant="h5" color="orange" gutterBottom>
          Join Our Events
        </Typography>
        <Typography variant="subtitle1">
          We will give a very special celebration for you
        </Typography>
      </Box>
    </>
  );
}
