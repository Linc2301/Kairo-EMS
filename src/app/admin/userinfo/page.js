"use client";

import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
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
            setStudents(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    console.log("users", users)
    useEffect(() => {
        getUserList();
    }, [])

    return (
        <Box sx={{ bgcolor: "cyan", p: 5 }}>
            <Stack alignItems="flex-end">
                <Link passHref href="/students/create"><Button variant="contained">ADD Student</Button></Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Dob</TableCell>
                            <TableCell>FatherName</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Major</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((students, index) => (        //we can place student cause that can be different 
                            <TableRow key={students.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{students.name}</TableCell>
                                <TableCell>{students.phone}</TableCell>
                                <TableCell>{students.dob}</TableCell>
                                <TableCell>{students.father_name}</TableCell>
                                <TableCell>{students.age}</TableCell>
                                <TableCell>{students.gender}</TableCell>
                                <TableCell>{students.address}</TableCell>
                                <TableCell>{students.major}</TableCell>
                                <TableCell align='center'>
                                    <Link passHref href={`/students/${students.id}`}>
                                        <IconButton sx={{ color: "green" }}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Link>
                                    <Link passHref href={`/students/${students.id}/edit`}>
                                        <IconButton sx={{ color: "blue" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <Link passHref href={"/students/1"}>
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
