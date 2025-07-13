'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
        width: 650,       // fixed width (adjust as needed)
        height: 350,      // fixed height (adjust as needed)
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 1,
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          Visitor Statistics
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Nov - July
        </Typography>
      </Box>

      <Box>
        <LineChart
          width={650}   // slightly less than parent width for padding
          height={280}  // fixed height for the chart area
          data={data}
          margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) =>
              value === 'last6'
                ? 'Last 6 Months (2578)'
                : 'Previous Months (560)'
            }
          />
          <Line type="monotone" dataKey="last6" stroke="#3f51b5" strokeWidth={2} />
          <Line type="monotone" dataKey="prev" stroke="#4caf50" strokeWidth={2} />
        </LineChart>
      </Box>
    </Box>
  );
}
