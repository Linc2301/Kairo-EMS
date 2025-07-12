"use client"

import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserList() {
    const [users, setUsers] = useState([]);   //[] is used cause the data in the database is Array so we used [] for that data


    const getUserList = async () => {
        try {
            // console.log("getStudentList()")
            const response = await axios.get("/api/users")
            // console.log("API response", response.data)
            setUsers(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this contact?");
        if (!confirmed) return;

        try {
            await axios.delete(`/api/users/${id}`); // call dynamic DELETE route

            //Immediately remove deleted contact from UI
            setUsers((prevContacts) => prevContacts.filter((users) => users.id !== id));

            alert("Contact deleted successfully!");
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Something went wrong while deleting.");
        }
    };


    console.log("users", users)
    useEffect(() => {
        getUserList();
    }, [])

    return (
        <Box sx={{ p: 3 }}>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>No</TableCell>
                            <TableCell align='center'>User Name</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Phone No.</TableCell>
                            <TableCell align='center'>Password</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((users, index) => (        //we can place student cause that can be different 
                            <TableRow key={users.id}>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='center'>{users.name}</TableCell>
                                <TableCell align='center'>{users.email}</TableCell>
                                <TableCell align='center'>{users.phone}</TableCell>
                                <TableCell align='center'>{users.password}</TableCell>
                                <TableCell align='center'>
                                    <IconButton
                                        sx={{ color: "red" }}
                                        onClick={() => handleDelete(users.id)}
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
    )
}
