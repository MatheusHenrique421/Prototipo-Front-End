export interface ArtesanatoModel {
    id: string;
    usuarioId: string;
    artesaoId: string;
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
}