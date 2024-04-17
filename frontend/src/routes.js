import { Navigate, useNavigate, useLocation, useRoutes } from 'react-router-dom';
import { useState,useEffect } from 'react';
// layouts ----------------------------------------------------
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages ------------------------------------------------------
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LogoutPage from './pages/LogoutPage';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
// Asset Management 
import AssetPage from './pages/Asset_management_pages/AssetPage';
import OppurtunityPage from './pages/Asset_management_pages/OpportunityPage';
// import AssetCreate from './pages/Asset_management_pages/AssetCreate';
import LicensePage from './pages/Asset_management_pages/LicensePage';
import CompanyPage from './pages/Asset_management_pages/CompanyPage';
import StatusPage from './pages/Asset_management_pages/StatusPage';
// import ComputerPage from './pages/Asset_management_pages/ComputerPage';
import ManufacturerPage from './pages/Asset_management_pages/ManufacturerPage';
import AccessPointPage from './pages/Asset_management_pages/AccessPointsPage'
import LocationPage from './pages/Asset_management_pages/LocationPage';
import SupplierPage from './pages/Asset_management_pages/SupplierPage';
import PrinterPage from './pages/Asset_management_pages/PrinterPage';
import RouterPage from './pages/Asset_management_pages/RouterPage';
import ServerPage from './pages/Asset_management_pages/ServerPage';
import SmartPhonePage from './pages/Asset_management_pages/SmartPhonePage';
import SwitchesPage from './pages/Asset_management_pages/SwitchesPage';
import TabletPage from './pages/Asset_management_pages/TabletPage';
import WorkStationPage from './pages/Asset_management_pages/WorkStationPage';
import UnauditedWorkstationPage from './pages/Asset_management_pages/UnauditedWorkstationPage';
// import AccessoryPage from './pages/Asset_management_pages/AccessoryPage';
import ConsumablePage from './pages/Asset_management_pages/ConsumablePage';
import ComponentPage from './pages/Asset_management_pages/ComponentPage';
import LeadPage from './pages/Asset_management_pages/LeadPage';
import AccountPage from './pages/Asset_management_pages/AccountPage';
import ContactPage from './pages/Asset_management_pages/ContactPage';
import OpportunityPage from './pages/Asset_management_pages/OpportunityPage';
import InvoicePage from './pages/Asset_management_pages/InvoicePage';
import ProductPage from './pages/Asset_management_pages/ProductPage';
// QR Pages -----------------------------------------------------

import ComputerViewPage from './pages/Asset_management_pages/ComputerViewPage';
import AccesspointViewPage from './pages/QRPages/AccessPointViewPage';
import TabletViewPage from './pages/QRPages/TabletViewPage';
import SmartphoneViewPage from './pages/QRPages/SmartPhoneViewPage';
import PrinterViewPage from './pages/QRPages/PrinterViewPage';
import  RouterViewPage from './pages/QRPages/RouterViewPage';
import  ServerViewPage from './pages/QRPages/ServerViewPage';
// Masters -----------------------------------------------------

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ComputerPage from './pages/Asset_management_pages/ComputerPage';

// -------------------------------------------------------------


export default function Router({DB_URL}) {

  let sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if(sessionData===null){
    sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  }
  const [isLoggedIn, setIsLoggedIn] = useState(!(sessionData==null));

  const sessionId = isLoggedIn?sessionData.id:null;
  const userData = isLoggedIn?sessionData.userData:null;
  const loggedInUserId =isLoggedIn?sessionData.userData.user_id:null;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
  };

 const routes = useRoutes([
    {
      path: '/app',
      element: isLoggedIn ? <DashboardLayout userData={userData}/>:<Navigate to={"/404"}/>,
      children: [
        { element: <Navigate to="/app/dashboard" />, index: true },
        { path: 'dashboard', element: isLoggedIn ? <DashboardAppPage DB_URL={DB_URL}/> : <Navigate to={"/404"}/> },
        { path: 'user', element: <UserPage /> },
        
        { path: 'asset_management', children: [
          { element: <Navigate to="/app/asset_management/lead"/>, index: true },
          { path: 'asset', element: isLoggedIn ? <AssetPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'computer', element: isLoggedIn ? <ComputerPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'lead', element: isLoggedIn ? <LeadPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'account', element: isLoggedIn ? <AccountPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'invoice', element: isLoggedIn ? <InvoicePage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'product', element: isLoggedIn ? <ProductPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'contact', element: isLoggedIn ? <ContactPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'opportunity', element: isLoggedIn ? <OpportunityPage userData={userData}/> : <Navigate to={"/404"}/> },
          //  { path: 'asset_create', element: isLoggedIn ? <AssetCreate userData={userData}/> : <Navigate to={"/404"}/>},
          { path: 'component', element: isLoggedIn ? <ComponentPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'consumable', element: isLoggedIn ? <ConsumablePage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'license', element: isLoggedIn ? <LicensePage userData={userData}/> : <Navigate to={"/404"}/> },
          // { path: 'accessory', element: isLoggedIn ? <AccessoryPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'accesspoint', element: isLoggedIn ? <AccessPointPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'location', element: isLoggedIn ? <LocationPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'supplier', element: isLoggedIn ? <SupplierPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'printer', element: isLoggedIn ? <PrinterPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'router', element: isLoggedIn ? <RouterPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'server', element: isLoggedIn ? <ServerPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'smartphone', element: isLoggedIn ? <SmartPhonePage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'switch', element: isLoggedIn ? <SwitchesPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'tablet', element: isLoggedIn ? <TabletPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'workstation', element: isLoggedIn ? <WorkStationPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'unauditedworkstation', element: isLoggedIn ? <UnauditedWorkstationPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'company', element: isLoggedIn ? <CompanyPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'status', element: isLoggedIn ? <StatusPage userData={userData}/> : <Navigate to={"/404"}/> },
          { path: 'manufacturer', element: isLoggedIn ? <ManufacturerPage userData={userData}/> : <Navigate to={"/404"}/> },
          
        ]},
      ],
    },
    {
      path: '/computer_detail/:computerId',
      element: <ComputerViewPage  />,
    },
    {
      path: '/accesspoint_detail/:accesspointId',
      element: <AccesspointViewPage />,
    },
    {
      path: '/tablet_detail/:tabletId',
      element: <TabletViewPage />,
    },
    {
      path: '/smartphone_detail/:smartphoneId',
      element: <SmartphoneViewPage />,
    },
    {
      path: '/server_detail/:nserverId',
      element: <ServerViewPage />,
    },
    {
      path: '/router_detail/:nrouterId',
      element: <RouterViewPage />,
    },
    {
      path: '/printer_detail/:printerId',
      element: <PrinterViewPage />,
    },
    {
      path: '/login',
      element: <LoginPage setIsLoggedIn={setIsLoggedIn}/>,
    },
    {
      path: '/logout',
      element: <LogoutPage handleLogout={handleLogout} sessionId={sessionId}/>
    },
    { path: '/register', 
      element:<RegisterPage/>
    },
    {
      element: <SimpleLayout />,
      children: [
        { element:  isLoggedIn ?  <Navigate to="/app/dashboard" /> : <Navigate to="/login" />, index: true },
        { path: 'mail_verification/:token', element:<VerifyEmailPage />},
        { path: 'forgot_password', element:<ForgotPasswordPage/>},
        { path: 'reset_password/:token', element: <ResetPasswordPage/> },
        { path: '404', element: <Page404 isLoggedIn={isLoggedIn}/> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
