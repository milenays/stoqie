import { SessionProvider, useSession } from 'next-auth/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar'; // Navbar bileşeni eklendi

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function MyApp({ Component, pageProps }) {
  const { status } = useSession();

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar /> {/* Navbar eklendi */}
        {status === 'loading' ? <div>Loading...</div> : <Component {...pageProps} />}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;