"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function TimePackagesPage() {
  const router = useRouter();
  const [timePackages, setTimePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTimePackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/timePackages");
      setTimePackages(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch time packages:", err);
      setError("Failed to load time packages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimePackages();
  }, []);

  if (loading) {
    return <Typography>Loading time packages...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Time Packages</Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/admin/timePackages/create")}
        >
          Create New
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timePackages.map((tp) => (
              <TableRow key={tp.id}>
                <TableCell>{tp.id}</TableCell>
                <TableCell>{tp.startTime}</TableCell>
                <TableCell>{tp.endTime}</TableCell>
                <TableCell>{tp.venueName}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => router.push(`/admin/timePackages/${tp.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}