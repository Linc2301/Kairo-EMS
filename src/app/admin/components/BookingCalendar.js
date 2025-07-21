// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { Paper, Typography } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';

// export default function BookingCalendar() {
//     return (
//         <Paper sx={{ p: 2, mt: 2 }}>
//             <Typography variant="h6">Today's Booking</Typography>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar defaultValue={dayjs()} />
//             </LocalizationProvider>
//         </Paper>
//     );
// }

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function BookingCalendar({ selectedDate, onChange }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Select Booking Date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={onChange} />
      </LocalizationProvider>
    </Paper>
  );
}
