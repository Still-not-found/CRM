import { useState, useEffect, forwardRef } from "react";
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

export default function DeleteCompany(props){

    const {handleClickDelete,setRefresh,optionState,setStatus,idToDelete,loggedUser}=props;

    const handleDeleteCompany = async ()=>{
        try {
            await axios.delete(`${API_URL}/api/companies/${idToDelete}`).then((response)=>{
                if(response.data.status){
                  setStatus({
                    open:true,
                    type:'warning',
                    message:response.data.message,
                  });
                  setRefresh((prev)=>prev+1);
                }
              }).catch((error)=>{
                setStatus({
                  open:true,
                  type:'error',
                  message:error.response.data.message,
                  error: error.response.data.results.error,
                });
              });
        } catch (error) {
            setStatus({
                open:true,
                type:'error',
                message:"Network connection error",
              });
        }
        handleClickDelete();
    };

    const handleClose = (event, reason) => {
        // if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
        //   return;
        handleClickDelete();
      };

    return <>
              <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure want to delete?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={()=>{handleDeleteCompany();handleClose();}}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
}