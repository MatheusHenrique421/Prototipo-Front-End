export interface ArtesaoModel {
    id: string;
    usuarioId: string;
    imagemPerfil: string;
    fotoUrl: string;
    nomeArtesao: string;
    descricaoPerfil: string;
    telefone: string;
    whatsApp: string;    
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