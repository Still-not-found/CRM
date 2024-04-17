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

export default function ViewPrinter(props) {
  const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;

  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [printerData, setPrinterData] = useState({
    printer: "",
    assignedQty: "",
     location: "", 
     company:"", 
     orderNumber:"", 
     purchaseDate:"",
      purchaseCost:"", 
      serialNo: "", 
      modelNo: "", 
      manufacturer: "", 
      department: "", 
      supplier: "", 
      ipAddress: "", 
      macAddress: "", 
      networkName: "", 
      printerstatus: "", 
      inktonerType: "",
      
  });

  const handlePrinterTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/printers/${idToView}`).then((response) => {
          if (response.data.status) {
            const { printer_name,
              assigned_qty,
              location,
              company,
              order_number,
              purchase_cost,
              serial_no,
              model_no,
              manufacturer,
              department,
              supplier,
              ip_address,
              mac_address,
              network_name,
              status_id,
              inktoner_type,} = response.data.results[0];
            setPrinterData({
              printer: printer_name,
              assignedQty: assigned_qty,
              location: location,
              company: company,
              location: location,
              company: company,
              orderNumber: order_number,
              purchaseCost: purchase_cost,
              serialNo: serial_no,
              modelNo: model_no,
              manufacturer: manufacturer,
              department: department,
              supplier: supplier,
              ipAddress: ip_address,
              macAddress: mac_address,
              networkName: network_name,
              printerstatus: status_id,
              inktonerType: inktoner_type,

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
    setPrinterData((pre) => {
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

    if (!Boolean(printerData.printer))
      errors.printer = "Printer Name is required";


    return errors;
  }

  const handleSubmit = async (event) => {
    //  console.log('printerData');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/printers/${idToView}`, { ...printerData, originalinstalldate: dayjs(printerData.originalinstalldate).format("YYYY-MM-DD"), updatedBy: loggedUser.user_id }).then((response) => {
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
        <title>Printer View | IT Asset Management</title>
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
        <DialogTitle>{printerData.printer}</DialogTitle>
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
        <TabContext value={tabValue}>
          <TabList
            onChange={handlePrinterTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="Printer" value="1" />
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
                        id="printer_name"
                        size="small"
                        fullWidth
                        required
                        disabled
                        label="Printer Name"
                        value={printerData.printer}
                        onChange={(event) => {
                          handleInputChange("printer", event.target.value);
                        }}
                        error={Boolean(validationErrors.printer)}
                        helperText={validationErrors.printer}
                      />
                    </Grid>

                    {/* <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="assignedqty"
                        size="small"
                        fullWidth
                        disabled
                        label="Qty"
                        value={printerData.assignedQty}
                        onChange={(event) => {
                          handleInputChange("assignedQty", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedQty)}
                        helperText={validationErrors.assignedQty}
                      />
                    </Grid> */}
                   
              

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="serialno"
                        size="small"
                        fullWidth
                        disabled
                        label="Serial No"
                        value={printerData.serialNo}
                        onChange={(event) => {
                          handleInputChange("serialNo", event.target.value);
                        }}
                        error={Boolean(validationErrors.serialNo)}
                        helperText={validationErrors.serialNo}
                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="model"
                        size="small"
                        fullWidth
                        
                        disabled
                        label="Model"
                        value={printerData.modelNo}
                        onChange={(event) => {
                          handleInputChange("modelNo", event.target.value);
                        }}
                        error={Boolean(validationErrors.modelNo)}
                        helperText={validationErrors.modelNo}
                      />
                    </Grid>
                  
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="ipaddress"
                        size="small"
                        fullWidth
                        disabled
                        label="IP Address"
                        value={printerData.ipAddress}
                        onChange={(event) => {
                          handleInputChange("ipAddress", event.target.value);
                        }}
                        error={Boolean(validationErrors.ipAddress)}
                        helperText={validationErrors.ipAddress}
                      />
                    </Grid>
             
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="manufacturer"
                        size="small"
                        fullWidth
                        disabled
                        label="Manufacturer"
                        value={printerData.manufacturer}
                        onChange={(event) => {
                          handleInputChange("manufacturer", event.target.value);
                        }}

                      />
                    </Grid>
                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="department"
                        size="small"
                        fullWidth
                        disabled
                        label="Department"
                        value={printerData.department}
                        onChange={(event) => {
                          handleInputChange("department", event.target.value);
                        }}
                        error={Boolean(validationErrors.department)}
                        helperText={validationErrors.department}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="macAddress"
                        size="small"
                        fullWidth
                        disabled
                        label="MAC Address"
                        value={printerData.macAddress}
                        onChange={(event) => {
                          handleInputChange("macAddress", event.target.value);
                        }}
                        error={Boolean(validationErrors.macAddress)}
                        helperText={validationErrors.macAddress}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="networkName"
                        size="small"
                        fullWidth
                        disabled
                        label="Network"
                        value={printerData.networkName}
                        onChange={(event) => {
                          handleInputChange("networkName", event.target.value);
                        }}
                        error={Boolean(validationErrors.networkName)}
                        helperText={validationErrors.networkName}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <TextField
                        id="inktonerType"
                        size="small"
                        fullWidth
                        disabled
                        label="Type"
                        value={printerData.inktonerType}
                        onChange={(event) => {
                          handleInputChange("inktonerType", event.target.value);
                        }}
                        error={Boolean(validationErrors.inktonerType)}
                        helperText={validationErrors.inktonerType}
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
                      <DatePicker label="Warrenty EOL" disabled="true"  slotProps={{
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
                    disabled
                    label="Purchase Cost"
                    value={printerData.purchaseCost}
                    onChange={(event) => {
                      handleInputChange("purchaseCost", event.target.value);
                    }}
                    error={Boolean(validationErrors.purchaseCost)}
                    helperText={validationErrors.purchaseCost}
                  />

                </Grid>
                <Grid item xs={4} sm={12} md={12}>
                  <TextField
                    id="orderNumber"
                    size="small"
                    fullWidth
                    disabled
                    label="Order Number"
                    value={printerData.orderNumber}
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
                        disabled
                        size="small"
                        value={
                          companies.find(
                            (_company) =>
                              _company.company_id === printerData.company
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
                      disabled
                        value={
                          suppliers.find(
                            (_supplier) =>
                              _supplier.supplier_id === printerData.supplier
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
                     disabled
                        value={
                          locations.find(
                            (_location) =>
                              _location.location_id === printerData.location
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
                            disabled
                              value={
                                assetstatus.find(
                                  (_assetStatus) =>
                                    _assetStatus.status_id === printerData.printerstatus
                                ) || null
                              }
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleInputChange("printerstatus", newValue.status_id);
                                } else {
                                  handleInputChange("printerstatus", null);
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
          
          
        </TabContext>


      </Dialog>
    </>
  );
}
