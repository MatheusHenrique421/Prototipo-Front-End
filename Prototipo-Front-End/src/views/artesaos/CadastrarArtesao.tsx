import ArtesaoForm from "../../components/ArtesaoForm";
import { ArtesaoModel } from "../../models/ArtesaoModel";

export default function CadastrarArtesao() {
  // Instância inicial do modelo ArtesaoModel
  const initialArtesao: ArtesaoModel = {
    id: "",
    nomeArtesao: "",
    telefone: "",
    whatsApp: "",
    descricaoPerfil: "",
    usuarioId: "",
    receberEncomendas: false,
    enviaEncomendas: false,
    fotoUrl: "",
    imagemPerfil: "",
    CEP: "",
    estado: "",
    cidade: "",
    rua: "",
    bairro: "",
    complemento: "",
    numero: "",
    semNumero: false,
  };

  // Função de callback para manipular o envio do formulário
  const handleSubmit = (updatedArtesao: ArtesaoModel) => {
    console.log("Dados enviados:", updatedArtesao);
    // Aqui você pode implementar a lógica para salvar os dados, como chamar uma API
  };

  return <ArtesaoForm artesao={initialArtesao} onSubmit={handleSubmit} />;
}