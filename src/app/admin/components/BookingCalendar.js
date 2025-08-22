'use client';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper, Typography, Box, alpha, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function BookingCalendar({ selectedDate, onChange }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            mr: 2,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          <CalendarMonthIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="700" gutterBottom>
            Booking Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select your preferred event date
          </Typography>
        </Box>
      </Box>

      {/* Calendar */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={onChange}
          sx={{
            width: '100%',
            '& .MuiDateCalendar-root': {
              width: '100%',
            },
            '& .MuiPickersCalendarHeader-root': {
              marginBottom: 2,
            },
            '& .MuiPickersCalendarHeader-label': {
              fontWeight: 600,
              fontSize: '1.1rem',
            },
            '& .MuiDayCalendar-weekContainer': {
              marginBottom: 1,
            },
            '& .MuiPickersDay-root': {
              borderRadius: '10px',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem',
              fontWeight: 500,
              width: 36,
              height: 36,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                transform: 'scale(1.05)',
              },
            },
            // Selected day
            '& .Mui-selected': {
              backgroundColor: `${theme.palette.primary.main} !important`,
              color: `${theme.palette.primary.contrastText} !important`,
              fontWeight: '600',
              boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            // Today highlight
            '& .MuiPickersDay-today': {
              border: `2px solid ${theme.palette.primary.main}`,
              backgroundColor: 'transparent',
            },
            // Day names (Sun, Mon, etc.)
            '& .MuiDayCalendar-weekDayLabel': {
              fontWeight: 600,
              color: theme.palette.text.secondary,
              fontSize: '0.8rem',
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}