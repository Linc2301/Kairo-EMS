"use client";

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [contact, setUsers] = useState([]); // stores list of contacts from DB

  //  Fetch contacts from API
  const getUserList = async () => {
    try {
      const response = await axios.get("/api/contact");
      setUsers(response.data); // populate table
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/contact/${id}`); // call dynamic DELETE route

      //Immediately remove deleted contact from UI
      setUsers((prevContacts) => prevContacts.filter((contact) => contact.id !== id));

      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Something went wrong while deleting.");
    }
  };

  // Fetch data on mount
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Message</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contact.map((contact, index) => (
              <TableRow key={contact.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{contact.name}</TableCell>
                <TableCell align="center">{contact.email}</TableCell>
                <TableCell align="center">{contact.subject}</TableCell>
                <TableCell align="center">{contact.message}</TableCell>
                <TableCell align="center">
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(contact.id)}
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
