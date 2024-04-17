// Logout.js
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setIsLoggedIn, loggedInUserId, DB_URL }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session here (e.g., remove tokens, user info from local storage)
    // Example: localStorage.removeItem("token");
    let sessionId=localStorage.getItem("sessionId");
    
    if (sessionId===null){
      sessionId=sessionStorage.getItem("sessionId");
    }
     
    axios.post(`${DB_URL}/logout`,{sessionId:sessionId}).then((response)=>{

      if(response.data.message==="Logout successful"){
        setIsLoggedIn(false); // Set user as logged out
        // Redirect to the login page
        navigate("/");
      }
    });
  }, []);

  return <div>Logging out...!</div>;
}

export default Logout;
