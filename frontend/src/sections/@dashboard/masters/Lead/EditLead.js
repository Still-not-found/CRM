import VisibilityIcon from '@mui/icons-material/Visibility'; // or any icon you prefer
import IconButton from '@mui/material/IconButton';
import React, { forwardRef, useEffect, useState } from 'react';

// @mui ------------------------------------------------------
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// @mui ------------------------------------------------------
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
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// @mui-icons ------------------------------------------------
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

export default function EditLead(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [leadData, setLeadData] = useState({
    leadName: "",
    assettag: "",
    serial: "",
    // assignedto: "",
    hostname: "",
    osname: "",
    purchasedate: null,
    osversion: "",
    osmanufacturer: "",
    osbuildtype: "",
    osconfiguration: "",
    registeredowner: "",
    productid: "",
    originalinstalldate: "",
    systemmanufacturer: "",
    systemmodel: "",
    processor: "",
    domain: "",
    systemtype: "",
    biosversion: "",
    windowsdirectory: "",
    systemdirectory: "",
    systemlocale: "",
    timezone: "",
    totalphysicalram: "",
    virtualrammax: "",
    virtualramavailable: "",
    installedsoftware: "",
    ordernumber: null,
    purchasecost: null,
    billedentity: null,
    assignedentity: null,
    supplier: null,
    location: null,
    warrenty: null,
    invoice: null,
    po: null,
  });

  const softwareDetailsArray = leadData.installedsoftware.split('", "');

  // Function to chunk the array into subarrays of length 4
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  };
  const softwareChunks = chunkArray(softwareDetailsArray, 4);

  const handleLeadTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/computers/${idToEdit}`).then((response) => {
          if (response.data.status) {
            const { name, asset_tag, invoice, po, warrenty, order_number, purchase_cost, serial, purchase_date, host_name, os_name, os_version, os_manufacturer, os_build_type, os_configuration, registered_owner, product_id, original_install_date, system_manufacturer, system_model, processor, domain, sophos, sapphire, system_type, bios_version, windows_directory, system_directory, system_locale, time_zone, total_physical_ram, virtual_ram_max, virtual_ram_available, installed_software, billed_entity, assigned_entity, supplier_id, location_id, status_id, } = response.data.results[0];
            setLeadData({
              leadName: name,
              assettag: asset_tag,
              serial: serial,
              // assigned_to: assignedto,
              hostname: host_name,
              osname: os_name,
              purchasedate: dayjs(purchase_date),
              osversion: os_version,
              osmanufacturer: os_manufacturer,
              osbuildtype: os_build_type,
              osconfiguration: os_configuration,
              registeredowner: registered_owner,
              productid: product_id,
              // originalinstalldate: dayjs(original_install_date),
              systemmanufacturer: system_manufacturer,
              systemmodel: system_model,
              processor: processor,
              domain: domain,
              sophos: sophos,
              sapphire: sapphire,
              systemtype: system_type,
              biosversion: bios_version,
              windowsdirectory: windows_directory,
              systemdirectory: system_directory,
              systemlocale: system_locale,
              timezone: time_zone,
              totalphysicalram: total_physical_ram,
              virtualrammax: virtual_ram_max,
              virtualramavailable: virtual_ram_available,
              installedsoftware: installed_software,
              billedentity: billed_entity,
              assignedentity: assigned_entity,
              supplier: supplier_id,
              location: location_id,
              assetStatus: status_id,
              ordernumber: order_number,
              purchasecost: purchase_cost,
              warrenty: dayjs(warrenty),
              invoice: invoice,
              po:po,
              // zoneId: zone.id,
              // countryId: country.country_id,
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
    setLeadData((pre) => {
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

    if (!Boolean(leadData.leadName))
      errors.leadName = "Lead Name is required";


    return errors;
  }

    const handleViewInvoice = () => {
      const invoiceUrl = `${API_URL}/uploads/${leadData.invoice}`;
      window.open(invoiceUrl, '_blank');
    };

  const handleSubmit = async (event) => {
    //  console.log('leadData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/leads/${idToEdit}`, { ...leadData, purchasedate: dayjs(leadData.purchasedate).format("YYYY-MM-DD"),warrenty: dayjs(leadData.warrenty).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ color: '#525252',}}>Series</FormLabel>
                      <TextField
                        id="lead_name"
                        size="small"
                        fullWidth
                        required
                        // label="Series"
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Job Title</FormLabel>

                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={leadData.serial}
                        onChange={(event) => {
                          handleInputChange("serial", event.target.value);
                        }}
                        error={Boolean(validationErrors.serial)}
                        helperText={validationErrors.serial}
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
        }}>Lead Owner</FormLabel>
                      <TextField
                        id="host_name"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Owner"
                        value={leadData.hostname}
                        onChange={(event) => {
                          handleInputChange("hostname", event.target.value);
                        }}
                        error={Boolean(validationErrors.hostname)}
                        helperText={validationErrors.hostname}
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
        }}>Salutation</FormLabel>

                      <TextField
                        id="os_name"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={leadData.osname}
                        onChange={(event) => {
                          handleInputChange("osname", event.target.value);
                        }}
                        error={Boolean(validationErrors.osname)}
                        helperText={validationErrors.osname}
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
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={leadData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Status</FormLabel>

                      <TextField
                        id="os_manufacturer"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.osconfiguration)}
                        helperText={validationErrors.osconfiguration}
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
        }}>First Name</FormLabel>

                      <TextField
                        id="os_build_type"
                        size="small"
                        fullWidth
                        required
                        // label="First Name"
                        value={leadData.osbuildtype}
                        onChange={(event) => {
                          handleInputChange("osbuildtype", event.target.value);
                        }}
                        error={Boolean(validationErrors.osbuildtype)}
                        helperText={validationErrors.osbuildtype}
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
                        id="registered_owner"
                        size="small"
                        fullWidth
                        required
                        // label="Source"
                        value={leadData.registeredowner}
                        onChange={(event) => {
                          handleInputChange("registeredowner", event.target.value);
                        }}
                        error={Boolean(validationErrors.registeredowner)}
                        helperText={validationErrors.registeredowner}
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Lead Type</FormLabel>

                      <TextField
                        id="productid"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Type"
                        value={leadData.productid}
                        onChange={(event) => {
                          handleInputChange("productid", event.target.value);
                        }}
                        error={Boolean(validationErrors.productid)}
                        helperText={validationErrors.productid}
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
        }}>Middle Name</FormLabel>

                      <TextField
                        id="systemmanufacturer"
                        size="small"
                        fullWidth
                        required
                        // label="Middle Name"
                        value={leadData.systemmanufacturer}
                        onChange={(event) => {
                          handleInputChange("systemmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmanufacturer)}
                        helperText={validationErrors.systemmanufacturer}
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
                        id="systemmodel"
                        size="small"
                        fullWidth
                        required
                        // label="Request Type"
                        value={leadData.systemmodel}
                        onChange={(event) => {
                          handleInputChange("systemmodel", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmodel)}
                        helperText={validationErrors.systemmodel}
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
                    {/* <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="processor"
                        size="small"
                        fullWidth
                        required
                        label="Last Name"
                        value={leadData.processor}
                        onChange={(event) => {
                          handleInputChange("processor", event.target.value);
                        }}
                        error={Boolean(validationErrors.processor)}
                        helperText={validationErrors.processor}
                      />
                    </Grid> */}
<Grid item xs={12} sm={4} md={4}>
      <FormLabel component="legend">Last Name</FormLabel>
      <TextField
        id="processor"
        size="small"
        fullWidth
        required
        variant="outlined"
        value={leadData.processor}
        onChange={(event) => {
          handleInputChange("processor", event.target.value);
        }}
        error={Boolean(validationErrors.processor)}
        helperText={validationErrors.processor}
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

                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      
                    </Grid>

              </Grid>
            </Box>
            </Container>
          </TabPanel>
        </TabContext>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
          </TabList>
          <Divider sx={{ borderStyle: "fill" }} />

          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
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
                        id="lead_name"
                        size="small"
                        fullWidth
                        required
                        // label="Series"
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Mobile No</FormLabel>

                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={leadData.serial}
                        onChange={(event) => {
                          handleInputChange("serial", event.target.value);
                        }}
                        error={Boolean(validationErrors.serial)}
                        helperText={validationErrors.serial}
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
        }}>Phone</FormLabel>
                      <TextField
                        id="host_name"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Owner"
                        value={leadData.hostname}
                        onChange={(event) => {
                          handleInputChange("hostname", event.target.value);
                        }}
                        error={Boolean(validationErrors.hostname)}
                        helperText={validationErrors.hostname}
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
        }}>website</FormLabel>

                      <TextField
                        id="os_name"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={leadData.osname}
                        onChange={(event) => {
                          handleInputChange("osname", event.target.value);
                        }}
                        error={Boolean(validationErrors.osname)}
                        helperText={validationErrors.osname}
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
        }}>Whatsapp</FormLabel>

                      <TextField
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={leadData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
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
        }}>Phone Ext.</FormLabel>

                      <TextField
                        id="os_manufacturer"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.osconfiguration)}
                        helperText={validationErrors.osconfiguration}
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
        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
          </TabList>
          <Divider sx={{ borderStyle: "fill" }} />

          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={4}>
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Organization</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Organization Name</FormLabel>

                      <TextField
                        id="lead_name"
                        size="small"
                        fullWidth
                        required
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

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Annual Revenue</FormLabel>

                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        // label="Job Title"
                        value={leadData.serial}
                        onChange={(event) => {
                          handleInputChange("serial", event.target.value);
                        }}
                        error={Boolean(validationErrors.serial)}
                        helperText={validationErrors.serial}
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
        }}>Territory</FormLabel>
                      <TextField
                        id="host_name"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Owner"
                        value={leadData.hostname}
                        onChange={(event) => {
                          handleInputChange("hostname", event.target.value);
                        }}
                        error={Boolean(validationErrors.hostname)}
                        helperText={validationErrors.hostname}
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
        }}>No of Employees</FormLabel>

                      <TextField
                        id="os_name"
                        size="small"
                        fullWidth
                        required
                        // label="Salutation"
                        value={leadData.osname}
                        onChange={(event) => {
                          handleInputChange("osname", event.target.value);
                        }}
                        error={Boolean(validationErrors.osname)}
                        helperText={validationErrors.osname}
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
        }}>Industry</FormLabel>

                      <TextField
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={leadData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
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
        }}>Fax</FormLabel>

                      <TextField
                        id="os_manufacturer"
                        size="small"
                        fullWidth
                        required
                        // label="Status"
                        value={leadData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.osconfiguration)}
                        helperText={validationErrors.osconfiguration}
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
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Market Segment</FormLabel>

                      <TextField
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        // label="Gender"
                        value={leadData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
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
                </Grid>
                    
              </Grid>
            </Box>
            </Container>
          </TabPanel>
        </TabContext>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
          </TabList>
          <Divider sx={{ borderStyle: "fill" }} />

          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Address & Contacts</Typography>
         </AccordionSummary>
        <AccordionDetails>
       
        </AccordionDetails>
      </Accordion>
            
              </Grid>
            </Box>
            </Container>
          </TabPanel>
        </TabContext>

        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
          </TabList>
          <Divider sx={{ borderStyle: "fill" }} />

          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Qualification</Typography>
         </AccordionSummary>
        <AccordionDetails>
       
        </AccordionDetails>
      </Accordion>
            
              </Grid>
            </Box>
            </Container>
          </TabPanel>
        </TabContext>
        

        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
          </TabList>
          <Divider sx={{ borderStyle: "fill" }} />

          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Additional Information</Typography>
         </AccordionSummary>
        <AccordionDetails>
       
        </AccordionDetails>
      </Accordion>
            
              </Grid>
            </Box>
            </Container>
          </TabPanel>
        </TabContext>

      </Dialog>
    </>
  );
}