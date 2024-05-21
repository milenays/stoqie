// components/Navbar.js
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
        Stoqie
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        {session ? (
          <>
            <Link href="/protected" passHref>
              <Button color="inherit">Protected Page</Button>
            </Link>
            <Link href="/profile" passHref>
              <Button color="inherit">Profile</Button>
            </Link>
            {session.user.role === 'admin' && (
              <Link href="/admin" passHref>
                <Button color="inherit">Admin</Button>
              </Link>
            )}
            <Button 
              color="inherit" 
              onClick={() => signOut({ callbackUrl: '/' })}>
              Logout
            </Button>
          </>
        ) : (
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
      </Toolbar>
    </AppBar>
  );
}