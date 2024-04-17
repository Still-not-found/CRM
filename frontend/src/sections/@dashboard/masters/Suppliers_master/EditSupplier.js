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

export default function EditSupplier(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const [supplierData, setSupplierData] = useState({
    supplier: "",
    city: "",
    state: "",
    country: "", 
    address:"",
    pincode:"", 
    email: "",
    phone: "",
    gstin: "",
    contactPerson: "",
  });
 
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(()=>{
  
    const fetchData = async() =>{
      try {
        await axios.get(`${API_URL}/api/suppliers/${idToEdit}`).then((response)=>{
          if(response.data.status){
            const {name, city, state, country, address, pincode, email, gstin, contact_person, phone} = response.data.results[0];
            // console.log(supplier);
            setSupplierData({
              supplier: name,
              city: city,
              state: state,
              country: country, 
              address: address,
              pincode: pincode, 
              email: email,
              phone: phone,
              gstin : gstin,
              contactPerson: contact_person,
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
       fetchData();
  },[]);

  const handleInputChange = (field, value) => {
    setSupplierData((pre) => {
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

    if(!Boolean(supplierData.supplier))
      errors.supplier="Supplier is required";
    if(!Boolean(supplierData.city))
      errors.city="city is required";
    if(!Boolean(supplierData.country))
      errors.country="Country is required";
    if(!Boolean(supplierData.state))
      errors.state="State is required";
    if(!Boolean(supplierData.email))
      errors.email="Email is required";
    if(!Boolean(supplierData.phone))
      errors.phone="Phone is required";


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
      await axios.put(`${API_URL}/api/suppliers/${idToEdit}`,{...supplierData,updatedBy:loggedUser.user_id}).then((response)=>{
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
        <title>Supplier Edit | ITAM</title>
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
        <DialogTitle>{"Edit Supplier"}</DialogTitle>
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
                  id="supplier_name"
                  size="small"
                  fullWidth
                  required
                  label="Supplier"
                  value={supplierData.supplier}
                  onChange={(event) => {
                    handleInputChange("supplier", event.target.value);
                  }}
                  error={Boolean(validationErrors.supplier)}
                  helperText={validationErrors.supplier}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="Address_name"
                  size="small"
                  fullWidth
                  required
                  label="Address"
                  value={supplierData.address}
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
                  value={supplierData.pincode}
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
                  value={supplierData.city}
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
                  value={supplierData.state}
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
                  value={supplierData.country}
                  onChange={(event) => {
                    handleInputChange("country", event.target.value);
                  }}
                  error={Boolean(validationErrors.country)}
                  helperText={validationErrors.country}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
          <TextField
          id="phone"
          size="small"
          fullWidth
          required
            label="Phone Number"
            // variant="outlined"
            type="tel"
            value={supplierData.phone}
            onChange={(event) => {
               handleInputChange("phone", event.target.value);
            }}
            error={Boolean(validationErrors.phone)}
            helperText={validationErrors.phone}
          />
          </Grid>
          
          <Grid item xs={4} sm={12} md={12}>
          <TextField
          id="email"
          size="small"
          fullWidth
          required
            label="Email"
            // variant="outlined"
            type="email"
            value={supplierData.email}
            onChange={(e) => handleInputChange('email',e.target.value)}
            error={Boolean(validationErrors.email)}
            helperText={validationErrors.email}
          />
          </Grid>

          <Grid item xs={4} sm={12} md={12}>
          <TextField
          id="gstin"
          size="small"
          fullWidth
          required
            label="GSTIN"
            value={supplierData.gstin}
            onChange={(e) => handleInputChange('gstin',e.target.value)}
            error={Boolean(validationErrors.gstin)}
            helperText={validationErrors.gstin}
          />
          </Grid>

          <Grid item xs={4} sm={12} md={12}>
          <TextField
          id="cp"
          size="small"
          fullWidth
          required
            label="Contact Person"
            // variant="outlined"
            // type="email"
            value={supplierData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson',e.target.value)}
            error={Boolean(validationErrors.contactPerson)}
            helperText={validationErrors.contactPerson}
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
