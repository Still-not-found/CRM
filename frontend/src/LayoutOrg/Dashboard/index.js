import { Box, Typography } from "@mui/material";

export default function Dashboard({DB_URL}){

    return(
        <Box
        sx={{height:"100vh"}}
        >
        <Typography variant="subtitle2">
            Dashboard
        </Typography>
        </Box>

    );
}