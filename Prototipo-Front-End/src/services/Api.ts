import { ArtesaoModel } from "../models/ArtesaoModel";
import { LoginModel } from './../models/LoginModel';
import axios, { AxiosError } from "axios";

const API_URL = "https://localhost:7215/api";

// Função genérica para fazer requisição para qualquer endpoint
const apiRequest = async (route: string, data: any = null) => {
    try {
        const url = `${API_URL}/${route}`;

        // Se houver dados, fazemos uma requisição POST
        if (data) {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }

        // Caso contrário, fazemos uma requisição GET
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            // Tratamento específico de erros baseados no status da resposta
            if (axiosError.response?.status === 401) {
                console.error("Credenciais incorretas.");
                throw new Error("Credenciais incorretas. Por favor, tente novamente.");
            } else if (axiosError.response?.status === 500) {
                console.error("Erro interno no servidor.");
                throw new Error("Erro interno no servidor. Por favor, tente novamente mais tarde.");
            } else {
                console.error("Erro ao fazer requisição:", error.message);
                throw new Error("Erro ao fazer a requisição. Verifique sua conexão e tente novamente.");
            }
        } else {
            console.error("Erro inesperado:", error);
            throw new Error("Erro inesperado. Por favor, tente novamente.");
        }
    }
};

// Função de Login do usuário
export const loginUsuario = async (login: LoginModel) => {
    const response = await apiRequest("Authentication/login", login);

    response.token
    localStorage.setItem("token", response.token);
    // // Armazenar o token JWT, se a autenticação for bem-sucedida
    // if (response.token) {
    //     localStorage.setItem("token", response.token);
    // } else {
    //     console.warn("Nenhum token retornado pela API.");
    //     throw new Error("Erro ao autenticar. Por favor, verifique suas credenciais.");
    // }
    return response;
};

// Função de cadastro do usuário
export const cadastrarUsuario = async (usuario: { id: number; nome: string }) => {
    return apiRequest("usuario", usuario);
};

// Função de cadastro do artesão
export const cadastrarArtesao = async (artesao: ArtesaoModel) => {
    return apiRequest("artesao", artesao);
};