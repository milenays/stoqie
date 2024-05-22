import { useState } from 'react';
import Notification from '../components/Notification';

export default function ExamplePage() {
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  const handleAction = () => {
    try {
      // İşlemi gerçekleştir
      setNotification({ message: 'Action was successful!', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'An error occurred.', severity: 'error' });
    }
  };

  return (
    <div>
      <button onClick={handleAction}>Perform Action</button>
      <Notification 
        message={notification.message} 
        onClose={() => setNotification({ message: '', severity: 'success' })} 
        severity={notification.severity}
      />
    </div>
  );
}