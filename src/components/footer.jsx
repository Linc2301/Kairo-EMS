"use client";
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box component="footer"  sx={{ backgroundColor: '#000', color: '#fff', p: 4, alignItems: 'center', flexWrap: 'wrap', gap: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            <Typography>&copy; 2025 All rights reserved by society</Typography>

            <Stack direction="row" spacing={5}>
                <IconButton><Facebook sx={{ color: '#fff' }} /></IconButton>
                <IconButton><Twitter sx={{ color: '#fff' }} /></IconButton>
                <IconButton><LinkedIn sx={{ color: '#fff' }} /></IconButton>
            </Stack>


            <Typography>Terms & Conditions | Privacy & Policy</Typography>

        </Box>
    );
}


// "use client";
// import { Box, Typography, IconButton, Stack, Link, useTheme } from '@mui/material';
// import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

// export default function Footer() {
//     const theme = useTheme();

//     return (
//         <Box
//             component="footer"
//             sx={{
//                 backgroundColor: '#000',
//                 color: '#fff',
//                 px: { xs: 2, md: 8 },
//                 py: { xs: 4, md: 6 },
//                 display: 'flex',
//                 flexDirection: { xs: 'column', md: 'row' },
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 flexWrap: 'wrap',
//                 gap: 2,
//             }}
//         >
//             {/* Left: Copyright */}
//             <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
//                 &copy; 2025 All rights reserved by society
//             </Typography>

//             {/* Middle: Social Media Icons */}
//             <Stack direction="row" spacing={2}>
//                 <IconButton aria-label="Facebook" href="#" sx={{ color: '#fff' }}>
//                     <Facebook />
//                 </IconButton>
//                 <IconButton aria-label="Twitter" href="#" sx={{ color: '#fff' }}>
//                     <Twitter />
//                 </IconButton>
//                 <IconButton aria-label="LinkedIn" href="#" sx={{ color: '#fff' }}>
//                     <LinkedIn />
//                 </IconButton>
//             </Stack>

//             {/* Right: Links */}
//             <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
//                 <Link href="#" underline="hover" color="inherit" sx={{ mr: 1 }}>
//                     Terms & Conditions
//                 </Link>
//                 |
//                 <Link href="#" underline="hover" color="inherit" sx={{ ml: 1 }}>
//                     Privacy & Policy
//                 </Link>
//             </Typography>
//         </Box>
//     );
// }
