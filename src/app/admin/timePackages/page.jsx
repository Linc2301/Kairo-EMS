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

export default function TimePackageList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchTimePackages = async () => {
    try {
      const res = await axios.get("/api/timePackages");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load packages");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(`/api/timePackages/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchTimePackages();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Stack alignItems="flex-end">
        <Link href="/admin/timePackages/create" passHref>
          <Button sx={{ mb: 2 }} variant="contained">
            ADD Time Package
          </Button>
        </Link>
      </Stack>

      {error && <Box color="red">{error}</Box>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Venue</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((event, index) => (
              <TableRow key={event.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {new Date(event.startTime).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(event.endTime).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {event.venueName}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDelete(event.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Link href={`/admin/timePackages/edit/${event.id}`} passHref>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
