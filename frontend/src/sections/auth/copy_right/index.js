import { Typography, Link} from "@mui/material";

export default function CopyRight(props) {

    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.refex.co.in/pdf/Privacy-Policy.pdf">
          Refex Groups 
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }