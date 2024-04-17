import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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

export default function ViewComputer(props) {
  const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [computerData, setComputerData] = useState({
    computerName: "",
    assettag: "",
    serial: "",
    // assignedto: "",
    hostname: "",
    osname: "",
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
    ordernumber: "",
    billedentity: null,
    assignedentity: null,
    supplier: null,
    location: null,


  });

  const handleComputerTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [companies, setCompanies] = useState([]);
  const [assetstatus, setAssetStatus] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

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
    const fetchCompanies = async () => {
      try {
        await axios.get(`${API_URL}/api/companies`).then((response) => {
          // console.log(response.data);
          setCompanies(response.data.results);
        });
      } catch (error) {
        setCompanies([]);
      }
    };

    const fetchData = async () => {
      try {
        await axios.get(`${API_URL}/api/computers/${idToView}`).then((response) => {
          if (response.data.status) {
            const { name, asset_tag, serial, host_name, os_name, os_version, os_manufacturer, os_build_type, os_configuration, registered_owner, product_id, original_install_date, system_manufacturer, system_model, processor, domain, sophos, sapphire, system_type, bios_version, windows_directory, system_directory, system_locale, time_zone, total_physical_ram, virtual_ram_max, virtual_ram_available, installed_software, billed_entity, assigned_entity, supplier_id, location_id, status_id,} = response.data.results[0];
            setComputerData({
              computerName: name,
              assettag: asset_tag,
              serial: serial,
              // assigned_to: assignedto,
              hostname: host_name,
              osname: os_name,
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
    fetchSuppliers();
    fetchCompanies();
    fetchLocations();
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
    handleClickView();
  };

  const validate = () => {
    let errors = {};

    if (!Boolean(computerData.computerName))
      errors.computerName = "Computer Name is required";


    return errors;
  }

  const handleSubmit = async (event) => {
    //  console.log('computerData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/computers/${idToView}`, { ...computerData, originalinstalldate: dayjs(computerData.originalinstalldate).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
    handleClickView();
  }

  return (
    <>
      <Helmet>
        <title>Computer View | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="md"
        open={optionState.canView}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{computerData.computerName}</DialogTitle>
       
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
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
          <TabPanel value="3">
            <Box flexGrow={1}>
              <Grid container spacing={3}>

                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="purchasedate"
                    disabled
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Purchase Date" disabled="true" slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small"
                        }
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      id="warrenty"
                      

                      components={['DatePicker']}>
                      <DatePicker label="Warrenty EOL" disabled="true" slotProps={{
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
                    disabled
                    label="Purchase Cost"
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
                    disabled
                    label="Order Number"
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
                        fullWidth
                        disabled
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
                        options={companies}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label="Billed Entity"
                          
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
                    spacing={1}
                    columns={{ xs: 4, sm: 12, md: 3.5 }}
                  >
                    <Grid item xs={10} sm={12} md={12}>
                      <Autocomplete
                      disabled
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
                    spacing={1}
                    columns={{ xs: 4, sm: 12, md: 3.5 }}
                  >
                    <Grid item xs={10} sm={12} md={12}>
                      <Autocomplete
                      disabled
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
                  
                  </Grid>
                </Grid>

                <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 12, md: 3.5 }}
                  >
                    <Grid item xs={10} sm={12} md={12}>
                      <Autocomplete
                      disabled
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
                  
                  </Grid>
                </Grid>
                
                <Grid item xs={4} sm={12} md={12}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 4, sm: 12, md: 3.5}}
                        >
                          <Grid item xs={10} sm={12} md={12}>
                            <Autocomplete
                            disabled
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
                          
                        </Grid>
                      </Grid>

              </Grid>

            </Box>

          </TabPanel>
          
        </TabContext>

      </Dialog>
    </>
  );
}
