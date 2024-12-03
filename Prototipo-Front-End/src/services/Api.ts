import { ArtesanatoModel } from "../models/ArtesanatoModel";
import { ArtesaoModel } from "../models/ArtesaoModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { LoginModel } from './../models/LoginModel';
import axios from "axios";

const apiRequest = async <T>(url: string, data?: any, method: string = "POST"): Promise<T> => {
  try {
    const headers: any = {};

    // Verifica se a data inclui FormData (ou seja, se está lidando com arquivos)
    if (data instanceof FormData) {
      // Não defina o Content-Type explicitamente para FormData
      // O navegador vai fazer isso automaticamente com o tipo correto.
      delete headers["Content-Type"]; // Garante que o Content-Type seja removido
    } else {
      headers["Content-Type"] = "application/json"; // Define para JSON se não for FormData
    }

    // Fazendo a requisição com Axios
    const response = await axios({
      method,
      url: `https://localhost:7215/api/${url}`, // Substitua pela URL correta
      data,
      headers
    });

    return response.data; // Retorna apenas os dados da resposta
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

//#region ------------------------------------------------ LOGIN USUÁRIO ------------------------------------------------//
export const loginUsuario = async (login: LoginModel): Promise<LoginModel> => {
  const response = await apiRequest<LoginModel>("Authentication/login", login);
  return response;
};
//#endregion

//#region ------------------------------------------------ USUÁRIOS -------------------------------------------------//
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

//#region ------------------------------------------------ ARTESÃOS -------------------------------------------------// 
// LISTAR ARTESÃOS   - GET
export const listarArtesaos = async (): Promise<ArtesaoModel[]> => {
  // Passa o tipo de resposta como um array de UsuarioModel
  const artesaos = await apiRequest<ArtesaoModel[]>("artesao", null, "GET");
  console.log("Usuários retornados da API:", JSON.stringify(artesaos, null, 2));
  return artesaos
};
// CADASTRAR ARTESÃO - POST
export const cadastrarArtesao = async (artesao: ArtesaoModel) => {
  console.log("Artesão enviado para a API:", JSON.stringify(artesao, null, 2));
  const formData = new FormData();

  // Adicionando os dados ao FormData
  Object.entries(artesao).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value); // Se for um arquivo (File)
    } else if (Array.isArray(value)) {
      // Adiciona arrays no formato key[index]
      value.forEach((item, index) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}[${index}]`, item.toString());
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString()); // Adiciona outros tipos como string
    }
  });

  // Loga o conteúdo do FormData para depuração
  //console.log("FormData enviado:");
  // formData.forEach((value, key) => {
  //   console.log(`${key}:`, value);
  // });

  // Chama a função apiRequest com o FormData
  return await apiRequest<FormData>("artesao", formData, "POST");
};
//ATUALIZAR ARTESÃO  - PUT
export const atualizaArtesao = async (id: string, artesaoAtualizado: FormData): Promise<ArtesaoModel> => {
  if (!id) {
    throw new Error("O ID do artesão é inválido.");
  }

  // if (!artesaoAtualizado || Object.keys(artesaoAtualizado).length === 0) {
  //   throw new Error("Os dados para atualização são inválidos.");
  // }

  try {
    // Faz a requisição para atualizar o artesão
    console.log("Artesão enviado para a API:", JSON.stringify(artesaoAtualizado, null, 2));
    const artesao = await apiRequest<ArtesaoModel>(`artesao/${id}`, artesaoAtualizado, "PUT");

    console.log("Artesão atualizado:", JSON.stringify(artesao, null, 2));
    return artesao;
  } catch (error) {
    console.error("Erro ao atualizar o artesão:", error);
    throw new Error("Erro ao atualizar o artesão. Tente novamente mais tarde.");
  }


};
//EXCLUIR ARTESÃO    - DELETE
export const deleteArtesao = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error("O ID do artesão é inválido.");
  }

  try {
    await apiRequest<void>(`artesao/${id}`, null, "DELETE");
    console.log(`Artesão com ID ${id} foi excluído com sucesso.`);
  } catch (error) {
    console.error("Erro ao excluir artesão:", error);
    throw new Error("Erro ao excluir artesão. Tente novamente mais tarde.");
  }
};
//BUSCAR [POR ID]    - GETBYID
export const buscarArtesaoPorId = async (id: string): Promise<ArtesaoModel> => {
  if (!id) {
    throw new Error("O ID do artesão é inválido.");
  }

  try {
    const artesao = await apiRequest<ArtesaoModel>(`artesao/${id}`, null, "GET");
    console.log("método buscarArtesaoPorId retornado da API:", JSON.stringify(artesao, null, 2));
    return artesao;
  } catch (error) {
    console.error("Erro ao buscar artesão por ID:", error);
    throw new Error("Erro ao buscar artesão. Tente novamente mais tarde.");
  }
};
//BUCAR [POR NOME]   - GETBYNAME
export const buscarArtesaoPorNome = async (nome: string): Promise<ArtesaoModel | null> => {
  if (!nome) {
    throw new Error("O nome do artesão é inválido.");
  }

  try {
    const artesao = await apiRequest<ArtesaoModel>(`Artesao/ObterNomeArtesanato/${nome}`, null, "GET");
    console.log("Artesão retornado da API:", JSON.stringify(artesao, null, 2));
    return artesao || null; // Retorna null caso não encontre
  } catch (error) {
    console.error("Erro ao buscar artesão por nome:", error);
    throw new Error("Erro ao buscar artesão. Tente novamente mais tarde.");
  }
};
//#endregion

//#region ------------------------------------------------ ARTESANATOS -------------------------------------------------//
export const listarArtesanatos = async (): Promise<ArtesanatoModel[]> => {
  // Passa o tipo de resposta como um array de ArtesanatoModel
  const artesanatos = await apiRequest<ArtesanatoModel[]>("artesanato", null, "GET");
  console.log("Artesanatos retornados da API:", JSON.stringify(artesanatos, null, 2));
  return artesanatos
};
export const cadastrarArtesanato = async (artesanato: FormData) => {
  console.log("Usuário enviado para a API:", JSON.stringify(artesanato, null, 2));
  return apiRequest("artesanato", artesanato);
};
// Função para obter Artesanato por ID
export const BuscarArtesanatoPorId = async (id: string): Promise<ArtesanatoModel> => {
  if (!id) {
    throw new Error("O ID do artesanato é inválido.");
  }
  try {
    const artesanato = await apiRequest<ArtesanatoModel>(`artesanato/${id}`, null, "GET");
    console.log("Artesanato retornado da API:", JSON.stringify(artesanato, null, 2));
    return artesanato;
  } catch (error) {
    console.error("Erro ao buscar artesanato por ID:", error);
    throw new Error("Erro ao buscar artesanato. Tente novamente mais tarde.");
  }
};
//#endregion