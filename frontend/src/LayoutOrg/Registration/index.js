import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


const styles = {
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};


export default function Registration({DB_URL}) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate=useNavigate();


  const register = () => {
    console.log(DB_URL);
    axios.post(`${DB_URL}/register`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      user_name: userNameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response.data);
        setRegistrationStatus(response.data.message);
        if (response.data.message === "User registered successfully") {
          setIsRegistered(true); // Mark registration as successful
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setRegistrationStatus(error.response.data.error);
      });
  };


  return (
    <Box mt={10} display={"flex"} justifyContent={"center"}>
    <Card sx={{ width: "90%", borderRadius: 5, bgcolor: "#ffffffb1" }}>
      <CardContent>
        <Typography variant="h5">Register a user :</Typography>
        <Box>
          <Grid container spacing={{sm:1, md:1}} columns={{sm:15, md:15}}>
            <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="First Name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="Last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="Email"
            variant="outlined"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="Phone Number"
            variant="outlined"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="Username"
            variant="outlined"
            onChange={(e) => setUserNameReg(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}>
          <TextField
          fullWidth
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPasswordReg(e.target.value)}
          />
          </Grid>
          <Grid item sm={7.5} md={5}></Grid>
          <Grid item sm={7.5} md={5}>
          <Button fullWidth variant="contained" onClick={register}>
            Register
          </Button>
          </Grid>
          <Grid item sm={7.5} md={5}></Grid>
          </Grid>
        </Box>
        <Typography variant="subtitle1" color="primary">
          {registrationStatus}
        </Typography>
        {isRegistered && (
          <Typography variant="body1">
            Registration successful! You can now navigate to the home page.
          </Typography>
        )}
      </CardContent>
    </Card>
    </Box>
  );
}
