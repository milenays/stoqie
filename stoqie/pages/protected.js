// pages/protected.js
import { useSession, getSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      window.location.href = '/login';
    }
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>You have access to this protected page.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}