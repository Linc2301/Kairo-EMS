"use client"

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
            setUsers(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    console.log("users", users)
    useEffect(() => {
        getUserList();
    }, [])

    return (
        <Box sx={{  p: 3 }}>
            <Stack alignItems="flex-end">
                <Link passHref href="/users/create"><Button variant="contained">ADD Users</Button></Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>No</TableCell>
                            <TableCell align='center'>User Name</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Phone No.</TableCell>                    
                            <TableCell align='center'>Password</TableCell>
                            <TableCell align='center'>Confirm Password</TableCell>
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
                                <TableCell align='center'>{users.confirm_pass}</TableCell>
                                <TableCell align='center'>
                                    <Link passHref href={`/users/${users.id}`}>
                                        <IconButton sx={{ color: "green" }}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Link>
                                    <Link passHref href={`/users/${users.id}/edit`}>
                                        <IconButton sx={{ color: "blue" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
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
