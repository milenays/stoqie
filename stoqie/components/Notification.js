import { Snackbar, Alert } from '@mui/material';

export default function Notification({ message, onClose, severity }) {
  return (
    <Snackbar open={Boolean(message)} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}