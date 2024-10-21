import axios, { AxiosError } from "axios";

const API_URL = "https://localhost:7215/api/Usuario";

interface LoginResponse {
    token: string;
    // adicione quaisquer outros campos que você está esperando na resposta
}

interface Credenciais {
    email: string;
    senha: string;
}

export const loginUsuario = async (credenciais: Credenciais): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, credenciais);
        // Armazenar o token JWT ou outra resposta de sucesso
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            // Verificar se é um erro de credenciais incorretas
            if (axiosError.response?.status === 401) {
                console.error("Credenciais incorretas.");
                throw new Error("Credenciais incorretas. Por favor, tente novamente.");
            } else if (axiosError.response?.status === 500) {
                console.error("Erro interno no servidor.");
                throw new Error("Erro interno no servidor. Por favor, tente novamente mais tarde.");
            } else {
                console.error("Erro ao fazer login:", error.message);
                throw new Error("Erro ao fazer login. Verifique sua conexão e tente novamente.");
            }
        } else {
            console.error("Erro inesperado:", error);
            throw new Error("Erro inesperado. Por favor, tente novamente.");
        }
    }
};

export const cadastrarUsuario = async (usuario: { id: number; nome: string }) => {
    const response = await axios.post(API_URL, usuario);
    return response.data;
};