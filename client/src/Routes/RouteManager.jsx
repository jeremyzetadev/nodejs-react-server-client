import { createBrowserRouter } from "react-router-dom";

import RoutePublic from "../Routes/RoutePublic/RoutePublic.jsx";
import RouteApp from "../Routes/RouteApp/RouteApp.jsx"
const Router = createBrowserRouter([
  RouteApp,
  ...RoutePublic
]);

export default Router;
