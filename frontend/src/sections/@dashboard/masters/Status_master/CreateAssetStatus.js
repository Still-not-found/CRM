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

export default function CreateStatus(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;
  const [statusData, setStatusData] = useState({
    statusName: "", 
    statusCode: "",
  });
  
  const [validationErrors, setValidationErrors] = useState({});



  const handleInputChange = (field, value) => {
    setStatusData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
      handleClickCreate();
  };

  const validate=()=>{
    let errors={};

    if(!Boolean(statusData.statusName))
      errors.statusName="Status Name is required";
    if(!Boolean(statusData.statusCode))
      errors.statusCode="Status Code is required";
   
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
      await axios.post(`${API_URL}/api/status`,{...statusData,createdBy:loggedUser.user_id}).then((response)=>{
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
    handleClickCreate();
}

  return (
    <>
      <Helmet>
        <title>Status Create | ITAM</title>
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
        <DialogTitle>{"Create a new Status"}</DialogTitle>
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
                  id="status_name"
                  size="small"
                  fullWidth
                  required
                  label="Status"
                  value={statusData.statusName}
                  onChange={(event) => {
                    handleInputChange("statusName", event.target.value);
                  }}
                  error={Boolean(validationErrors.statusName)}
                  helperText={validationErrors.statusName}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="entity_code"
                  size="small"
                  fullWidth
                  required
                  label="Status Code"
                  value={statusData.statusCode}
                  onChange={(event) => {
                    handleInputChange("statusCode", event.target.value);
                  }}
                  error={Boolean(validationErrors.statusCode)}
                  helperText={validationErrors.statusCode}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
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
