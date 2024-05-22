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
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar /> {/* Navbar eklendi */}
        <Content Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

function Content({ Component, pageProps }) {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
