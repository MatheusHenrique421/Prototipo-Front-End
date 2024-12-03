export interface ArtesaoModel {
    id: string;
    usuarioId: string;
    imagemUrl: string[];
    imagem: File | null;
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
    dataCadastro: Date;
}

export interface ArtesaoFormProps {
    artesao: ArtesaoModel;
    onSubmit: (artesaoAtualizado: ArtesaoModel) => void;
}