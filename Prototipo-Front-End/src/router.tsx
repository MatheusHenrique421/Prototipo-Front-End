import CadastrarArtesanato from "./views/artesanatos/CadastrarArtesanato";
import CadastrarUsuario from "./views/usuarios/CadastrarUsuario";
import CadastrarArtesao from "./views/artesaos/CadastrarArtesao";
import ListarUsuarios from "./views/usuarios/ListarUsuarios";
import ListarArtesaos from "./views/artesaos/ListarArtesaos";
import EditarUsuario from "./views/usuarios/EditarUsuario";
import ExibirArtesao from "./views/artesaos/ExibirArtesao";
import Artesanatos from "./views/artesanatos/Artesanatos";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./views/root/RootLayout";
import Teste from "./views/usuarios/Teste";
import { Home } from "./views/home/Home";
import Login from "./views/login/Login";
import ExibirArtesanato from "./views/artesanatos/ExibirArtesanato";
import ListarArtesanatos from "./views/artesanatos/ListarArtesanatos";

const router = createBrowserRouter([
  {
    //path: "/",
    element: <RootLayout />, 
    children: [
      { index: true, path: "Home", element: <Home /> }, 
      
      { path: "CadastrarUsuario", element: <CadastrarUsuario /> },
      { path: "ListarUsuarios", element: <ListarUsuarios /> },
      { path: "EditarUsuario", element: <EditarUsuario /> },

      { path: "CadastrarArtesao/:usuarioId", element: <CadastrarArtesao /> },
      { path: "ListarArtesaos", element: <ListarArtesaos /> },
      { path: "ExibirArtesao/:id", element: <ExibirArtesao /> },

      { path: "CadastrarArtesanato", element: <CadastrarArtesanato /> },
      { path: "ListarArtesanatos", element: <ListarArtesanatos /> },
      { path: "ExibirArtesanato/:id", element: <ExibirArtesanato /> },
      { path: "Artesanatos", element: <Artesanatos /> },
      { path: "Teste", element: <Teste /> },
    ],
  },  
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
