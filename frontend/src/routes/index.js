import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
