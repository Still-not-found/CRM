import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Box, Button, Grid, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import CopyRight from "../copy_right";
// import AuthService from "../../../services/auth";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// ---------------------------------------------------------------------

export default function RegisterForm() {

    const [register, setRegister] = useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        userName:''
        // entity:'',
    });

    const [errors,setErrors] = useState({});
    const [registerStatus, setRegisterStatus] = useState(false);
    const [registerStatusMessage, setRegisterStatusMessage] = useState('');
    const [loading, setLoading]=useState(false);

    const handleInputChange = (field, value)=>{
        setErrors({});
        const updatedRegister = {...register};
        updatedRegister[field] = value;
        setRegister(updatedRegister);
    }

    const validateRegister = () => {
     let error = {};
     if(!Boolean(register.firstName)){
        error.firstName='First name is required';
     }
     if(!Boolean(register.lastName)){
        error.lastName ='Last name is required';
     }
     if(!Boolean(register.phone)){
        error.phone ='Phone is required';
     }
     if(!Boolean(register.email)){
        error.email ='Email is required';
     }
     if(!Boolean(register.userName)){
        error.userName ='Username is required';
     }
     return error;
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const validateErrors = validateRegister();

        if (Object.keys(validateErrors).length >0){
            setTimeout(()=>{
                setErrors(validateErrors);
                setLoading(false);
            },1000);
            return;
        }
        
        axios.post(`${API_URL}/auth/register`,register).then((response)=>{
            console.log(response);
         if(response.data.status){
            setRegisterStatus(true);
            setRegisterStatusMessage(response.data.message);
            setLoading(false);
         }
        }).catch((error)=>{
            console.log(error);
            setTimeout(()=>{
                setLoading(false);
                setRegisterStatus(false);
                setRegisterStatusMessage(error.response.data.message);
            },1000)
        })
    }

return (
  <Box
    sx={{
      my: { xs: 8, sm: 8, md: 2 },
      mx: { xs: 3, sm: 2, md: 7 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography component="h1" variant="h5" my={1}>
      <img
        src="https://suitecrm.refex.group/ITAM.png"
        alt="logo"
        height={100}
      />
    </Typography>

    {/* <Typography variant="h5" color={'#1890FF'} sx={{fontWeight:800}}>
        REGISTRATION
    </Typography> */}

    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} py={3}>
    <Grid container spacing={{xs: 1, md:2}} >
    <Grid item xs={12} md={6}>
    <TextField
          fullWidth
          required
          type="text"
            label="First Name"
            variant="outlined"
            onChange={(e) => handleInputChange('firstName',e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField
          fullWidth
          required
          type="text"
            label="Last Name"
            variant="outlined"
            onChange={(e) => handleInputChange('lastName',e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          </Grid>
          <Grid item xs={12} md={12}>
          <TextField
          fullWidth
          required
            label="Phone Number"
            variant="outlined"
            type="tel"
            onChange={(e) => handleInputChange('phone',e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          </Grid>
          {/* <Grid item xs={12} md={12}>
          <TextField
          fullWidth
          required
            label="Company Code"
            variant="outlined"
            type="tel"
            onChange={(e) => handleInputChange('phone',e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          </Grid> */}
          <Grid item xs={12} md={12}>
          <TextField
          fullWidth
          required
            label="Email"
            variant="outlined"
            type="email"
            onChange={(e) => handleInputChange('email',e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          </Grid>
          <Grid item xs={12} md={12}>
          <TextField
          fullWidth
          required
            label="Username"
            variant="outlined"
            onChange={(e) => handleInputChange('userName',e.target.value)}
            error={Boolean(errors.userName)}
            helperText={errors.userName}
          />
          </Grid>
          <Grid item xs={12} md={12}>
          {!registerStatus && <LoadingButton fullWidth loading={loading} size="large" type="submit" variant="contained" sx={{ mt: 1, mb: 1, }} >
        Register
      </LoadingButton> }
      <Typography variant={"body2"} color={registerStatus?"green":"error"} sx={{ fontWeight: 600 }} align="center">
        {registerStatusMessage}
      </Typography>
      <Typography
              variant="body2"
              display={"inline-block"}
              color={"info"}
              sx={{ fontWeight: 600 }}
            >
              <Link href="/login" underline="hover">
                Go To Login Page
              </Link>
            </Typography>
      </Grid>
      </Grid>
    </Box>
   
    <Typography variant="subtitle1" color={"text.secondary"} textAlign={'center'}>
        Note: You will be sent a verification email containing your login credentials.
    </Typography>

    <CopyRight sx={{ mt: 4 }} />
  </Box>
);
}
