import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
// import CreatePopover from './CreatePopover';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const CLOSED_NAV_WIDTH=88;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 80;



// ----------------------------------------------------------------------

const StyledRoot = styled(AppBar)(({ theme, navBarLapOpen, trigger}) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  height: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    height: trigger ? HEADER_MOBILE : HEADER_DESKTOP,
    width: navBarLapOpen ? `calc(100% - ${NAV_WIDTH + 1}px)`:`calc(100% - ${CLOSED_NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav,navBarLapOpen,userData,window }) {

  // const [userData, setUserData] = useState({id:0,user_id:"",first_name:"",last_name:"",email:""});
  const [headerDesktop, setHeaderDesktop]=useState(HEADER_DESKTOP);
  const trigger =  useScrollTrigger({
    disableHysteresis: true,
    threshold: 35,
    target: window ? window() : undefined,
  });

  // useEffect(()=>{
  //     axios.get(`${DB_URL}/api/user/${loggedInUserId}`).then((data)=>{setUserData(data.data[0]);});
  // },[]);

  return (
    <StyledRoot navBarLapOpen={navBarLapOpen} trigger={trigger}>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          {/* <CreatePopover /> */}
          <AccountPopover userData={userData}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
