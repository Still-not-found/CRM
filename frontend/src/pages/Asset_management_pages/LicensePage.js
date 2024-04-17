import { useState } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
// Asset Components
import { CreateLicense, ListLicense, EditLicense } from '../../sections/@dashboard/masters/License_master'
export default function LicensePage(props) {

  const { userData } = props;

  const [value, setValue] = useState("1");
  const [airportId, setAirportId] = useState(null);

  const handleTabChange = (tabChange) => {   // *****************
    setValue(tabChange);
  };

  const handleEditClick = (idToEdit) => {
    setAirportId(idToEdit);
    setValue("3");
  }


  return (
    <Container maxWidth='xl'>
      <TabContext value={value} sx={{ padding: 0 }}>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <ListLicense handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData} />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <CreateLicense handleTabChange={handleTabChange} userData={userData} />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <EditLicense handleTabChange={handleTabChange} idToEdit={airportId} userData={userData} />
        </TabPanel>
      </TabContext>
    </Container>
  );
}