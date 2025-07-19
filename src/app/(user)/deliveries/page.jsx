
// "use client";

// import * as React from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Button,
//   Divider,
//   CircularProgress,
// } from "@mui/material";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div role="tabpanel" hidden={value !== index} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `tab-${index}`,
//     "aria-controls": `tabpanel-${index}`,
//   };
// }

// export default function BookingTabs() {
//   const [value, setValue] = React.useState(0);
//   const [loading, setLoading] = React.useState({
//     venues: false,
//     florals: false,
//     timePackages: false,
//     confirm: false,
//   });
//   const [error, setError] = React.useState(null);

//   const [venues, setVenues] = React.useState([]);
//   const [florals, setFlorals] = React.useState([]);
//   const [timePackages, setTimePackages] = React.useState([]);

//   const [bookingData, setBookingData] = React.useState({
//     venue: null,
//     floral: null,
//     timePackage: null,
//   });

//   // Fetch venues
//   React.useEffect(() => {
//     setLoading((l) => ({ ...l, venues: true }));
//     fetch("/api/venueType")
//       .then((res) => res.json())
//       .then((data) => {
//         setVenues(data);
//       })
//       .catch(() => setError("Failed to load venues"))
//       .finally(() => setLoading((l) => ({ ...l, venues: false })));
//   }, []);

//   // Fetch floral services
//   React.useEffect(() => {
//     setLoading((l) => ({ ...l, florals: true }));
//     fetch("/api/floralServices")
//       .then((res) => res.json())
//       .then((data) => {
//         setFlorals(data);
//       })
//       .catch(() => setError("Failed to load floral services"))
//       .finally(() => setLoading((l) => ({ ...l, florals: false })));
//   }, []);

//   // Fetch time packages
//   React.useEffect(() => {
//     setLoading((l) => ({ ...l, timePackages: true }));
//     fetch("/api/timePackages")
//       .then((res) => res.json())
//       .then((data) => {
//         setTimePackages(data);
//       })
//       .catch(() => setError("Failed to load time packages"))
//       .finally(() => setLoading((l) => ({ ...l, timePackages: false })));
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     // Disable tabs beyond current or incomplete steps
//     if (
//       newValue === 1 &&
//       !bookingData.venue
//     )
//       return;
//     if (
//       newValue === 2 &&
//       (!bookingData.venue || !bookingData.floral)
//     )
//       return;
//     if (
//       newValue === 3 &&
//       (!bookingData.venue || !bookingData.floral || !bookingData.timePackage)
//     )
//       return;

//     setValue(newValue);
//   };

//   // When user selects venue, auto-move to next tab
//   const selectVenue = (venue) => {
//     setBookingData((prev) => ({
//       ...prev,
//       venue,
//       // reset dependent selections
//       floral: null,
//       timePackage: null,
//     }));
//     setValue(1);
//   };

//   // When user selects floral, auto-move to next tab
//   const selectFloral = (floral) => {
//     setBookingData((prev) => ({
//       ...prev,
//       floral,
//       timePackage: null,
//     }));
//     setValue(2);
//   };

//   // When user selects time package, auto-move to next tab
//   const selectTimePackage = (timePackage) => {
//     setBookingData((prev) => ({
//       ...prev,
//       timePackage,
//     }));
//     setValue(3);
//   };

//   // Confirm booking: send POST request to backend
//   const handleConfirm = async () => {
//     setError(null);

//     if (!bookingData.venue || !bookingData.floral || !bookingData.timePackage) {
//       alert("Please complete all selections before confirming.");
//       return;
//     }

//     // Prepare payload - adjust user_id as needed
//     const payload = {
//       venue_id: bookingData.venue.venue_id || bookingData.venue.id,
//       venueTypeId: bookingData.venue.id, // assuming this is venueTypeId
//       floral_service_id: bookingData.floral.id,
//       timePackageId: bookingData.timePackage.id,
//       user_id: 1, // TODO: replace with actual logged in user ID
//       booking_date: new Date().toISOString(), // you may want to customize this
//       total_amount:
//         (bookingData.venue.price || 0) + (bookingData.floral.price || 0),
//     };

//     setLoading((l) => ({ ...l, confirm: true }));

//     try {
//       const res = await fetch("/api/booking-info", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errBody = await res.json();
//         setError(errBody.error || errBody.message || "Booking failed");
//         alert("Booking failed: " + (errBody.error || errBody.message));
//         return;
//       }

//       const data = await res.json();
//       alert("Booking confirmed! ID: " + data.id);
//       // Reset selections and go back to first tab
//       setBookingData({ venue: null, floral: null, timePackage: null });
//       setValue(0);
//     } catch (err) {
//       setError(err.message);
//       alert("Booking error: " + err.message);
//     } finally {
//       setLoading((l) => ({ ...l, confirm: false }));
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: "black", minHeight: "100vh", py: 4 }}>
//       <Box
//         sx={{
//           width: "90%",
//           maxWidth: "1200px",
//           margin: "auto",
//           bgcolor: "black",
//           color: "white",
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: "white",
//             px: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Tabs
//             value={value}
//             onChange={handleTabChange}
//             textColor="inherit"
//             indicatorColor="primary"
//             variant="fullWidth"
//             sx={{
//               minHeight: 48,
//               "& .MuiTabs-indicator": {
//                 backgroundColor: "orange",
//                 height: 3,
//               },
//               "& .MuiTab-root": {
//                 minHeight: 48,
//                 fontSize: "1rem",
//                 textTransform: "none",
//                 padding: "12px 16px",
//                 "&.Mui-selected": {
//                   color: "orange",
//                   fontWeight: "bold",
//                 },
//               },
//             }}
//           >
//             <Tab
//               label="Venue"
//               sx={{
//                 color: value === 0 ? "orange" : "black",
//                 mr: 1,
//               }}
//               {...a11yProps(0)}
//             />
//             <Tab
//               label="Floral Service"
//               sx={{
//                 color: value === 1 ? "orange" : "black",
//                 mx: 1,
//               }}
//               {...a11yProps(1)}
//               disabled={!bookingData.venue}
//             />
//             <Tab
//               label="Date & Time"
//               sx={{
//                 color: value === 2 ? "orange" : "black",
//                 mx: 1,
//               }}
//               {...a11yProps(2)}
//               disabled={!bookingData.floral}
//             />
//             <Tab
//               label="Receipt"
//               sx={{
//                 color: value === 3 ? "orange" : "black",
//                 ml: 1,
//               }}
//               {...a11yProps(3)}
//               disabled={!bookingData.timePackage}
//             />
//           </Tabs>
//         </Box>

//         {/* Venue selection */}
//         <CustomTabPanel value={value} index={0}>
//           {loading.venues ? (
//             <Box display="flex" justifyContent="center" py={5}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Typography color="error">{error}</Typography>
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: 3,
//                 justifyContent: "center",
//               }}
//             >
//               {venues.map((venue) => (
//                 <Box
//                   key={venue.id}
//                   sx={{
//                     width: 270,
//                     bgcolor: "white",
//                     color: "black",
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     overflow: "hidden",
//                   }}
//                 >
//                   <img
//                     src={venue.photo}
//                     alt={venue.name}
//                     style={{ width: "100%", height: 160, objectFit: "cover" }}
//                   />
//                   <Box sx={{ p: 2 }}>
//                     <Typography fontWeight="bold" color="orange">
//                       {venue.name}
//                     </Typography>
//                     <Typography variant="body2" mt={0.5}>
//                       {venue.description}
//                     </Typography>
//                     <Typography variant="body2" mt={0.5}>
//                       Price - {venue.price.toLocaleString()} MMK
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         mt: 2,
//                         borderColor: "orange",
//                         color: "orange",
//                         width: "100%",
//                         borderRadius: "20px",
//                         py: 1,
//                         textTransform: "none",
//                         fontSize: "0.8rem",
//                         fontWeight: 500,
//                         "&:hover": {
//                           borderColor: "darkorange",
//                           backgroundColor: "rgba(255, 165, 0, 0.08)",
//                         },
//                       }}
//                       onClick={() => selectVenue(venue)}
//                     >
//                       Select
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </CustomTabPanel>

