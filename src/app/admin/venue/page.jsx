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
  TextField,
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;

  const getVenueList = async () => {
    try {
      const response = await axios.get("/api/venue");
      setVenues(response.data);
      setFilteredVenues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/venue/${id}`);
      setVenues((prev) => prev.filter((venue) => venue.id !== id));
      setFilteredVenues((prev) => prev.filter((venue) => venue.id !== id));
      alert("Venue deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter(venue =>
        venue.Event?.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredVenues(filtered);
    }
    setPage(1);
  };

  useEffect(() => {
    getVenueList();
  }, []);

  // Calculate which venues to show on the current page
  const paginatedVenues = filteredVenues.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredVenues.length / rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>Venues</Typography>
          <TextField
            size="small"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: 300 }}
          />
        </Stack>
        <Link passHref href="/admin/venue/create">
          <Button sx={{ mb: 2 }} variant="contained">
            ADD Venue
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(255, 160, 0, 0.8)" }}>
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
            {paginatedVenues.map((venue, index) => (
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

                <TableCell align="center">{venue.Event?.name || 'N/A'}</TableCell>

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
      {filteredVenues.length > rowsPerPage && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'white',
            py: 2,
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
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