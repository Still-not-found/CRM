import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import {useState, useEffect} from 'react';
import axios from "axios";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, List, ListItem, ListItemText, } from '@mui/material';
// components
import Iconify from '../components/iconify';
import Icon from '@mui/material/Icon';
import SvgColor from '../components/svg-color';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import users from '../_mock/user';
import AppQuotesCreated from '../sections/@dashboard/app/AppQuotesCreated';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/${name}.svg`}
    sx={{ width: "inherit", height: "inherit" }}
  />
);

export default function DashboardAppPage ({DB_URL}) {
  const [users, setUsers]=useState('0');
  const [quotes, setQuotes]=useState('0');
  const [data, setData]=useState([]);
  const [chard, setChard]=useState({labels:[],series:[]});
  const theme = useTheme();
  
  useEffect(()=>{
    let labels=[];
    let series=[];
    for(let i=0;i<data.length; i++){
      labels=[...labels,...[[data[i]['first_name'],data[i]['last_name']]]];
      series=[...series,...[data[i]['created_count']]];
    }
    setChard({labels,series});
  },[data])

  useEffect(()=>{
    setTimeout(async()=>{
      await axios
      .get(`${DB_URL}/api/dashboard`)
      .then((data) => {setUsers(data.data[0]['tot_users'], setQuotes(data.data[0]['tot_quotes']),setData(data.data[0]['data']))})
      .catch((error) => console.log(error));
    },500);
  },[])

  return (
    <>
      <Helmet>
        <title> Dashboard | Refex AssetManager </title>
      </Helmet>

      <Container maxWidth="x1">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3} >

        <Grid item xs={12} sm={4} md={4}>
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Your Shortcuts</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>Lead <span style={{ transform: 'rotate(315deg)', color: '#212B36',display: 'flex', marginLeft: '4px', marginTop: '2px' }}>
          <ArrowForwardIcon />
        </span></Typography>
          </Grid> 
                <Grid item xs={12} sm={6} md={3}>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>Opportunity <span style={{ transform: 'rotate(315deg)', color: '#212B36',display: 'flex', marginLeft: '4px', marginTop: '2px' }}>
          <ArrowForwardIcon />
        </span></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>Customer <span style={{ transform: 'rotate(315deg)', color: '#212B36',display: 'flex', marginLeft: '4px', marginTop: '2px' }}>
          <ArrowForwardIcon />
        </span></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>Sales Analytics<span style={{ transform: 'rotate(315deg)', color: '#212B36',display: 'flex', marginLeft: '4px', marginTop: '2px' }}>
          <ArrowForwardIcon />
        </span></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Typography style={{ display: 'flex', alignItems: 'center' }}>Dashboard <span style={{ transform: 'rotate(315deg)', color: '#212B36',display: 'flex', marginLeft: '4px', marginTop: '2px' }}>
          <ArrowForwardIcon />
        </span></Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                </Grid>

        <Grid item xs={12} sm={4} md={4}>
              <Typography sx={{ fontSize: '19.92px', fontWeight: 'bold', }}>Reports & Masters</Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Sales Pipeline</Typography>
            <List>
          <ListItem>
            <ListItemText primary="Lead" />
            <Icon icon="solar:arrow-right-up-linear" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Opportunity" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Customer" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Contract" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Appointment" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Newsletter" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Communication" />
          </ListItem>
        </List>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Masters</Typography>
            <List>
          <ListItem>
            <ListItemText primary="Territory" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Customer Group" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Prospect" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sales Person" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sales Stage" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lead Source" />
          </ListItem>
        </List>
          </Grid> 
         
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Reports</Typography>
            <List>
            <ListItem style={{ display: 'flex', alignItems: 'center' }}>
      <ListItemText primary="Lead Details" />
      <ArrowForwardIcon style={{ transform: 'rotate(315deg)', color: '#212B36', marginLeft: '4px', marginTop: '2px' }} />
    </ListItem>
          <ListItem>
            <ListItemText primary="Sales Pipeline Analytics" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Oppurtunity Summary by Sales Stage" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sales Funnel" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Prospects Enagaged But Not Converted" />
          </ListItem>
          <ListItem>
            <ListItemText primary="First Response Time for Opportunity" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Inactive Customers" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Campaign Efficiency" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lead Owner Efficiency" />
          </ListItem>
        </List>
          </Grid>

          
          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Campaign</Typography>
            <List>
          <ListItem>
            <ListItemText primary="Campaign" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email Campaign" />
          </ListItem>
          <ListItem>
            <ListItemText primary="SMS Center" />
          </ListItem>
          <ListItem>
            <ListItemText primary="SMS Log" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email Group" />
          </ListItem>
          <ListItem>
          <ListItemText primary="Lead Owner Efficiency" />
          </ListItem>

        </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Campaign</Typography>
            <List>
          <ListItem>
            <ListItemText primary="CRM Settings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="SMS Settings" />
          </ListItem>
         
        </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="div" fontWeight="bold">Maintenance</Typography>
            <List>
          <ListItem>
            <ListItemText primary="Maintenance Schedule" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Maintenance Visit" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Warrenty Claim" />
          </ListItem>
        </List>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
          {/* <Grid item xs={12} md={8} lg={8}>
            <AppQuotesCreated title="Total Quotations"
              subheader="Created by the users"
              chartLabels={chard.labels}
              chartData={chard.series}
              />
          </Grid> */}

          {/* <Grid item xs={12} md={8} lg={8}>
            <AppWebsiteVisits
              title="Total Quotations"
              subheader="Created by the users"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
