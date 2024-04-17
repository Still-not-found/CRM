import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Computer Component
import {
  ListComputer,
  CreateComputer,
  EditComputer,
  DeleteComputer,
  // ViewComputer,
} from "../../sections/@dashboard/masters/computer";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ComputerPage(props) {
  const { userData } = props;

  const [computerId, setComputerId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [optionState, setOptionState] = useState({
    canCreate: false,
    canEdit: false,
    canView: false,
    canDelete: false,
    canView: false,
  });

  const [status, setStatus] = useState({
    open: false,
    type: "error",
    message: "None",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus((prev) => ({
      open: false,
      type: prev.type,
      message: prev.message,
    }));
  };

  const handleOptionChange = (key, value) => {
    setOptionState((pre) => {
      return { ...pre, [key]: value };
    });
  };

  const handleClickCreate = () => {
    handleOptionChange("canCreate", !optionState.canCreate);
  };

  const handleClickEdit = (idToEdit = null) => {
    setComputerId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  // const handleClickView = (idToView = null) => {
  //   setComputerId(idToView);
  //   handleOptionChange("canView", !optionState.canView);
  // };

  const handleClickDelete = async (idToDelete = null) => {
    setComputerId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container maxWidth="xl">
      <ListComputer
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        // handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateComputer
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditComputer
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          idToEdit={computerId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {/* {optionState.canView && (
        <ViewComputer
        handleClickView={handleClickView}
        optionState={optionState}
        idToView={computerId}
        setRefresh={setRefresh}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )} */}
      {optionState.canDelete && (
        <DeleteComputer
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefresh={setRefresh}
          idToDelete={computerId}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={status.open}
        TransitionComponent={TransitionLeft}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={status.type}
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
