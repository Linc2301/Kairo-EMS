"use client"

import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserList() {
    const [contact, setUsers] = useState([]);   //[] is used cause the data in the database is Array so we used [] for that data


    const getUserList = async () => {
        try {
            // console.log("getStudentList()")
            const response = await axios.get("/api/contact")
            // console.log("API response", response.data)
            setUsers(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    console.log("Contacts", contact)
    useEffect(() => {
        getUserList();
    }, [])

    return (
        <Box sx={{  p: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>No</TableCell>
                            <TableCell align='center'>User Name</TableCell>
                            <TableCell align='center'>Email</TableCell>                 
                            <TableCell align='center'>Subject</TableCell>
                            <TableCell align='center'>Message</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contact.map((contact, index) => (        //we can place student cause that can be different 
                            <TableRow key={contact.id}>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='center'>{contact.name}</TableCell>
                                <TableCell align='center'>{contact.email}</TableCell>
                                <TableCell align='center'>{contact.subject}</TableCell>
                                <TableCell align='center'>{contact.message}</TableCell>
                                <TableCell align='center'>
                                    <Link passHref href={"/users/1"}>
                                        <IconButton sx={{ color: "red" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
