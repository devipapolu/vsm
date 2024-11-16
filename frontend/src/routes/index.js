import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Emloyeespage from "../pages/Emloyeespage";
import Addvisitorpage from "../pages/Addvisitorpage";
import Signin from "../pages/signinpage";
import Main from "../components/Main";
import Profilepage from "../pages/Profilepage";

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
        element: <Addvisitorpage></Addvisitorpage>,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "profile",
        element: <Profilepage />,
      },
    ],
  },
]);

export default router;
