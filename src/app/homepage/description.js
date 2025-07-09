import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const events = [
    { title: 'Baby Shower', image: '/assets/b5.png' },
    { title: 'Private Party', image: '/assets/party.png' },
    { title: 'Wedding Party', image: '/assets/w6.png' },
    { title: 'Birthday Party', image: '/assets/birthday.png' },
    { title: 'Bride to Be', image: '/assets/birdal.png' },
];

export default function HeroSection() {
    return (
        <>
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#000', color: '#fff' }}>
                <Typography variant="h3" gutterBottom>Let’s discover the events</Typography>
                <Typography variant="subtitle1" color="orange">
                    Enjoying the process of creating unforgettable moments...
                </Typography>
            </Box>

            <Box sx={{ py: 4, bgcolor: '#000', color: '#fff' }}>
                <Grid container spacing={2} justifyContent="center">
                    {events.map(({ title, image }) => (
                        <Grid item xs={6} sm={4} md={2} key={title}>
                            <Card sx={{ backgroundColor: '#222' }}>
                                <CardMedia component="img" height="140" image={image} />
                                <CardContent>
                                    <Typography align="center">{title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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