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

export default function ViewSmartPhone(props) {
  const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [smartphoneData, setSmartPhoneData] = useState({
    smartphoneName: "",
    assignedQty: "",
     location: "", 
     company: "", 
     orderNumber: "", 
     purchaseDate:"",
      purchaseCost:"", 
      brand:"", 
      model: "", 
      imei: "",
      os: "",
      storageCapacity: "",
      screenSize: "",
      color: "",
      serialNumber: "",
      warrentyexpirydate: "",
      currentOwner: "", 
      statusId: "", 
      comments: "", 
      supplier: "",
  });

  const handleSmartPhoneTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/smartphones/${idToView}`).then((response) => {
          if (response.data.status) {
            const { assigned_qty, smartphone_name, location, company, order_number, purchase_date, purchase_cost, brand, model, imei, os, serial_number, screen_size, current_owner, warrenty_expiry_date, color, storage_capacity, status_id, comments , supplier_id,} = response.data.results[0];
            setSmartPhoneData({
              smartphoneName: smartphone_name,
              assignedQty: assigned_qty,
              location: location,
              company: company,
              supplier: supplier_id,
              orderNumber: order_number,
              purchaseDate: purchase_date,
              purchaseCost: purchase_cost,
              brand: brand,
              model: model,
              imei: imei,
      os: os,
      storageCapacity: storage_capacity,
      screenSize: screen_size,
      color: color,
      serialNumber: serial_number,
      warrentyexpirydate: warrenty_expiry_date,
      currentOwner: current_owner, 
             
              statusId: status_id,
              comments: comments,
              supplier_id: suppliers,
              location_id: location,
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
    setSmartPhoneData((pre) => {
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

    if (!Boolean(smartphoneData.smartphoneName))
      errors.smartphoneName = "SmartPhone Name is required";


    return errors;
  }

  const handleSubmit = async (event) => {
    //  console.log('smartphoneData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/smartphones/${idToView}`, { ...smartphoneData, originalinstalldate: dayjs(smartphoneData.originalinstalldate).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
        <title>SmartPhone View | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canView}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"View SmartPhone"}</DialogTitle>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleSmartPhoneTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="SmartPhone" value="1" />
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
                        id="smartphone_name"
                        size="small"
                        fullWidth
                        required
                        label="SmartPhone Name"
                        value={smartphoneData.smartphoneName}
                        onChange={(event) => {
                          handleInputChange("smartphoneName", event.target.value);
                        }}
                        error={Boolean(validationErrors.smartphoneName)}
                        helperText={validationErrors.smartphoneName}
                      />
                    </Grid>

                    {/* <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="assignedqty"
                        size="small"
                        fullWidth
                        
                        label="Qty"
                        value={smartphoneData.assignedQty}
                        onChange={(event) => {
                          handleInputChange("assignedQty", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedQty)}
                        helperText={validationErrors.assignedQty}
                      />
                    </Grid> */}

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="brand"
                        size="small"
                        fullWidth
                        
                        label="Brand"
                        value={smartphoneData.brand}
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
                        value={smartphoneData.model}
                        onChange={(event) => {
                          handleInputChange("model", event.target.value);
                        }}
                        error={Boolean(validationErrors.model)}
                        helperText={validationErrors.model}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="imei"
                        size="small"
                        fullWidth
                        
                        label="IMEI"
                        value={smartphoneData.imei}
                        onChange={(event) => {
                          handleInputChange("imei", event.target.value);
                        }}
                        error={Boolean(validationErrors.imei)}
                        helperText={validationErrors.imei}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="os"
                        size="small"
                        fullWidth
                        
                        label="OS"
                        value={smartphoneData.os}
                        onChange={(event) => {
                          handleInputChange("os", event.target.value);
                        }}

                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="storageCapacity"
                        size="small"
                        fullWidth
                        
                        label="storage"
                        value={smartphoneData.storageCapacity}
                        onChange={(event) => {
                          handleInputChange("storageCapacity", event.target.value);
                        }}
                        error={Boolean(validationErrors.storageCapacity)}
                        helperText={validationErrors.storageCapacity}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="screenSize"
                        size="small"
                        fullWidth
                       
                        label="Screen Size"
                        value={smartphoneData.screenSize}
                        onChange={(event) => {
                          handleInputChange("screenSize", event.target.value);
                        }}
                        error={Boolean(validationErrors.screenSize)}
                        helperText={validationErrors.screenSize}
                      />
                    </Grid>
                    
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="color"
                        size="small"
                        fullWidth
                       
                        label="Color"
                        value={smartphoneData.color}
                        onChange={(event) => {
                          handleInputChange("color", event.target.value);
                        }}
                        error={Boolean(validationErrors.color)}
                        helperText={validationErrors.color}
                      />
                    </Grid>

                    {/* <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="screenSize"
                        size="small"
                        fullWidth
                       
                        label="Screen Size"
                        value={smartphoneData.screenSize}
                        onChange={(event) => {
                          handleInputChange("screenSize", event.target.value);
                        }}
                        error={Boolean(validationErrors.screenSize)}
                        helperText={validationErrors.screenSize}
                      />
                    </Grid> */}

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serialNumber"
                        size="small"
                        fullWidth
                       
                        label="serialNumber"
                        value={smartphoneData.serialNumber}
                        onChange={(event) => {
                          handleInputChange("serialNumber", event.target.value);
                        }}
                        error={Boolean(validationErrors.serialNumber)}
                        helperText={validationErrors.serialNumber}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="currentOwner"
                        size="small"
                        fullWidth
                       
                        label="Current Owner"
                        value={smartphoneData.currentOwner}
                        onChange={(event) => {
                          handleInputChange("currentOwner", event.target.value);
                        }}
                        error={Boolean(validationErrors.currentOwner)}
                        helperText={validationErrors.currentOwner}
                      />
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
                      <DatePicker label="Purchase Date"  slotProps={{
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
                      <DatePicker label="Warrenty EOL"  slotProps={{
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
                    
                    label="Purchase Cost"
                    value={smartphoneData.purchaseCost}
                    onChange={(event) => {
                      handleInputChange("purchaseCost", event.target.value);
                    }}
                    error={Boolean(validationErrors.purchaseCost)}
                    helperText={validationErrors.purchaseCost}
                  />

                </Grid>
                <Grid item xs={4} sm={12} md={12}>
                  <TextField
                    id="ordernumber"
                    size="small"
                    fullWidth
                    
                    label="Order Number"
                    value={smartphoneData.orderNumber}
                    onChange={(event) => {
                      handleInputChange("orderNumber", event.target.value);
                    }}
                    error={Boolean(validationErrors.orderNumber)}
                    helperText={validationErrors.orderNumber}
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
                        
                        size="small"
                        value={
                          companies.find(
                            (_company) =>
                              _company.company_id === smartphoneData.company
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
                        options={companies}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            
                            label="Billed Entity"
                          
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
                      
                        value={
                          suppliers.find(
                            (_supplier) =>
                              _supplier.supplier_id === smartphoneData.supplier
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
                     
                        value={
                          locations.find(
                            (_location) =>
                              _location.location_id === smartphoneData.location
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
                            
                              value={
                                assetstatus.find(
                                  (_assetStatus) =>
                                    _assetStatus.status_id === smartphoneData.statusId
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
