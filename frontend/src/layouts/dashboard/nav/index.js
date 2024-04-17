import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
// mock
import account from "../../../_mock/account";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
import Iconify from "../../../components/iconify";
import { hideScrollbarY } from "../../../utils/cssStyles";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const CLOSED_NAV_WIDTH = 88;

const openedMixin = (theme) => ({
  width: NAV_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

const closedMixin = (theme) => ({
  width: CLOSED_NAV_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexGrow: 1,
  ...hideScrollbarY,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const CustomeDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavIconButton = styled(IconButton,{
  shouldForwardProp: (prop) => prop !== "navBarLapOpen",
})(({theme,navBarLapOpen})=>({
  display: { xs: "none", lg: "inline-flex" },
  position: "fixed",
  top: "30px",
  left: navBarLapOpen ? "265px" : "73px",
  zIndex: 1101,
  borderRadius: "50%",
  padding: "4px",
  border: "1px dashed rgba(145, 158, 171, 0.2)",
  backdropFilter: "blur(6px)",
  transition: theme.transitions.create("left", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({
  openNav,
  onCloseNav,
  navBarLapOpen,
  handleLapOpen,
}) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ py: 2.62, display: "flex", justifyContent: "center" }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} isNavOpen={navBarLapOpen} sx={{ pb: 4 }} />
    </>
  );

  const renderContentMobile = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ py: 2.62, display: "flex", justifyContent: "center" }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} isNavOpen={true} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        ...(navBarLapOpen
          ? { width: { lg: NAV_WIDTH } }
          : { width: { lg: CLOSED_NAV_WIDTH } }),
      }}
    >
      {isDesktop ? (
        <CustomeDrawer
          open={navBarLapOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          <NavIconButton onClick={handleLapOpen} size="small" navBarLapOpen={navBarLapOpen}>
            <Iconify
              icon={navBarLapOpen ? "eva:close-fill" : "eva:menu-2-fill"}
            />
          </NavIconButton>
          {navBarLapOpen ? (
            <Scrollbar>{renderContent}</Scrollbar>
          ) : (
            <>{renderContent}</>
          )}
        </CustomeDrawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContentMobile}
        </Drawer>
      )}
    </Box>
  );
}
