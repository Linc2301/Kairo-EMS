"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

function formatTimeToAmPm(isoString) {
  return dayjs(isoString).format("hh:mm A");
}

function formatDate(isoString) {
  return dayjs(isoString).format("YYYY-MM-DD");
}

export default function TimePackagesPage() {
  const [timePackages, setTimePackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    async function loadTimePackages() {
      try {
        const res = await axios.get("/api/timePackages");
        const packages = Array.isArray(res.data) ? res.data : [];
        setTimePackages(packages);
        setFilteredPackages(packages);
      } catch (error) {
        alert("Failed to load time packages");
      }
    }

    loadTimePackages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this time package?")) return;
    try {
      await axios.delete(`/api/timePackages/${id}`);
      setTimePackages((prev) => prev.filter((tp) => tp.id !== id));
      setFilteredPackages((prev) => prev.filter((tp) => tp.id !== id));
    } catch (error) {
      alert("Failed to delete time package");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredPackages(timePackages);
    } else {
      const filtered = timePackages.filter(tp =>
        tp.eventName?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPackages(filtered);
    }
    setPage(1);
  };

  const paginatedPackages = filteredPackages.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredPackages.length / rowsPerPage);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5">Time Packages</Typography>
          <TextField
            size="small"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: 300 }}
          />
        </Stack>
        <Button variant="contained" onClick={() => router.push("/admin/timePackages/create")}>
          Create New
        </Button>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Event</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    {searchTerm ? "No matching time packages found" : "No time packages found"}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPackages.map((tp) => (
                  <TableRow key={tp.id}>
                    <TableCell align="center">{tp.id}</TableCell>
                    <TableCell align="center">{formatDate(tp.startTime)}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.startTime)}</TableCell>
                    <TableCell align="center">{formatTimeToAmPm(tp.endTime)}</TableCell>
                    <TableCell align="center">{tp.venueName || "Unknown"}</TableCell>
                    <TableCell align="center">{tp.eventName || "N/A"}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDelete(tp.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {filteredPackages.length > rowsPerPage && (
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