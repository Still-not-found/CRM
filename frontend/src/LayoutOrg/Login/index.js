import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import "./index.css";
import GAMAPrivacyPDF from "./Privacy_Policy_Sparzana.pdf";

function Login({ setIsLoggedIn, setCanRefresh, setLoggedInUserId, DB_URL }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember]=useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false); // Added state to track previous login

  const navigate = useNavigate();

  // Check if the user has logged in before
  useEffect(() => {
    const userLoggedInBefore = localStorage.getItem("userLoggedInBefore");
    if (userLoggedInBefore === "true") {
      setHasLoggedInBefore(true);
    }
  }, []);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    if((email===""||email===null) && (password===""||password===null)){
      setLoginStatus("Email and Password is required.");
    }
    else{
    Axios.post(`${DB_URL}/login`, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log("Login response:", response.data);

        setLoginStatus(response.data.message);
        if (response.data.message === "Login successful") {
          sessionStorage.setItem("sessionId",response.data.session_id);
          sessionStorage.setItem("loggedUserId",response.data.logged_user_id);
          setLoggedInUserId(response.data.logged_user_id);
          setIsLoggedIn(true);
          sessionStorage.setItem("userLoggedIn","true");
          setCanRefresh(true)
          if (!hasLoggedInBefore && remember) {
            localStorage.setItem("sessionId",response.data.session_id);
            localStorage.setItem("userLoggedInBefore", "true"); // Mark user as logged in before
            localStorage.setItem("loggedUserId",response.data.logged_user_id);
          }
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginStatus(error.response.data.message);
      });
    }
  };

  return (
    // <Box sx={{height:"100vh"}} id="home-container" justifyItems={"center"}>
    // <Container sx={{marginTop:9, position:"absolute"}} component="main" maxWidth="lg">
    //   <Box>
    //     <Grid container>
    //       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}  >
    //         <Box
    //           sx={{
    //             my: 5,
    //             mx: 4,
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Typography component="h1" variant="h5">
    //             <img src='https://sparzana.com/images/Logos/logo.png' alt='logo' height={100} />
    //           </Typography>
    //           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
    //             <TextField
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //               autoFocus
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //             <TextField
    //               margin="normal"
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="current-password"
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <FormControlLabel
    //               control={<Checkbox value="remember" color="primary" />}
    //               label="Remember me"
    //             />
    //             <Button
    //               type="submit"
    //               fullWidth
    //               variant="contained"
    //               sx={{ mt: 3, mb: 2 }}
    //             >
    //               Login
    //             </Button>
    //             {/* <Grid container>
    //               <Grid item xs>
    //                 <Link href="#" variant="body2">
    //                   Forgot password?
    //                 </Link>
    //               </Grid>
    //               <Grid item>
    //                 <Link href="#" variant="body2">
    //                   {"Don't have an account? Sign Up"}
    //                 </Link>
    //               </Grid>
    //             </Grid> */}
    //             <Typography variant="h6" color="error" align="center">
    //               {loginStatus}
    //             </Typography>
    //           </Box>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Container>
    // </Box>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={8}
          md={8.1}
          sx={{
            backgroundImage:
              " linear-gradient(90deg, rgba(40, 121, 182, 0.55) 25%, rgba(125, 194, 68, 0.55) 50%, rgb(238, 106, 49,0.55) 100%), url('https://sparzana.com/images/home/bg-1.jpg')", //url(https://source.unsplash.com/random?wallpapers)
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      <CssBaseline />
        <Grid item xs={12} sm={4} md={3.9} component={Paper} elevation={6} square>
          <Box
            sx={{
              my:{xs:8,sm:8,md:9},
              mx: {xs:7,sm:2,md:7},
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
                src="https://sparzana.com/images/Logos/logo.png"
                alt="logo"
                height={100}
              />
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox onChange={()=>{setRemember(!remember)}} color="primary" />}
                label="Stay Logged In"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Box
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
              </Box>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} /> */}
              <Typography variant="h6" color="error" align="center">
                {loginStatus}
              </Typography>
            </Box>
          </Box>
        </Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default Login;
