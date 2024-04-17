// Logout.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = process.env.REACT_APP_API_URL;

function LogoutPage({ handleLogout, sessionId }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session here (e.g., remove tokens, user info from local storage)
    // Example: localStorage.removeItem("token");
    axios
      .post(`${API_URL}/auth/logout`, { session_id: sessionId })
      .then((response) => {
        if (response.data.status) {
          setTimeout(()=>{
            handleLogout(); // Set user as logged out
            // Redirect to the login page
            navigate("/");
            setOpen(false);
          },1000);
        }
      }).catch((error)=>{
        navigate("/");
        setOpen(false);
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <Backdrop
        sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default LogoutPage;
