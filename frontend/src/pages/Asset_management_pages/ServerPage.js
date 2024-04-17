import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Server Component
import {
  ListServer,
  CreateServer,
  EditServer,
  DeleteServer,
  ViewServer,
} from "../../sections/@dashboard/masters/Server_master";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ServerPage(props) {
  const { userData } = props;

  const [tabletId, setServerId] = useState(null);
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
    setServerId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  const handleClickView = (idToView = null) => {
    setServerId(idToView);
    handleOptionChange("canView", !optionState.canView);
  };

  const handleClickDelete = async (idToDelete = null) => {
    setServerId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container maxWidth="xl">
      <ListServer
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateServer
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditServer
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          idToEdit={tabletId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canView && (
        <ViewServer
          handleClickView={handleClickView}
          optionState={optionState}
          idToView={tabletId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canDelete && (
        <DeleteServer
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefresh={setRefresh}
          idToDelete={tabletId}
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
