import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Lead Component
import {
  ListLead,
  CreateLead,
  EditLead,
  DeleteLead,
  // ViewLead,
} from "../../sections/@dashboard/masters/Lead";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LeadPage(props) {
  const { userData } = props;

  const [leadId, setLeadId] = useState(null);
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
    setLeadId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  // const handleClickView = (idToView = null) => {
  //   setLeadId(idToView);
  //   handleOptionChange("canView", !optionState.canView);
  // };

  const handleClickDelete = async (idToDelete = null) => {
    setLeadId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container maxWidth="xl">
      <ListLead
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        // handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateLead
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditLead
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          idToEdit={leadId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {/* {optionState.canView && (
        <ViewLead
        handleClickView={handleClickView}
        optionState={optionState}
        idToView={leadId}
        setRefresh={setRefresh}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )} */}
      {optionState.canDelete && (
        <DeleteLead
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefresh={setRefresh}
          idToDelete={leadId}
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