//         {/* Floral service selection */}
//         <CustomTabPanel value={value} index={1}>
//           {loading.florals ? (
//             <Box display="flex" justifyContent="center" py={5}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Typography color="error">{error}</Typography>
//           ) : (
//             <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
//               {florals.map((floral) => (
//                 <Box
//                   key={floral.id}
//                   sx={{
//                     width: 270,
//                     bgcolor: "white",
//                     color: "black",
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     overflow: "hidden",
//                   }}
//                 >
//                   <img
//                     src={floral.photo}
//                     alt={floral.name}
//                     style={{ width: "100%", height: 160, objectFit: "cover" }}
//                   />
//                   <Box sx={{ p: 2 }}>
//                     <Typography variant="h6">{floral.name}</Typography>
//                     <Typography>
//                       Price: {floral.price.toLocaleString()} MMK
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         mt: 2,
//                         borderColor: "orange",
//                         color: "orange",
//                         width: "100%",
//                         borderRadius: "20px",
//                         py: 1,
//                         textTransform: "none",
//                         fontSize: "0.8rem",
//                         fontWeight: 500,
//                         "&:hover": {
//                           borderColor: "darkorange",
//                           backgroundColor: "rgba(255, 165, 0, 0.08)",
//                         },
//                       }}
//                       onClick={() => selectFloral(floral)}
//                     >
//                       Select
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </CustomTabPanel>

