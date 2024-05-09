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
  Container,
  FormLabel,
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

export default function LeadViewPage(props) {
  // const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;
const navigate =useNavigate();
const {leadId}= useParams();
// console.log(leadId);
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [leadData, setLeadData] = useState({
    leadName: "",
    leadStatus: "",
    officePhone: "",
    description: "",
    source: "",
    interestLevel: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    mobile: "",
    fax: "",
    department: "",
    accountName: "",
    email: "",
    leadSource: "",
    statusDescription: "",
    leadSourceDescription: "",
    opportunityAmount: "",
    referredBy: "",
    assignedTo: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    shippingState: "",
    shippingPincode: "",
    gender: "",
    series: "",
    leadType: "",
    requestType: "",
    createdBy: "",
    salutation: "",
});
  // const [blobUrl, setBlobUrl]=useState('');

  const handleLeadTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/leads/${leadId}`).then((response) => {
          if (response.data.status) {
            const { gender, salutation, shipping_city, shipping_country, shipping_state, shipping_pincode, series, source, lead_type, request_type, lead_id, title, description, lead_status, interest_level, first_name, last_name, office_phone, job_title, mobile, fax, department, account_name, email, lead_source, status_description, opportunity_amount, lead_source_description, referred_by, assigned_to, address, city, state, postal_code, country, shipping_address, modified_by, created_by } = response.data.results[0];
            setLeadData({
              leadName: title,
        leadStatus: lead_status,
        officePhone: office_phone,
        description: description,
        source: source,
        interestLevel: interest_level,
        firstName: first_name,
        lastName: last_name,
        jobTitle: job_title,
        mobile: mobile,
        fax: fax,
        department: department,
        accountName: account_name,
        email: email,
        leadSource: lead_source,
        statusDescription: status_description,
        leadSourceDescription: lead_source_description,
        opportunityAmount: opportunity_amount,
        referredBy: referred_by,
        assignedTo: assigned_to,
        address: address,
        city: city,
        state: state,
        postalCode: postal_code,
        country: country,
        shippingAddress: shipping_address,
        shippingCity: shipping_city,
        shippingCountry: shipping_country,
        shippingState: shipping_state,
        shippingPincode: shipping_pincode,
        gender: gender,
        series: series,
        leadType: lead_type,
        requestType: request_type,
        createdBy: created_by,
        salutation: salutation,
            });
          }
        }).catch((error) => {
          // setLeadData({});
        });
      } catch (error) {
        // setLeadData({});
      }
    };
    fetchAssetStatus();
    fetchSuppliers();
    fetchCompanies();
    fetchLocations();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setLeadData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      navigate('/app/asset_management/lead');
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

    if (!Boolean(leadData.leadName))
      errors.leadName = "Lead Name is required";


    return errors;
  }

  return (
    <>
      <Helmet>
        <title>Lead View | IT Asset Management</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="xl"
        open={true}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{leadData.leadName}</DialogTitle>
       
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
       
        <TabContext value={tabValue}>
          <TabList
            onChange={handleLeadTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="" value="1" sx={{ fontSize: '18.92px', }}  />

            {/* <Box flexGrow={1} >
            <DialogActions>
              <SubmitButton  variant="contained" color="primary" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box>
            */}
          </TabList>
          
          <Divider sx={{ borderStyle: "fill" }} />
          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
              {/* <Grid item xs={12} sm={4} md={4}>
  <FormLabel component="legend" sx={{ color: '#525252' }}>Series</FormLabel>
  <TextField
    id="series"
    size="small"
    fullWidth
    disabled// Set the field as read-only
    defaultValue="CRM-LEAD-YYYY-"  // Set the default value
    error={Boolean(validationErrors.series)}
    helperText={validationErrors.series}
    InputProps={{
      style: {
        backgroundColor: '#f3f3f3', // Set the background color here
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#f3f3f3', // Optional: change the border color
        },
        '&:hover fieldset': {
          borderColor: 'primary.main', // Optional: change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main', // Optional: change the border color when focused
        },
      },
    }}
  />
</Grid> */}
<Grid item xs={12} sm={4} md={1}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Salutation</FormLabel>

                      <TextField
                        id="salutation"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Salutation"
                        value={leadData.salutation}
                        onChange={(event) => {
                          handleInputChange("salutation", event.target.value);
                        }}
                        error={Boolean(validationErrors.salutation)}
                        helperText={validationErrors.salutation}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={1.5}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>First Name</FormLabel>

                      <TextField
                        id="leadname"
                        size="small"
                        fullWidth
                        required
                        disabled

                        // label="First Name"
                        value={leadData.leadName}
                        onChange={(event) => {
                          handleInputChange("leadName", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadName)}
                        helperText={validationErrors.leadName}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={1.5}>
      <FormLabel component="legend">Last Name</FormLabel>
      <TextField
        id="lastname"
        size="small"
        fullWidth
        required
        disabled
        variant="outlined"
        value={leadData.lastName}
        onChange={(event) => {
          handleInputChange("lastName", event.target.value);
        }}
        error={Boolean(validationErrors.lastName)}
        helperText={validationErrors.lastName}
        InputProps={{
          style: {
            backgroundColor: '#f3f3f3', // Set the background color here
          },
        }}
        // Apply styles to the input field itself
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f3f3f3', // Optional: change the border color
            },
            '&:hover fieldset': {
              borderColor: 'primary.main', // Optional: change the border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // Optional: change the border color when focused
            },
          },
        }}
        // Remove the label prop from here to avoid redundancy
      />
    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Job Title</FormLabel>

                      <TextField
                        id="jt"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Job Title"
                        value={leadData.jobTitle}
                        onChange={(event) => {
                          handleInputChange("jobTitle", event.target.value);
                        }}
                        error={Boolean(validationErrors.jobTitle)}
                        helperText={validationErrors.jobTitle}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>      
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Assigned To</FormLabel>
                      <TextField
                        id="leadowner"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Lead Owner"
                        value={leadData.assignedTo}
                        onChange={(event) => {
                          handleInputChange("assignedTo", event.target.value);
                        }}
                        error={Boolean(validationErrors.assignedTo)}
                        helperText={validationErrors.assignedTo}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Gender</FormLabel>

                      <TextField
                        id="gender"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Gender"
                        value={leadData.gender}
                        onChange={(event) => {
                          handleInputChange("gender", event.target.value);
                        }}
                        error={Boolean(validationErrors.gender)}
                        helperText={validationErrors.gender}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Status</FormLabel>

                      <TextField
                        id="status"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.leadStatus}
                        onChange={(event) => {
                          handleInputChange("leadStatus", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadStatus)}
                        helperText={validationErrors.leadStatus}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                  
                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Source</FormLabel>

                      <TextField
                        id="leadsource"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Source"
                        value={leadData.leadSource}
                        onChange={(event) => {
                          handleInputChange("leadSource", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadSource)}
                        helperText={validationErrors.leadSource}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    {/* <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Lead Type</FormLabel>

                      <TextField
                        id="leadtype"
                        size="small"
                        fullWidth
                        required
                        // label="Lead Type"
                        value={leadData.leadType}
                        onChange={(event) => {
                          handleInputChange("leadType", event.target.value);
                        }}
                        error={Boolean(validationErrors.leadType)}
                        helperText={validationErrors.leadType}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Request Type
      </FormLabel>
                      <TextField
                        id="requestType"
                        size="small"
                        fullWidth
                        required
                        // label="Request Type"
                        value={leadData.requestType}
                        onChange={(event) => {
                          handleInputChange("requestType", event.target.value);
                        }}
                        error={Boolean(validationErrors.requestType)}
                        helperText={validationErrors.requestType}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={4} md={4}>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    <Grid item xs={12} sm={4} md={4}>
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Contact Info</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Email</FormLabel>

                      <TextField
                        id="email"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Series"
                        value={leadData.email}
                        onChange={(event) => {
                          handleInputChange("email", event.target.value);
                        }}
                        error={Boolean(validationErrors.email)}
                        helperText={validationErrors.email}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Mobile No</FormLabel>

                      <TextField
                        id="mobile"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Job Title"
                        value={leadData.mobile}
                        onChange={(event) => {
                          handleInputChange("mobile", event.target.value);
                        }}
                        error={Boolean(validationErrors.mobile)}
                        helperText={validationErrors.mobile}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>

                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant='h5'>Address & Details</Typography>
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant='h6'>Shipping Address</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}><Typography variant='h6'>Primary Address</Typography></Grid>
                   
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>City</FormLabel>

                      <TextField
                        id="shipping city"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.shippingCity}
                        onChange={(event) => {
                          handleInputChange("shippingCity", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingCity)}
                        helperText={validationErrors.shippingCity}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>City</FormLabel>

                      <TextField
                        id="city"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.city}
                        onChange={(event) => {
                          handleInputChange("city", event.target.value);
                        }}
                        error={Boolean(validationErrors.city)}
                        helperText={validationErrors.city}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>State/Region</FormLabel>

                      <TextField
                        id="shipping state"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.shippingState}
                        onChange={(event) => {
                          handleInputChange("shippingState", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingState)}
                        helperText={validationErrors.shippingState}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>State/Region</FormLabel>

                      <TextField
                        id="state"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.state}
                        onChange={(event) => {
                          handleInputChange("state", event.target.value);
                        }}
                        error={Boolean(validationErrors.state)}
                        helperText={validationErrors.state}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Pincode</FormLabel>

                      <TextField
                        id="shipping_pincode"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.shippingPincode}
                        onChange={(event) => {
                          handleInputChange("shippingPincode", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingPincode)}
                        helperText={validationErrors.shippingPincode}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Pincode</FormLabel>

                      <TextField
                        id="pincode"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.postalCode}
                        onChange={(event) => {
                          handleInputChange("postalCode", event.target.value);
                        }}
                        error={Boolean(validationErrors.postalCode)}
                        helperText={validationErrors.postalCode}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Country</FormLabel>

                      <TextField
                        id="shippingcountry"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.shippingCountry}
                        onChange={(event) => {
                          handleInputChange("shippingCountry", event.target.value);
                        }}
                        error={Boolean(validationErrors.shippingCountry)}
                        helperText={validationErrors.shippingCountry}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Country</FormLabel>

                      <TextField
                        id="country"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={leadData.country}
                        onChange={(event) => {
                          handleInputChange("country", event.target.value);
                        }}
                        error={Boolean(validationErrors.country)}
                        helperText={validationErrors.country}
                        InputProps={{
                          style: {
                            backgroundColor: '#f3f3f3', // Set the background color here
                          },
                        }}
                        // Apply styles to the input field itself
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#f3f3f3', // Optional: change the border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main', // Optional: change the border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
  <FormLabel 
    component="legend" 
    sx={{ 
      color: '#525252', // Set the color of the label here
      // Add more styling as needed
    }}
  >
    Description
  </FormLabel>
  <TextField
    id="description"
    multiline  // Add this to enable multiline input
    rows={4}   // Adjust the number of rows as needed
    fullWidth
    required
    disabled
    value={leadData.description}
    onChange={(event) => {
      handleInputChange("description", event.target.value);
    }}
    error={Boolean(validationErrors.description)}
    helperText={validationErrors.description}
    InputProps={{
      style: {
        backgroundColor: '#f3f3f3', // Set the background color here
      },
    }}
    // Apply styles to the input field itself
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#f3f3f3', // Optional: change the border color
        },
        '&:hover fieldset': {
          borderColor: 'primary.main', // Optional: change the border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main', // Optional: change the border color when focused
        },
      },
    }}
  />
                    </Grid>

              </Grid>
            </Box>
            </Container>
          </TabPanel>
          <Divider sx={{ borderStyle: "dashed" }} />
          {/* <Box flexGrow={1} p={2}>
            <DialogActions>
              <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
                Save
              </SubmitButton>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Box> */}
        </TabContext>

      </Dialog>
    </>
  );
}
