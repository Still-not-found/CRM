import { useState, useEffect, forwardRef, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Box,
  Breadcrumbs,
  Container,
  Card,
  Grid,
  TextField,
  Autocomplete,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  styled,
  Tooltip,
  Divider,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Popover,
  MenuItem,
  TextareaAutosize
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
// import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enIN from "date-fns/locale/en-IN";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilesUpload from "./FilesUpload";
import Scrollbar from "../../../../components/scrollbar";
import { fData } from "../../../../utils/formatNumber";
import Iconify from "../../../../components/iconify";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.success.darker,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAccessory(props) {
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [cities, setCities] = useState(["city 1", "city 2"]);
  const [airportData, setAirportData] = useState({
    airport_name: null,
    iata_code: null,
    iaco_code: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileRows, setFileRows] = useState([]);
  const [open, setOpen] = useState(null);
  const [fileIndex, setFileIndex] = useState(null);

  const handleOpenMenu = (event, index) => {
    console.log(event);
    console.log(index);
    setFileIndex(index);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleTripTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    const updatedAirportData = { ...airportData };
    updatedAirportData[field] = value;
    setAirportData(updatedAirportData);
    setValidationErrors({});
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmitAircraft = (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  };

  function createData(file, size) {
    return { file, size };
  }

  const handleAddFiles = (event) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    setFiles([]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    handleCloseMenu();
  };

  useEffect(() => {
    let rows = [];
    selectedFiles.map((file) => {
      rows = [...rows, createData(file.name, fData(file.size))];
    });
    setFileRows(rows);
  }, [selectedFiles]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/app/dashboard">
      Dashboard
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/app/masters">
      Masters
    </Link>,
    <Typography key="3" color="text.disabled">
      Accessories
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Accessory
    </Typography>,
  ];

  
  return (
    <>
      <Helmet>
        <title>Accessory Create | ITAM </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Create&nbsp;a&nbsp;new&nbsp;Accessory
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBackIcon fontSize="large" />}
            onClick={() => {
              handleTabChange("1");
            }}
          >
            Back&nbsp;to&nbsp;list
          </Button>
        </Stack>

        <Card sx={{ overflow: "visible" }}>
          <TabContext value={tabValue}>
            <TabList
              onChange={handleTripTabChange}
              aria-label="lab API tabs example"
              sx={{ borderRadius: "10px 10px 0px 0px" }}
            >
              <Tab label="Accessory Details" value="1" />
            </TabList>
            <Divider sx={{ borderStyle: "dashed" }} />
            <TabPanel value="1">

              <Box flexGrow={1}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} md={7}>
                    <Grid
                      container
                      spacing={{ xs: 1, md: 3 }}
                      columns={{ xs: 12, md: 7 }}
                    >
                          <Grid item xs={9} md={5}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Company"

                                />
                              )}
                            />

                          </Grid>
                          
                      <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Accessory Name"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={9} md={5}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Category"

                                />
                              )}
                            />

                          </Grid>
                          <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={9} md={5}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Supplier"

                                />
                              )}
                            />

                          </Grid>
                          <Grid item xs={2} md={0.5}>
                            <Tooltip title="New City">
                              <Button
                                to={"/app/masters/city"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                          <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={9} md={5}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Manufacturer"

                                />
                              )}
                            />

                          </Grid>
                          <Grid item xs={2} md={0.5}>
                            <Tooltip title="New City">
                              <Button
                                to={"/app/masters/city"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={9} md={5}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Location"

                                />
                              )}
                            />

                          </Grid>
                          <Grid item xs={2} md={0.5}>
                            <Tooltip title="New City">
                              <Button
                                to={"/app/masters/city"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>

                      

                      <Grid item xs={12} md={7}>
                        <TextField
                          id="iaco_code"
                          size="small"
                          fullWidth
                          required
                          label="Model No"
                          onChange={(event) => {
                            handleInputChange("iaco_code", event.target.value);
                          }}
                          error={Boolean(validationErrors.iaco_code)}
                          helperText={validationErrors.iaco_code}
                        />
                      </Grid>

                      

                        <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Order Number"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>

                      <Grid item xs={12} md={7}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Purchase Date" />
      </DemoContainer>
    </LocalizationProvider>
    </Grid>

    <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Purchase Cost In INR"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>

    <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Quantity"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Min.Qty"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1.5}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={12} md={7}>
                            <TextareaAutosize
                              id="latitude"
                              // size="small"
                              label="Notes"
                              placeholder="Notes"
                              onChange={(event) => {
                                handleInputChange(
                                  "latitude",
                                  event.target.value
                                );
                              }}
                              error={Boolean(validationErrors.latitude)}
                              helperText={validationErrors.latitude}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      

                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box height={200}></Box>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            
            
            <Divider sx={{ borderStyle: "dashed" }} />
            <Box flexGrow={1} p={2}>
              <Grid container columnSpacing={3}>
                <Grid item xs={6} md={8}></Grid>
                <Grid item xs={3} md={2}>
                  <SubmitButton
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmitAircraft}
                  >
                    Save
                  </SubmitButton>
                </Grid>
                <Grid item xs={3} md={2}>
                  <Fragment>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      //  onClick={handleClickAlert}
                      onClick={() => {
                        handleTabChange("1");
                      }}
                    >
                      Close
                    </Button>
                    <Dialog
                      open={openAlert}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClickAlert}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Are you sure?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Created data and Changes you where made can't be
                          save..!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="error"
                          onClick={() => {
                            handleTabChange("1");
                            handleClickAlert();
                          }}
                        >
                          Ok
                        </Button>
                        <Button onClick={handleClickAlert}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </Fragment>
                </Grid>
              </Grid>
            </Box>
          </TabContext>
        </Card>
      </Container>
    </>
  );
}
