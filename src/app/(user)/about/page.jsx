// 'use client';

// import { Box, Typography, Container, Button } from '@mui/material';
// import Image from 'next/image';

// export default function HomePage() {
//     return (
//         <Box sx={{ minHeight: '100vh', position: 'relative' }}>
//             {/* Hero Background */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     zIndex: -1,
//                     overflow: 'hidden',
//                 }}
//             >
//                 <Image
//                     src="/assets/party-hall.jpg"
//                     alt="Hero Background"
//                     layout="fill"
//                     objectFit="cover"
//                 />
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: 'rgba(0, 0, 0, 0.6)', // dark overlay
//                     }}
//                 />
//             </Box>

//             {/* Hero Content */}
//             <Container
//                 sx={{
//                     pt: 20,
//                     textAlign: 'center',
//                     color: '#000',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                         borderRadius: 4,
//                         px: 6,
//                         py: 8,
//                         backdropFilter: 'blur(5px)',
//                         maxWidth: 700,
//                     }}
//                 >
//                     <Typography variant="h4" fontWeight="bold" mb={2}>
//                         Welcome to{' '}
//                         <Box component="span" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
//                             K
//                         </Box>
//                         <Box component="span" sx={{ color: '#000' }}>
//                             airo
//                         </Box>
//                         ,
//                     </Typography>

//                     <Typography variant="h6" mb={3}>
//                         your trusted partner  <br /> in finding the perfect event space.
//                     </Typography>

//                     <Typography variant="body1" mb={4}>
//                         We believe great events begin<br /> with the right space.
//                     </Typography>

//                     <Typography variant="body1">
//                         Let’s make your next event extraordinary. <br />
//                         Find your space. Create your moment.
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }


'use client';

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function AboutPage() {
  return (
    <Box>
      {/* Fullscreen Background Image with About Us Text */}
      <Box
        sx={{
          height: '80vh',
          backgroundImage: `url('/about-us/about3.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.5)',
            p: 4,
            borderRadius: 2,
            maxWidth: 700,
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ lineHeight: 1.6 }}>
            Discover Kairo — your trusted partner for planning unforgettable events.
          </Typography>
        </Box>
      </Box>


      {/* Image Left + Text Right Section - full width flush edges */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)', // to remove container side margin and push flush
          marginRight: 'calc(-50vw + 50%)',
          mb: 10,
          minHeight: 320,
          mt: 10
        }}
      >
        <Box
          sx={{
            flex: '1 1 50%',
            minHeight: 320,
            overflow: 'hidden',
          }}
        >
          <img
            src="/about-us/img1.avif"
            alt="Our Vision"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
        <Box
          sx={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            At Kairo, we envision a world where every event is seamless, beautiful, and memorable.
          </Typography>
        </Box>
      </Box>

      {/* Text Left + Image Right Section - full width flush edges */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          mb: 10,
          minHeight: 320,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
            order: { xs: 2, md: 1 },
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Crafting Memories
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            From intimate gatherings to grand celebrations, we handle every detail with care.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: '1 1 50%',
            minHeight: 320,
            overflow: 'hidden',
            order: { xs: 1, md: 2 },
          }}
        >
          <img
            src="/about-us/img1.avif"
            alt="Crafting Memories"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      </Box>

      
      {/* Why Kairo Fullwidth Background with Overlay Text */}
      <Box
        sx={{
          position: 'relative',
          height: 280,
          backgroundImage: `url('/about-us/about2.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Why Choose Kairo?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            Our expert team offers personalized service and an extensive selection of event options to make your celebration unique.
          </Typography>
        </Box>
      </Box>

      {/* Icon Cards Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <EventIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Venue Booking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Elegant venues perfect for every occasion.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <LocalFloristIcon fontSize="large" color="secondary" sx={{ mb: 1 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Floral Decoration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Beautiful, theme-matched floral setups.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <RestaurantMenuIcon
                fontSize="large"
                sx={{ color: '#e67e22', mb: 1 }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Catering Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Delicious cuisine options for your event.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <CameraAltIcon fontSize="large" color="success" sx={{ mb: 1 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Photography
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capture your event with expert photographers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
