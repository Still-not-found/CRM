import * as React from "react";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FlightIcon from "@mui/icons-material/Flight";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import PreviewIcon from "@mui/icons-material/Preview";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from '@mui/icons-material/Close';
import HandymanIcon from "@mui/icons-material/Handyman";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TaskIcon from "@mui/icons-material/Task";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Route, Routes, useNavigate } from "react-router-dom";
import Quotation from "../Quotation";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import "./index.css";
import { Card } from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import PopupState, { bindHover, bindMenu } from "material-ui-popup-state";
import Footer from "../../components/Footer";

const drawerWidth = 280;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   height: "60px",
//   padding: 3,
//   // necessary for content to be below app bar
//   // ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer - 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

const openedMixin = (theme) => ({
  borderRightStyle: "dashed",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  borderRightStyle: "dashed",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 24px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 24px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, openLaptop }) => ({
  backgroundColor: "white",
  color: "blue",
  width: `calc(100% - ${theme.spacing(11)})`,
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(openLaptop && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, openLaptop }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(openLaptop && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!openLaptop && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 240,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: "10px",
  },
}));

const pages = ["Home", "Accounts", "Quotation", "Invoice"];
const settings = ["Profile","Registration","Settings"];

export default function Home({ module, DB_URL, loggedInUserId, window }) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserData] = React.useState({id:0,user_id:"",first_name:"",last_name:"",email:""});

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const navigator = (redirect_to) => {
    setAnchorElUser(null);
    navigate(`/${redirect_to}`);
  };

  const theme = useTheme();

  const [openSalesManagement, setOpenSalesManagement] = React.useState(false);
  const [openTripManagement, setOpenTripManagement] = React.useState(false);
  const [openMaintenance, setOpenMaintenance] = React.useState(false);

  const handleClickList = (list = 0) => {
    switch (list) {
      case 0:
        navigator("dashboard");
        break;
      case 1:
        setOpenSalesManagement(!openSalesManagement);
        break;
      case 2:
        setOpenTripManagement(!openTripManagement);
        break;
      case 3:
        setOpenMaintenance(!openMaintenance);
        break;
      default:
        setOpenLaptop(!openLaptop);
    }
  };

  const [openLaptop, setOpenLaptop] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleDrawerLaptop = () => {
    setOpenLaptop(!openLaptop);
  };

  const handleDrawerMobile = () => {
    setOpenMobile(!openMobile);
  };

  React.useEffect(()=>{
    if(loggedInUserId && DB_URL){
      axios.get(`${DB_URL}/api/user/${loggedInUserId}`).then((data)=>{setUserData(data.data[0]);});
    }
  },[]);

  const content_1=(
    <List
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Overview
      </ListSubheader>
    }
  >
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
        }}
        onClick={() => handleClickList(0)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5 ,
            justifyContent: "center",
          }}
        >
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Dashboard"}
        />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial" ,
          px: 2.5,
        }}
        onClick={() => handleClickList(1)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5 ,
            justifyContent: "center",
          }}
        >
          <SellIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Sales Management"}
        />
        {openSalesManagement ? <ExpandMore /> : <ChevronRightIcon />}
      </ListItemButton>
      <Collapse in={openSalesManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <PeopleAltSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Customer Contacts" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <PersonAddAlt1Icon />
            </ListItemIcon>
            <ListItemText primary="Leads" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigator("quotation")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Quotation" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigator("proforma_invoice")}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Proforma Invoice" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Tax Invoice" />
          </ListItemButton>
        </List>
      </Collapse>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent:  "initial",
          px: 2.5,
        }}
        onClick={() => handleClickList(2)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5 ,
            justifyContent: "center",
          }}
        >
          <FlightIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Trip Management"}
        />
        {openTripManagement ? <ExpandMore /> : <ChevronRightIcon />}
      </ListItemButton>
      <Collapse in={openTripManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <PeopleAltSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Crew Rostering" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Notam Clearance" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <FlightIcon />
            </ListItemIcon>
            <ListItemText primary="Aircraft Availability" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="FDTL" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5,
                justifyContent: "center",
              }}
            >
              <PreviewIcon />
            </ListItemIcon>
            <ListItemText primary="Watch Dog" />
          </ListItemButton>
        </List>
      </Collapse>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
        }}
        onClick={() => handleClickList(3)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5 ,
            justifyContent: "center",
          }}
        >
          <HandymanIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Maitenance"}
        />
        {openMaintenance ? <ExpandMore /> : <ChevronRightIcon />}
      </ListItemButton>
      <Collapse in={openMaintenance} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5 ,
                justifyContent: "center",
              }}
            >
              <HandymanIcon />
            </ListItemIcon>
            <ListItemText primary="CAMO" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr:  1.5,
                justifyContent: "center",
              }}
            >
              <HandymanIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase Order" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5 ,
                justifyContent: "center",
              }}
            >
              <HandymanIcon />
            </ListItemIcon>
            <ListItemText primary="Work Order" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1.5 ,
                justifyContent: "center",
              }}
            >
              <HandymanIcon />
            </ListItemIcon>
            <ListItemText primary="Spare Parts(Product)" />
          </ListItemButton>
        </List>
      </Collapse>
    </ListItem>
  </List>
  );

  const content_2=(
    <List>
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={() => handleClickList(0)}
        sx={{
          minHeight: 48,
          justifyContent: "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: "auto",
            justifyContent: "center",
          }}
        >
          <DashboardIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <PopupState variant="popover" popupId="demoMenu">
        {(popupState) => (
          <React.Fragment>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
              {...bindHover(popupState)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                <SellIcon />
              </ListItemIcon>
              <ChevronRightIcon />
            </ListItemButton>
            <HoverMenu
              {...bindMenu(popupState)}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={popupState.close}>
                <ListItemIcon>
                  <PeopleAltSharpIcon />
                </ListItemIcon>
                <ListItemText>Customer Contacts</ListItemText>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText>Leads</ListItemText>
              </MenuItem>
              <MenuItem onClick={()=>{popupState.close(); navigator("quotation");}}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText>Quotation</ListItemText>
              </MenuItem>
              <MenuItem onClick={()=>{popupState.close(); navigator("proforma_invoice");}}>
                <ListItemIcon>
                  < TaskIcon/>
                </ListItemIcon>
                <ListItemText>Proforma Invoice</ListItemText>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText>Tax Invoice</ListItemText>
              </MenuItem>
            </HoverMenu>
          </React.Fragment>
        )}
      </PopupState>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <HtmlTooltip
        placement="right"
        title={
          <React.Fragment>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    px: 2.5,
                  }}
                  // onClick={handleClickList}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    <HandymanIcon />
                  </ListItemIcon>
                  <ListItemText primary={"List"} />
                </ListItemButton>
              </ListItem>
            </List>
          </React.Fragment>
        }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent:"center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: "auto",
              justifyContent: "center",
            }}
          >
            <FlightIcon />
          </ListItemIcon>
          <ChevronRightIcon />
        </ListItemButton>
      </HtmlTooltip>
    </ListItem>
    <ListItem disablePadding sx={{ display: "block" }}>
      <HtmlTooltip
        placement="right"
        title={
          <React.Fragment>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent:"center",
                    px: 2.5,
                  }}
                  onClick={handleClickList}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                    }}
                  >
                    <HandymanIcon />
                  </ListItemIcon>
                  <ListItemText primary={"List"} />
                </ListItemButton>
              </ListItem>
            </List>
          </React.Fragment>
        }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent:"center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr:"auto",
              justifyContent: "center",
            }}
          >
            <HandymanIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Maitenance"}
            sx={{ opacity: 0 }}
          />
          <ChevronRightIcon />
        </ListItemButton>
      </HtmlTooltip>
    </ListItem>
  </List>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{display:{xs:"block",sm:"none"}}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerMobile}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography ml={3} variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <MuiDrawer
                  container={container}
                  variant="temporary"
                  open={openMobile}
                  onClose={handleDrawerMobile}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: drawerWidth
                    }
                  }}
      >
       <DrawerHeader>
        <Typography
            component="h1"
            variant="h5"
            pt={1}
            ml={1}
          >
            <img
              src="https://sparzana.com/images/Logos/logo.png"
              alt="logo"
              height={45}
            />
          </Typography>
        </DrawerHeader>
        {content_1}
      </MuiDrawer>
      <AppBar
        position="fixed"
        openLaptop={openLaptop}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerLaptop}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography ml={1} variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" openLaptop={openLaptop} sx={{display:{xs:"none",sm:"block"}}}>
      <Box
          sx={{
            position: "fixed",
            top: "18px",
            left: openLaptop ? "266px" : "74px",
            zIndex: 1101
          }}
        >
          <IconButton
          type="button"
            onClick={handleDrawerLaptop}
            size={"small"}
            sx={{
              padding: "4px",
              border: "1px dashed",
            }}
          >
            {
              // openLaptop ? (<ChevronLeftIcon fontSize="inherit" />): (<ChevronRightIcon fontSize="inherit" />)
              openLaptop ? (<CloseIcon fontSize="inherit"/>) : (<MenuIcon fontSize="inherit" />) 
            }
            {/* {theme.direction === "rtl" ? (
              <ChevronRightIcon fontSize="inherit" />
            ) : (
              <ChevronLeftIcon fontSize="inherit" />
            )} */}
          </IconButton>
      </Box>
        <DrawerHeader>
        <Typography
            component="h1"
            variant="h5"
            pt={1}
            ml={1}
          >
            <img
              src="https://sparzana.com/images/Logos/logo.png"
              alt="logo"
              height={45}
            />
          </Typography>
        </DrawerHeader>
        {/* <Divider /> */}
        {/*  */}
        {openLaptop ? content_1 : content_2}
        {/* {["Sales Management"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? (
                    <ConnectingAirportsIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))} */}
        {/* <Divider /> */}
      </Drawer>
      <Box id="dashboard_container" component="main" sx={{ flexGrow: 1,}}>
        <DrawerHeader />
        {/* <Quotation /> */}
        {module}
        <Footer />
      </Box>
    </Box>
  );
}
