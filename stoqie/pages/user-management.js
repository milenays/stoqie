import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function UserManagement() {
  const { data: session, status } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (success) => {
    if (success) {
      setSelectedUser(null); // Eklemeyi veya güncellemeyi başarı ile gerçekleştirdikten sonra formu temizle
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session.user.role !== 'admin') {
      // Yetkisiz kullanıcıları yönlendir
      window.location.href = '/';
    }
  }, [status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' && session.user.role !== 'admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <UserForm user={selectedUser} onSave={handleSave} />
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