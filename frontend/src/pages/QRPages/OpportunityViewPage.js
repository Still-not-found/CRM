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

export default function OpportunityViewPage(props) {
  // const { optionState, handleClickView, setRefresh, setStatus, idToView, loggedUser } = props;
const navigate =useNavigate();
const {opportunityId}= useParams();
// console.log(opportunityId);
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [opportunityData, setOpportunityData] = useState({
    Name: "",
    lead: "",
    description:  "",
    value: "",
    stage: "",
    probability: "",
    expectedCloseDate: "",
    account: "",
    opportunityAmount: "",
    type: "",
    user: "",
    leadSource: "",
    salesStage: "",
    assignedTo: "",
});
  // const [blobUrl, setBlobUrl]=useState('');

  const handleOpportunityTabChange = (event, newValue) => {
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
        await axios.get(`${API_URL}/api/opportunities/${opportunityId}`).then((response) => {
          if (response.data.status) {
            const { opportunities_id, lead_id, user_id, name, description, value, stage, probability, expected_close_date, account_id, opportunity_amount, type, lead_source, sales_stage, assigned_to, updated_by, created_by } = response.data.results[0];
                        setOpportunityData({
                       Name: name,
                       lead: lead_id,
                       description: description,
                       value: value,
                       stage: stage,
                       probability: probability,
                       expectedCloseDate: dayjs(expected_close_date),
                       account: account_id,
                       opportunityAmount: opportunity_amount,
                       type: type,
                       user: user_id,
                       leadSource: lead_source,
                       salesStage: sales_stage,
                       assignedTo: assigned_to,
                       });
          }
        }).catch((error) => {
          // setOpportunityData({});
        });
      } catch (error) {
        // setOpportunityData({});
      }
    };
    fetchAssetStatus();
    fetchSuppliers();
    fetchCompanies();
    fetchLocations();
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setOpportunityData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      navigate('/app/asset_management/opportunity');
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

    if (!Boolean(opportunityData.Name))
      errors.Name = "Opportunity Name is required";


    return errors;
  }

  return (
    <>
      <Helmet>
        <title>Opportunity View | CRM</title>
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
        <DialogTitle>{opportunityData.Name}</DialogTitle>
       
        <Button variant="contained" color="error" onClick={handleClose} sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}>
          Close
        </Button>
       
        <TabContext value={tabValue}>
          <TabList
            onChange={handleOpportunityTabChange}
            aria-label="lab API tabs example"
            sx={{ borderRadius: "10px 10px 0px 0px" }}
          >
            <Tab label="" value="1" sx={{ fontSize: '18.92px', }}  />

          </TabList>
          
          <Divider sx={{ borderStyle: "fill" }} />
          <TabPanel value="1">
          <Container maxWidth="x1">
            <Box flexGrow={3}>
              <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ color: '#525252',}}>Name</FormLabel>
                      <TextField
                        id="opportunity_name"
                        size="small"
                        fullWidth
                        disabled
                        // label="Series"
                        value={opportunityData.Name}
                        onChange={(event) => {
                          handleInputChange("Name", event.target.value);
                        }}
                        error={Boolean(validationErrors.Name)}
                        helperText={validationErrors.Name}
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
        }}>Account</FormLabel>

                      <TextField
                        id="account"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Job Title"
                        value={opportunityData.account}
                        onChange={(event) => {
                          handleInputChange("account", event.target.value);
                        }}
                        error={Boolean(validationErrors.account)}
                        helperText={validationErrors.account}
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
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Sales Stage</FormLabel>
                      <TextField
                        id="salesstage"
                        size="small"
                        fullWidth
                        disabled
                        // label="First Name"
                        value={opportunityData.salesStage}
                        onChange={(event) => {
                          handleInputChange("salesStage", event.target.value);
                        }}
                        error={Boolean(validationErrors.salesStage)}
                        helperText={validationErrors.salesStage}
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
        }}>Opportunity Amount</FormLabel>
                      <TextField
                        id="opportunity_amount"
                        size="small"
                        fullWidth
                        disabled
                        // label="Opportunity Owner"
                        value={opportunityData.opportunityAmount}
                        onChange={(event) => {
                          handleInputChange("opportunityAmount", event.target.value);
                        }}
                        error={Boolean(validationErrors.opportunityAmount)}
                        helperText={validationErrors.opportunityAmount}
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
        }}>Probability</FormLabel>

                      <TextField
                        id="probability"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Source"
                        value={opportunityData.probability}
                        onChange={(event) => {
                          handleInputChange("probability", event.target.value);
                        }}
                        error={Boolean(validationErrors.probability)}
                        helperText={validationErrors.probability}
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
  }}>Expected Close Date</FormLabel>
  <LocalizationProvider
    id="expectedcloseddate"
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
    dateAdapter={AdapterDayjs}>
    <DemoContainer disabled="true" components={['DatePicker']}>
      <DatePicker
        format="DD/MM/YYYY"
        // label="Purchase Date" 
        onChange={(newValue) =>
          handleInputChange(
            "expectedCloseDate",
            dayjs(newValue.$d).format("YYYY-MM-DD")
          )
        }
       
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small"
          }
        }}
      />
    </DemoContainer>
  </LocalizationProvider>
</Grid>

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Contact</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Gender"
                        value={opportunityData.contact}
                        onChange={(event) => {
                          handleInputChange("contact", event.target.value);
                        }}
                        error={Boolean(validationErrors.contact)}
                        helperText={validationErrors.contact}
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

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" required= "true" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Lead Source</FormLabel>

                      <TextField
                        id="leadsource"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Status"
                        value={opportunityData.leadSource}
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
                   
                    <Grid item xs={12} sm={6} md={6}>
                    <FormLabel component="legend" sx={{ 
          color: '#525252', // Set the color of the label here
          // Add more styling as needed
        }}>Type</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Gender"
                        value={opportunityData.type}
                        onChange={(event) => {
                          handleInputChange("type", event.target.value);
                        }}
                        error={Boolean(validationErrors.type)}
                        helperText={validationErrors.type}
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
        }}>Assigned To</FormLabel>

                      <TextField
                        id="type"
                        size="small"
                        fullWidth
                        required
                        disabled
                        // label="Gender"
                        value={opportunityData.assignedTo}
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


                    <Grid item xs={12} sm={12} md={12}>
  <FormLabel component="legend" sx={{ color: '#525252',}}>Description</FormLabel>
  <TextField
    id="description"
    multiline  // Add this to enable multiline input
    rows={4}   // Adjust the number of rows as needed
    fullWidth
    required
    disabled
    value={opportunityData.description}
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
