import { atualizaArtesao, buscarArtesaoPorId } from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { ArtesaoModel } from "../../models/ArtesaoModel";
import ArtesaoForm from "../../components/ArtesaoForm"; // Reaproveitando o ArtesaoForm
import { useEffect, useState } from "react";

const EditarArtesao: React.FC = () => {
  const [artesao, setArtesao] = useState<ArtesaoModel | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { id } = useParams(); // Recupera o ID do artesão da URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Busca o artesão por ID quando o componente é montado
      const fetchArtesao = async () => {
        try {
          const artesaoData = await buscarArtesaoPorId(id);
          setArtesao(artesaoData);
        } catch (error: any) {
          setErrorMessage("Erro ao carregar dados do artesão.");
          console.error("Erro ao carregar artesão:", error);
        }
      };

      fetchArtesao();
    }
  }, [id]);

  // Função para submeter as alterações do artesão
  const handleSubmit = async (updatedArtesao: ArtesaoModel) => {
    if (!id) return;

    try {
      const data = await atualizaArtesao(id, updatedArtesao); // Aqui chamamos a função de editar
      console.log("Artesão atualizado com sucesso:", data);
      alert("Artesão atualizado com sucesso!");
      navigate(`/ExibirArtesao/${data.id}`); // Redireciona para a página do artesão após edição
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error("Erro ao atualizar o artesão:", error);
    }
  };

  return (
    <div>
      {artesao ? (
        <ArtesaoForm
          artesao={artesao}
          onSubmit={handleSubmit} // Passando a função de submit
        />
      ) : (
        <p>Carregando dados do artesão...</p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default EditarArtesao;
