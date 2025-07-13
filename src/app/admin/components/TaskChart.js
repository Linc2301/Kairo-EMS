import { Box, Typography } from '@mui/material';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

const data = [
    { name: 'Booking', value: 400 },
    { name: 'Check-in', value: 300 },
    { name: 'Enquiry', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

export default function TaskChart() {
    return (
        <Box sx={{ width: 350, height: 350, bgcolor: '#f9f9f9', borderRadius: 2, p: 2, boxShadow: 1 }}>
            <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                    Tasks this Month
                </Typography></Box>
            <PieChart width={350} height={300}>
                <Pie
                    data={data}
                    cx={175}  // center x = half of width
                    cy={150}  // center y = half of height
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </Box>
    );
}
