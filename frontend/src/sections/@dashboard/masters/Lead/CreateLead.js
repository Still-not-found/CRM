import React, { forwardRef, useEffect, useState } from 'react';

// @mui ------------------------------------------------------
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Container,
  Divider,
  FormLabel,
  Grid,
  TextField,
  Typography,
  styled
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";

// @mui-icons ------------------------------------------------
// Components -----------------------------------------------
import axios from "axios";
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
  
export default function CreateLead(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  
  const [leadData, setLeadData] = useState({
        leadName: "",
        leadStatus: null,
        officePhone: null,
        description: null,
        source: null,
        interestLevel: null,
        firstName: null,
        lastName: null,
        jobTitle: null,
        mobile: null,
        fax: null,
        department: null,
        accountName: null,
        email: null,
        leadSource: null,
        statusDescription: null,
        leadSourceDescription: null,
        opportunityAmount: null,
        referredBy: null,
        assignedTo: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        shippingAddress: null,
        shippingCity: null,
        shippingCountry: null,
        shippingState: null,
        shippingPincode: null,
        gender: null,
        series: null,
        leadType: null,
        requestType: null,
        createdBy: null,
        salutation: null,
  });

  const [suppliers, setSuppliers] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [assetstatus, setAssetStatus] = useState([]);
  const [locations, setLocations] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  
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
        setLeadData(prevData => ({
          ...prevData,
          invoice: fileName
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle upload error
      }
    }
  };

  useEffect( ()=>{
    const fetchUsers = async()=>{
      try {
        await axios.get(`${API_URL}/api/users`).then((response)=>{
          // console.log(response.data);
          setUsers(response.data.results);
        });
      } catch (error) {
        setUsers([]);
      }
    }

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
    }
    fetchAssetStatus();
    fetchLocations();
    fetchCompanies();
    fetchSuppliers();
    fetchUsers();
  },[]);
  const handleLeadTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    console.log(value);
    setLeadData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleClickCreate();
  };

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };
 
  const validate = () => {
    let errors = {};

    if (!Boolean(leadData.leadName))
      errors.leadName = "Lead Name is required";

    return errors;
  }

  const handleSubmit = async (event) => {
    // console.log('It worked');
    // if (!selectedFile) return;

  // const formData = new FormData();
  // formData.append('file', selectedFile);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
    
      await axios.post(`${API_URL}/api/leads`, { ...leadData, createdBy: loggedUser.user_id }).then((response) => {
        // console.log(response);
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
    handleClickCreate();
  }

  return (
    <>
      <Helmet>
        <title>Lead Create | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="xl"
        open={optionState.canCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="New Lead" value="1" sx={{ fontSize: '18.92px', }}  />

            <Box flexGrow={1} >
            <DialogActions>
              <SubmitButton  variant="contained" color="primary" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
           
          </TabList>
          
          <Divider sx={{ borderStyle: "fill" }} />
          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              {/* <Grid item xs={12} sm={4} md={4}>
  <FormLabel component="legend" sx={{ color: '#525252' }}>Series</FormLabel>
  <TextField
    id="series"
    size="small"
    fullWidth
    disabled// Set the field as read-only
    defaultValue="CRM-LEAD-YYYY-"  // Set the default value
    error={Boolean(validationErrors.series)}
    helperText={validationErrors.series}
    InputProps={{
      style: {
        backgroundColor: '#f3f3f3', // Set the background color here
      },
    }}
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
</Grid> */}
<Grid item xs={12} sm={4} md={1}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Salutation</FormLabel>

                      <TextField
                        id="salutation"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={leadData.salutation}
                        onChange={(event) => {
                          handleInputChange("salutation", event.target.value);
                        }}
                        error={Boolean(validationErrors.salutation)}
                        helperText={validationErrors.salutation}
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
                    <Grid item xs={12} sm={4} md={1.5}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>First Name</FormLabel>

                      <TextField
                        id="leadname"
                        size="small"
                        fullWidth
                        required
                        // label="First Name"
                        value={leadData.leadName}
                        onChange={(event) => {
                          handleInputChange("leadName", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadName)}
                        helperText={validationErrors.leadName}
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
                    <Grid item xs={12} sm={4} md={1.5}>
      <FormLabel component="legend">Last Name</FormLabel>
      <TextField
        id="lastname"
        size="small"
        fullWidth
        required
        variant="outlined"
        value={leadData.lastName}
        onChange={(event) => {
          handleInputChange("lastName", event.target.value);
        }}
        error={Boolean(validationErrors.lastName)}
        helperText={validationErrors.lastName}
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
        // Remove the label prop from here to avoid redundancy
      />
    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Job Title</FormLabel>

                      <TextField
                        id="jt"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={leadData.jobTitle}
                        onChange={(event) => {
                          handleInputChange("jobTitle", event.target.value);
                        }}
                        error={Boolean(validationErrors.jobTitle)}
                        helperText={validationErrors.jobTitle}
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

                    <Grid item xs={12} sm={4} md={4}>      
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Assigned To</FormLabel>
                      <TextField
                        id="leadowner"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Owner"
                        value={leadData.assignedTo}
                        onChange={(event) => {
                          handleInputChange("assignedTo", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedTo)}
                        helperText={validationErrors.assignedTo}
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
                    
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Gender</FormLabel>

                      <TextField
                        id="gender"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={leadData.gender}
                        onChange={(event) => {
                          handleInputChange("gender", event.target.value);
                        }}
                        error={Boolean(validationErrors.gender)}
                        helperText={validationErrors.gender}
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Status</FormLabel>

                      <TextField
                        id="status"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.leadStatus}
                        onChange={(event) => {
                          handleInputChange("leadStatus", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadStatus)}
                        helperText={validationErrors.leadStatus}
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
                  
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Source</FormLabel>

                      <TextField
                        id="leadsource"
                        size="small"
                        fullWidth
                        required
                        // label="Source"
                        value={leadData.leadSource}
                        onChange={(event) => {
                          handleInputChange("leadSource", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadSource)}
                        helperText={validationErrors.leadSource}
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
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    {/* <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Lead Type</FormLabel>

                      <TextField
                        id="leadtype"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Type"
                        value={leadData.leadType}
                        onChange={(event) => {
                          handleInputChange("leadType", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadType)}
                        helperText={validationErrors.leadType}
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Request Type
      </FormLabel>
                      <TextField
                        id="requestType"
                        size="small"
                        fullWidth
                        required
                        // label="Request Type"
                        value={leadData.requestType}
                        onChange={(event) => {
                          handleInputChange("requestType", event.target.value);
                        }}
                        error={Boolean(validationErrors.requestType)}
                        helperText={validationErrors.requestType}
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
                    </Grid> */}
                    <Grid item xs={12} sm={4} md={4}>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    <Grid item xs={12} sm={4} md={4}>
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Contact Info</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Email</FormLabel>

                      <TextField
                        id="email"
                        size="small"
                        fullWidth
                        required
                        // label="Series"
                        value={leadData.email}
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Mobile No</FormLabel>

                      <TextField
                        id="mobile"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={leadData.mobile}
                        onChange={(event) => {
                          handleInputChange("mobile", event.target.value);
                        }}
                        error={Boolean(validationErrors.mobile)}
                        helperText={validationErrors.mobile}
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

                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant='h5'>Address & Details</Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant='h6'>Shipping Address</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}><Typography variant='h6'>Primary Address</Typography></Grid>
                   
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>City</FormLabel>

                      <TextField
                        id="shipping city"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.shippingCity}
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
        }}>City</FormLabel>

                      <TextField
                        id="city"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.city}
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
        }}>State/Region</FormLabel>

                      <TextField
                        id="shipping state"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.shippingState}
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
        }}>State/Region</FormLabel>

                      <TextField
                        id="state"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.state}
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
        }}>Pincode</FormLabel>

                      <TextField
                        id="shipping_pincode"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.shippingPincode}
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
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Pincode</FormLabel>

                      <TextField
                        id="pincode"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.postalCode}
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
        }}>Country</FormLabel>

                      <TextField
                        id="shippingcountry"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.shippingCountry}
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

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Country</FormLabel>

                      <TextField
                        id="country"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.country}
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
    value={leadData.description}
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
        </TabContext>
      </Dialog>
    </>
  );
}