//         {/* Time package selection */}
//         <CustomTabPanel value={value} index={2}>
//           {loading.timePackages ? (
//             <Box display="flex" justifyContent="center" py={5}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Typography color="error">{error}</Typography>
//           ) : (
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {timePackages.map((tp) => (
//                 <Box
//                   key={tp.id}
//                   sx={{
//                     width: 270,
//                     bgcolor: "white",
//                     color: "black",
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Box sx={{ p: 2 }}>
//                     <Typography>
//                       {tp.venueName}: {tp.startTime} - {tp.endTime}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         mt: 2,
//                         borderColor: "orange",
//                         color: "orange",
//                         width: "100%",
//                         borderRadius: "20px",
//                         py: 1,
//                         textTransform: "none",
//                         fontSize: "0.8rem",
//                         fontWeight: 500,
//                         "&:hover": {
//                           borderColor: "darkorange",
//                           backgroundColor: "rgba(255, 165, 0, 0.08)",
//                         },
//                       }}
//                       onClick={() => selectTimePackage(tp)}
//                     >
//                       Select
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </CustomTabPanel>

//         {/* Receipt */}
//         <CustomTabPanel value={value} index={3}>
//           <Box
//             sx={{
//               bgcolor: "white",
//               color: "black",
//               p: 4,
//               borderRadius: 2,
//               maxWidth: 500,
//               mx: "auto",
//               boxShadow: 3,
//             }}
//           >
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               mb={4}
//               sx={{
//                 fontSize: "1.5rem",
//                 textAlign: "center",
//               }}
//             >
//               Receipt
//             </Typography>

//             <Box mb={3}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//                 Venue
//               </Typography>
//               <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
//                 {bookingData.venue?.name || "Not selected"}
//               </Typography>
//               <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
//                 Price: {bookingData.venue?.price?.toLocaleString() || 0} MMK
//               </Typography>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Box mb={3}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//                 Floral Service
//               </Typography>
//               <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
//                 {bookingData.floral?.name || "Not selected"}
//               </Typography>
//               <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
//                 Price: {bookingData.floral?.price?.toLocaleString() || 0} MMK
//               </Typography>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Box mb={3}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
//                 Date & Time
//               </Typography>
//               <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
//                 {bookingData.timePackage
//                   ? `${bookingData.timePackage.venueName}: ${bookingData.timePackage.startTime} - ${bookingData.timePackage.endTime}`
//                   : "Not selected"}
//               </Typography>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mt: 3,
//                 mb: 4,
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold">
//                 Total Price
//               </Typography>
//               <Typography variant="h6" fontWeight="bold">
//                 {(
//                   (bookingData.venue?.price || 0) +
//                   (bookingData.floral?.price || 0)
//                 ).toLocaleString()}{" "}
//                 MMK
//               </Typography>
//             </Box>

//             {error && (
//               <Typography color="error" sx={{ mb: 2 }}>
//                 {error}
//               </Typography>
//             )}

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 gap: 2,
//                 mt: 4,
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 sx={{
//                   flex: 1,
//                   borderColor: "orange",
//                   color: "orange",
//                   py: 1.5,
//                   "&:hover": {
//                     borderColor: "darkorange",
//                     backgroundColor: "rgba(255, 165, 0, 0.04)",
//                   },
//                 }}
//                 onClick={() => setValue(0)}
//                 disabled={loading.confirm}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{
//                   flex: 1,
//                   backgroundColor: "orange",
//                   color: "white",
//                   py: 1.5,
//                   "&:hover": {
//                     backgroundColor: "darkorange",
//                   },
//                 }}
//                 onClick={handleConfirm}
//                 disabled={loading.confirm}
//               >
//                 {loading.confirm ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   "Confirm"
//                 )}
//               </Button>
//             </Box>
//           </Box>
//         </CustomTabPanel>

//         {/* Navigation Buttons */}
//         <Box display="flex" justifyContent="space-between" p={2}>
//           <Button
//             disabled={value === 0}
//             onClick={() => setValue((v) => v - 1)}
//             color="inherit"
//           >
//             Back
//           </Button>
//           <Button
//             disabled={
//               value === 3 ||
//               (value === 0 && !bookingData.venue) ||
//               (value === 1 && !bookingData.floral) ||
//               (value === 2 && !bookingData.timePackage)
//             }
//             onClick={() => setValue((v) => v + 1)}
//             color="inherit"
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


"use client";

import * as React from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";

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
  const [loading, setLoading] = React.useState({
    venues: false,
    florals: false,
    timePackages: false,
    confirm: false,
  });
  const [error, setError] = React.useState(null);

  const [venues, setVenues] = React.useState([]);
  const [florals, setFlorals] = React.useState([]);
  const [timePackages, setTimePackages] = React.useState([]);

  const [bookingData, setBookingData] = React.useState({
    venue: null,
    floral: null,
    timePackage: null,
  });

  // Fetch venues
  React.useEffect(() => {
    setLoading((l) => ({ ...l, venues: true }));
    fetch("/api/venueType")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
      })
      .catch(() => setError("Failed to load venues"))
      .finally(() => setLoading((l) => ({ ...l, venues: false })));
  }, []);

  // Fetch floral services
  React.useEffect(() => {
    setLoading((l) => ({ ...l, florals: true }));
    fetch("/api/floralServices")
      .then((res) => res.json())
      .then((data) => {
        setFlorals(data);
      })
      .catch(() => setError("Failed to load floral services"))
      .finally(() => setLoading((l) => ({ ...l, florals: false })));
  }, []);

  // Fetch time packages
  React.useEffect(() => {
    setLoading((l) => ({ ...l, timePackages: true }));
    fetch("/api/timePackages")
      .then((res) => res.json())
      .then((data) => {
        setTimePackages(data);
      })
      .catch(() => setError("Failed to load time packages"))
      .finally(() => setLoading((l) => ({ ...l, timePackages: false })));
  }, []);

  // Prevent user from clicking on tabs other than current
  const handleTabChange = (event, newValue) => {
    if (newValue !== value) {
      event.preventDefault();
      return;
    }
  };

  // When user selects venue, auto-move to next tab
  const selectVenue = (venue) => {
    setBookingData((prev) => ({
      ...prev,
      venue,
      floral: null,
      timePackage: null,
    }));
    setValue(1);
  };

  // When user selects floral, auto-move to next tab
  const selectFloral = (floral) => {
    setBookingData((prev) => ({
      ...prev,
      floral,
      timePackage: null,
    }));
    setValue(2);
  };

  // When user selects time package, auto-move to next tab
  const selectTimePackage = (timePackage) => {
    setBookingData((prev) => ({
      ...prev,
      timePackage,
    }));
    setValue(3);
  };

  // Confirm booking: send POST request to backend
  const handleConfirm = async () => {
    setError(null);

    if (!bookingData.venue || !bookingData.floral || !bookingData.timePackage) {
      alert("Please complete all selections before confirming.");
      return;
    }

    const payload = {
      venue_id: bookingData.venue.venue_id || bookingData.venue.id,
      venueTypeId: bookingData.venue.id,
      floral_service_id: bookingData.floral.id,
      timePackageId: bookingData.timePackage.id,
      user_id: 1, // Replace with actual user ID
      booking_date: new Date().toISOString(),
      total_amount:
        (bookingData.venue.price || 0) + (bookingData.floral.price || 0),
    };

    setLoading((l) => ({ ...l, confirm: true }));

    try {
      const res = await fetch("/api/booking-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json();
        setError(errBody.error || errBody.message || "Booking failed");
        alert("Booking failed: " + (errBody.error || errBody.message));
        return;
      }

      const data = await res.json();
      alert("Booking confirmed! ID: " + data.id);
      setBookingData({ venue: null, floral: null, timePackage: null });
      setValue(0);
    } catch (err) {
      setError(err.message);
      alert("Booking error: " + err.message);
    } finally {
      setLoading((l) => ({ ...l, confirm: false }));
    }
  };

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
                color: "black", // Make all tabs black
                fontWeight: "normal",
                cursor: "default",
                "&.Mui-selected": {
                  color: "orange",
                  fontWeight: "bold",
                  cursor: "pointer",
                },
                "&:hover": {
                  color: "darkorange",
                },
              },
            }}
          >
            <Tab label="Venue" {...a11yProps(0)} />
            <Tab label="Floral Service" {...a11yProps(1)} />
            <Tab label="Date & Time" {...a11yProps(2)} />
            <Tab label="Receipt" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* Venue selection */}
        <CustomTabPanel value={value} index={0}>
          {loading.venues ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {venues.map((venue) => (
                <Box
                  key={venue.id}
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
                    src={venue.photo || undefined}
                    alt={venue.name}
                    style={{ width: "100%", height: 160, objectFit: "cover" }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography fontWeight="bold" color="orange">
                      {venue.name}
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                      {venue.description}
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
                      onClick={() => selectVenue(venue)}
                    >
                      Select
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CustomTabPanel>

        {/* Floral service selection */}
        <CustomTabPanel value={value} index={1}>
          {loading.florals ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
              {florals.map((floral) => (
                <Box
                  key={floral.id}
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
                    src={floral.photo || undefined}
                    alt={floral.name}
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
                      onClick={() => selectFloral(floral)}
                    >
                      Select
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CustomTabPanel>

        {/* Time package selection */}
        <CustomTabPanel value={value} index={2}>
          {loading.timePackages ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {timePackages.map((tp) => (
                <Box
                  key={tp.id}
                  sx={{
                    width: 270,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography>
                      {tp.venueName}: {tp.startTime} - {tp.endTime}
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
                      onClick={() => selectTimePackage(tp)}
                    >
                      Select
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CustomTabPanel>

        {/* Receipt */}
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
                {bookingData.venue?.name || "Not selected"}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                Price: {bookingData.venue?.price?.toLocaleString() || 0} MMK
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
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                Price: {bookingData.floral?.price?.toLocaleString() || 0} MMK
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Date & Time
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                {bookingData.timePackage
                  ? `${bookingData.timePackage.venueName}: ${bookingData.timePackage.startTime} - ${bookingData.timePackage.endTime}`
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
                {(
                  (bookingData.venue?.price || 0) +
                  (bookingData.floral?.price || 0)
                ).toLocaleString()}{" "}
                MMK
              </Typography>
            </Box>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

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
                disabled={loading.confirm}
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
                onClick={handleConfirm}
                disabled={loading.confirm}
              >
                {loading.confirm ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </Box>
          </Box>
        </CustomTabPanel>

        {/* Only Back button */}
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            disabled={value === 0}
            onClick={() => setValue((v) => v - 1)}
            color="inherit"
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
