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

export default function CreateInventory(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  
  const [computerData, setInventoryData] = useState({
    computerName: "",
    assettag: "",
    serial: "",
    // assignedto: "",
    hostname: "",
    osname: "",
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
    purchasecost: "",
    ordernumber: "",
    billedentity: "",
    assignedentity: null,
    // invoice: null,
    // sophos: "",
    // sapphire: "",
  });


  const [suppliers, setSuppliers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);


  useEffect( ()=>{
    const fetchSupplierList = async()=>{
      try {
        await axios.get(`${API_URL}/api/supplier_list`).then((response)=>{
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
    // const fetchOperators = async()=>{
    //   setOperators([]);
    // }
    // fetchOperators();
    fetchCompanies();
    fetchSupplierList();
  },[]);
  const handleInventoryTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setInventoryData((pre) => {
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

    if (!Boolean(computerData.computerName))
      errors.computerName = "Inventory Name is required";
    // if(!Boolean(computerData.zoneId))
    //   errors.zoneId="Zone is required";
    // if(!Boolean(computerData.countryId))
    //   errors.countryId="Country is required";

    return errors;
  }

  const handleSubmit = async (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.post(`${API_URL}/api/computers`, { ...computerData, createdBy: loggedUser.user_id }).then((response) => {
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
        <title>Inventory Create | IT Assset Management</title>
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
            onChange={handleInventoryTabChange}
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
                        required
                        label="Inventory Name"
                        value={computerData.computerName}
                        onChange={(event) => {
                          handleInputChange("computerName", event.target.value);
                        }}
                        error={Boolean(validationErrors.computerName)}
                        helperText={validationErrors.computerName}
                      />
                    </Grid>
                    {/* <Grid item xs={4} sm={12} md={12}>
<TextField
    id="asset_tag"
    size="small"
    fullWidth
    required
    label="Asset Tag"
    value={computerData.assettag}
    onChange={(event) => {
      handleInputChange("assettag", event.target.value);
    }}
    error={Boolean(validationErrors.assettag)}
    helperText={validationErrors.assettag}
  />
</Grid> */}
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
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
                        label="OS Manufacturer"
                        value={computerData.osmanufacturer}
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
                        value={computerData.osbuildtype}
                        onChange={(event) => {
                          handleInputChange("osbuildtype", event.target.value);
                        }}
                        error={Boolean(validationErrors.osbuildtype)}
                        helperText={validationErrors.osbuildtype}
                      />
                    </Grid>
                    {/* <Grid item xs={4} sm={12} md={12}>
<TextField
    id="os_configuration"
    size="small"
    fullWidth
    required
    label="OS Configuration"
    value={computerData.osconfiguration}
    onChange={(event) => {
      handleInputChange("osconfiguration", event.target.value);
    }}
    error={Boolean(validationErrors.osconfiguration)}
    helperText={validationErrors.osconfiguration}
  />
</Grid> */}
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="registered_owner"
                        size="small"
                        fullWidth
                        required
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
                        label="Product ID"
                        value={computerData.productid}
                        onChange={(event) => {
                          handleInputChange("productid", event.target.value);
                        }}
                        error={Boolean(validationErrors.productid)}
                        helperText={validationErrors.productid}
                      />
                    </Grid>
                    {/* <Grid item xs={12} md={7}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['DatePicker']}>
<DatePicker label="Original Install Date" /> */}
                    {/* value={computerData.originalinstalldate} */}
                    {/* onChange={(event) => {
      handleInputChange("originalinstalldate", event.target.value);
    }} */}
                    {/* error={Boolean(validationErrors.originalinstalldate)}
    helperText={validationErrors.originalinstalldate} */}
                    {/* </DemoContainer>
</LocalizationProvider>
</Grid> */}
                    {/* <Grid item xs={4} sm={12} md={12}>
<TextField
    id="originalinstalldate"
    size="small"
    fullWidth
    required
    label="Original Install Date"
    value={computerData.originalinstalldate}
    onChange={(event) => {
      handleInputChange("originalinstalldate", event.target.value);
    }}
    error={Boolean(validationErrors.originalinstalldate)}
    helperText={validationErrors.originalinstalldate}
  />
</Grid> */}
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemmanufacturer"
                        size="small"
                        fullWidth
                        required
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
                        label="Domain"
                        value={computerData.domain}
                        onChange={(event) => {
                          handleInputChange("domain", event.target.value);
                        }}
                        error={Boolean(validationErrors.domain)}
                        helperText={validationErrors.domain}
                      />
                    </Grid>


                    {/* <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="systemtype"
                        size="small"
                        fullWidth
                        required
                        label="SystemType"
                        value={computerData.systemtype}
                        onChange={(event) => {
                          handleInputChange("systemtype", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemtype)}
                        helperText={validationErrors.systemtype}
                      />
                    </Grid> */}

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="biosversion"
                        size="small"
                        fullWidth
                        required
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
                        label="SystemLocale"
                        value={computerData.systemlocale}
                        onChange={(event) => {
                          handleInputChange("systemlocale", event.target.value);
                        }}
                        error={Boolean(validationErrors.systemlocale)}
                        helperText={validationErrors.systemlocale}
                      />
                    </Grid>

                    {/* <Grid item xs={4} sm={12} md={12}>
<TextField
    id="timezone"
    size="small"
    fullWidth
    required
    label="Domain"
    value={computerData.domain}
    onChange={(event) => {
      handleInputChange("domain", event.target.value);
    }}
    error={Boolean(validationErrors.domain)}
    helperText={validationErrors.domain}
  />
</Grid> */}

                    {/* <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="totalphysicalram"
                        size="small"
                        fullWidth
                        required
                        label="TotalPhysicalRAM"
                        value={computerData.totalphysicalram}
                        onChange={(event) => {
                          handleInputChange("totalphysicalram", event.target.value);
                        }}
                        error={Boolean(validationErrors.totalphysicalram)}
                        helperText={validationErrors.totalphysicalram}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="virtualrammax"
                        size="small"
                        fullWidth
                        required
                        label="Virtual RAM Max"
                        value={computerData.virtualrammax}
                        onChange={(event) => {
                          handleInputChange("virtualrammax", event.target.value);
                        }}
                        error={Boolean(validationErrors.virtualrammax)}
                        helperText={validationErrors.virtualrammax}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="virtualramavailable"
                        size="small"
                        fullWidth
                        required
                        label="Virtual RAM Available"
                        value={computerData.virtualramavailable}
                        onChange={(event) => {
                          handleInputChange("virtualramavailable", event.target.value);
                        }}
                        error={Boolean(validationErrors.virtualramavailable)}
                        helperText={validationErrors.virtualramavailable}
                      />
                    </Grid> */}

                  </Grid>
                </Grid>
                {/* <Grid item xs={4} sm={12} md={12}>
                  <Box height={200}></Box>
                </Grid> */}
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
                        value={computerData.installedsoftware}
                        onChange={(event) => {
                          handleInputChange("installedsoftware", event.target.value);
                        }}
                      // error={Boolean(validationErrors.installedsoftware)}
                      // helperText={validationErrors.installedsoftware}
                      />
                    </Grid>

                  </Grid>
                </Grid>
                {/* <Grid item xs={4} sm={12} md={12}>
                  <Box height={200}></Box>
                </Grid> */}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box flexGrow={1}>
              <Grid container spacing={3}>
                {/* <Grid item xs={4} sm={12} md={12}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 12, md: 7 }}
                  > */}

                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="purchasedate"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Purchase Date" slotProps={{
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
                      <DatePicker label="Warrenty EOL" slotProps={{
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
                    onChange={(event) => {
                      handleInputChange("ordernumber", event.target.value);
                    }}
                    error={Boolean(validationErrors.ordernumber)}
                    helperText={validationErrors.ordernumber}
                  />

                </Grid>

                <Grid item xs={12} sm={10} md={12}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 3.5 }}
                        >
                          <Grid item xs={10} md={2.7}>
                            <Autocomplete
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
                              size="small"
                              options={companies}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Billed Entity"
                                  // error={Boolean(
                                  //   validationErrors["departure" + index]
                                  // )}
                                  // helperText={validationErrors["departure" + index]}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={2} md={0.5}>
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
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={10} md={12}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 3.5 }}
                        >
                          <Grid item xs={10} md={2.7}>
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
                          <Grid item xs={2} md={0.5}>
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
                          </Grid>
                        </Grid>
                      </Grid>

              </Grid>
              {/* </Grid> */}
              {/* <Grid item xs={4} sm={12} md={12}>
                  <Box height={200}></Box>
                </Grid> */}
              {/* </Grid> */}
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
