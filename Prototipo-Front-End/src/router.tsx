import { createBrowserRouter } from "react-router-dom";
import { Home } from "./views/home/Home";
import Artesanatos from "./views/artesanatos/Artesanatos";
import CadastroUsuario from "./views/usuarios/CadastroUsuario";

import RootLayout from "./views/root/RootLayout";
import ListarUsuarios from "./views/usuarios/ListarUsuarios";
import Login from "./views/login/Login";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    index: true,
    path: "/CadastroUsuario",
    element: <CadastroUsuario />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/Home",
        element: <Home />,
      },
      {
        index: true,
        path: "/Artesanatos",
        element: <Artesanatos />,
      },
      {
        index: true,
        path: "/ListarUsuarios",
        element: <ListarUsuarios />,
      },
    ],
  },
]);

export default router;
