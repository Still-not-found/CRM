import { forwardRef, useEffect, useState } from "react";
import React from 'react';
import { Link as RouterLink, useHref, useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility'; // or any icon you prefer

// @mui ------------------------------------------------------
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Divider,
  Container,
  Grid,
  TextField,
  FormLabel,
  Typography,
  styled,
  Autocomplete,
  InputAdornment,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// @mui-icons ------------------------------------------------
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Components -----------------------------------------------
import axios from "axios";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";


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

export default function EditAccount(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [accountData, setAccountData] = useState({
    accName: "",
    industry: null,
    email: null,
    annualRevenue: null,
    website: null,
    phone: null,
    type: null,
    panNumber: null,
    gstNumber: null,
    assignedUser: null,
    street: null,
    city: null,
    state: null,
    postalCode: null,
    country: null,
    shippingStreet: null,
    shippingCity: null,
    shippingCountry: null,
    shippingState: null,
    shippingPincode: null,
    description: null,
    assignedUser: null,
    createdBy: null,
  });

  const handleAccountTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [companies, setCompanies] = useState([]);
  const [assetstatus, setAssetStatus] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
  
      // Prepare the file to be uploaded
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        // Upload the file
        const response = await axios.post(`${API_URL}/api/upload/single`, formData);
  
        // Assuming your backend responds with the file's name or path
        const fileName = response.data.fileName; // Adjust according to your actual response structure
  
        // Update the state to include the uploaded file's name
        setAccountData(prevData => ({
          ...prevData,
          invoice: fileName
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle upload error
      }
    }
  };

  useEffect(() => {
    const fetchAssetStatus = async()=>{
      try {
        await axios.get(`${API_URL}/api/status`).then((response)=>{
          // console.log(response.data);
          setAssetStatus(response.data.results);
        });
      } catch (error) {
        setAssetStatus([]);
      }
    }
    const fetchLocations = async()=>{
      try {
        await axios.get(`${API_URL}/api/locations`).then((response)=>{
          // console.log(response.data);
          setLocations(response.data.results);
          // console.log(response.data.results);
        });
      } catch (error) {
        setLocations([]);
      }
    }
    const fetchSuppliers = async()=>{
      try {
        await axios.get(`${API_URL}/api/suppliers`).then((response)=>{
          // console.log(response.data);
          setSuppliers(response.data.results);
          console.log(response.data.results);
        });
      } catch (error) {
        setSuppliers([]);
      }
    }
    const fetchCompanies = async()=>{
      try {
        await axios.get(`${API_URL}/api/companies`).then((response)=>{
          // console.log(response.data);
          setCompanies(response.data.results);
        });
      } catch (error) {
        setCompanies([]);
      }
    };
    
    
    const fetchData = async () => {
      try {
        await axios.get(`${API_URL}/api/accounts/${idToEdit}`).then((response) => {
          if (response.data.status) {
            const { name, shipping_city, shipping_street, shipping_country, shipping_state, shipping_pincode, description, industry, annual_revenue, phone, website, type, assigned_user_id, pan_number, gst_number, email, street, city, state, postal_code, country, office_phone, created_by } = response.data.results[0];
            setAccountData({
              accName: name,
              shippingStreet: shipping_street,
              shippingCity: shipping_city,
              shippingCountry: shipping_country,
              shippingPincode: shipping_pincode,
              shippingState: shipping_state,
              description: description,
    industry: industry,
    email: email,
    annualRevenue: annual_revenue,
    website: website,
    phone: phone,
    type: type,
    panNumber: pan_number,
    gstNumber: gst_number,
    assignedUser: assigned_user_id,
    street: street,
   city: city,
    state: state,
    postalCode: postal_code,
    country: country,
              // warrenty: dayjs(warrenty),
            });
          }
        }).catch((error) => {
          setStatus({
            open: true,
            type: "error",
            message: error.response.data.message,
          });
        });
      } catch (error) {
        setStatus({
          open: true,
          type: 'error',
          message: "Network connection error",
        });
      }
    };
    fetchAssetStatus();
    fetchLocations();
    fetchCompanies();
    fetchSuppliers();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setAccountData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
    handleClickEdit();
  };

  const validate = () => {
    let errors = {};

    if (!Boolean(accountData.accName))
      errors.accName = "Account Name is required";


    return errors;
  }

    const handleViewInvoice = () => {
      const invoiceUrl = `${API_URL}/uploads/${accountData.invoice}`;
      window.open(invoiceUrl, '_blank');
    };

  const handleSubmit = async (event) => {
    //  console.log('accountData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/accounts/${idToEdit}`, { ...accountData, modifiedBy: loggedUser.user_id }).then((response) => {
        console.log(response);
        setStatus({
          open: true,
          type: 'success',
          message: response.data.message
        });
        setRefresh((prev) => prev + 1);
      }).catch((error) => {
        // console.log(error);
        setStatus({
          open: true,
          type: 'error',
          message: error.response.data.message,
        });
      });
    } catch (error) {
      setStatus({
        open: true,
        type: 'error',
        message: "Network connection error",
      });
    }
    handleClickEdit();
  }

  return (
    <>
      <Helmet>
        <title>Account Edit | CRM Sales</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="xl"
        open={optionState.canEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <TabContext value={tabValue}>
          <TabList
            onChange={handleAccountTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="" value="1" sx={{ fontSize: '18.92px', }}  />

            {/* <Box flexGrow={1} >
            <DialogActions>
              <SubmitButton  variant="contained" color="primary" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
            */}
          </TabList>
          
          <Divider sx={{ borderStyle: "fill" }} />
          <TabPanel value="1">
          <Container maxWidth="l">
            <Box flexGrow={2}>
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel  required= "true" component="legend" sx={{ color: '#525252',}}>Name</FormLabel>
                      <TextField
                        id="account_name"
                        size="small"
                        fullWidth
                        required
                        // label="Series"
                        value={accountData.accName}
                        onChange={(event) => {
                          handleInputChange("accName", event.target.value);
                        }}
                        error={Boolean(validationErrors.accName)}
                        helperText={validationErrors.accName}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Assigned User</FormLabel>

                      <TextField
                        id="au"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={accountData.assignedUser}
                        onChange={(event) => {
                          handleInputChange("assignedUser", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedUser)}
                        helperText={validationErrors.assignedUser}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>      
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Email</FormLabel>
                      <TextField
                        id="email"
                        size="small"
                        fullWidth
                        required
                        // label="Account Owner"
                        value={accountData.email}
                        onChange={(event) => {
                          handleInputChange("email", event.target.value);
                        }}
                        error={Boolean(validationErrors.email)}
                        helperText={validationErrors.email}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Phone</FormLabel>

                      <TextField
                        id="phone"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={accountData.phone}
                        onChange={(event) => {
                          handleInputChange("phone", event.target.value);
                        }}
                        error={Boolean(validationErrors.phone)}
                        helperText={validationErrors.phone}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>GSTIN</FormLabel>

                      <TextField
                        id="gstin"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={accountData.gstNumber}
                        onChange={(event) => {
                          handleInputChange("gstNumber", event.target.value);
                        }}
                        error={Boolean(validationErrors.gstNumber)}
                        helperText={validationErrors.gstNumber}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>PAN Number</FormLabel>

                      <TextField
                        id="pannumber"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={accountData.panNumber}
                        onChange={(event) => {
                          handleInputChange("panNumber", event.target.value);
                        }}
                        error={Boolean(validationErrors.panNumber)}
                        helperText={validationErrors.panNumber}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}></Grid>
                    <Grid item xs={12} sm={4} md={6}></Grid>
                    
                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant="h6">Billing Address</Typography>
                      </Grid>
      
                      <Grid item xs={12} sm={4} md={6}>
                      <Typography variant="h6">Shipping Address</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} md={6}>
                      <Typography></Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={6}>
                      <Typography></Typography>
                      </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend"  sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Street</FormLabel>

                      <TextField
                        id="street"
                        size="small"
                        fullWidth
                        required
                        // label="First Name"
                        value={accountData.street}
                        onChange={(event) => {
                          handleInputChange("street", event.target.value);
                        }}
                        error={Boolean(validationErrors.street)}
                        helperText={validationErrors.street}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    
                    <FormLabel component="legend"  sx={{ 
          color: '#525252', 
        }}>Street</FormLabel>
                      <TextField
                        id="shippingstreet"
                        size="small"
                        fullWidth
                        required
                        // label="First Name"
                        value={accountData.shippingStreet}
                        onChange={(event) => {
                          handleInputChange("shippingStreet", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingStreet)}
                        helperText={validationErrors.shippingStreet}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>City</FormLabel>

                      <TextField
                        id="city"
                        size="small"
                        fullWidth
                        required
                        // label="Source"
                        value={accountData.city}
                        onChange={(event) => {
                          handleInputChange("city", event.target.value);
                        }}
                        error={Boolean(validationErrors.city)}
                        helperText={validationErrors.city}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>City</FormLabel>

                      <TextField
                        id="shippingcity"
                        size="small"
                        fullWidth
                        required
                        // label="Source"
                        value={accountData.shippingCity}
                        onChange={(event) => {
                          handleInputChange("shippingCity", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingCity)}
                        helperText={validationErrors.shippingCity}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>State/Region</FormLabel>

                      <TextField
                        id="state"
                        size="small"
                        fullWidth
                        required
                        // label="Account Type"
                        value={accountData.state}
                        onChange={(event) => {
                          handleInputChange("state", event.target.value);
                        }}
                        error={Boolean(validationErrors.state)}
                        helperText={validationErrors.state}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>State/Region</FormLabel>

                      <TextField
                        id="shippingstate"
                        size="small"
                        fullWidth
                        required
                        // label="Account Type"
                        value={accountData.shippingState}
                        onChange={(event) => {
                          handleInputChange("shippingState", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingState)}
                        helperText={validationErrors.shippingState}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Postal Code</FormLabel>

                      <TextField
                        id="postalcode"
                        size="small"
                        fullWidth
                        required
                        // label="Middle Name"
                        value={accountData.postalCode}
                        onChange={(event) => {
                          handleInputChange("postalCode", event.target.value);
                        }}
                        error={Boolean(validationErrors.postalCode)}
                        helperText={validationErrors.postalCode}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Postal Code</FormLabel>

                      <TextField
                        id="spostalcode"
                        size="small"
                        fullWidth
                        required
                        // label="Middle Name"
                        value={accountData.shippingPincode}
                        onChange={(event) => {
                          handleInputChange("shippingPincode", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingPincode)}
                        helperText={validationErrors.shippingPincode}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Country
      </FormLabel>
                      <TextField
                        id="country"
                        size="small"
                        fullWidth
                        required
                        // label="Request Type"
                        value={accountData.country}
                        onChange={(event) => {
                          handleInputChange("country", event.target.value);
                        }}
                        error={Boolean(validationErrors.country)}
                        helperText={validationErrors.country}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Country
      </FormLabel>
                      <TextField
                        id="scountry"
                        size="small"
                        fullWidth
                        required
                        // label="Request Type"
                        value={accountData.shippingCountry}
                        onChange={(event) => {
                          handleInputChange("shippingCountry", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingCountry)}
                        helperText={validationErrors.shippingCountry}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
  <FormLabel 
    component="legend" 
    sx={{ 
      color: '#525252', // Set the color of the label here
      // Add more styling as needed
    }}
  >
    Description
  </FormLabel>
  <TextField
    id="description"
    multiline  // Add this to enable multiline input
    rows={4}   // Adjust the number of rows as needed
    fullWidth
    required
    value={accountData.description}
    onChange={(event) => {
      handleInputChange("description", event.target.value);
    }}
    error={Boolean(validationErrors.description)}
    helperText={validationErrors.description}
    InputProps={{
      style: {
        backgroundColor: '#f3f3f3', // Set the background color here
      },
    }}
    // Apply styles to the input field itself
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#f3f3f3', // Optional: change the border color
        },
        '&:hover fieldset': {
          borderColor: 'primary.main', // Optional: change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main', // Optional: change the border color when focused
        },
      },
    }}
  />
                    </Grid>        
              </Grid>
            </Box>
            </Container>
          </TabPanel>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box flexGrow={1} p={2}>
            <DialogActions>
              <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
        </TabContext>
      </Dialog>
    </>
  );
}