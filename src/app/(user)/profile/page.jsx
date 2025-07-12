'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      p={3}
    >
      <Avatar
        src={session?.user?.image || ''}
        alt={session?.user?.name}
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        {session?.user?.name || 'User'}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {session?.user?.email}
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={() => signOut({ callbackUrl: '/login' })}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
}
