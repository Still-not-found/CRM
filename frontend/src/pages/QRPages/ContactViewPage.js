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

export default function ContactViewPage(props) {
  // const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;
const navigate =useNavigate();
const {contactId}= useParams();
// console.log(contactId);
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [contactData, setContactData] = useState({
    contactName: "",
    CStatus: "",
    account: "", 
    middelName: "", 
    designation: "", 
    gender: "", 
    salutation: "", 
    companyName: "", 
    lead: "", 
    lastName: "",
    leadSource: "", 
    reportsTo: "", 
    description: "", 
    fax: "", 
    mobile: "", 
    department: "", 
    jobTitle: "", 
    email: "", 
    address: "", 
    city: "", 
    state: "", 
    postalCode: "", 
    country: "", 
    officePhone: "", 
    // modifiedBy, createdBy
  });
  // const [blobUrl, setBlobUrl]=useState('');

  const handleContactTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/contacts/${contactId}`).then((response) => {
          if (response.data.status) {
            const { middle_name, salutation, c_status, designation, gender, company_name, contact_id, account_id, lead_id, first_name, last_name, email, office_phone, job_title, department, mobile, fax, address, city, state, postal_code, country, description, lead_source, reports_to } = response.data.results[0];
            setContactData({
              contactName: first_name,
              account: account_id, 
              CStatus: c_status,
              middelName: middle_name, 
              designation: designation, 
              gender: gender, 
              salutation: salutation, 
              companyName: company_name, 
              lead: lead_id, 
              lastName: last_name, 
              leadSource: lead_source, 
              reportsTo: reports_to, 
              description: description, 
              fax: fax, 
              mobile: mobile, 
              department: department, 
              jobTitle: job_title, 
              email: email, 
              address: address, 
              city: city, 
              state: state, 
              postalCode: postal_code, 
              country: country, 
              officePhone: office_phone, 
            });
          }
        }).catch((error) => {
          // setContactData({});
        });
      } catch (error) {
        // setContactData({});
      }
    };
    fetchAssetStatus();
    fetchSuppliers();
    fetchCompanies();
    fetchLocations();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setContactData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      navigate('/app/asset_management/contact');
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

    if (!Boolean(contactData.contactName))
      errors.contactName = "Contact Name is required";


    return errors;
  }

  return (
    <>
      <Helmet>
        <title>Contact View | CRM</title>
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
        <DialogTitle>{contactData.contactName}</DialogTitle>
       
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
       
        <TabContext value={tabValue}>
          <TabList
            onChange={handleContactTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="" value="1" sx={{ fontSize: '18.92px', }}  />

          </TabList>
          
          <Divider sx={{ borderStyle: "fill" }} />
          <TabPanel value="1">
          <Container maxWidth="l">
            <Box flexGrow={2}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography variant="h5">Overview</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                </Grid>

                <Grid item xs={12} sm={4} md={1}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>salutation</FormLabel>

                      <TextField
                        id="salutation"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Salutation"
                        value={contactData.salutation}
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

                    <Grid item xs={12} sm={6} md={2.5}>
                    <FormLabel component="legend" sx={{ color: '#525252',}}>First Name</FormLabel>
                      <TextField
                        id="fn"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Series"
                        value={contactData.contactName}
                        onChange={(event) => {
                          handleInputChange("accName", event.target.value);
                        }}
                        error={Boolean(validationErrors.accName)}
                        helperText={validationErrors.accName}
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

                    <Grid item xs={12} sm={4} md={2.5}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Last Name</FormLabel>

                      <TextField
                        id="lastname"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Gender"
                        value={contactData.lastName}
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
                      />
                    </Grid>
                    

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Status</FormLabel>

                      <TextField
                        id="office_phone"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Job Title"
                        value={contactData.CStatus}
                        onChange={(event) => {
                          handleInputChange("CStatus", event.target.value);
                        }}
                        error={Boolean(validationErrors.CStatus)}
                        helperText={validationErrors.CStatus}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Mobile
      </FormLabel>
                      <TextField
                        id="mobile"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.mobile}
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

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Email
      </FormLabel>
                      <TextField
                        id="email"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.email}
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

                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Department
      </FormLabel>
                      <TextField
                        id="department"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.department}
                        onChange={(event) => {
                          handleInputChange("department", event.target.value);
                        }}
                        error={Boolean(validationErrors.department)}
                        helperText={validationErrors.department}
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
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Designation</FormLabel>

                      <TextField
                        id="desig"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={contactData.designation}
                        onChange={(event) => {
                          handleInputChange("designation", event.target.value);
                        }}
                        error={Boolean(validationErrors.designation)}
                        helperText={validationErrors.designation}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Job Title
      </FormLabel>
                      <TextField
                        id="jobtitle"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.jobTitle}
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
                    
                    <Grid item xs={12} sm={4} md={6}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Reports To</FormLabel>

                      <TextField
                        id="reportsto"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="First Name"
                        value={contactData.reportsTo}
                        onChange={(event) => {
                          handleInputChange("reportsTo", event.target.value);
                        }}
                        error={Boolean(validationErrors.reportsTo)}
                        helperText={validationErrors.reportsTo}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        lead
      </FormLabel>
                      <TextField
                        id="lead"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.lead}
                        onChange={(event) => {
                          handleInputChange("lead", event.target.value);
                        }}
                        error={Boolean(validationErrors.lead)}
                        helperText={validationErrors.lead}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        LeadSource
      </FormLabel>
                      <TextField
                        id="leadsource"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.leadSource}
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

                    <Grid item xs={12} sm={4} md={6}>
                      <Typography variant="h5">Address & Detail</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}></Grid>


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
                        // label="Source"
                        value={contactData.city}
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
                        id="state"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Contact Type"
                        value={contactData.state}
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
        }}>Postal Code</FormLabel>

                      <TextField
                        id="postalcode"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Middle Name"
                        value={contactData.postalCode}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Country
      </FormLabel>
                      <TextField
                        id="country"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.country}
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
                 
                  <Grid item xs={12} sm={4} md={6}>
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        fax
      </FormLabel>
                      <TextField
                        id="fax"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.fax}
                        onChange={(event) => {
                          handleInputChange("fax", event.target.value);
                        }}
                        error={Boolean(validationErrors.fax)}
                        helperText={validationErrors.fax}
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
                    <FormLabel 
        component="legend" 
        sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}
      >
        Address
      </FormLabel>
                      <TextField
                        id="Address"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Request Type"
                        value={contactData.address}
                        onChange={(event) => {
                          handleInputChange("address", event.target.value);
                        }}
                        error={Boolean(validationErrors.address)}
                        helperText={validationErrors.address}
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
    value={contactData.description}
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
         
        </TabContext>

      </Dialog>
    </>
  );
}
