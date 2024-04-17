// @mui
import { styled } from '@mui/material/styles';
import { List, ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------
export const StyledNavList = styled((props)=> <List disablePadding {...props} />)(({theme})=>({
  backgroundColor: 'inherit',
  display: "flex",
  flexDirection: "column",
}));

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  overflowWrap:"break-word",
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 24,
  height: 24,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledPopupItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 56,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  font: 'inherit',
  display:"block",
  padding:0,
  width: '100%',
}));

export const StyledPopupItemIcon = styled(ListItemIcon)({
  margin:'0px 4px',
  padding:'4px',
  minHeight: 56,
  color: 'inherit',
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign:'center',
});
