import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Helmet } from "react-helmet-async";
import RegisterForm from "../sections/auth/register/RegisterForm";

export default function RegisterPage() {

  const defaultTheme = createTheme();

  return (
    <>
    <Helmet>
    <title> Register | ITAM </title>
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
              "url('https://suitecrm.refex.group/crm1.jpg')", //url(https://source.unsplash.com/random?wallpapers)
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
          <RegisterForm/>
        </Grid>
        </Grid>
    </ThemeProvider>

    </>
  );
}
