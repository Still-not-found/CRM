import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useEffect } from 'react';

// ----------------------------------------------------------------------
const DB_URL= "http://localhost:3001";

export default function App() {
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router DB_URL={DB_URL} />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
