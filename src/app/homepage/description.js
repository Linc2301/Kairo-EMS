import { Box, Typography } from '@mui/material';

export default function HeroSection() {
    return (
        <>
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#000', color: '#fff' }}>
                <Typography variant="h3" gutterBottom>Let’s discover the events</Typography>
                <Typography variant="subtitle1" color="orange">
                    Enjoying the process of creating unforgettable moments...
                </Typography>
            </Box>


            <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#000', color: '#fff' }}>
                <Typography variant="h5" color='orange' gutterBottom>Join Our Events</Typography>
                <Typography variant="subtitle1" color="white">
                    We will give a very special celebration for you
                </Typography>
            </Box>
        </>
    );
}