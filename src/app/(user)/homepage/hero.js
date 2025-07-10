import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function WhyKairo() {
    return (
        <Box sx={{ background: "white", minHeight: '100vh', position: 'relative', }}>
            <Grid container spacing={4} sx={{ py: 4, px: 2 }}>
                <Grid item xs={12} md={6}>
                    <img src="/assets/Why-kairo.png" alt="Why Kairo" width="100%" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid md={3}>
                        <Typography sx={{ fontSize: 150, color: "black", textShadow: 10, fontWeight: 'bold' }}>Why</Typography>
                        <Typography sx={{ fontSize: 150, color: "black", textShadow: 10, ml: 28, fontWeight: 'bold' }}>Kairo?</Typography>
                    </Grid>


                    <Typography sx={{ fontSize: 38, color: "black" }} mt={1}>
                        New and never-ending <br />    possibilities
                    </Typography>

                    <Typography mt={6} sx={{ color: "black" }}>
                        Find everything from professionally equipped studios to unconventional rooms and residences.
                    </Typography>



                    <Stack mt={3} direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                        <IconButton>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "black" }}>01 / 03</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}