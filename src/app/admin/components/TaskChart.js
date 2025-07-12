'use client';
import React from 'react';
import {
    Box,
    Typography,
    MenuItem,
    Select,
    FormControl,
    CircularProgress,
} from '@mui/material';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const data = [
    { name: 'Checkin', value: 60, color: '#e65100' },
    { name: 'Booking', value: 20, color: '#43a047' },
    { name: 'Ended', value: 20, color: '#3f51b5' },
];

export default function TaskChart() {
    return (
        <Box
            sx={{
                bgcolor: 'white',
                borderRadius: 2,
                p: 2,
                height: '100%',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Tasks</Typography>
                <FormControl size="small">
                    <Select
                        defaultValue="this"
                        variant="standard"
                        disableUnderline
                        sx={{ fontSize: 14 }}
                    >
                        <MenuItem value="this">This Month</MenuItem>
                        <MenuItem value="last">Last Month</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}
