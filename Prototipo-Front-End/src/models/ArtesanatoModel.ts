export interface ArtesanatoModel {
    id: string;
    usuarioId: string;
    artesaoId: string;
   // fotoUrl: string;
    imagensArtesanato: string[];
    sobEncomenda: boolean;
    categoriaTags: string[];
    tituloArtesanato: string;
    precoArtesanato: number;
    quantidadeArtesanato: number;
    descricaoArtesanato: string;
    larguraArtesanato: number;
    alturaArtesanato: number;
    comprimentoArtesanato: number;
    pesoArtesanato: number;
    dataCriacao: Date;
    tempoCriacaoHr: string;
}

// Funções relacionadas ao modelo
export const getHoraAtual = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};
