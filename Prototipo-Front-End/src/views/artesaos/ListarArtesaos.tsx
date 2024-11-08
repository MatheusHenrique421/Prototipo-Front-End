import { Container, Group, Loader, Text } from "@mantine/core";
import { ArtesaoModel } from "./../../models/ArtesaoModel";
import { useEffect, useState } from "react";
import CardArtesao from "./CardArtesao";
import axios from "axios";

export default function ListarArtesaos() {
  const [artesaos, setArtesaos] = useState<ArtesaoModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Faz a requisição para buscar os artesãos da API
  useEffect(() => {
    const fetchArtesaos = async () => {
      try {
        const response = await axios.get("http://localhost:5287/api/Artesao");
        setArtesaos(response.data); // Atualiza o estado com os dados recebidos
        setLoading(false); // Para o carregamento
      } catch (error) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              `Erro ${error.response.status}: ${
                error.response.data?.message || "Falha ao carregar os artesãos"
              }`
            );
          } else if (error.request) {
            setError(
              "Nenhuma resposta do servidor. Verifique sua conexão ou o status do servidor."
            );
          } else {
            setError(`Erro inesperado: ${error.message}`);
          }
        } else {
          setError(`Erro: ${error}`);
        }

        console.error("Detalhes do erro:", error);
      }
    };

    fetchArtesaos();
  }, []);

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
          <Group>
            {artesaos.map((artesao) => (
              <CardArtesao key={artesao.id} artesao={artesao} />
            ))}
          </Group>
        )}
      </Container>
    </section>
  );
}
