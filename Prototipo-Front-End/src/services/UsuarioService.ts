import { apiRequest } from './Api';
import { UsuarioModel } from '../models/UsuarioModel';

export const cadastrarUsuario = async (usuario: UsuarioModel) => {
  return await apiRequest<UsuarioModel>("Usuario/AdicionarUsuario", JSON.stringify(usuario), "POST");
};

export const listarUsuarios = async (): Promise<UsuarioModel[]> => {
  return await apiRequest<UsuarioModel[]>("usuario", null, "GET");
};
