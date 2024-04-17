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
  TextField,
  styled,
  Autocomplete,
  Tooltip
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

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0]; // Assuming single file selection
  //   // You can now do whatever you want with the selected file
  //   handleFileUpload(file);
  // };
  
export default function CreateInvoice(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceName: "",
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

    // sophos: "",
    // sapphire: "",
  });

    // const [uploadedFiles, setUploadedFiles] = useState([]);

    // const handleFileUpload = (event) => {
    //     const files = event.target.files;
    //     if (files.length) {
    //         const formData = new FormData();
    //         for (let i = 0; i < files.length; i++) {
    //             formData.append('files', files[i]);
    //         }

    //         fetch('/upload', {
    //             method: 'POST',
    //             body: formData,
    //         })
    //         .then(response => response.text())
    //         .then(result => {
    //             console.log('Success:', result);
    //             setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    //     }
    // };



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
        setInvoiceData(prevData => ({
          ...prevData,
          invoice: fileName
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle upload error
      }
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  // const fileUrl = `${/api/upload/single}/${fileName}`; // Replace 'UPLOADS_BASE_URL' with the base URL of your uploads folder


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
  const handleInvoiceTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    console.log(value);
    setInvoiceData((pre) => {
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

    if (!Boolean(invoiceData.invoiceName))
      errors.invoiceName = "Invoice Name is required";

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
      await axios.post(`${API_URL}/api/invoices`, { ...invoiceData, createdBy: loggedUser.user_id }).then((response) => {
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
        <title>Invoice Create | IT Assset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <TabContext value={tabValue}>
          <TabList
            onChange={handleInvoiceTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="Asset Hardware Details" value="1" />
            <Tab label="Asset Software Details" value="2" />
            <Tab label="Order Related Info" value="3" />
          </TabList>
          <Divider sx={{ borderStyle: "dashed" }} />
          <TabPanel value="1">

            <Box flexGrow={1}>
              <Grid container columnSpacing={3}>
                <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 12, md: 7 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>

                      <TextField
                        id="invoice_name"
                        size="small"
                        fullWidth
                        required
                        label="Invoice Name"
                        value={invoiceData.invoiceName}
                        onChange={(event) => {
                          handleInputChange("invoiceName", event.target.value);
                        }}
                        error={Boolean(validationErrors.invoiceName)}
                        helperText={validationErrors.invoiceName}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        label="Serial"
                        value={invoiceData.serial}
                        onChange={(event) => {
                          handleInputChange("serial", event.target.value);
                        }}
                        error={Boolean(validationErrors.serial)}
                        helperText={validationErrors.serial}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="host_name"
                        size="small"
                        fullWidth
                        required
                        label="Host Name"
                        value={invoiceData.hostname}
                        onChange={(event) => {
                          handleInputChange("hostname", event.target.value);
                        }}
                        error={Boolean(validationErrors.hostname)}
                        helperText={validationErrors.hostname}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os_name"
                        size="small"
                        fullWidth
                        required
                        label="OS Name"
                        value={invoiceData.osname}
                        onChange={(event) => {
                          handleInputChange("osname", event.target.value);
                        }}
                        error={Boolean(validationErrors.osname)}
                        helperText={validationErrors.osname}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os_version"
                        size="small"
                        fullWidth
                        required
                        label="OS Version"
                        value={invoiceData.osversion}
                        onChange={(event) => {
                          handleInputChange("osversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.osversion)}
                        helperText={validationErrors.osversion}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os_manufacturer"
                        size="small"
                        fullWidth
                        required
                        label="OS Manufacturer"
                        value={invoiceData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.osconfiguration)}
                        helperText={validationErrors.osconfiguration}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os_build_type"
                        size="small"
                        fullWidth
                        required
                        label="OS Build Type"
                        value={invoiceData.osbuildtype}
                        onChange={(event) => {
                          handleInputChange("osbuildtype", event.target.value);
                        }}
                        error={Boolean(validationErrors.osbuildtype)}
                        helperText={validationErrors.osbuildtype}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="registered_owner"
                        size="small"
                        fullWidth
                        required
                        label="Registered Owner"
                        value={invoiceData.registeredowner}
                        onChange={(event) => {
                          handleInputChange("registeredowner", event.target.value);
                        }}
                        error={Boolean(validationErrors.registeredowner)}
                        helperText={validationErrors.registeredowner}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="productid"
                        size="small"
                        fullWidth
                        required
                        label="Product ID"
                        value={invoiceData.productid}
                        onChange={(event) => {
                          handleInputChange("productid", event.target.value);
                        }}
                        error={Boolean(validationErrors.productid)}
                        helperText={validationErrors.productid}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemmanufacturer"
                        size="small"
                        fullWidth
                        required
                        label="System Manufacturer"
                        value={invoiceData.systemmanufacturer}
                        onChange={(event) => {
                          handleInputChange("systemmanufacturer", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmanufacturer)}
                        helperText={validationErrors.systemmanufacturer}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemmodel"
                        size="small"
                        fullWidth
                        required
                        label="System Model"
                        value={invoiceData.systemmodel}
                        onChange={(event) => {
                          handleInputChange("systemmodel", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemmodel)}
                        helperText={validationErrors.systemmodel}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="processor"
                        size="small"
                        fullWidth
                        required
                        label="Processor"
                        value={invoiceData.processor}
                        onChange={(event) => {
                          handleInputChange("processor", event.target.value);
                        }}
                        error={Boolean(validationErrors.processor)}
                        helperText={validationErrors.processor}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="domain"
                        size="small"
                        fullWidth
                        required
                        label="Domain"
                        value={invoiceData.domain}
                        onChange={(event) => {
                          handleInputChange("domain", event.target.value);
                        }}
                        error={Boolean(validationErrors.domain)}
                        helperText={validationErrors.domain}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="biosversion"
                        size="small"
                        fullWidth
                        required
                        label="BIOS"
                        value={invoiceData.biosversion}
                        onChange={(event) => {
                          handleInputChange("biosversion", event.target.value);
                        }}
                        error={Boolean(validationErrors.biosversion)}
                        helperText={validationErrors.biosversion}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="windowsdirectory"
                        size="small"
                        fullWidth
                        required
                        label="WindowsDirectory"
                        value={invoiceData.windowsdirectory}
                        onChange={(event) => {
                          handleInputChange("windowsdirectory", event.target.value);
                        }}
                        error={Boolean(validationErrors.windowsdirectory)}
                        helperText={validationErrors.windowsdirectory}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemdirectory"
                        size="small"
                        fullWidth
                        required
                        label="SystemDirectory"
                        value={invoiceData.systemdirectory}
                        onChange={(event) => {
                          handleInputChange("systemdirectory", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemdirectory)}
                        helperText={validationErrors.systemdirectory}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemlocale"
                        size="small"
                        fullWidth
                        required
                        label="SystemLocale"
                        value={invoiceData.systemlocale}
                        onChange={(event) => {
                          handleInputChange("systemlocale", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemlocale)}
                        helperText={validationErrors.systemlocale}
                      />
                    </Grid>
                  </Grid>
                </Grid>
               
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2">
   

            <Box flexGrow={1}>
              <Grid container columnSpacing={3}>
                <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 12, md: 7 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="installedsoftware"
                        size="small"
                        fullWidth
                        required
                        multiline
                        rows={20}
                        label="InstalledSoftware"
                        value={invoiceData.installedsoftware}
                        onChange={(event) => {
                          handleInputChange("installedsoftware", event.target.value);
                        }}
                      
                      />
                    </Grid>

                  </Grid>
                </Grid>
                
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box flexGrow={1}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="purchasedate"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker format="DD/MM/YYYY" label="Purchase Date" 
                      onChange={(newValue) =>
                      handleInputChange(
                        "purchasedate",
                        dayjs(newValue.$d).format("YYYY-MM-DD")
                        )
                      }
                        slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small"
                        }
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="warrenty"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      
                      <DatePicker format="DD/MM/YYYY" label="End Of Life" 
                      onChange={(newValue) =>
                      handleInputChange(
                        "warrenty",
                        dayjs(newValue.$d).format("YYYY-MM-DD")
                        )
                      }
                        slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small"
                        }
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={4} sm={12} md={12}>
                  <TextField
                    id="purchaseCost"
                    size="small"
                    fullWidth
                    required
                    label="Purchase Cost"
                    value={invoiceData.purchasecost}
                    onChange={(event) => {
                      handleInputChange("purchasecost", event.target.value);
                    }}
                    error={Boolean(validationErrors.purchasecost)}
                    helperText={validationErrors.purchasecost}
                  />

                </Grid>

                <Grid item xs={4} sm={12} md={12}>
                  <TextField
                    id="ordernumber"
                    size="small"
                    fullWidth
                    required
                    label="Order Number"
                    value={invoiceData.ordernumber}
                    onChange={(event) => {
                      handleInputChange("ordernumber", event.target.value);
                    }}
                    error={Boolean(validationErrors.ordernumber)}
                    helperText={validationErrors.ordernumber}
                  />

                </Grid>

                <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    columnspacing={2}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                            <Autocomplete
                              value={
                                companies.find(
                                  (_company) =>
                                    _company.company_id === invoiceData.billedentity
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("billedentity", newValue.company_id);
                                } else {
                                  handleInputChange("billedentity", null);
                                }
                              }}
                              getOptionLabel={(option) => option.company_code}
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={companies}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Billed Entity"
                                />
                              )}
                            />
                          </Grid>
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Company">
                              <Button
                                to={"/app/asset_management/company"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid> */}
                        </Grid>
                      </Grid>
                      <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    columnspacing={2}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                            <Autocomplete
                              value={
                                companies.find(
                                  (_company) =>
                                    _company.company_id === invoiceData.assignedentity
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("assignedentity", newValue.company_id);
                                } else {
                                  handleInputChange("assignedentity", null);
                                }
                              }}
                              getOptionLabel={(option) => option.company_code}
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={companies}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Assigned Entity"
                                />
                              )}
                            />
                          </Grid>
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Company">
                              <Button
                                to={"/app/asset_management/company"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid> */}
                        </Grid>
                      </Grid>

                      <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    columnspacing={2}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                            <Autocomplete
                              value={
                                suppliers.find(
                                  (_supplier) =>
                                    _supplier.supplier_id === invoiceData.supplier
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("supplier", newValue.supplier_id);
                                } else {
                                  handleInputChange("supplier", null);
                                }
                              }}
                              getOptionLabel={(option) => option.name}
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={suppliers}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Supplier"
                                />
                              )}
                            />
                          </Grid>
                         
                        </Grid>
                      </Grid>

                      <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    columnspacing={2}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                            <Autocomplete
                              value={
                                locations.find(
                                  (_location) =>
                                    _location.location_id === invoiceData.location
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("location", newValue.location_id);
                                } else {
                                  handleInputChange("location", null);
                                }
                              }}
                              getOptionLabel={(option) => option.name}
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Location"
                                />
                              )}
                            />
                          </Grid>
                          
                        </Grid>
                      </Grid>

                      <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    columnspacing={2}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                            <Autocomplete
                              value={
                                assetstatus.find(
                                  (_assetStatus) =>
                                    _assetStatus.status_id === invoiceData.assetStatus
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("assetStatus", newValue.status_id);
                                } else {
                                  handleInputChange("assetStatus", null);
                                }
                              }}
                              getOptionLabel={(option) => option.status_name}
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={assetstatus}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Status"
                                />
                              )}
                            />
                          </Grid>
                          
                        </Grid>
                      </Grid>

               
            <Grid item xs={12} sm={10} md={12}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 3.5 }}
                        ></Grid>
            <Grid item xs={4} sm={12} md={12}>
                <input
                    accept=".pdf,.docx"
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    // value={invoiceData.invoice}
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        component="span"
                        fullWidth
                    >
                        Upload Invoice
                    </Button>
                </label>
            </Grid>
            {selectedFile && <Grid item xs={12}>
                    <div>{selectedFile.name}</div>
                    <div>
          <p>Uploaded File:{selectedFile.name}</p>
        </div>
            </Grid>}
           
        </Grid>
    
              </Grid>
            </Box>
          </TabPanel>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box flexGrow={1} p={2}>
            <DialogActions>
              <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
        </TabContext>

      </Dialog>
    </>
  );
}
