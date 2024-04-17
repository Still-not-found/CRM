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

export default function EditManufacturer(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const [cityData, setCityData] = useState({
    cityName: null,
    zoneId:null,
    countryId:null,
  });
  const [zones, setZones] = useState([]);
  const [countries, setCountries] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(()=>{
    const fetchZoneList = async()=>{
      try {
        await axios.get(`${API_URL}/api/zone_list`).then((response)=>{
          // console.log(response.data);
          setZones(response.data.results);
        });
      } catch (error) {
        setZones([]);
      }
    };
    const fetchCountryList = async()=>{
      try {
        await axios.get(`${API_URL}/api/countries`).then((response)=>{
          // console.log(response.data);
          setCountries(response.data.results);
        });
      } catch (error) {
        setCountries([]);
      }
    };
    const fetchData = async() =>{
      try {
        await axios.get(`${API_URL}/api/cities/${idToEdit}`).then((response)=>{
          if(response.data.status){
            const {city_name, zone, country} = response.data.results[0];
            setCityData({
              cityName:city_name,
              zoneId: zone.id,
              countryId: country.country_id,
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
    fetchZoneList();
    fetchCountryList();
    fetchData();
  },[]);

  const handleInputChange = (field, value) => {
    setCityData((pre) => {
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

    if(!Boolean(cityData.cityName))
      errors.cityName="City Name is required";
    if(!Boolean(cityData.zoneId))
      errors.zoneId="Zone is required";
    if(!Boolean(cityData.countryId))
      errors.countryId="Country is required";

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
      await axios.put(`${API_URL}/api/cities/${idToEdit}`,{...cityData,modifiedBy:loggedUser.user_id}).then((response)=>{
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
        <title>City Edit | GAMA AirOps</title>
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
        <DialogTitle>{"Edit City"}</DialogTitle>
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
                  id="city_name"
                  size="small"
                  fullWidth
                  required
                  label="City Name"
                  value={cityData.cityName}
                  onChange={(event) => {
                    handleInputChange("cityName", event.target.value);
                  }}
                  error={Boolean(validationErrors.cityName)}
                  helperText={validationErrors.cityName}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <Autocomplete
                  fullWidth
                  size="small"
                  value={zones.find((_zone)=> _zone.id === cityData.zoneId ) || null}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("zoneId", newValue.id);
                    }else{
                      handleInputChange("zoneId", null);
                    }
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="zone"
                  options={zones}
                  getOptionLabel={(option)=>option.zone}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Zone"
                      error={Boolean(validationErrors.zoneId)}
                      helperText={validationErrors.zoneId}
                       />
                  )}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <Grid container columnSpacing={2} columns={{xs:4, sm:12, md:12}}>
                <Grid item xs={3.5} sm={10} md={10}>
                <Autocomplete
                  fullWidth
                  size="small"
                  value={countries.find((_country)=>_country.country_id===cityData.countryId)|| null}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("countryId", newValue.country_id);
                    }else{
                      handleInputChange("countryId", null);
                    }
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="country"
                  options={countries}
                  getOptionLabel={(option)=>option.country_name}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Country"
                      error={Boolean(validationErrors.countryId)}
                      helperText={validationErrors.countryId}
                       />
                  )}
                />
                </Grid>
                <Grid item xs={0.5} sm={2} md={2}>
                <Tooltip title="New Country">
                    <Button to={'/app/masters/country'} fullWidth variant="contained" color="info" component={RouterLink}>
                  <AddIcon/>
                </Button>
                </Tooltip>
                </Grid>
              </Grid>
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
