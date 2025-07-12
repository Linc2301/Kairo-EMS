'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Dec', last6: 10, prev: 30 },
  { name: 'Jan', last6: 20, prev: 25 },
  { name: 'Feb', last6: 50, prev: 30 },
  { name: 'Mar', last6: 30, prev: 20 },
  { name: 'Apr', last6: 40, prev: 25 },
  { name: 'May', last6: 35, prev: 40 },
  { name: 'Jun', last6: 45, prev: 50 },
];

export default function VisitorChart() {
  return (
    <Box
      sx={{
        bgcolor: '#dcdcdc',
        borderRadius: 2,
        p: 2,
        height: '100%',
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Visitor Statistics
      </Typography>
      <Typography variant="body2" gutterBottom>
        Nov - July
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={(value) =>
              value === 'last6'
                ? 'Last 6 Months (2578)'
                : 'Previous Months (560)'
            }
          />
          <Line type="monotone" dataKey="last6" stroke="#3f51b5" />
          <Line type="monotone" dataKey="prev" stroke="#43a047" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
