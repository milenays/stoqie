// components/LogoutButton.js
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export default function LogoutButton() {
  return (
    <Button variant="contained" color="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </Button>
  );
}