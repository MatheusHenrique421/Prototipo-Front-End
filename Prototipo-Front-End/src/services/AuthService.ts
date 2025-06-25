import { apiRequest } from './Api';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';

export const loginUsuario = async (dados: LoginRequest): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>("Auth/Login", dados, "POST");

  if (response.Token) {
    console.log("Token recebido AUTHSERVICE:", response.Token); // 🔐 Verifica se o token foi recebido
    localStorage.setItem("token", response.Token); // 🔐 Agora salva o token
  } else {
    throw new Error("Token não retornado pela API.");
  }

  return response;
};
