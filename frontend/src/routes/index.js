import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Emloyeespage from "../pages/Emloyeespage";
import Addvisitorpage from "../pages/Addvisitorpage";
import Signin from "../pages/signinpage";
import Profilepage from "../pages/Profilepage";
import Employeedetails from "../pages/Employeedetails";
import Adminhome from "../Admindashboard/Adminhome";
import AdminEmployees from "../Admindashboard/Adminemployees";
import Adminemployeedetails from "../Admindashboard/Employeedetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "employees",
        element: <Emloyeespage />,
      },
      {
        path: "addvisitor",
        element: <Addvisitorpage />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "profile",
        element: <Profilepage />,
      },
      {
        path: "employedetails", // Fixed the typo here
        element: <Employeedetails />,
      },
      {
        path: "admindashboard",
        element: <Adminhome />,
      },
      { path: "adminemployees", element: <AdminEmployees /> },
      { path: "employeesdetails", element: <Adminemployeedetails /> },
    ],
  },
]);

export default router;
