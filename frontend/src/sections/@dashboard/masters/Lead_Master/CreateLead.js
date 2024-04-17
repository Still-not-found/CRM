import {useEffect, forwardRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import React, { useCallback } from 'react';
import { DropzoneArea } from 'react-dropzone';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

// @mui ------------------------------------------------------
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Divider,
  Grid,
  Card,
  TextField,
  styled,
  Autocomplete,
  Tooltip,
  Container
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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

  
  
export default function CreateLead(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
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
    // osconfiguration: "",
    registeredowner: "",
    productid: "",
    // originalinstalldate: "",
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
    purchasecost: null,
    ordernumber: null,
    billedentity: null,
    assignedentity: null,
    supplier: null,
    location: null,
    assetStatus: null,
    warrenty: null,
    invoice: null,
    po: null,

    
  });

  const [suppliers, setSuppliers] = useState([]);
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
    if (!selectedFile) return;

  const formData = new FormData();
  formData.append('file', selectedFile);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      // if(selectedFile){
      //   const formData = new FormData();
      //   formData.append("file", selectedFile);
      //   await axios.post(`${API_URL}/api/upload/single`,formData).then((response)=>{console.log(response)});
      // }
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
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
             <Card sx={{ overflow: "visible" }}>

        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="New Lead " value="1" />

            <Box flexGrow={1} >
            <DialogActions>
              <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
           
          </TabList>
          
          <Divider sx={{ borderStyle: "dashed" }} />
          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              

                    <Grid item xs={12} sm={4} md={4}>

                      <TextField
                        id="lead_name"
                        size="small"
                        fullWidth
                        required
                        label="Lead Name"
                        value={leadData.leadName}
                        onChange={(event) => {
                          handleInputChange("leadName", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadName)}
                        helperText={validationErrors.leadName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        label="Serial"
                        value={leadData.serial}
                        onChange={(event) => {
                          handleInputChange("serial", event.target.value);
                        }}
                        error={Boolean(validationErrors.serial)}
                        helperText={validationErrors.serial}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="host_name"
                        size="small"
                        fullWidth
                        required
                        label="Host Name"
                        value={leadData.hostname}
                        onChange={(event) => {
                          handleInputChange("hostname", event.target.value);
                        }}
                        error={Boolean(validationErrors.hostname)}
                        helperText={validationErrors.hostname}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="os_name"
                        size="small"
                        fullWidth
                        required
                        label="OS Name"
                        value={leadData.osname}
                        onChange={(event) => {
                          handleInputChange("osname", event.target.value);
                        }}
                        error={Boolean(validationErrors.osname)}
                        helperText={validationErrors.osname}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        label="OS Version"
                        value={leadData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
                      />
                    </Grid>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="os_manufacturer"
                        size="small"
                        fullWidth
                        required
                        label="OS Manufacturer"
                        value={leadData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.osconfiguration)}
                        helperText={validationErrors.osconfiguration}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="os_build_type"
                        size="small"
                        fullWidth
                        required
                        label="OS Build Type"
                        value={leadData.osbuildtype}
                        onChange={(event) => {
                          handleInputChange("osbuildtype", event.target.value);
                        }}
                        error={Boolean(validationErrors.osbuildtype)}
                        helperText={validationErrors.osbuildtype}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="registered_owner"
                        size="small"
                        fullWidth
                        required
                        label="Registered Owner"
                        value={leadData.registeredowner}
                        onChange={(event) => {
                          handleInputChange("registeredowner", event.target.value);
                        }}
                        error={Boolean(validationErrors.registeredowner)}
                        helperText={validationErrors.registeredowner}
                      />
                    </Grid>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="productid"
                        size="small"
                        fullWidth
                        required
                        label="Product ID"
                        value={leadData.productid}
                        onChange={(event) => {
                          handleInputChange("productid", event.target.value);
                        }}
                        error={Boolean(validationErrors.productid)}
                        helperText={validationErrors.productid}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="systemmanufacturer"
                        size="small"
                        fullWidth
                        required
                        label="System Manufacturer"
                        value={leadData.systemmanufacturer}
                        onChange={(event) => {
                          handleInputChange("systemmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmanufacturer)}
                        helperText={validationErrors.systemmanufacturer}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="systemmodel"
                        size="small"
                        fullWidth
                        required
                        label="System Model"
                        value={leadData.systemmodel}
                        onChange={(event) => {
                          handleInputChange("systemmodel", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmodel)}
                        helperText={validationErrors.systemmodel}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="processor"
                        size="small"
                        fullWidth
                        required
                        label="Processor"
                        value={leadData.processor}
                        onChange={(event) => {
                          handleInputChange("processor", event.target.value);
                        }}
                        error={Boolean(validationErrors.processor)}
                        helperText={validationErrors.processor}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="domain"
                        size="small"
                        fullWidth
                        required
                        label="Domain"
                        value={leadData.domain}
                        onChange={(event) => {
                          handleInputChange("domain", event.target.value);
                        }}
                        error={Boolean(validationErrors.domain)}
                        helperText={validationErrors.domain}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="biosversion"
                        size="small"
                        fullWidth
                        required
                        label="BIOS"
                        value={leadData.biosversion}
                        onChange={(event) => {
                          handleInputChange("biosversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.biosversion)}
                        helperText={validationErrors.biosversion}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="windowsdirectory"
                        size="small"
                        fullWidth
                        required
                        label="WindowsDirectory"
                        value={leadData.windowsdirectory}
                        onChange={(event) => {
                          handleInputChange("windowsdirectory", event.target.value);
                        }}
                        error={Boolean(validationErrors.windowsdirectory)}
                        helperText={validationErrors.windowsdirectory}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="systemdirectory"
                        size="small"
                        fullWidth
                        required
                        label="SystemDirectory"
                        value={leadData.systemdirectory}
                        onChange={(event) => {
                          handleInputChange("systemdirectory", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemdirectory)}
                        helperText={validationErrors.systemdirectory}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        id="systemlocale"
                        size="small"
                        fullWidth
                        required
                        label="SystemLocale"
                        value={leadData.systemlocale}
                        onChange={(event) => {
                          handleInputChange("systemlocale", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemlocale)}
                        helperText={validationErrors.systemlocale}
                      />
                    </Grid>
                  
                
              </Grid>
            </Box>
            </Container>
          </TabPanel>

          
          <Divider sx={{ borderStyle: "dashed" }} />
          
        </TabContext>
        </Card>
      </Container>
      
    </>
  );
}
