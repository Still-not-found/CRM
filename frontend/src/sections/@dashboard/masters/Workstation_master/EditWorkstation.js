import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// @mui ------------------------------------------------------
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useCallback } from 'react';
import { DropzoneArea } from 'react-dropzone';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
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

const handleFileUpload = (event) => {
  const file = event.target.files[0]; // Assuming single file selection
  // You can now do whatever you want with the selected file
  handleFileUpload(file);
};

export default function EditWorkstation(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [workstationData, setWorkstationData] = useState({
    workstationName: "",
     supplier: null,
      assignedQty: null,
       location: null,
        company: null, 
        orderNumber: null,
         purchaseDate: null,
          purchaseCost: null,
           brand: null,
            model: null, 
            ipAddress: null, 
            subnetmask: null, 
            gateway: null, 
            serialno: null, 
            installationDate: "", 
            lastMaintenanceDate: "", 
            os: null, 
            ram: null, 
            storage: null, 
            cpu: null, 
            statusId: null, 
            comments: null,
    
  });

  const handleWorkstationTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/workstations/${idToEdit}`).then((response) => {
          if (response.data.status) {
            const {  workstation_name,
              supplier_id,
              assigned_qty,
              location,
              company,
              order_number,
              purchase_date,
              purchase_cost,
      brand,
      model,
      serial_number,
      ip_address,
      subnetmask,
      gateway,
      operating_system,
      ram_capacity,
      storage_capacity,
      cpu_model,
      installation_date,
      last_maintenance_date,
            status_id,
             comments, billed_entity, assigned_entity,location_id, } = response.data.results[0];
            setWorkstationData({
              workstationName: workstation_name,
              supplier: supplier_id,
              assignedQty: assigned_qty,
              location: location,
              company: company,
              orderNumber: order_number,
              purchaseDate: purchase_date,
              purchaseCost: purchase_cost,
              brand: brand,
              model: model,
              serialno: serial_number,
              ipAddress: ip_address,
              subnetmask: subnetmask,
              gateway: gateway,
              os: operating_system,
              ram: ram_capacity,
              storage: storage_capacity,
              cpu: cpu_model,
              installationDate: installation_date,
              lastMaintenanceDate: last_maintenance_date,
              statusId: status_id,
              comments: comments,
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
    fetchLocations();
    fetchCompanies();
    fetchSuppliers();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setWorkstationData((pre) => {
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

    if (!Boolean(workstationData.workstationName))
      errors.workstationName = "Workstation Name is required";


    return errors;
  }

  const handleSubmit = async (event) => {
    //  console.log('workstationData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/workstations/${idToEdit}`, { ...workstationData, originalinstalldate: dayjs(workstationData.originalinstalldate).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
        <title>Workstation Edit | IT Asset Management</title>
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
        <DialogTitle>{"Edit Workstation"}</DialogTitle>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleWorkstationTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="Asset Hardware Details" value="1" />
           
            <Tab label="Order Related Info" value="2" />
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
                        id="workstation_name"
                        size="small"
                        fullWidth
                        required
                        label="Workstation Name"
                        value={workstationData.workstationName}
                        onChange={(event) => {
                          handleInputChange("workstationName", event.target.value);
                        }}
                        error={Boolean(validationErrors.workstationName)}
                        helperText={validationErrors.workstationName}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="assignedQty"
                        size="small"
                        fullWidth
                        required
                        label="Assigned Qty"
                        value={workstationData.assignedQty}
                        onChange={(event) => {
                          handleInputChange("assignedQty", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedQty)}
                        helperText={validationErrors.assignedQty}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="brand"
                        size="small"
                        fullWidth
                        required
                        label="Brand"
                        value={workstationData.brand}
                        onChange={(event) => {
                          handleInputChange("brand", event.target.value);
                        }}
                        error={Boolean(validationErrors.brand)}
                        helperText={validationErrors.brand}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="model"
                        size="small"
                        fullWidth
                        required
                        label="Model"
                        value={workstationData.model}
                        onChange={(event) => {
                          handleInputChange("model", event.target.value);
                        }}
                        error={Boolean(validationErrors.model)}
                        helperText={validationErrors.model}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serial"
                        size="small"
                        fullWidth
                        required
                        label="Serial No"
                        value={workstationData.serialno}
                        onChange={(event) => {
                          handleInputChange("serial No", event.target.value);
                        }}
                        error={Boolean(validationErrors.serialno)}
                        helperText={validationErrors.serialno}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="ip_address"
                        size="small"
                        fullWidth
                        required
                        label="IP Address"
                        value={workstationData.ipAddress}
                        onChange={(event) => {
                          handleInputChange("ipAddress", event.target.value);
                        }}
                        error={Boolean(validationErrors.ipAddress)}
                        helperText={validationErrors.ipAddress}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="subnetmask"
                        size="small"
                        fullWidth
                        required
                        label="Sub Net Mask"
                        value={workstationData.subnetmask}
                        onChange={(event) => {
                          handleInputChange("subnetmask", event.target.value);
                        }}
                        error={Boolean(validationErrors.subnetmask)}
                        helperText={validationErrors.subnetmask}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="gateway"
                        size="small"
                        fullWidth
                        required
                        label="Gateway"
                        value={workstationData.gateway}
                        onChange={(event) => {
                          handleInputChange("gateway", event.target.value);
                        }}
                        error={Boolean(validationErrors.gateway)}
                        helperText={validationErrors.gateway}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os"
                        size="small"
                        fullWidth
                        required
                        label="OS"
                        value={workstationData.os}
                        onChange={(event) => {
                          handleInputChange("os", event.target.value);
                        }}
                        error={Boolean(validationErrors.os)}
                        helperText={validationErrors.os}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="ram"
                        size="small"
                        fullWidth
                        required
                        label="RAM"
                        value={workstationData.ram}
                        onChange={(event) => {
                          handleInputChange("ram", event.target.value);
                        }}
                        error={Boolean(validationErrors.ram)}
                        helperText={validationErrors.ram}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="storage"
                        size="small"
                        fullWidth
                        required
                        label="Storage"
                        value={workstationData.storage}
                        onChange={(event) => {
                          handleInputChange("storage", event.target.value);
                        }}
                        error={Boolean(validationErrors.storage)}
                        helperText={validationErrors.storage}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="cpu"
                        size="small"
                        fullWidth
                        required
                        label="CPU"
                        value={workstationData.cpu}
                        onChange={(event) => {
                          handleInputChange("cpu", event.target.value);
                        }}
                        error={Boolean(validationErrors.cpu)}
                        helperText={validationErrors.cpu}
                      />
                    </Grid>
                   
                    <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      id="installationdate"

                      components={['DatePicker']}>
                      <DatePicker label="Installation Date" slotProps={{
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
                      id="lastmaintenancedate"

                      components={['DatePicker']}>
                      <DatePicker label="Last Maintenance Date" slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small"
                        }
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                    
                    
                  </Grid>
                </Grid>
               
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Box flexGrow={1}>
              <Grid container spacing={3}>
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
                                    _company.company_id === workstationData.company
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("company", newValue.company_id);
                                } else {
                                  handleInputChange("company", null);
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
                                suppliers.find(
                                  (_supplier) =>
                                    _supplier.supplier_id === workstationData.supplier
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
                          <Grid item xs={2} md={0.5}>
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
                                locations.find(
                                  (_location) =>
                                    _location.location_id === workstationData.location
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
                          <Grid item xs={2} md={0.5}>
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
                                assetstatus.find(
                                  (_assetStatus) =>
                                    _assetStatus.status_id === workstationData.statusId
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("statusId", newValue.status_id);
                                } else {
                                  handleInputChange("statusId", null);
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
                          <Grid item xs={2} md={0.5}>
                            <Tooltip title="New Status">
                              <Button
                                to={"/app/asset_management/status"}
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

                      <Grid item xs={4} sm={12} md={12}>
      <input
        accept=".pdf,.docx"
        id="file-upload"
        type="file"
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
    <Grid item xs={4} sm={12} md={12}>
      <input
        accept=".pdf,.docx"
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          fullWidth
        >
          Upload PO
        </Button>
      </label>
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
