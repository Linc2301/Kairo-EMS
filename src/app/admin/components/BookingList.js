'use client';

import { List, ListItem, ListItemText, Avatar, Typography, Paper } from '@mui/material';

const bookings = [
    { user: 'Apartment Booked', time: '19 minutes ago' },
    { user: 'Camp Booked', time: '30 minutes ago' },
    { user: 'Cottage Booked', time: '1 hour ago' },
];

export default function BookingList() {
    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <List>
                {bookings.map((b, i) => (
                    <ListItem key={i}>
                        <Avatar sx={{ mr: 2 }} />
                        <ListItemText
                            primary={b.user}
                            secondary={<Typography variant="caption" color="text.secondary">{b.time}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
