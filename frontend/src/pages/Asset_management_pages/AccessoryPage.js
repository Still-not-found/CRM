import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Accessory Components
import {CreateAccessory,ListAccessory,EditAccessory } from '../../sections/@dashboard/masters/accessory_master'
export default function AccessoryPage(props){

    const {userData} = props;

    const [value, setValue] = useState("1");
    const [airportId,setAirportId]=useState(null);

    const handleTabChange = (tabChange) => {   // *****************
        setValue(tabChange);
      };

      const handleEditClick=(idToEdit)=>{
        setAirportId(idToEdit);
        setValue("3");
      }


    return(
        <Container maxWidth='xl'>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
            <ListAccessory handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData}/>
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
            <CreateAccessory handleTabChange={handleTabChange} userData={userData} />
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditAccessory handleTabChange={handleTabChange} idToEdit={airportId} userData={userData}/>
          </TabPanel>
        </TabContext>
      </Container>
    );
}