"use client";

import * as React from "react";
import { Box, Tabs, Tab, Typography, Button, Divider } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function BookingTabs() {
  const [value, setValue] = React.useState(0);

  const [bookingData, setBookingData] = React.useState({
    venue: {
      title: "Wedding Venue (Crystal)",
      price: 3000000,
    },
    floral: {
      name: "Premium Floral",
      price: 200000,
    },
    date: new Date(2025, 6, 14, 18, 0),
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const venues = [
    {
      title: "Light Ballroom",
      people: "30 - 50",
      price: 2000000,
      image: "/card1.jpg",
    },
    {
      title: "Crystal Ballroom",
      people: "50 - 70",
      price: 3000000,
      image: "/card1.jpg",
    },
    {
      title: "Harmony Ballroom",
      people: "70 - 100",
      price: 4000000,
      image: "/card1.jpg",
    },
    {
      title: "Grand Ballroom",
      people: "100 - 150",
      price: 5000000,
      image: "/card1.jpg",
    },
  ];

  const florals = [
    { name: "Simple Floral", price: 100000, image: "/card1.jpg" },
    { name: "Premium Floral", price: 200000, image: "/card1.jpg" },
  ];

  const dateSlots = [
    {
      label: "July 20, 2025 - 10:00 AM",
      value: new Date(2025, 6, 20, 10, 0),
      image: "/card1.jpg",
    },
    {
      label: "July 21, 2025 - 2:00 PM",
      value: new Date(2025, 6, 21, 14, 0),
      image: "/card1.jpg",
    },
    {
      label: "July 22, 2025 - 5:00 PM",
      value: new Date(2025, 6, 22, 17, 0),
      image: "/card1.jpg",
    },
  ];

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          margin: "auto",
          bgcolor: "black",
          color: "white",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            px: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              minHeight: 48,
              "& .MuiTabs-indicator": {
                backgroundColor: "orange",
                height: 3,
              },
              "& .MuiTab-root": {
                minHeight: 48,
                fontSize: "1rem",
                textTransform: "none",
                padding: "12px 16px",
                "&.Mui-selected": {
                  color: "orange",
                  fontWeight: "bold",
                },
              },
            }}
          >
            <Tab
              label="Venue"
              sx={{
                color: value === 0 ? "orange" : "black",
                mr: 1,
              }}
              {...a11yProps(0)}
            />
            <Tab
              label="Floral Service"
              sx={{
                color: value === 1 ? "orange" : "black",
                mx: 1,
              }}
              {...a11yProps(1)}
            />
            <Tab
              label="Date & Time"
              sx={{
                color: value === 2 ? "orange" : "black",
                mx: 1,
              }}
              {...a11yProps(2)}
            />
            <Tab
              label="Receipt"
              sx={{
                color: value === 3 ? "orange" : "black",
                ml: 1,
              }}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {venues.map((venue, i) => (
              <Box
                key={i}
                sx={{
                  width: 270,
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <img
                  src={venue.image}
                  alt={venue.title}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight="bold" color="orange">
                    {venue.title}
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    {venue.people} people can attend
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    Price - {venue.price.toLocaleString()} MMK
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: "orange",
                      color: "orange",
                      width: "100%",
                      borderRadius: "20px",
                      py: 1,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "darkorange",
                        backgroundColor: "rgba(255, 165, 0, 0.08)",
                      },
                    }}
                    onClick={() =>
                      setBookingData((prev) => ({ ...prev, venue }))
                    }
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
            {florals.map((floral, i) => (
              <Box
                key={i}
                sx={{
                  width: 270,
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <img
                  src={floral.image}
                  alt={floral.title}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">{floral.name}</Typography>
                  <Typography>
                    Price: {floral.price.toLocaleString()} MMK
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: "orange",
                      color: "orange",
                      width: "100%",
                      borderRadius: "20px",
                      py: 1,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "darkorange",
                        backgroundColor: "rgba(255, 165, 0, 0.08)",
                      },
                    }}
                    onClick={() =>
                      setBookingData((prev) => ({ ...prev, venue }))
                    }
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {dateSlots.map((slot, i) => (
              <Box
                key={i}
                sx={{
                  width: 270,
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <img
                  src={slot.image}
                  alt={slot.title}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography>{slot.label}</Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: "orange",
                      color: "orange",
                      width: "100%",
                      borderRadius: "20px",
                      py: 1,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "darkorange",
                        backgroundColor: "rgba(255, 165, 0, 0.08)",
                      },
                    }}
                    onClick={() =>
                      setBookingData((prev) => ({ ...prev, venue }))
                    }
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <Box
            sx={{
              bgcolor: "white",
              color: "black",
              p: 4,
              borderRadius: 2,
              maxWidth: 500,
              mx: "auto",
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={4}
              sx={{
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Receipt
            </Typography>

            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Venue
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                {bookingData.venue?.title || "Not selected"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Floral Service
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                {bookingData.floral?.name || "Not selected"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Date & Time
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                {bookingData.date
                  ? bookingData.date
                      .toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(",", "")
                  : "Not selected"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
                mb: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {[bookingData.venue?.price || 0, bookingData.floral?.price || 0]
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}{" "}
                MMK
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  borderColor: "orange",
                  color: "orange",
                  py: 1.5,
                  "&:hover": {
                    borderColor: "darkorange",
                    backgroundColor: "rgba(255, 165, 0, 0.04)",
                  },
                }}
                onClick={() => setValue(0)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: "orange",
                  color: "white",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "darkorange",
                  },
                }}
                onClick={() => {
                  alert("Booking confirmed!");
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </CustomTabPanel>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            disabled={value === 0}
            onClick={() => setValue((v) => v - 1)}
            color="inherit"
          >
            Back
          </Button>
          <Button
            disabled={value === 3}
            onClick={() => setValue((v) => v + 1)}
            sx={{ color: "orange" }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
