"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Review", path: "/review" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const open = Boolean(anchorEl);

  // Check if current route matches nav item
  const isActive = (path) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  // Fetch notifications count
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      const unreadCount = response.data.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    const handleNewNotification = () => fetchNotifications();
    
    window.addEventListener('newNotification', handleNewNotification);
    return () => {
      clearInterval(interval);
      window.removeEventListener('newNotification', handleNewNotification);
    };
  }, []);

  useEffect(() => {
    const handlePhotoUpdate = (e) => {
      if (e.detail) setAvatarUrl(e.detail);
    };

    window.addEventListener("profilePhotoUpdated", handlePhotoUpdate);
    return () => {
      window.removeEventListener("profilePhotoUpdated", handlePhotoUpdate);
    };
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: deepOrange[500] }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/">
          <Box sx={{ display: "flex", alignItems: "center", ml: 8  }}>
            <Image 
              src="/assets/logo.png" 
              alt="Kairo Logo" 
              width={70} 
              height={40}
              style={{ cursor: "pointer"}}
            />
          </Box>
        </Link>

        <Box display="flex" alignItems="center">
          {navItems.map(({ label, path }) => (
            <Link key={path} href={path} passHref>
              <Button
                color="inherit"
                sx={{
                  mx: 0.5,
                  fontWeight: isActive(path) ? 'bold' : 'normal',
                  backgroundColor: isActive(path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: isActive(path) ? '3px' : 0,
                    backgroundColor: 'white',
                    transition: 'height 0.3s ease',
                  }
                }}
              >
                {label}
              </Button>
            </Link>
          ))}

          {session ? (
            <>
              {/* Notification Icon */}
              <Link href="/profile?section=Notification">
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    ml: 1,
                    backgroundColor: pathname.startsWith('/profile') ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                  }}
                >
                  <Badge 
                    badgeContent={notificationCount} 
                    color="error"
                    max={99}
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: 5,
                        border: `2px solid ${deepOrange[500]}`,
                        padding: '0 4px',
                      },
                    }}
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </Link>

              {/* Avatar and Menu */}
              <IconButton 
                onClick={handleMenuClick} 
                sx={{ 
                  ml: 1,
                  backgroundColor: open ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }}
              >
                <Avatar
                  alt={session.user.name || "User"}
                  src={avatarUrl || session.user.image || ""}
                  sx={{
                    width: 36,
                    height: 36,
                    border: "2px solid white",
                    bgcolor: deepOrange[300],
                  }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      borderRadius: 3,
                      minWidth: 200,
                      px: 2,
                      py: 1.5,
                      backdropFilter: "blur(12px)",
                      backgroundColor: "rgba(30, 30, 30, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#fff",
                    },
                  },
                }}
              >
                <Box px={1} pb={1}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {session.user.name}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    {session.user.email}
                  </Typography>
                </Box>

                <MenuItem 
                  onClick={handleClose}
                  component={Link}
                  href="/profile"
                  sx={{ 
                    borderRadius: 1,
                    backgroundColor: pathname === '/profile' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  My Profile
                </MenuItem>

                <MenuItem 
                  onClick={handleLogout}
                  sx={{ borderRadius: 1 }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="contained"
                sx={{ 
                  ml: 2,
                  color: "#000",
                  backgroundColor: "#fff",
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
                  ...(pathname === '/login' && {
                    border: '2px solid white'
                  })
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// "use client";

// import Link from "next/link";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Typography,
//   Menu,
//   MenuItem,
//   IconButton,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { deepOrange } from "@mui/material/colors";

// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "Events", path: "/events" },
//   { label: "About Us", path: "/about" },
//   { label: "Contact Us", path: "/contact" },
//   { label: "Review", path: "/review" },
// ];

// export default function Navbar() {
//   const { data: session } = useSession();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const [avatarUrl, setAvatarUrl] = useState("");
//   const [notificationCount, setNotificationCount] = useState(3); // Default 3 for now

//   useEffect(() => {
//     const handlePhotoUpdate = (e) => {
//       if (e.detail) {
//         setAvatarUrl(e.detail);
//       }
//     };

//     window.addEventListener("profilePhotoUpdated", handlePhotoUpdate);

//     return () => {
//       window.removeEventListener("profilePhotoUpdated", handlePhotoUpdate);
//     };
//   }, []);

//   const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleLogout = async () => {
//     handleClose();
//     await signOut({ callbackUrl: "/login" });
//   };

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: deepOrange[500] }}>
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* Clickable Logo */}

//         <Box component="a" sx={{ display: "inline-block" }}>
//           <img
//             src="/logo-kairo.png"
//             alt="Kairo Logo"
//             style={{ maxWidth: "70px", height: "auto", cursor: "pointer" }}
//           />
//         </Box>

//         <Box>
//           {navItems.map(({ label, path }) => (
//             <Link key={label} href={path} passHref>
//               <Button color="inherit">{label}</Button>
//             </Link>
//           ))}

//           {session ? (
//             <>
           
//               {/* Notification Icon */}
//              <Link href="/profile?section=Notification">
//                 <IconButton color="inherit" sx={{ ml: 2 }}>
//                   <Badge badgeContent={notificationCount} color="error">
//                     <NotificationsNoneIcon />
//                   </Badge>
//                 </IconButton>
//               </Link>

//               {/* Avatar and Menu */}
//               <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
//                 <Avatar
//                   alt={session.user.name || "Profile"}
//                   src={avatarUrl || ""}
//                   sx={{
//                     width: 36,
//                     height: 36,
//                     border: "2px solid white",
//                     boxShadow: "0 0 0 2px rgba(255,255,255,0.3)",
//                   }}
//                 />
//               </IconButton>

//               <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 slotProps={{
//                   paper: {
//                     sx: {
//                       mt: 1.5,
//                       borderRadius: 3,
//                       minWidth: 200,
//                       px: 2,
//                       py: 1.5,
//                       backdropFilter: "blur(12px)",
//                       backgroundColor: "rgba(30, 30, 30, 0.8)",
//                       border: "1px solid rgba(255, 255, 255, 0.25)",
//                       boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
//                       color: "#fff",
//                       zIndex: 1300,
//                     },
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ fontWeight: 600, px: 1, pb: 0.5 }}
//                   >
//                     {session.user.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{ px: 1, pb: 1, color: "rgba(255,255,255,0.8)" }}
//                   >
//                     {session.user.email}
//                   </Typography>
//                 </Box>

//                 <MenuItem onClick={handleClose} sx={{ borderRadius: 1 }}>
//                   <Link
//                     href="/profile"
//                     passHref
//                     style={{
//                       textDecoration: "none",
//                       color: "inherit",
//                       width: "100%",
//                     }}
//                   >
//                     My Profile
//                   </Link>
//                 </MenuItem>

//                 <MenuItem onClick={handleLogout} sx={{ borderRadius: 1 }}>
//                   Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <Link href="/login" passHref>
//               <Button
//                 variant="contained"
//                 sx={{ ml: 2, color: "#000", backgroundColor: "#fff" }}
//               >
//                 Login
//               </Button>
//             </Link>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }
