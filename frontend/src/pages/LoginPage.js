import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { LoginForm } from "../sections/auth/login";
import { Helmet } from "react-helmet-async";

function Login({ setIsLoggedIn}) {

  const defaultTheme = createTheme();

  return (
    <>
    <Helmet>
    <title> Login | CRM </title>
    </Helmet>
    
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={8}
          md={8.1}
          
          sx={{
            backgroundImage:
              "url('/assets/background/bg.jpg')", //url(https://source.unsplash.com/random?wallpapers)
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "primary"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      <CssBaseline />
        <Grid item xs={12} sm={4} md={3.9} component={Paper} elevation={6} square>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        </Grid>
        </Grid>
    </ThemeProvider>

    </>
  );
}

export default Login;
