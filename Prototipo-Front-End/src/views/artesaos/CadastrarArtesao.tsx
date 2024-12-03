import { ArtesaoModel } from "../../models/ArtesaoModel";
import ArtesaoForm from "../../components/ArtesaoForm";

export default function CadastrarArtesao() {
  const initialArtesao: ArtesaoModel = {
    id: "",
    usuarioId: "",
    nomeArtesao: "",
    telefone: "",
    whatsApp: "",
    descricaoPerfil: "",
    receberEncomendas: false,
    enviaEncomendas: false,
    imagemUrl: [],
    imagem: null,
    CEP: "",
    estado: "",
    cidade: "",
    rua: "",
    bairro: "",
    complemento: "",
    numero: "",
    semNumero: false,
    dataCadastro: new Date(),
  };

  const handleSubmit = (artesaoAtualizado: ArtesaoModel) => {
    console.log("cADASTAR ARTESP TE;AA:", artesaoAtualizado);
  };

  return <ArtesaoForm artesao={initialArtesao} onSubmit={handleSubmit} />;
}
