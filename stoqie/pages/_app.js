// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar'; // Add this line to import the Navbar component

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
        <Navbar /> {/* Add this line to include the Navbar at the top of the page */}
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;