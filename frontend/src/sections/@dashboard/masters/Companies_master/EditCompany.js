import { useState, useEffect, forwardRef } from "react";
import { Link as RouterLink } from 'react-router-dom';
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  Box,
  Breadcrumbs,
  styled,
  Autocomplete,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import axios from "axios";

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

export default function EditCompany(props) {
  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const [companyData, setCompanyData] = useState({
    company: "",
    companycode: "",
  });
 
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(()=>{
  
    const fetchData = async() =>{
      try {
        await axios.get(`${API_URL}/api/companies/${idToEdit}`).then((response)=>{
          if(response.data.status){
            const {company_name, company_code} = response.data.results[0];
            setCompanyData({
              company: company_name,
              companycode: company_code,
            });
          }
        }).catch((error)=>{
          setStatus({
            open:true,
            type:"error",
            message:error.response.data.message,
          });
        });
      } catch (error) {
        setStatus({
          open:true,
          type:'error',
          message:"Network connection error",
        });
      }
    }; 
    fetchData();
  },[]);

  const handleInputChange = (field, value) => {
    setCompanyData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
      return;
      handleClickEdit();
  };

  const validate=()=>{
    let errors={};

    if(!Boolean(companyData.company))
      errors.company="Company Name is required";
    if(!Boolean(companyData.companycode))
      errors.companycode="Company Code is required";
    return errors;
  }

  const handleSubmit = async (event)=> {
    // console.log('It worked');
    const errors=validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/companies/${idToEdit}`,{...companyData,updatedBy:loggedUser.user_id}).then((response)=>{
        // console.log(response);
        setStatus({
          open:true,
          type:'success',
          message:response.data.message
        });
        setRefresh((prev)=>prev+1);
      }).catch((error)=>{
        // console.log(error);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setStatus({
        open:true,
        type:'error',
        message:"Network connection error",
      });
    }
    handleClickEdit();
}

  return (
    <>
      <Helmet>
        <title>City Edit | GAMA AirOps</title>
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
        <DialogTitle>{"Edit Company"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
          <Grid
              container
              rowSpacing={2}
              columnSpacing={5}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="company_name"
                  size="small"
                  fullWidth
                  required
                  label="Company"
                  value={companyData.company}
                  onChange={(event) => {
                    handleInputChange("company", event.target.value);
                  }}
                  error={Boolean(validationErrors.company)}
                  helperText={validationErrors.company}
                />
              </Grid>

              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="company_code"
                  size="small"
                  fullWidth
                  required
                  label="CompanyCode"
                  value={companyData.companycode}
                  onChange={(event) => {
                    handleInputChange("companycode", event.target.value);
                  }}
                  error={Boolean(validationErrors.companycode)}
                  helperText={validationErrors.companycode}
                />
              </Grid>
              
              
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained" onClick={handleSubmit}>
            Save
          </SubmitButton>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
