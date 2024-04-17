import React from "react";
import { Card, Grid, IconButton, Stack, textFieldClasses } from "@mui/material";
// @mui
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { hover } from "@testing-library/user-event/dist/hover";
import Box  from "@mui/material/Box";

const FooterBox=styled('footer')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  height: theme.spacing(10),
  paddingTop:45,
}));

export default function Footer (){

  return (
    <FooterBox>
        <Stack
             direction={"row"}
             justifyContent={"center"}
        >
        <Typography color={'text.disabled'}>
           {/* with ❤️ */}
            Designed&nbsp;&&nbsp;Developed&nbsp;by&nbsp;<a href="https://www.refex.co.in/" target="_blank" style={{color:'inherit' }}>
             Refex IT
             </a>
             &nbsp;© 2023
            {/* </a> for a better web app. */}
        </Typography>
        </Stack>
    </FooterBox>
  //   <Box
  //   style={{ marginTop: "10px", fontSize: "14px", color: "text.disabled" }}
  // >
  //   {/* with ❤️ */}
  //   © 2023, Developed by <a href="https://www.refex.co.in/" target="_blank" style={{textDecoration:"none", color:'inherit' }}>
  //     Refex IT
  //   </a> for a better web app.
  // </Box>
  );
  // const handleLinkClick = (url) => {
  //   window.open(url, "_blank");
  // };

  // return (
  //   // <footer
  //   //   style={{textAlign:"center",marginTop:"8%", height: "160px", backgroundColor: "#ffffffb1",padding:"30px 50px", justifyContent:'center' }}
  //   // >
  //   //   <div style={{ display: "flex", justifyContent: "space-between"}}>
  //   //     <div
  //   //       style={{
  //   //         alignContent:"left",
  //   //         fontSize: "14px",
  //   //       }}
  //   //     >
  //   //       <div>
  //   //         <Typography variant="h6">
  //   //         <span
  //   //           onClick={() => handleLinkClick("https://sparzana.com/")}
  //   //           style={{cursor: "pointer","& :hover": {textDecoration: "underline" } }}
  //   //         >
  //   //           Sparzana Aviation Pvt Ltd
  //   //         </span>
  //   //         </Typography>
  //   //         </div>
            
  //   //         <div><LocationOnIcon fontSize="small"/> Bascon Futura SV IT Park, 7th Floor, Venkatanarayana Road,</div>
  //   //         <div> T Nagar, Chennai Tamil Nadu - 600017</div>
  //   //         <div style={{padding:'5px 30px 0px 0px'}}><PhoneIcon fontSize="small"/> +91 9694918118</div>
          
  //   //     </div>
  //   //     <div >
  //   //       <IconButton
  //   //         onClick={() => handleLinkClick("https://www.facebook.com")}
  //   //       >
  //   //         <FacebookIcon />
  //   //       </IconButton>
  //   //       <IconButton
  //   //         onClick={() => handleLinkClick("https://www.youtube.com")}
  //   //       >
  //   //         <YouTubeIcon />
  //   //       </IconButton>
  //   //       <IconButton
  //   //         onClick={() => handleLinkClick("https://www.instagram.com")}
  //   //       >
  //   //         <InstagramIcon />
  //   //       </IconButton>
  //   //       <IconButton
  //   //         onClick={() => handleLinkClick("https://www.twitter.com")}
  //   //       >
  //   //         <TwitterIcon />
  //   //       </IconButton>
  //   //       <IconButton
  //   //         onClick={() => handleLinkClick("https://www.linkedin.com")}
  //   //       >
  //   //         <LinkedInIcon />
  //   //       </IconButton>

  //   //       <div style={{ marginTop: "10px" }}>
  //   //         <span
  //   //           onClick={() => handleLinkClick("https://sparzana.com/")}
  //   //           style={{ cursor: "pointer", marginRight: "10px" }}
  //   //         >
  //   //           About us
  //   //         </span>
  //   //         <span
  //   //           onClick={() => handleLinkClick("https://www.externalwebsite.com")}
  //   //           style={{cursor: "pointer","& :hover": {textDecoration: "underline" } }}
  //   //         >
  //   //           Refex IT
  //   //         </span>
  //   //       </div>

  //   //       <Box
  //   //         style={{ marginTop: "10px", fontSize: "12px", color: "#666666" }}
  //   //       >
  //   //         {/* with ❤️ */}
  //   //         © 2023, made by             <span                                       
  //   //           onClick={() => handleLinkClick("https://www.externalwebsite.com")}
  //   //           style={{cursor: "pointer","& :hover": {textDecoration: "underline" } }}
  //   //         >
  //   //           Refex IT
  //   //         </span> for a better web app.
  //   //       </Box>
  //   //     </div>
  //   //   </div>
  //   // </footer>
  //   <Box sx={{mt:"10vh", bgcolor: "#ffffffb1",flexGrow:1, textAlign:"center" }}>
  //     <Grid container spacing={{xs:1, sm:0, md:0}} p={1} columns={{xs:4,sm:8,md:12}}>
  //       <Grid item xs={4} sm={4} md={5}>
  //         <Box p={{md:"15px"}}>
  //       <div>
  //            <Typography variant="h6">
  //            <span
  //              onClick={() => handleLinkClick("https://sparzana.com/")}
  //              style={{cursor: "pointer","& :hover": {textDecoration: "underline" } }}
  //            >
  //              Sparzana Aviation Pvt Ltd
  //            </span>
  //            </Typography>
  //            </div>
            
  //            <div><LocationOnIcon fontSize="small"/> Bascon Futura SV IT Park, 7th Floor, Venkatanarayana Road,</div>
  //            <div> T Nagar, Chennai Tamil Nadu - 600017</div>
  //            <div><PhoneIcon fontSize="small"/> +91 9694918118</div>
  //         </Box>
  //       </Grid>
  //       <Grid item xs={false} sm={false} md={2}></Grid>
  //       <Grid item xs={4} sm={4} md={5} >
  //       <Box p={{md:"25px"}}>
  //           <Box>
  //           <IconButton
  //           onClick={() => handleLinkClick("https://www.facebook.com")}
  //         >
  //           <FacebookIcon />
  //         </IconButton>
  //         {/* <IconButton
  //           onClick={() => handleLinkClick("https://www.youtube.com")}
  //         >
  //           <YouTubeIcon />
  //         </IconButton> */}
  //         <IconButton
  //           onClick={() => handleLinkClick("https://www.instagram.com")}
  //         >
  //           <InstagramIcon />
  //         </IconButton>
  //         {/* <IconButton
  //           onClick={() => handleLinkClick("https://www.twitter.com")}
  //         >
  //           <TwitterIcon />
  //         </IconButton> */}
  //         <IconButton
  //           onClick={() => handleLinkClick("https://www.linkedin.com")}
  //         >
  //           <LinkedInIcon />
  //         </IconButton>
  //           </Box>
  //           <Box>
  //            <span
  //             onClick={() => handleLinkClick("https://sparzana.com/")}
  //             style={{ cursor: "pointer", marginRight: "10px" }}
  //           >
  //             About us
  //           </span>
  //           <span
  //             onClick={() => handleLinkClick("https://www.externalwebsite.com")}
  //             style={{cursor: "pointer"}}
  //           >
  //             Refex IT
  //           </span>
  //           </Box>
  //          <Box
  //           style={{ marginTop: "10px", fontSize: "14px", color: "text.disabled" }}
  //         >
  //           {/* with ❤️ */}
  //           © 2023, Developed by <a href="https://www.externalwebsite.com" target="_blank" style={{textDecoration:"none", color:'inherit' }}>
  //             Refex IT
  //           </a> for a better web app.
  //         </Box>
  //       </Box>
  //       </Grid>
  //     </Grid>
  //     </Box>
  // );
};
