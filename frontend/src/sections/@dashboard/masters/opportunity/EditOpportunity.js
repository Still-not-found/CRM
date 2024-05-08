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
              Grid,
              FormLabel,
              Container,
              TextField,
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
            
            export default function EditOpportunity(props) {
              const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;
              const { handleTabChange, userData } = props;
              const [tabValue, setTabValue] = useState("1");
              const [opportunityData, setOpportunityData] = useState({
                       Name: "",
                       lead:null,
                       description: null,
                       value: null,
                       stage:null,
                       probability: null,
                       expectedCloseDate: null,
                       account: null,
                       opportunityAmount: null,
                       type: null,
                       user: null,
                       leadSource: null,
                       salesStage: null,
                       assignedTo: null,
              });
            
              const handleOpportunityTabChange = (event, newValue) => {
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
                    setOpportunityData(prevData => ({
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
                    await axios.get(`${API_URL}/api/opportunities/${idToEdit}`).then((response) => {
                      if (response.data.status) {
                        const { opportunities_id, lead_id, user_id, name, description, value, stage, probability, expected_close_date, account_id, opportunity_amount, type, lead_source, sales_stage, assigned_to, updated_by, created_by } = response.data.results[0];
                        setOpportunityData({
                       Name: name,
                       lead:lead_id,
                       description: description,
                       value: value,
                       stage:stage,
                       probability: probability,
                       expectedCloseDate: expected_close_date,
                       account: account_id,
                       opportunityAmount: opportunity_amount,
                       type: type,
                       user: user_id,
                       leadSource: lead_source,
                       salesStage: sales_stage,
                       assignedTo: assigned_to,
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
                setOpportunityData((pre) => {
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
            
                if (!Boolean(opportunityData.Name))
                  errors.opportunityName = "Opportunity Name is required";
            
            
                return errors;
              }
            
                const handleViewInvoice = () => {
                  const invoiceUrl = `${API_URL}/uploads/${opportunityData.invoice}`;
                  window.open(invoiceUrl, '_blank');
                };
            
              const handleSubmit = async (event) => {
                //  console.log('opportunityData');
                const errors = validate();
                if (Object.keys(errors).length > 0) {
                  setValidationErrors(errors);
                  return;
                }
                try {
                  await axios.put(`${API_URL}/api/opportunities/${idToEdit}`, { ...opportunityData, updatedBy: loggedUser.user_id }).then((response) => {
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
                    <title>Opportunity Edit | CRM Sales</title>
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
                        onChange={handleOpportunityTabChange}
                        aria-label="lab API tabs example"
                        sx={{ borderRadius: "10px 10px 0px 0px" }}
                      >
                        <Tab label="New Opportunity" value="1" sx={{ fontSize: '18.92px', }}  />
            
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
                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ color: '#525252',}}>Name</FormLabel>
                      <TextField
                        id="opportunity_name"
                        size="small"
                        fullWidth
                        // label="Series"
                        value={opportunityData.Name}
                        onChange={(event) => {
                          handleInputChange("Name", event.target.value);
                        }}
                        error={Boolean(validationErrors.Name)}
                        helperText={validationErrors.Name}
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

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Account</FormLabel>

                      <TextField
                        id="account"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={opportunityData.account}
                        onChange={(event) => {
                          handleInputChange("account", event.target.value);
                        }}
                        error={Boolean(validationErrors.account)}
                        helperText={validationErrors.account}
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

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Sales Stage</FormLabel>
                      <TextField
                        id="salesstage"
                        size="small"
                        fullWidth
                        // label="First Name"
                        value={opportunityData.salesStage}
                        onChange={(event) => {
                          handleInputChange("salesStage", event.target.value);
                        }}
                        error={Boolean(validationErrors.salesStage)}
                        helperText={validationErrors.salesStage}
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

                    <Grid item xs={12} sm={6} md={6}>      
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Opportunity Amount</FormLabel>
                      <TextField
                        id="opportunity_amount"
                        size="small"
                        fullWidth
                        // label="Opportunity Owner"
                        value={opportunityData.opportunityAmount}
                        onChange={(event) => {
                          handleInputChange("opportunityAmount", event.target.value);
                        }}
                        error={Boolean(validationErrors.opportunityAmount)}
                        helperText={validationErrors.opportunityAmount}
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

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Probability</FormLabel>

                      <TextField
                        id="probability"
                        size="small"
                        fullWidth
                        required
                        // label="Source"
                        value={opportunityData.probability}
                        onChange={(event) => {
                          handleInputChange("probability", event.target.value);
                        }}
                        error={Boolean(validationErrors.probability)}
                        helperText={validationErrors.probability}
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



                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Expected Close Date</FormLabel>

                      <TextField
                        id="ecd"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={opportunityData.expectedCloseDate}
                        onChange={(event) => {
                          handleInputChange("expectedCloseDate", event.target.value);
                        }}
                        error={Boolean(validationErrors.expectedCloseDate)}
                        helperText={validationErrors.expectedCloseDate}
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
                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Contact</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={opportunityData.contact}
                        onChange={(event) => {
                          handleInputChange("contact", event.target.value);
                        }}
                        error={Boolean(validationErrors.contact)}
                        helperText={validationErrors.contact}
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

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Lead Source</FormLabel>

                      <TextField
                        id="leadsource"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={opportunityData.leadSource}
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
                   
                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Type</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={opportunityData.type}
                        onChange={(event) => {
                          handleInputChange("type", event.target.value);
                        }}
                        error={Boolean(validationErrors.type)}
                        helperText={validationErrors.type}
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

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Assigned To</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={opportunityData.assignedTo}
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


                    <Grid item xs={12} sm={12} md={12}>
  <FormLabel component="legend" sx={{ color: '#525252',}}>Description</FormLabel>
  <TextField
    id="description"
    multiline  // Add this to enable multiline input
    rows={4}   // Adjust the number of rows as needed
    fullWidth
    required
    value={opportunityData.description}
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