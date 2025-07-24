"use client";
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"; // Custom CSS for scale effect

const eventData = [
  { title: "Baby Shower", image: "/assets/b5.png" },
  { title: "Private Party", image: "/assets/party.png" },
  { title: "Wedding Party", image: "/assets/w6.png" },
  { title: "Birthday Party", image: "/assets/birthday.png" },
  { title: "Bridal Shower", image: "/assets/birdal.png" },
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
      <Box sx={{ py: 5, bgcolor: "#000" }}>
        <Slider {...settings}>
          {eventData.map((event, index) => (
            <Box
              key={index}
              className="carousel-card"
              sx={{
                width: 350,
                height: 350,
                position: "relative",
                borderRadius: "20",
                overflow: "hidden",
                mx: 1,
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
