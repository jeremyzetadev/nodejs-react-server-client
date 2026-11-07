import { createBrowserRouter } from "react-router-dom";

import RouteApp from "../Routes/RouteApp/RouteApp.jsx"
import RoutePublic from "../Routes/RoutePublic/RoutePublic.jsx";
import RouteAuth from "../Routes/RouteAuth/RouteAuth.jsx";
const Router = createBrowserRouter([
  RouteApp,
  ...RoutePublic,
  ...RouteAuth
]);

export default Router;
