import { Container, Group, Loader, SimpleGrid, Text } from "@mantine/core";
import { ArtesaoModel } from "./../../models/ArtesaoModel";
import { useEffect, useState } from "react";
import CardArtesao from "./CardArtesao";
import { listarArtesaos } from "../../services/Api";

export default function ListarArtesaos() {
  const [artesaos, setArtesaos] = useState<ArtesaoModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Faz a requisição para buscar os artesãos da API
  useEffect(() => {
    const fetchArtesaos = async () => {
      setLoading(true); // Inicia o estado de carregamento
      try {
        const resposta = await listarArtesaos();
        setArtesaos(resposta); // Atualiza o estado com os dados recebidos
        setError(null); // Limpa erros, caso existam
      } catch (erro: any) {
        console.error("Erro ao buscar os artesãos:", erro);
        setError("Não foi possível carregar a lista de artesãos."); // Define a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchArtesaos();
  }, []); // Executa apenas na montagem do componente

  return (
    <section>
      <Container>
        <Text size="xl" mb="lg">
          Lista de Artesãos
        </Text>

        {loading ? (
          <Loader size="xl" />
        ) : error ? (
          <Text c="red">{error}</Text>
        ) : (
          <SimpleGrid cols={2}>            
              {artesaos.map((artesao) => (
                <CardArtesao key={artesao.id} artesao={artesao} />
              ))}            
          </SimpleGrid>
        )}
      </Container>
    </section>
  );
}
