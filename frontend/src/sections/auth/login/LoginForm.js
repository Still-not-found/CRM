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

export default function LoginForm({setIsLoggedIn}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember]=useState(false);
    const [loading, setLoading]=useState(false);
    const [loginStatus, setLoginStatus] =useState(false);
    const [loginStatusMessage, setLoginStatusMessage] = useState("");
    const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false); // Added state to track previous login
  
    const navigate = useNavigate();
  
    // Check if the user has logged in before
    // useEffect(() => {

    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginStatusMessage(null);
        setLoading(true);
        if((email===""||email===null) || (password===""||password===null)){
          setTimeout(() => {
            setLoginStatusMessage("Email and Password is required.");
            setLoading(false);
          }, 1000);
        }
        else{
          axios.post(`${API_URL}/auth/login`,{email,password}).then((response)=>{
            console.log(response.data);
            setLoginStatus(response.data.status);
            if(response.data.status){
                const sessionData ={
                    status: response.data.status,
                    id:response.data.session_id,
                    token:response.data.token,
                    userData:response.data.user_data,
                }
                if(remember){
                    localStorage.setItem("sessionData",JSON.stringify(sessionData));
                }else{
                    sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                }
                setIsLoggedIn(true);
                setLoginStatusMessage(response.data.message);
                setLoading(false);
                navigate("/app");
            }
        }).catch((error)=>{
            console.error("Login error:", error);
            setTimeout(() => {
              if(error.response.data.status_code === 400){
                setLoginStatusMessage(error.response.data.results.errors[0].msg);
            }else{
                setLoginStatusMessage(error.response.data.message);
            }
                setLoading(false);
            }, 1000);
        });
          // AuthService.login(email,password,remember).then((response)=>{
          //   setLoginStatus(response.data.status);
          //   console.log(response);
          //   if(!response.data.status){
          //     if(response.data.status_code === 400){
          //       setLoginStatusMessage(response.data.results.errors[0].msg);
          //     }else{
          //       setLoginStatusMessage(response.data.message);
          //     }
          //     setLoading(false);
          //   }else{
                
          //       setLoginStatusMessage(response.data.message);
          //       setLoading(false);
          //       navigate("/app");
          //   }
          // }).catch((error)=>{
          //   console.error("Login error:", error);
          //   setTimeout(() => {
          //   if(error.response.data.status_code === 400){
          //       setLoginStatusMessage(error.response.data.results.errors[0].msg);
          //   }else{
          //       setLoginStatusMessage(error.response.data.message);
          //   }
          //       setLoading(false);
          //   }, 1000);
          // });
        }
      };

return (
  <Box
    sx={{
      my: { xs: 8, sm: 8, md: 9 },
      mx: { xs: 3, sm: 2, md: 7 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    <LockOutlinedIcon />
  </Avatar> */}
    <Typography component="h1" variant="h5">
      <img
        src="https://suitecrm.refex.group/itam.png"
        alt="logo"
        height={100}
      />
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <Box component="form"sx={{ mt: 1 }}> 
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Entity ID"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => {
              setRemember(!remember);
            }}
            color="primary"
          />
        }
        label="Remember me"
      />
      {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        LogIn
      </Button> */}
      <LoadingButton color={"primary"} fullWidth loading={loading} size="large" type="submit" variant="contained" sx={{ mt: 3, mb: 1 }} >
        Login
      </LoadingButton>
      <Typography variant={"body2"} sx={{ fontWeight: 600 }} color={loginStatus?"text.primary":"error"} align="center">
        {loginStatusMessage}
      </Typography>
      {/* <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link
          underline="hover"
          color="inherit"
          target="_blank"
          href="https://gama.refex.group/policy"
        >
          @ Privacy Policy
        </Link>
      </Box> */}
      <Grid container sx={{mt:1}}>
      <Grid item xs>
      <Typography
              variant="body2"
              display={"inline-block"}
              color="primary"
              sx={{ fontWeight: 600 }}
            >
        <Link href="/forgot_password" underline="hover">
          {'Forgot password?'}
        </Link>
        </Typography>
      </Grid>
      <Grid item>
      <Typography
              variant="body2"
              display={"inline-block"}
              color="primary"
              sx={{ fontWeight: 600 }}
            >
        <Link href="/register" underline="hover">
          {"Don't have an account? Register"}
        </Link>
        </Typography>
      </Grid>
    </Grid>
      <CopyRight sx={{ mt: 5 }} />
    </Box>
  </Box>
);
}
