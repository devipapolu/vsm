import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Emloyeespage from "../pages/Emloyeespage";
import Addvisitorpage from "../pages/Addvisitorpage";
import Signin from "../pages/signinpage";
import Profilepage from "../pages/Profilepage";
import Employeedetails from "../pages/Employeedetails";

const router = createBrowserRouter(
  [
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
          path: "/employedetails",
          element: <Employeedetails />,
        },
      ],
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true, // Your previous flag
      v7_normalizeFormMethod: true, // New flag for form method no rmalization
    },
  }
);

export default router;
