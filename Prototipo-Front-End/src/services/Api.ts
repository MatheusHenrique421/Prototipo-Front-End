import { ArtesaoModel } from "../models/ArtesaoModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { LoginModel } from './../models/LoginModel';
import axios from "axios";


const apiRequest = async <T>(url: string, data?: any, method: string = "POST"): Promise<T> => {
  try {
    const response = await axios({
      method,
      url: `https://localhost:7215/api/${url}`, // Substitua pela URL correta
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna apenas os dados da resposta, já tipado como T
  } catch (error: any) {
    // Extrai informações detalhadas do erro
    if (error.response) {
      const { status, data } = error.response;
      console.error("Erro da API:", `Status: ${status}`, `Detalhes:`, data);
      throw new Error(`Erro: ${status} - ${JSON.stringify(data, null, 2)}`);
    } else if (error.code === "ERR_NETWORK") {
      console.error("Erro de rede:", error.message);
      throw new Error("Erro de rede: Não foi possível conectar à API.");
    } else {
      console.error("Erro inesperado:", error.message || error);
      throw new Error("Ocorreu um erro inesperado.");
    }
  }
};


// Função de Login do usuário
export const loginUsuario = async (login: LoginModel): Promise<LoginModel> => {
  const response = await apiRequest<LoginModel>("Authentication/login", login);
  return response; // O TypeScript sabe que `response` é do tipo `LoginModel`
};

//#region ------------------------------------------------ USUÁRIOS  -------------------------------------------------//
// Função de cadastro do usuário
export const cadastrarUsuario = async (usuario: UsuarioModel) => {
  console.log("Usuário enviado para a API:", JSON.stringify(usuario, null, 2));
  return await apiRequest<UsuarioModel>("usuario", JSON.stringify(usuario, null, 2), "POST");
};

// Função para listar os usuários
export const listarUsuarios = async (): Promise<UsuarioModel[]> => {
  // Passa o tipo de resposta como um array de UsuarioModel
  const usuarios = await apiRequest<UsuarioModel[]>("usuario", null, "GET");
  console.log("Usuários retornados da API:", JSON.stringify(usuarios, null, 2));
  return usuarios
};
//#endregion "My Region"

//#region ----------------------------------------------- ARTESÃOS  -------------------------------------------------// 

// Função de cadastro do artesão
export const cadastrarArtesao = async (artesao: ArtesaoModel) => {
  return apiRequest("artesao", artesao);
};

// Função de Exibir o cadastro  artesão
export const exibirArtesao = async (): Promise<ArtesaoModel[]> => {
  const artesao = await apiRequest<ArtesaoModel[]>("artesao", null, "GET");
  console.log("Usuários retornados da API:", JSON.stringify(artesao, null, 2));
  return artesao
};

// Função para obter artesão por ID
export const BuscarArtesaoPorId = async (id: string): Promise<ArtesaoModel> => {
  if (!id) {
    throw new Error("O ID do artesão é inválido.");
  }

  try {
    const artesao = await apiRequest<ArtesaoModel>(`artesao/${id}`, null, "GET");
    console.log("Usuário retornado da API:", JSON.stringify(artesao, null, 2));
    return artesao;
  } catch (error) {
    console.error("Erro ao buscar artesão por ID:", error);
    throw new Error("Erro ao buscar artesão. Tente novamente mais tarde.");
  }
};

// Função de cadastro do artesão GETALL
export const listarArtesaos = async (): Promise<ArtesaoModel[]> => {
  // Passa o tipo de resposta como um array de UsuarioModel
  const artesaos = await apiRequest<ArtesaoModel[]>("artesao", null, "GET");
  console.log("Usuários retornados da API:", JSON.stringify(artesaos, null, 2));
  return artesaos
};
//#endregion "My Region"

// Função assíncrona para buscar a URL da imagem
export const buscarUrlDaImagem = async (id: string): Promise<string | null> => {
  
  try {
    const data = await apiRequest<{ imagemBase64: string; mimeType: string }>(
      `artesao/ObterImagemArtesao?id=${id}`,
      undefined,
      "GET"
    );

    if (data?.imagemBase64 && data.mimeType) {
      return `data:${data.mimeType};base64,${data.imagemBase64}`;
    } else {
      console.error("Imagem ou tipo MIME não encontrado na resposta da API.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar a imagem do artesão:", error);
    return null;
  }
};
