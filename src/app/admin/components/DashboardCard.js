
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function DashboardCard({ title, value, icon, bgColor }) {
  return (
    <Box
      sx={{
        bgcolor: bgColor,
        color: 'white',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        transition: 'all 0.3s ease',
        boxShadow: 2,
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        borderColor: "red"
      }}
    >
      <Box>
        <Typography fontSize={16}>{title}</Typography>
        <Typography fontSize={32} fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box>{icon}</Box>
    </Box>
  );
}
//
