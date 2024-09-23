import { createBrowserRouter } from "react-router-dom";
import { Home } from "./views/home/Home";
import RootLayout from "./views/root/RootLayout";

const router = createBrowserRouter([
  // {
  //     path: "/Login",
  //     element: <Login />,
  //   },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/Home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
