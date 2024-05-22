// pages/admin.js
import React, { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import UserList from '../components/UserList';

export default function AdminPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || session.user.role !== 'admin') {
      window.location.href = '/';
    }
  }, [session]);

  if (!session || session.user.role !== 'admin') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {session.user.email}</p>
      <UserList />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}