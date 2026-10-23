import PagePublic from "../../Pages/PagePublic/PagePublic.jsx";
import PageError404 from "../../Pages/PagePublic/PageError404.jsx";
const publicRoutes = [
    { path: "/pagePublic", element: <PagePublic /> },
    { path: "/pageError404", element: <PageError404 /> }
];
export default publicRoutes;
