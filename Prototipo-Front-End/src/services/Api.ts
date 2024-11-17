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
export const loginUsuario = async (login: LoginModel) => {
    const response = await apiRequest("Authentication/login", login);

    // response.token
    // localStorage.setItem("token", response.token);
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


// Função de cadastro do artesão
export const cadastrarArtesao = async (artesao: ArtesaoModel) => {
    return apiRequest("artesao", artesao);
};

// // Função para obter artesão por ID
// export const BuscarArtesaoPorId = async (id: number): Promise<ArtesaoModel> => {
//     try {
//         const response = await apiRequest(`artesao/?id=${id}`, null, "GET");
//         return response.data; // Retorne apenas `data`, assumindo que contém o objeto ArtesaoModel
//     } catch (error) {
//         console.error("Erro ao obter artesão:", error);
//         throw error;
//     }
// };

// Função assíncrona para buscar a URL da imagem
export const buscarUrlDaImagem = async (artesaoId: number): Promise<string | null> => {
    try {
        // Fazendo a requisição para a API para buscar a imagem do artesão
        const resposta = await fetch(`http://localhost:5287/api/artesao/ObterImagemArtesao?id=${artesaoId}`);

        if (resposta.ok) {
            // A API retorna um objeto JSON com imagem Base64 e MIME Type
            const data = await resposta.json();

            // Verifica se a resposta contém os campos necessários
            if (data && data.imagemBase64 && data.mimeType) {
                const imagemBase64 = data.imagemBase64; // A string Base64 da imagem
                const mimeType = data.mimeType; // O tipo MIME da imagem (por exemplo: image/jpeg, image/png)

                // Agora você pode usar a string Base64 e o MIME Type para definir a imagem
                const imgElement = document.getElementById('minhaImagem');

                // Verifica se o elemento de imagem existe e faz o cast para HTMLImageElement
                if (imgElement && imgElement instanceof HTMLImageElement) {
                    imgElement.src = `data:${mimeType};base64,${imagemBase64}`; // Usando o tipo MIME dinâmico
                    console.log("Imagem carregada com sucesso");
                } else {
                    console.error('Elemento de imagem não encontrado ou não é um <img> válido.');
                }

                // Se você precisar retornar a URL da imagem (com Base64 e MIME Type)
                return `data:${mimeType};base64,${imagemBase64}`;
            } else {
                console.error('Resposta não contém os dados esperados: imagemBase64 ou mimeType');
                return null;
            }
        } else {
            console.error('Erro ao buscar a imagem:', resposta.statusText);
            return null;
        }
    } catch (erro) {
        // Tratando erros inesperados de forma consistente com o restante do código
        console.error('Erro ao buscar a imagem do artesão:', erro);
        return null;
    }
};
