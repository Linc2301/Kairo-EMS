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
  CircularProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function formatTimeToAmPm(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

export default function TimePackagesPage() {
  const router = useRouter();
  const [timePackages, setTimePackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTimePackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/timePackages");
      setTimePackages(response.data);
    } catch (error) {
      console.error("Error fetching time packages:", error);
      alert("Failed to load time packages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this time package?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/timePackages/${id}`);
      setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
      alert("Time package deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    fetchTimePackages();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Time Packages</Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/admin/timePackages/create")}
        >
          Create New
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timePackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No time packages found.
                  </TableCell>
                </TableRow>
              ) : (
                timePackages.map((tp) => (
                  <TableRow key={tp.id}>
                    <TableCell align="center">{tp.id}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
                    <TableCell align="center">{tp.venueName}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => router.push(`/admin/timePackages/${tp.id}/edit`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(tp.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
