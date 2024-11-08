export interface ArtesaoModel {
    id: number;
    usuarioId: number;
    imagemPerfil: string;
    // fotoUrl: string;
    nomeArtesao: string;
    descricaoPerfil: string;
    telefone: string;
    whatsApp: string;
    categoriaArtesanato: string;
    receberEncomendas: boolean;
    enviaEncomendas: boolean;
    CEP: string;
    estado: string;
    cidade: string;
    rua: string;
    bairro: string;
    complemento: string;
    numero: string;
    semNumero: boolean;
}