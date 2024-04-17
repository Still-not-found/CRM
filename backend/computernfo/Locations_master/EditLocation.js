import { useState, useEffect, forwardRef } from "react";
import { Link as RouterLink } from 'react-router-dom';
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  Box,
  Breadcrumbs,
  styled,
  Autocomplete,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.success.darker,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditLocation(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const [locationData, setLocationData] = useState({
    location: "",
    city: "",
    state: "",
    country: "", 
    address:"",
    pincode:"", 
  });
 
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(()=>{
  
    const fetchData = async() =>{
      try {
        await axios.get(`${API_URL}/api/locations/${idToEdit}`).then((response)=>{
          if(response.data.status){
            const {name, city, state, country, address, pincode} = response.data.results[0];
            setLocationData({
              location: name,
              city: city,
              state: state,
              country: country, 
              address: address,
              pincode: pincode, 
            });
          }
        }).catch((error)=>{
          setStatus({
            open:true,
            type:"error",
            message:error.response.data.message,
          });
        });
      } catch (error) {
        setStatus({
          open:true,
          type:'error',
          message:"Network connection error",
        });
      }
    };
    // fetchZoneList();
    // fetchCountryList();
    fetchData();
  },[]);

  const handleInputChange = (field, value) => {
    setLocationData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      handleClickEdit();
  };

  const validate=()=>{
    let errors={};

    if(!Boolean(locationData.location))
      errors.location="Location is required";
    if(!Boolean(locationData.city))
      errors.city="city is required";
    if(!Boolean(locationData.country))
      errors.country="Country is required";
    if(!Boolean(locationData.state))
      errors.state="State is required";


    return errors;
  }

  const handleSubmit = async (event)=> {
    // console.log('It worked');
    const errors=validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/locations/${idToEdit}`,{...locationData,updatedBy:loggedUser.user_id}).then((response)=>{
        // console.log(response);
        setStatus({
          open:true,
          type:'success',
          message:response.data.message
        });
        setRefresh((prev)=>prev+1);
      }).catch((error)=>{
        // console.log(error);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setStatus({
        open:true,
        type:'error',
        message:"Network connection error",
      });
    }
    handleClickEdit();
}

  return (
    <>
      <Helmet>
        <title>Location Edit | ITAM</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Location"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
          <Grid
              container
              rowSpacing={2}
              columnSpacing={5}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="location_name"
                  size="small"
                  fullWidth
                  required
                  label="Location"
                  value={locationData.location}
                  onChange={(event) => {
                    handleInputChange("location", event.target.value);
                  }}
                  error={Boolean(validationErrors.location)}
                  helperText={validationErrors.location}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="Address_name"
                  size="small"
                  fullWidth
                  required
                  label="Address"
                  value={locationData.address}
                  onChange={(event) => {
                    handleInputChange("address", event.target.value);
                  }}
                  error={Boolean(validationErrors.address)}
                  helperText={validationErrors.address}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="Pincode_name"
                  size="small"
                  fullWidth
                  required
                  label="Pincode"
                  value={locationData.pincode}
                  onChange={(event) => {
                    handleInputChange("pincode", event.target.value);
                  }}
                  error={Boolean(validationErrors.pincode)}
                  helperText={validationErrors.pincode}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="city_name"
                  size="small"
                  fullWidth
                  required
                  label="City"
                  value={locationData.city}
                  onChange={(event) => {
                    handleInputChange("city", event.target.value);
                  }}
                  error={Boolean(validationErrors.city)}
                  helperText={validationErrors.city}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="state_name"
                  size="small"
                  fullWidth
                  required
                  label="State"
                  value={locationData.state}
                  onChange={(event) => {
                    handleInputChange("state", event.target.value);
                  }}
                  error={Boolean(validationErrors.state)}
                  helperText={validationErrors.state}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="country_name"
                  size="small"
                  fullWidth
                  required
                  label="Country"
                  value={locationData.country}
                  onChange={(event) => {
                    handleInputChange("country", event.target.value);
                  }}
                  error={Boolean(validationErrors.country)}
                  helperText={validationErrors.country}
                />
              </Grid>

            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained" onClick={handleSubmit}>
            Save
          </SubmitButton>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
