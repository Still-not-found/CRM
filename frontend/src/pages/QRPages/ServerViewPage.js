import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink,useParams,useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
import {QRCode} from "react-qrcode-logo";

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

export default function NServerViewPage(props) {
  // const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;
const navigate =useNavigate();
const {nserverId}= useParams();
// console.log(nserverId);
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [nserverData, setNServerData] = useState({
    nserverName: "",
    assignedQty: "",
     location: "", 
     company: "", 
     orderNumber: "", 
     purchaseDate: "",
      purchaseCost: "", 
      brand: "",
      serialno: "", 
      model: "", 
      ipAddress: "", 
      subnetmask: "", 
      gateway: "", 
      os: "",
      ram: "",
      storage: "",
      cpu: "",
      installationDate: "", 
      lastMaintenanceDate: "", 
      statusId: "", 
      comments: "", 
      supplier: "", 
  });
  // const [blobUrl, setBlobUrl]=useState('');

  const handleNServerTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/nservers/${nserverId}`).then((response) => {
          if (response.data.status) {
            const { operating_system, ram_capacity, storage_capacity, cpu_model, serial_number, assigned_qty, nserver_name, location, company, order_number, purchase_date, purchase_cost, brand, model, ip_address, subnetmask, gateway, firmware, installation_date, last_maintenance_date, status_id, comments , supplier_id,} = response.data.results[0];
            setNServerData({
              nserverName: nserver_name,
              assignedQty: assigned_qty,
              location: location,
              company: company,
              supplier: supplier_id,
              orderNumber: order_number,
              purchaseDate: purchase_date,
              purchaseCost: purchase_cost,
              brand: brand,
              model: model,
              ipAddress: ip_address,
              subnetmask: subnetmask,
              gateway: gateway,
              serialno: serial_number,
              os: operating_system,
              ram: ram_capacity,
              storage: storage_capacity,
              cpu: cpu_model,
              installationDate: installation_date,
              last_maintenanceDate: last_maintenance_date,
              statusId: status_id,
              comments: comments,
              supplier_id: suppliers,
              location_id: location,
              assetStatus: status_id,

            });
          }
        }).catch((error) => {
          // setNServerData({});
        });
      } catch (error) {
        // setNServerData({});
      }
    };
    fetchAssetStatus();
    fetchSuppliers();
    fetchCompanies();
    fetchLocations();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setNServerData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      navigate('/app/asset_management/server');
  };

  const downloadQR = (name) => {
    const qrCode = document.getElementById('qr-code');
    const qrCodeDataURL = qrCode.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = qrCodeDataURL;
    anchor.download = `${name}.png`;
    anchor.click();
  };
  
  const printQR = (name) => {
    const input = document.getElementById('qr-code');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF('p', 'mm', 'a4');
const qrWidth = 50; // Width of the QR code in mm
const qrHeight = 50; // Height of the QR code in mm

// Calculate the position to center the QR code horizontally and vertically on the A4 page
const pageWidth = pdf.internal.pageSize.getWidth(); // A4 page width in mm
const pageHeight = pdf.internal.pageSize.getHeight(); // A4 page height in mm
const qrX = (pageWidth - qrWidth) / 2; // Center horizontally
const qrY = (pageHeight - qrHeight) / 2; // Center vertically

// Add the QR code image to the PDF document
pdf.addImage(imgData, 'PNG', qrX, qrY, qrWidth, qrHeight);

// Save or display the PDF document as needed

        // const imgData = canvas.toDataURL('image/png');
        // const pdf = new jsPDF('p', 'mm', 'a4');
        // const imgWidth = 210; // A4 page width in mm
        // const imgHeight = canvas.height * imgWidth / canvas.width;
        // const imgX = (imgWidth - imgWidth) / 2; // Center horizontally
        // const imgY = (imgHeight - imgHeight) / 2; // Center vertically

        // pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
        // pdf.save(`${name}.pdf`);
        const pdfBlob = pdf.output('blob');
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        // setBlobUrl(pdfBlobUrl);
        // Open print window with the PDF Blob URL
        const printWindow = window.open(pdfBlobUrl);
        if (printWindow) {
          printWindow.print();
        } else {
          console.error('Failed to open print window.');
        }
      });
  
   };

  const validate = () => {
    let errors = {};

    if (!Boolean(nserverData.nserverName))
      errors.nserverName = "NServer Name is required";


    return errors;
  }

  return (
    <>
      <Helmet>
        <title>NServer View | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="md"
        open={true}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{nserverData.nserverName}</DialogTitle>
       
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
       
        <TabContext value={tabValue}>
          <TabList
            onChange={handleNServerTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="Server" value="1" />
            <Tab label="Order Related Info" value="2" />
            <Tab label="Asset QR" value="3" />

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
            id="nserver_name"
            size="small"
            fullWidth
            required
            disabled
            label="Server Name"
            value={nserverData.nserverName}
            onChange={(event) => {
              handleInputChange("nserverName", event.target.value);
            }}
            error={Boolean(validationErrors.nserverName)}
            helperText={validationErrors.nserverName}
          />
        </Grid>

        {/* <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="assignedqty"
            size="small"
            fullWidth
            disabled
            label="Qty"
            value={nserverData.assignedQty}
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
            disabled
            label="Brand"
            value={nserverData.brand}
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
            disabled
           
            label="Model"
            value={nserverData.model}
            onChange={(event) => {
              handleInputChange("model", event.target.value);
            }}
            error={Boolean(validationErrors.model)}
            helperText={validationErrors.model}
          />
        </Grid>

        <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="serialno"
            size="small"
            fullWidth
            disabled
           
            label="Serial No"
            value={nserverData.serialno}
            onChange={(event) => {
              handleInputChange("serialno", event.target.value);
            }}
            error={Boolean(validationErrors.serialno)}
            helperText={validationErrors.serialno}
          />
        </Grid>

        <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="os"
            size="small"
            fullWidth
            disabled
           
            label="OS"
            value={nserverData.os}
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
            disabled
           
            label="RAM Storage"
            value={nserverData.ram}
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
            disabled
           
            label="Storage"
            value={nserverData.storage}
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
            disabled
           
            label="CPU Model"
            value={nserverData.cpu}
            onChange={(event) => {
              handleInputChange("cpu", event.target.value);
            }}
            error={Boolean(validationErrors.cpu)}
            helperText={validationErrors.cpu}
          />
        </Grid>

        <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="ipaddress"
            size="small"
            fullWidth
            disabled
            label="IP Address"
            value={nserverData.ipAddress}
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
            disabled
            label="SubNet"
            value={nserverData.subnetmask}
            onChange={(event) => {
              handleInputChange("subnetmask", event.target.value);
            }}

          />
        </Grid>
        <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="gateway"
            size="small"
            fullWidth
            disabled
            label="Gateway"
            value={nserverData.gateway}
            onChange={(event) => {
              handleInputChange("gateway", event.target.value);
            }}
            error={Boolean(validationErrors.gateway)}
            helperText={validationErrors.gateway}
          />
        </Grid>

        {/* <Grid item xs={4} sm={12} md={12}>
          <TextField
            id="firmware"
            size="small"
            fullWidth
           
            label="Firmware"
            value={nserverData.firmware}
            onChange={(event) => {
              handleInputChange("firmware", event.target.value);
            }}
            error={Boolean(validationErrors.firmware)}
            helperText={validationErrors.firmware}
          />
        </Grid> */}
        <Grid item xs={4} sm={12} md={12}>
      <LocalizationProvider
        id="installationDate"
        dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Installation Date" disabled="true" slotProps={{
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
        id="lastMaintenanceDate "
        dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="last Maintenance Date " disabled="true" slotProps={{
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
        id="purchasecost"
        size="small"
        fullWidth
        disabled
        label="Purchase Cost"
        value={nserverData.purchaseCost}
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
        disabled
        label="Order Number"
        value={nserverData.orderNumber}
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
                  _company.company_id === nserverData.company
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
    {/* <Grid item xs={4} sm={12} md={12}>
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 12, md: 3.5 }}
      >
        <Grid item xs={10} sm={12} md={12}>
          <Autocomplete
          
            value={
              companies.find(
                (_company) =>
                  _company.company_id === nserverData.assignedentity
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
                
                {...params}
                label="Assigned Entity"
              />
            )}
          />
        </Grid>
       
      </Grid>
    </Grid> */}

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
                  _supplier.supplier_id === nserverData.supplier
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
                  _location.location_id === nserverData.location
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
                        _assetStatus.status_id === nserverData.statusId
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
          <TabPanel value="3">
          <Box flexGrow={1}>
      <Grid container columnSpacing={3} justifyContent="center">
        <Grid item>
          <QRCode id="qr-code" value={`http://localhost:3000/nserver_detail/${nserverId}`} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => downloadQR(nserverData.nserverName)}>Download QR</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={()=>printQR(nserverData.nserverName)}>Print QR</Button>
        </Grid>
      </Grid>
    </Box>
            {/* <Box flexGrow={1}>
              <Grid container columnSpacing={3}>
                
              <QRCode value={`http://localhost:3000/nserver_detail/${nserverId}`}/>
              </Grid>
            </Box> */}
          </TabPanel>
          
        </TabContext>

      </Dialog>
    </>
  );
}
