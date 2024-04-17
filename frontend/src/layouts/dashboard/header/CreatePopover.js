import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CreateAsset,ListAsset,EditAsset } from '../../../../src/sections/@dashboard/masters/asset_master'
import {CreateLicense,ListLicense,EditLicense } from '../../../../src/sections/@dashboard/masters/License_master'
import {CreateAccessory,ListAccessory,EditAccessory } from '../../../../src/sections/@dashboard/masters/accessory_master'
import {CreateConsumable,ListConsumable,EditConsumable } from '../../../../src/sections/@dashboard/masters/Consumable_master'
import {CreateComponent,ListComponent,EditComponent } from '../../../../src/sections/@dashboard/masters/Components_master'

// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const icon = (name) => `/assets/icons/navbar/${name}.svg`;

// ----------------------------------------------------------------------

const Assets = [
  {
    value: 'Asset',
    label: 'Asset',
    path : '/app/asset_management/asset_create',
    icon: icon("asset"),
    
  },
  {
    value: 'License',
    label: 'License',
    icon: icon("license"),
   
  },
  {
    value: 'Accessory',
    label: 'Accessory',
    icon: icon("accessory"),
   
  },
  {
    value: 'Consumable',
    label: 'Consumable',
    icon: icon("consumable"),
  
  },
  {
    value: 'Component',
    label: 'Component',
    icon: icon("component"),
  },
  {
    value: 'User',
    label: 'User',
    icon: icon("user"),
  },
];

// ----------------------------------------------------------------------

export default function CreatePopover() {
      
  const [open, setOpen] = useState(null);
  
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      {/* <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
      </IconButton> */}
      <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
      Create New
      </Button>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {Assets.map((option) => (
            <MenuItem key={option.value} selected={option.value === Assets[0].value} onClick={() => {handleClose();navigate(option.path);}}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 24, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
