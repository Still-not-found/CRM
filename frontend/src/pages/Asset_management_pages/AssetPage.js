import { useState } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
// Asset Components
import { CreateAsset, ListAsset, EditAsset } from '../../sections/@dashboard/masters/asset_master'
export default function AssetPage(props) {

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
          <ListAsset handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData} />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <CreateAsset handleTabChange={handleTabChange} userData={userData} />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <EditAsset handleTabChange={handleTabChange} idToEdit={airportId} userData={userData} />
        </TabPanel>
      </TabContext>
    </Container>
  );
}