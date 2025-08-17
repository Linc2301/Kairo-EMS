
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Loading from "@/src/components/Loading";

export default function EventPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? null;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const cardsPerPage = 6;

  // Fetch events
  useEffect(() => {
    let ignore = false;
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        if (!ignore) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!ignore) {
          setEvents([]);
          setSnackbar({
            open: true,
            message: "Failed to load events",
            severity: "error",
          });
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      ignore = true;
    };
  }, []);

  // Fetch user favourites
  useEffect(() => {
    let ignore = false;
    async function fetchFavourites() {
      if (status !== "authenticated" || !userId) {
        setFavorites([]);
        return;
      }
      try {
        const res = await fetch("/api/favourite", { cache: "no-store" });
        const data = await res.json();
        if (!ignore) {
          setFavorites(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!ignore) {
          setFavorites([]);
          setSnackbar({
            open: true,
            message: "Failed to load favourites",
            severity: "error",
          });
        }
      }
    }
    fetchFavourites();
    return () => {
      ignore = true;
    };
  }, [status, userId]);

  const handleCloseSnackbar = () => {
    setSnackbar((s) => ({ ...s, open: false }));
  };

  const isFavorited = (eventId) =>
    Array.isArray(favorites) && favorites.some((f) => f.eventId === eventId);

  // Toggle favorite status
  const toggleFavorite = async (eventId) => {
    try {
      if (status !== "authenticated" || !userId) {
        setSnackbar({
          open: true,
          message: "You must be logged in to favorite events",
          severity: "warning",
        });
        return;
      }

      if (isFavorited(eventId)) {
        // Remove favorite
        const favToRemove = favorites.find((f) => f.eventId === eventId);
        if (!favToRemove) return;
        const res = await fetch(`/api/favourite/${favToRemove.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setSnackbar({
            open: true,
            message: err?.error || "Failed to remove favourite",
            severity: "error",
          });
          return;
        }

        setFavorites((prev) => prev.filter((f) => f.eventId !== eventId));
        setSnackbar({
          open: true,
          message: "Removed from favorites",
          severity: "info",
        });
      } else {
        // Add favorite
        const res = await fetch("/api/favourite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ eventId }),
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || json?.error) {
          setSnackbar({
            open: true,
            message: json?.error || "Failed to add favourite",
            severity: "error",
          });
          return;
        }

        setFavorites((prev) => (Array.isArray(prev) ? [...prev, json] : [json]));
        setSnackbar({
          open: true,
          message: "Added to favorites!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setSnackbar({
        open: true,
        message: "Failed to update favorites",
        severity: "error",
      });
    }
  };

  // Filter events based on search query
  // Update the filteredEvents calculation to use startsWith
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  // Pagination calculation
  const { paginatedEvents, pageCount, topRow, bottomRow } = useMemo(() => {
    const count = Math.ceil((filteredEvents?.length || 0) / cardsPerPage);
    const slice = (filteredEvents || []).slice(
      (currentPage - 1) * cardsPerPage,
      currentPage * cardsPerPage
    );
    return {
      paginatedEvents: slice,
      pageCount: count || 1,
      topRow: slice.slice(0, 3),
      bottomRow: slice.slice(3, 6),
    };
  }, [filteredEvents, currentPage]);

  if (loading) return <Loading open={true} />;

  const renderCard = (event) => (
    <Card
      key={event.id}
      sx={{
        width: 260,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        boxShadow: "0 2px 8px rgba(234, 226, 226, 0.3)",
        borderRadius: "16px",
        border: "3px solid transparent",
        borderColor: "white",
        transition: "all 0.5s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          borderColor: "#ff6f00",
          boxShadow: "0 4px 12px rgba(255, 111, 0, 0.9)",
        },
        backgroundColor: "#111",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(event.id);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          color: isFavorited(event.id)
            ? "#ff1744"
            : "rgba(255, 255, 255, 0.7)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        {isFavorited(event.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Link
        href={`/events/${event.id}`}
        passHref
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ height: 235, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={event.photo || "/images/default.jpg"}
            alt={event.name}
            sx={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ec7921ff", mb: 1 }}
            >
              {event.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#aaa",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {event.description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Chip
              label="Event"
              size="large"
              sx={{
                backgroundColor: "#fff3e0",
                color: "#ff6f00",
                fontWeight: "bold",
                fontSize: 20
              }}
            />
          </Box>
        </CardContent>
      </Link>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "#0c0c0cff", py: 8, px: 2, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ color: "#ffffffff", fontWeight: "bold", mb: 2 }}
      >
        A space for every moment
      </Typography>
      <Typography variant="h6" sx={{ color: "#5837ebff", mb: 6 }}>
        Book a unique space for your activity
      </Typography>

      {/* Search Bar */}
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        mb: 6,
        width: "100%",
        px: 2
      }}>
        <TextField
          placeholder="Search events..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          sx={{
            width: "100%",
            maxWidth: 600,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "#ff6f00",
                borderRadius: "25px",
              },
              "&:hover fieldset": {
                borderColor: "#ff8f00",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff6f00",
                boxShadow: "0 0 0 2px rgba(255, 111, 0, 0.2)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#aaa",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ff6f00",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#ff6f00" }} />
              </InputAdornment>
            ),
            sx: {
              color: "white",
              fontSize: "1.1rem",
              paddingLeft: 1,
            }
          }}
        />
      </Box>

      {/* Events Display */}
      {filteredEvents.length > 0 ? (
        <>
          {/* Top Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              mb: 6,
              flexWrap: "wrap",
            }}
          >
            {topRow.map(renderCard)}
          </Box>

          {/* Bottom Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {bottomRow.map(renderCard)}
          </Box>
        </>
      ) : (
        <Typography variant="h6" sx={{ color: "white", mt: 4 }}>
          {searchQuery ? `No events found matching "${searchQuery}"` : "No events available"}
        </Typography>
      )}

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": { color: "white" },
                "& .MuiPaginationItem-icon": { color: "white" },
                "& .Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.dark" },
                },
              }}
            />
          </Stack>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}