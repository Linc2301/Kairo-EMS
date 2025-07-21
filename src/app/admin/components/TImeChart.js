'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { name: 'Morning (6AM - 10AM)', value: 15 },
  { name: 'Late Morning (10AM - 12PM)', value: 20 },
  { name: 'Afternoon (12PM - 3PM)', value: 25 },
  { name: 'Late Afternoon (3PM - 6PM)', value: 18 },
  { name: 'Evening (6PM - 9PM)', value: 12 },
  { name: 'Night (9PM - Midnight)', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

export default function TimePackagePieChart() {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Time Package Distribution
      </Typography>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
