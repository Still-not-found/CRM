import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 510,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus]= useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
        axios.get(`${API_URL}/auth/verify_email/${token}`).then((response) => {
          if(response.data.status){
            setStatus(true);
            setMessage(response.data.message);
          }
        }).catch((error)=>{
          setStatus(false);
          setMessage(error.response.data.message);
        });
    };
    axios.post(`${API_URL}/auth/verify_token/${token}`).then((response)=>{
      if(response.data.status){
        verifyEmail();
      }
    }).catch((error)=>{
      setStatus(false);
      setMessage(error.response.data.message);
    });
    
  }, [token]);

  return (
    <>
      <Helmet>
        <title> Mail Verification | IT Asset Management</title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph color={status ? "text.success" : "error"}>
            {message}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            { status ? "Now, you can login into your IT Asset Management account using your credentials which has been sent to your email." : "E-mail verification is unsuccessful. Please register and try again."}
          </Typography>

          { status && <Box
            component="img"
            src="/assets/illustrations/mail_verified.png"
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          /> }

          <Button
            to='/login'
            size="large"
            variant="contained"
            component={RouterLink}
            sx={{my:2}}
          >
            Go to Login Page
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
