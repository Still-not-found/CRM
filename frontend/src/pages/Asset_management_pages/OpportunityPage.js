import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Opportunity Component
import {
  ListOpportunity,
  CreateOpportunity,
  EditOpportunity,
  DeleteOpportunity,
  // ViewOpportunity,
} from "../../sections/@dashboard/masters/opportunity";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OpportunityPage(props) {
  const { userData } = props;

  const [opportunityId, setOpportunityId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [optionState, setOptionState] = useState({
    canKanban: false,
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

  const handleClickKanban = () => {
    handleOptionChange("canKanban", !optionState.canKanban);
  };

  const handleClickEdit = (idToEdit = null) => {
    setOpportunityId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  // const handleClickView = (idToView = null) => {
  //   setOpportunityId(idToView);
  //   handleOptionChange("canView", !optionState.canView);
  // };

  const handleClickDelete = async (idToDelete = null) => {
    setOpportunityId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container maxWidth="xl">
      <ListOpportunity
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        // handleClickView={handleClickView}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateOpportunity
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditOpportunity
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          idToEdit={opportunityId}
          setRefresh={setRefresh}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {/* {optionState.canView && (
        <ViewOpportunity
        handleClickView={handleClickView}
        optionState={optionState}
        idToView={opportunityId}
        setRefresh={setRefresh}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )} */}
      {optionState.canDelete && (
        <DeleteOpportunity
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefresh={setRefresh}
          idToDelete={opportunityId}
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
