import { useEffect, useState } from "react";
// @mui ------------------------------------------------------

import {Link,Typography, Stack, Button, Box,Checkbox,IconButton,Paper,Popover,MenuItem, Breadcrumbs, Container, Card, TableContainer, Table, TableBody, TableRow,TableCell, TablePagination} from "@mui/material";
import { List, ListItem, ListItemText, Dialog, DialogTitle, Divider } from '@mui/material';

// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import ListToolBar from "./ListToolBar";
import ListHead from "./ListHead";
import Iconify from "../../../../components/iconify/Iconify";
import Scrollbar from "../../../../components/scrollbar";
import { filter } from "lodash";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const TABLE_HEAD = [
  { id: "workstation_name", label: "Name", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "os", label: "OS", alignRight: false },
  { id: "installation_date", label: "Installation Date", alignRight: false },
  { id: "cpu_model", label: "CPU", alignRight: false },
  { id: "ram_capacity", label: "RAM", alignRight: false },
  { id: "ip_address", label: "IP Address", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "status_id", label: "Asset Status", alignRight: false },
  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_workstation) => _workstation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListWorkstation(props){
    
 const {handleClickCreate, handleClickEdit, handleClickView, handleClickDelete, setStatus, refresh, loggedUser }=props;

 const [workstationRows, setWorkstationRows]=useState([]);

 const [workstationId, setWorkstationId] = useState(null);

 const [open, setOpen] = useState(null);

 const [page, setPage] = useState(0);

 const [order, setOrder] = useState("asc");

 const [selected, setSelected] = useState([]);

 const [orderBy, setOrderBy] = useState("workstation_id");

 const [filterName, setFilterName] = useState("");

 const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedWorkstation, setSelectedWorkstation] = useState(null);

  const handleClose = () => {
    setSelectedWorkstation(null);
  };


 useEffect(()=>{
  const fetchData= async()=>{
    
    try {
      await axios.get(`${API_URL}/api/workstations`).then((response)=> {
        if(response.data.status){
          setWorkstationRows(response.data.results);
        }
      }).catch((error)=> {
        setWorkstationRows([]);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setWorkstationRows([]);
      setStatus({
        open:true,
        type:'error',
        message:"Network Connection Error",
      });
    }
  }
  fetchData();
 },[refresh]);

 const handleOpenMenu = (event,workstation_id) => {
  setWorkstationId(workstation_id);
  setOpen(event.currentTarget);
};

const handleCloseMenu = () => {
  setOpen(null);
};

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = workstationRows.map((n) => n.workstation_id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setPage(0);
  setRowsPerPage(parseInt(event.target.value, 10));
};

const handleFilterByName = (event) => {
  setPage(0);
  setFilterName(event.target.value);
};

const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - workstationRows.length) : 0;

const filteredWorkstations = applySortFilter(
  workstationRows,
  getComparator(order, orderBy),
  filterName
);

const isNotFound = !filteredWorkstations.length && !!filterName;

 const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard"
    >
      Dashboard
    </Link>,
    <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/app/masters"
  >
    Masters
  </Link>,
  <Typography key="3" color='text.disabled'>
      Workstation
      </Typography>,
    <Typography key="4" color='text.disabled'>
      List
    </Typography>,
  ];

    return (
        <>

      <Helmet>
        <title> Workstation List | IT Asset Management </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
             Workstation&nbsp;List
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ color: 'text.primary',display:{xs:"none",sm:"block"} }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon fontSize="large" />}
            onClick={handleClickCreate}
          >
            New&nbsp;Workstation
          </Button>
        </Stack>

        <Card>
        <ListToolBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
          <Scrollbar>
            
          <TableContainer sx={{ maxHeight:450, minWidth: 800 }}>
            <Table
              stickyHeader aria-label="sticky table" size="small"
            >
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={workstationRows.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

<TableBody>
{!(filteredWorkstations.length > 0) && !(isNotFound) && (
                          <TableRow sx={{height:300}}>
                            <TableCell colSpan={11}>
                              <Stack spacing={1}>
                                <Box
                                  component="img"
                                  src="/assets/icons/ic_content.svg"
                                  sx={{ height: 120, mx: "auto" }}
                                />{" "}
                                <Typography
                                  textAlign={"center"}
                                  variant="subtitle1"
                                  color={"text.secondary"}
                                  component={"span"}
                                >
                                  No Data
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                {filteredWorkstations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      workstation_id,
                      workstation_name, 
                      location,
                      os,
                      installation_date,
                      cpu_model,
                      ram_capacity,
                      ip_address, 
                      company, 
                      status_id,
                    } = row;
                    const selectedWorkstation = selected.indexOf(workstation_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={workstation_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedWorkstation}
                      >
                        
                        <TableCell sx={{
                          cursor:'pointer',
                           "&:hover": {
                            textDecoration:'underline'
                          }
                        }} align="left" onClick={()=>{handleClickView(workstation_id);}}>
                            {workstation_name}
                        </TableCell>

                        <TableCell align="left">{location}</TableCell>

                        <TableCell align="left">{os}</TableCell>

                        <TableCell align="left">{installation_date}</TableCell>

                        <TableCell align="left">{cpu_model}</TableCell>

                        <TableCell align="left">{ram_capacity}</TableCell>

                        <TableCell align="left">{ip_address}</TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{status_id}</TableCell>

                        <TableCell align="right">
                          <IconButton
                            color="inherit"
                            onClick={(e)=>{handleOpenMenu(e,workstation_id)}}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={4} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
      </Table>
</TableContainer>
</Scrollbar>
<TablePagination
          rowsPerPageOptions={[7, 15, 25]}
          component="div"
          count={workstationRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Card>

        <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={()=>{handleClickView(workstationId);handleCloseMenu();}}>
          <Iconify icon={"eva:eye-fill"} sx={{ mr: 2 }} />
          View
        </MenuItem>

         <MenuItem onClick={()=>{handleClickEdit(workstationId);handleCloseMenu();}}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={()=>{handleClickDelete(workstationId);handleCloseMenu();}}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
        </>
    );
}