import { useEffect, forwardRef, useState } from "react";
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

const handleFileUpload = (event) => {
  const file = event.target.files[0]; // Assuming single file selection
  // You can now do whatever you want with the selected file
  handleFileUpload(file);
};

export default function CreatePrinter(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");

  const [printerData, setPrinterData] = useState({
    printer: "",
    assignedQty: null,
    location: null,
    company: null,
    orderNumber: null,
    purchaseDate: null,
    purchaseCost: null,
    serialNo: null,
    modelNo: null,
    manufacturer: null,
    department: null,
    supplier: null,
    ipAddress: null,
    macAddress: null,
    networkName: null,
    printerstatus: null,
    inktonerType: null,
    createdBy: null,
    warrenty: null,
    ownedType: null,


  });


  const [suppliers, setSuppliers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [assetstatus, setAssetStatus] = useState([]);
  const [locations, setLocations] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);


  useEffect(() => {
    const fetchAssetStatus = async () => {
      try {
        await axios.get(`${API_URL}/api/status`).then((response) => {
          // console.log(response.data);
          setAssetStatus(response.data.results);
        });
      } catch (error) {
        setAssetStatus([]);
      }
    }
    const fetchLocations = async () => {
      try {
        await axios.get(`${API_URL}/api/locations`).then((response) => {
          // console.log(response.data);
          setLocations(response.data.results);
        });
      } catch (error) {
        setLocations([]);
      }
    }
    const fetchSuppliers = async () => {
      try {
        await axios.get(`${API_URL}/api/suppliers`).then((response) => {
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
    }
    fetchAssetStatus();
    fetchLocations();
    fetchCompanies();
    fetchSuppliers();
  }, []);
  const handlePrinterTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setPrinterData((pre) => {
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

    if (!Boolean(printerData.printer))
      errors.printer = "Printer Name is required";

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
      await axios.post(`${API_URL}/api/printers`, { ...printerData, createdBy: loggedUser.user_id }).then((response) => {
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
        <title>Printer Create | IT Assset Management</title>
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
                        id="assignedQty"
                        size="small"
                        fullWidth
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
                        required

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

                        label="Type"
                        value={printerData.inktonerType}
                        onChange={(event) => {
                          handleInputChange("inktonerType", event.target.value);
                        }}
                        error={Boolean(validationErrors.inktonerType)}
                        helperText={validationErrors.inktonerType}
                      />
                    </Grid>

                    <Grid item xs={4} sm={12} md={12}>
                      <Autocomplete
                        id="ownedType"
                        disablePortal
                        size="small"
                        fullWidth
                        value={printerData.ownedType}
                        options={[
                          { label: 'Owned' },
                          { label: 'Rental' },
                        ]}
                        onChange={(event,newValue) => {
                          handleInputChange("ownedType", newValue.label);
                        }}
                        // sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}
                          label="Owned/Rental" />}
                        error={Boolean(validationErrors.ownedType)}
                        helperText={validationErrors.ownedType}
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

                {/* <Grid item xs={4} sm={12} md={12}>
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
                </Grid> */}
                <Grid item xs={4} sm={12} md={12}>
                  <LocalizationProvider
                    id="purchaseDate"
                    dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker format="DD/MM/YYYY" label="Purchase Date"
                        onChange={(newValue) =>
                          handleInputChange(
                            "purchaseDate",
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
                      <DatePicker format="DD/MM/YYYY" label="Warrenty EOL"
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
                    id="purchasecost"
                    size="small"
                    fullWidth

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
                    id="ordernumber"
                    size="small"
                    fullWidth

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
                    columns={{ xs: 4, sm: 12, md: 3.5 }}
                  >
                    <Grid item xs={10} sm={12} md={12}>
                      <Autocomplete

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
