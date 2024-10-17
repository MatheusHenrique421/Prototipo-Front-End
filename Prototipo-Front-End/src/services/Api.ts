import axios from "axios";

const API_URL = "https://localhost:7215/api/Usuario";

export const cadastrarUsuario = async (usuario: { id: number; nome: string }) => {
    const response = await axios.post(API_URL, usuario);
    return response.data;
};