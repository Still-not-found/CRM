// component
import SvgColor from "../../../components/svg-color";
import Iconify from "../../../components/iconify";
import DescriptionIcon from "@mui/icons-material/Description";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: "inherit", height: "inherit" }}
  />
);

const navConfig = [
  {
    title: "PUBLIC",
    content: [
      // Overview
      {
        title: "dashboard",
        path: "/app/dashboard",
        icon: <Iconify icon={"fa-solid:tachometer-alt"} width={24} />,
      },
      {
        title: "CRM",
        path: "/app/dashboard",
        icon: <Iconify icon={"cib:civicrm"} width={24} />,
        children: [
          // {
          //   title: "Printer",
          //   path: "/app/asset_management/printer",
          //   icon: <Iconify icon={"fluent-mdl2:connect-contacts"} width={24} />
          // },
      {
        title: "Customer",
        path: "/app/asset_management/account",
        icon: <Iconify icon={"mdi:account-sync"} width={24} />
      },

      {
        title: "Contact",
        path: "/app/asset_management/contact",
        icon: <Iconify icon={"fluent-mdl2:connect-contacts"} width={24} />
      },
      {
        title: "Lead",
        path: "/app/asset_management/lead",
        icon: <Iconify icon={"mdi:lead-pencil"} width={24} />
      },
      {
        title: "Opportunity",
        path: "/app/asset_management/opportunity",
        icon: <Iconify icon={"ep:opportunity"} width={24} />
      }, 
      // {
      //   title: "Invoice",
      //   path: "/app/asset_management/invoice",
      //   icon: <Iconify icon={"flowbite:file-invoice-solid"} width={24} />
      // },
      // {
      //   title: "Products",
      //   path: "/app/asset_management/product",
      //   icon: <Iconify icon={"teenyicons:computer-solid"} width={24} />
      // },
    ],
  },
//   {
//     title: "Selling",
//     path: "/app/dashboard",
//     icon: <Iconify icon={"fa-solid:tachometer-alt"} width={24} />,
//     children: [
//   {
//     title: "Customer",
//     path: "/app/asset_management/account",
//     icon: <Iconify icon={"mdi:account-sync"} width={24} />
//   },
//   {
//     title: "Quotation",
//     path: "/app/asset_management/contact",
//     icon: <Iconify icon={"fluent-mdl2:connect-contacts"} width={24} />
//   },
//   {
//     title: "Sales Order",
//     path: "/app/asset_management/lead",
//     icon: <Iconify icon={"mdi:lead-pencil"} width={24} />
//   },
//   {
//     title: "Sales Invoice",
//     path: "/app/asset_management/opportunity",
//     icon: <Iconify icon={"ep:opportunity"} width={24} />
//   }, 
// ],
// },
    ],
  },
];

export default navConfig;
