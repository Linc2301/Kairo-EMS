'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import Image from 'next/image';

export default function HomePage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
            {/* Hero Background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src="/assets/party-hall.jpg"
                    alt="Hero Background"
                    layout="fill"
                    objectFit="cover"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // dark overlay
                    }}
                />
            </Box>

            {/* Hero Content */}
            <Container
                sx={{
                    pt: 20,
                    textAlign: 'center',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: 4,
                        px: 6,
                        py: 8,
                        backdropFilter: 'blur(5px)',
                        maxWidth: 700,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                        Welcome to{' '}
                        <Box component="span" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                            K
                        </Box>
                        <Box component="span" sx={{ color: '#000' }}>
                            airo
                        </Box>
                        ,
                    </Typography>

                    <Typography variant="h6" mb={3}>
                        your trusted partner  <br /> in finding the perfect event space.
                    </Typography>

                    <Typography variant="body1" mb={4}>
                        We believe great events begin<br /> with the right space.
                    </Typography>

                    <Typography variant="body1">
                        Let’s make your next event extraordinary. <br />
                        Find your space. Create your moment.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
