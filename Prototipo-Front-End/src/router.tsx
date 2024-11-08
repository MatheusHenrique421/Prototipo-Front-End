import { createBrowserRouter } from "react-router-dom";
import { Home } from "./views/home/Home";
import Artesanatos from "./views/artesanatos/Artesanatos";
import CadastroUsuario from "./views/usuarios/CadastroUsuario";
import RootLayout from "./views/root/RootLayout";
import ListarUsuarios from "./views/usuarios/ListarUsuarios";
import Login from "./views/login/Login";
import EditarUsuario from "./views/usuarios/EditarUsuario";
import ListarArtesaos from "./views/artesaos/ListarArtesaos";
import CadastroArtesao from "./views/artesaos/CadastroArtesao";
import ExibirArtesao from "./views/artesaos/ExibirArtesao";

const router = createBrowserRouter([
  {
    index: true,
    path: "/CadastroUsuario",
    element: <CadastroUsuario />,
  },
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/Index",
    element: <RootLayout />,
  },
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
    path: "/ListarArtesaos",
    element: <ListarArtesaos />,
  },

  {
    index: true,
    path: "/CadastroArtesao",
    element: <CadastroArtesao />,
  },
  {
    index: true,
    path: "/ExibirArtesao",
    element: <ExibirArtesao />,
  },
  {
    index: true,
    path: "/ListarUsuarios",
    element: <ListarUsuarios />,
  },
  {
    index: true,
    path: "/EditarUsuario",
    element: <EditarUsuario />,
  },

  // {
  //   path: "/",
  //   element: (
  //     <AuthContext.Provider value={{ ... }}>
  //       <RootLayout />
  //     </AuthContext.Provider>
  //   ),
  //   children: [
  //     // ... outras rotas
  //   ],
  // },
]);

export default router;
