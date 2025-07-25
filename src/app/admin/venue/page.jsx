"use client";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const getEventList = async () => {
    try {
      const response = await axios.get("/api/venue");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async (id) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this venue?");
  //   if (!confirmed) return;

  //   try {
  //     await axios.delete(`/api/venue/${id}`);
  //     setEvents((prev) => prev.filter((event) => event.id !== id));
  //     alert("Venue deleted successfully!");
  //   } catch (error) {
  //     console.error("Failed to delete:", error);
  //     alert("Something went wrong while deleting.");
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/venue/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id)); //  OK if you're storing venues in `setEvents`
      alert("Venue deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };



  useEffect(() => {
    getEventList();
  }, []);

  // Calculate which events to show on the current page
  const paginatedEvents = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(events.length / rowsPerPage);


  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Venues</Typography>
        <Link passHref href="/admin/venue/create">
          <Button sx={{ mb: 2 }} variant="contained">
            ADD Venue
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Venue</TableCell>
              <TableCell align="center">Photo1</TableCell>
              <TableCell align="center">Photo2</TableCell>
              <TableCell align="center">Photo3</TableCell>
              <TableCell align="center">Event Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEvents.map((venue, index) => (
              <TableRow key={venue.id}>
                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell align="center">{venue.name}</TableCell>

                <TableCell align="center">
                  {venue.photo1 ? (
                    <img
                      src={venue.photo1}
                      alt="Photo 1"
                      style={{
                        width: 60,
                        height: 45,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </TableCell>

                <TableCell align="center">
                  {venue.photo2 ? (
                    <img
                      src={venue.photo2}
                      alt="Photo 2"
                      style={{
                        width: 60,
                        height: 45,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </TableCell>

                <TableCell align="center">
                  {venue.photo3 ? (
                    <img
                      src={venue.photo3}
                      alt="Photo 3"
                      style={{
                        width: 60,
                        height: 45,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </TableCell>

                <TableCell align="center">{venue.Event.name}</TableCell>

                <TableCell align="center">
                  <Link passHref href={`/admin/venue/${venue.id}/edit`}>
                    <IconButton sx={{ color: "blue" }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(venue.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Control */}
      {events.length > rowsPerPage && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'white', // Optional: match page background
            py: 2,
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)', // optional: subtle shadow
          }}
        >
          <Pagination
            sx={{ ml: 16 }}
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
