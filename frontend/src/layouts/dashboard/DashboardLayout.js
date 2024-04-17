import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../components/scrollbar';
//
import Header from './header';
import Nav from './nav';
import Footer from './footer';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 80;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 10,
  // paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({userData}) {
  const [open, setOpen] = useState(false);
  const [navBarLapOpen, setNavBarLapOpen]=useState(false);

  return (
    <StyledRoot>
      
      <Header navBarLapOpen={navBarLapOpen} onOpenNav={() => setOpen(true)} userData={userData}/>

      <Nav openNav={open} navBarLapOpen={navBarLapOpen} onCloseNav={() => setOpen(false)} handleLapOpen={()=>{setNavBarLapOpen(!navBarLapOpen)}}/>
      
      <Main>
        <Outlet />
        <Footer/>
      </Main>
    </StyledRoot>
  );
}
