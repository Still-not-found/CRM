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

export default function EditComputer(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [computerData, setComputerData] = useState({
    computerName: "",
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

  const softwareDetailsArray = computerData.installedsoftware.split('", "');

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

  const handleComputerTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const [uploadedFiles, setUploadedFiles] = useState([]);

  //   const handleFileUpload = (event) => {
  //       const files = event.target.files;
  //       if (files.length) {
  //           const formData = new FormData();
  //           for (let i = 0; i < files.length; i++) {
  //               formData.append('files', files[i]);
  //           }

  //           fetch('/upload', {
  //               method: 'POST',
  //               body: formData,
  //           })
  //           .then(response => response.text())
  //           .then(result => {
  //               console.log('Success:', result);
  //               setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
  //           })
  //           .catch(error => {
  //               console.error('Error:', error);
  //           });
  //       }
  //   };

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
        setComputerData(prevData => ({
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
            setComputerData({
              computerName: name,
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
    setComputerData((pre) => {
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

    if (!Boolean(computerData.computerName))
      errors.computerName = "Computer Name is required";


    return errors;
  }

    const handleViewInvoice = () => {
      const invoiceUrl = `${API_URL}/uploads/${computerData.invoice}`;
      window.open(invoiceUrl, '_blank');
    };

  const handleSubmit = async (event) => {
    //  console.log('computerData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/computers/${idToEdit}`, { ...computerData, purchasedate: dayjs(computerData.purchasedate).format("YYYY-MM-DD"),warrenty: dayjs(computerData.warrenty).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
        <title>Computer Edit | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="md"
        open={optionState.canEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Computer"}</DialogTitle>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleComputerTabChange}
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
                        id="computer_name"
                        size="small"
                        fullWidth
                        disabled
                        required
                        label="Computer Name"
                        value={computerData.computerName}
                        onChange={(event) => {
                          handleInputChange("computerName", event.target.value);
                        }}
                        error={Boolean(validationErrors.computerName)}
                        helperText={validationErrors.computerName}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        disabled
                        label="Serial"
                        value={computerData.serial}
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
                        disabled
                        label="Host Name"
                        value={computerData.hostname}
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
                        disabled
                        label="OS Name"
                        value={computerData.osname}
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
                        disabled
                        label="OS Version"
                        value={computerData.osversion}
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
                        disabled
                        label="OS Manufacturer"
                        value={computerData.osmanufacturer}
                        onChange={(event) => {
                          handleInputChange("osmanufacturer", event.target.value);
                        }}

                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os_build_type"
                        size="small"
                        fullWidth
                        required
                        disabled
                        label="OS Build Type"
                        value={computerData.osbuildtype}
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
                        disabled
                        label="Registered Owner"
                        value={computerData.registeredowner}
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
                        disabled
                        label="Product ID"
                        value={computerData.productid}
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
                        disabled
                        label="System Manufacturer"
                        value={computerData.systemmanufacturer}
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
                        disabled
                        label="System Model"
                        value={computerData.systemmodel}
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
                        disabled
                        label="Processor"
                        value={computerData.processor}
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
                        disabled
                        label="Domain"
                        value={computerData.domain}
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
                        disabled
                        label="BIOS"
                        value={computerData.biosversion}
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
                        disabled
                        label="WindowsDirectory"
                        value={computerData.windowsdirectory}
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
                        disabled
                        label="SystemDirectory"
                        value={computerData.systemdirectory}
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
                        disabled
                        label="SystemLocale"
                        value={computerData.systemlocale}
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
                      <Typography variant="body1" disabled="true">
                        {computerData.installedsoftware.split(',').map((item, index) => (
                          <div key={index}>
                            {`${index + 1} - ${item.trim()}`} {/* Trimming to remove any leading or trailing spaces */}
                          </div>
                        ))}
                      </Typography>
                    </Grid>
                    
                  </Grid>
                </Grid>

              </Grid>
            </Box>
          </TabPanel>

          {/* <TabPanel value="2"> */}
          {/* <Box flexGrow={1}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 12, md: 7 }}>
            <Grid item xs={12}>
              {softwareChunks.map((chunk, index) => (
                <React.Fragment key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                    {chunk.map((item, idx) => (
                      <span key={idx}>{item.replace(/^"|"$/g, '')}</span>
                    ))}
                  </div>
                  {index < softwareChunks.length - 1 && <hr style={{ width: '100%', borderColor: '#e0e0e0', borderWidth: '0.5px' }} />}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box> */}
          {/* <Box flexGrow={1}>
      <Grid container columnSpacing={3}>
        <Grid item xs={4} sm={12} md={12}>
          <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 12, md: 7 }}
          >
            <Grid item xs={4} sm={12} md={12}>
              {computerData.installedsoftware.split(',').map((item, index, array) => (
                <React.Fragment key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{`${index + 1} - ${item.trim()}`}</span>
                  </div>
                  {index < array.length - 1 && ( // Don't add a line after the last item
                    <hr style={{ width: '100%', borderColor: '#e0e0e0', borderWidth: '0.5px' }} />
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box> */}
           {/* <Box flexGrow={1}>
              <Grid container columnSpacing={3}>
                <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 12, md: 7 }}
                  >
                    <Grid item xs={4} sm={12} md={12}>
                      <Typography variant="body1" disabled="true">
                        {computerData.installedsoftware.split(',').map((item, index) => (
                          <div key={index}>
                            {`${index + 1} - ${item.trim()}`} 
                          </div>
                        ))}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Box>  */}
          {/* </TabPanel> */}
          <TabPanel value="3">
            <Box flexGrow={1}>
              <Grid container spacing={3}>

                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="purchasedate"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Purchase Date"
                      format="DD/MM/YYYY"
                      value={computerData.purchasedate}
                      onChange={(newValue)=>
                      handleInputChange("purchasedate", dayjs(newValue).format( "YYYY-MM-DD"))
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
                    id="EOL"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Warrenty EOL"
                      format="DD/MM/YYYY"
                      value={computerData.warrenty}
                      onChange={(newValue)=>
                      handleInputChange("warrenty", dayjs(newValue).format( "YYYY-MM-DD"))
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
                    id="purchasecost"
                    size="small"
                    fullWidth
                    required
                    label="Purchase Cost"
                    value={computerData.purchasecost}
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
                    value={computerData.ordernumber}
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
                            // fullWidth
                            size="small"
                              value={
                                companies.find(
                                  (_company) =>
                                    _company.company_id === computerData.billedentity
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
                              // id="billedentity"
                              options={companies}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  required
                                  label="Billed Entity"
                                  // error={Boolean(
                                  //   validationErrors["departure" + index]
                                  // )}
                                  // helperText={validationErrors["departure" + index]}
                                />
                              )}
                            />
                          </Grid>
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Company">
                              <Button
                                to={"/app/masters/Companies_master/CreateCompany"}
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
                                    _company.company_id === computerData.assignedentity
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
                                  // error={Boolean(
                                  //   validationErrors["departure" + index]
                                  // )}
                                  // helperText={validationErrors["departure" + index]}
                                />
                              )}
                            />
                          </Grid>
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Company">
                              <Button
                                to={"/app/masters/Companies_master/CreateCompany"}
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
                                    _supplier.supplier_id === computerData.supplier
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
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Supplier">
                              <Button
                                to={"/app/asset_management/supplier"}
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
                                locations.find(
                                  (_location) =>
                                    _location.location_id === computerData.location
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
                          {/* <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Location">
                              <Button
                                to={"/app/asset_management/location"}
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
                                assetstatus.find(
                                  (_assetStatus) =>
                                    _assetStatus.status_id === computerData.assetStatus
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

                          {/* <Grid item xs={12} sm={10} md={12}>
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
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
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
            <Grid item xs={12}>
                {uploadedFiles.map((file, index) => (
                    <div key={index}>{file.name}</div>
                ))}
            </Grid>
        </Grid> */}
                          
                        </Grid>
                      </Grid>

                      {/* <Grid item xs={4} sm={12} md={12}>

                      <TextField
                        id="computer_name"
                        size="small"
                        fullWidth
                        disabled
                        required
                        label="Uploaded Invoice/PO"
                        value= 
                        {computerData.invoice}
                        InputProps={{

                          endAdornment: (
                          
                          <Link to='(`${API_URL}/uploads/${invoice}`)'>view</Link>
                          
                          ),
                          
                          }}
                        // onClick={()=>{navigate(`${API_URL}/uploads/${invoice}`)}}
                      />
                    </Grid> */}
                    <Grid item xs={4} sm={12} md={12}>
      <TextField
        id="computer_name"
        size="small"
        fullWidth
        disabled
        label="Uploaded Invoice/PO"
        value={computerData.invoice}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={()=>{window.open(`${API_URL}/uploads/${computerData.invoice}`, '_blank')}}
                edge="end"
              >
                <VisibilityIcon /> {/* Icon to view/download the invoice */}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
                    // value={computerData.invoice}
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