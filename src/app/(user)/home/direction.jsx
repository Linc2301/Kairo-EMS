
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Direction() {
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Background Image */}
                <Image
                    src="/assets/wed-indoor.jpg"
                    alt="Event Setup"
                    layout="fill"
                    objectFit="cover"
                    style={{ zIndex: -1, opacity: 0.7 }}
                />

                {/* Overlay content */}
                <Container sx={{ zIndex: 1 }}>
                    <Typography variant="h2" component="h1" color="white" fontWeight={700} gutterBottom>
                        Where
                        <br />
                        Extraordinary
                        <br />
                        Begins
                    </Typography>

                    <Link passHref href="/events">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ mt: 4, backgroundColor: 'white', color: '#000', fontWeight: 600 }}
                        >
                            Find your Event →
                        </Button>
                    </Link>
                </Container>
            </Box>
        </>
    );
}
