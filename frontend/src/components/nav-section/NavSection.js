import * as React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { Box, List, MenuItem, ListItemText,ListItemIcon, ListSubheader, Collapse } from "@mui/material";
// @mui icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionIcon from "@mui/icons-material/Description";

// @mui components and state
import HoverMenu from "material-ui-popup-state/HoverMenu";
import PopupState, { bindHover, bindMenu } from "material-ui-popup-state";

// styles
import {
  StyledNavList,
  StyledNavItem,
  StyledNavItemIcon,
  StyledPopupItem,
  StyledPopupItemIcon,
} from "./styles";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  isNavOpen: PropTypes.bool,
};

export default function NavSection({ data = [], isNavOpen, ...other }) {

  const [subHeaderState, setSubHeaderState] = useState({});

  const createButtons = (key) => {
    // Created by Murugesh Kumar on 11-10-2023
    setSubHeaderState((prev) => ({ ...prev, [key]: true }));
  };

  const handleClickSubHeader = (key) => {
    // Created by Murugesh Kumar on 11-10-2023
    setSubHeaderState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    data.map((item)=>{
        createButtons(item.title);
    });
  }, []);

  let navContents=(
    <StyledNavList 
          component={'nav'}
        >
      {data.map((item)=>(
        <>
        <ListSubheader
              key={item.title}
              disableSticky
              component="li"
              id="nested-list-subheader"
              onClick={()=>{handleClickSubHeader(item.title)}}
              sx={{
                bgcolor:'inherit',
                fontWeight: 700,
                textTransform:'uppercase',
                cursor: 'pointer',
                "&:hover":{
                  color:'text.primary',
                }
              }}
            >
              {item.title}
            </ListSubheader>
            <Collapse in={subHeaderState[item.title]} timeout="auto" unmountOnExit>
            {item.content.map((item)=>(
            <NavItem key={item.title} item={item} />
          ))}
          </Collapse>
        </>
      ))}
    </StyledNavList>
  );

  if(!isNavOpen){
    navContents=(
        <List disablePadding component={'nav'} sx={{px:0.5}}>
          {data.map((item)=>(
            <>
              {item.content.map((item)=>(
                <NavPopup key={item.title} item={item} />
              ))}
            </>
          ))}
        </List>
    );
  }

  return (
    // <Box {...other}>
    //   {isNavOpen ? (
    //     <List disablePadding>
    //       {data.map((item) => (
    //         <NavItem key={item.title} item={item} />
    //       ))}
    //     </List>
    //   ) : (
    //     <List disablePadding sx={{px:0.5}}>
    //       {data.map((item) => (
    //         <NavPopup key={item.title} item={item} />
    //       ))}
    //     </List>
    //   )}
    // </Box>
      <Box {...other}>
      {navContents}
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {

  const [buttonsState, setButtonsState] = useState({});
  const location=useLocation();

  const { title, path, icon, info, children = [] } = item;

  const isChildPath = location.pathname.startsWith(path);

  const createButtons = (key) => {
    // Created by Murugesh Kumar on 11-10-2023
    setButtonsState((prev) => ({ ...prev, [key]: false }));
  };

  const handleClickButton = (key) => {
    // Created by Murugesh Kumar on 11-10-2023
    setButtonsState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (children.length > 0) {
      createButtons(title);
    }
  }, []);

  let NavButtons = (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        mx: 2,
        mt: 0.5,
        "&.active": {
          color: "text.active",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );

  if (children.length > 0) {
    NavButtons = (
      <>
        <StyledNavItem
          selected={buttonsState[title] || isChildPath}
          onClick={() => {
            handleClickButton(title);
          }}
          sx={{
            mx: 2,
            mt: 0.5,
            "&.Mui-selected":{
              color: isChildPath ? "text.active" : "text.secondary",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            }
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={title} />
          {info && info}
          {buttonsState[title] ? <ExpandLess /> : <ExpandMore />}
        </StyledNavItem>
        <Collapse in={buttonsState[title]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child) => (
              <StyledNavItem
                key={child.title}
                component={RouterLink}
                to={child.path}
                sx={{
                  pl: 2,
                  mx: 2,
                  mt: 0.5,
                  "&.active": {
                    color: "text.active",
                    bgcolor: "action.selected",
                    fontWeight: "fontWeightBold",
                  },
                }}
              >
                <StyledNavItemIcon>
                  {child.icon && child.icon}
                </StyledNavItemIcon>
                <ListItemText disableTypography sx={{overflow:'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap',}} primary={child.title} />
              </StyledNavItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return NavButtons;
}

// ----------------------------------------------------------------------

NavPopup.propTypes = {
  item: PropTypes.object,
};

function NavPopup({ item }) {
  const { title, path, icon, info, children = [] } = item;

  let Popups = (
    <StyledPopupItem
      component={RouterLink}
      to={path}
      sx={{
         mt:0.5,
        "&.active": {
          color: "text.active",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledPopupItemIcon>
        <Box component={"span"} className="icon" sx={{height:22,width:22, color:"inherit"}}>
          {icon && icon}
        </Box>
        <Box component={"span"} className="title" sx={{display:'block',minWidth:'100%',width:'100%',mt:"4px",fontSize:10,lineHeight:"16px",textAlign:"center",overflow:"hidden",textOverflow:'ellipsis'}}>
          {title}
        </Box>
      </StyledPopupItemIcon>

      {info && info}
    </StyledPopupItem>
  );

  if(children.length > 0){
    Popups=(
      <PopupState variant="popover" popupId="demoMenu">
      {(popupState) => (
        <React.Fragment>
      <StyledPopupItem
      component={RouterLink}
      to={path}
      sx={{
         mt:0.5,
        "&.active": {
          color: "text.active",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
      {...bindHover(popupState)}
    >

      <StyledPopupItemIcon>
        <Box component={"span"} className="icon" sx={{height:22,width:22, color:"inherit"}}>
          {icon && icon}<NavigateNextIcon/>
        </Box>
        <Box component={"span"} className="title" sx={{display:'block',minWidth:'100%',width:'100%',mt:"4px",fontSize:10,lineHeight:"16px",textAlign:"center",overflow:"hidden",textOverflow:'ellipsis'}}>
          {title}
        </Box>
      </StyledPopupItemIcon>

      {info && info}
    </StyledPopupItem>
            <HoverMenu
              {...bindMenu(popupState)}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
            >
              {children.map((child)=>(
                      <MenuItem
                      key={child.title}
                      component={RouterLink}
                      to={child.path}
                      sx={{
                        textTransform:'capitalize',
                         m:0.5,
                         borderRadius:1,
                        "&.active": {
                          color: "text.active",
                          bgcolor: "action.selected",
                          fontWeight: "fontWeightBold",
                        },
                      }}
                      onClick={popupState.close}
                    >
                     <ListItemIcon sx={{color:'inherit'}}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText>{child.title}</ListItemText>
                  </MenuItem>
              ))}
              {/* <MenuItem onClick={popupState.close}>
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
              </MenuItem> */}
            </HoverMenu>
    </React.Fragment>
        )}
      </PopupState>
    );
  }


  return Popups;
}
