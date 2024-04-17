import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// SmartPhone Component
import {
  ListSmartPhone,
  CreateSmartPhone,
  EditSmartPhone,
  DeleteSmartPhone,
  ViewSmartPhone,
} from "../../sections/@dashboard/masters/SmartPhone_master";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SmartPhonePage(props) {
  const { userData } = props;

  const [smartphoneId, setSmartPhoneId] = useState(null);
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
    setSmartPhoneId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  const handleClickView = (idToView = null) => {
    setSmartPhoneId(idToView);
    handleOptionChange("canView", !optionState.canView);
  };

  const handleClickDelete = async (idToDelete = null) => {
    setSmartPhoneId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container maxWidth="xl">
      <ListSmartPhone
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateSmartPhone
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditSmartPhone
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          idToEdit={smartphoneId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canView && (
        <ViewSmartPhone
          handleClickView={handleClickView}
          optionState={optionState}
          idToView={smartphoneId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canDelete && (
        <DeleteSmartPhone
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefresh={setRefresh}
          idToDelete={smartphoneId}
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
