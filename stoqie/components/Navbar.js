import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button color="inherit">Stoqie</Button>
          </Link>
        </Typography>
        <Box>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/products" passHref>
            <Button color="inherit">Products</Button>
          </Link>
          <Link href="/categories" passHref>
            <Button color="inherit">Categories</Button>
          </Link>
          <Link href="/brands" passHref>
            <Button color="inherit">Brands</Button>
          </Link>
          {status === 'unauthenticated' && (
            <>
              <Link href="/register" passHref>
                <Button color="inherit">Register</Button>
              </Link>
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/reset-password" passHref>
                <Button color="inherit">Reset Password</Button>
              </Link>
            </>
          )}
          {status === 'authenticated' && (
            <>
              <Link href="/profile" passHref>
                <Button color="inherit">Profile</Button>
              </Link>
              {session.user.role === 'admin' && (
                <>
                  <Link href="/admin" passHref>
                    <Button color="inherit">Admin</Button>
                  </Link>
                  <Link href="/user-management" passHref>
                    <Button color="inherit">User Management</Button>
                  </Link>
                </>
              )}
              <Button color="inherit" onClick={() => signOut({ callbackUrl: '/' })}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}