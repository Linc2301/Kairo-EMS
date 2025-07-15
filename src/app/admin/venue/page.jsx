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
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [events, setEvents] = useState([]);

  const getEventList = async () => {
    try {
      const response = await axios.get("/api/venue");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/venue/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
      alert("Venue deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Stack alignItems="flex-end">
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Photo1</TableCell>
              <TableCell align="center">Photo2</TableCell>
              <TableCell align="center">Photo3</TableCell>
              <TableCell align="center">Event Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((venue, index) => (
              <TableRow key={venue.id}>
                <TableCell align="center">{index + 1}</TableCell>
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
    </Box>
  );
}
