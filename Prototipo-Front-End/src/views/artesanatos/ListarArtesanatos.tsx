import { Container, Loader, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import CardArtesanato from "./CardArtesanato";
import { listarArtesanatos } from "../../services/Api";
export default function ListarArtesanatos() {
  const [artesanatos, setArtesanatos] = useState<ArtesanatoModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
    // Faz a requisição para buscar os artesanatos da API
    useEffect(() => {
        const fetchArtesanatos = async () => {
          setLoading(true); // Inicia o estado de carregamento
          try {
            const resposta = await listarArtesanatos();
            setArtesanatos(resposta); // Atualiza o estado com os dados recebidos
            setError(null); // Limpa erros, caso existam
          } catch (erro: any) {
            console.error("Erro ao buscar os artesanatos:", erro);
            setError("Não foi possível carregar a lista de artesanatos."); // Define a mensagem de erro
          } finally {
            setLoading(false); // Finaliza o carregamento
          }
        };
    
        fetchArtesanatos();
      }, []); // Executa apenas na montagem do componente
  return (
    <section>
      <Container>
      <Text size="xl" mb="lg">
          Explore por artesanatos
        </Text>

        {loading ? (
          <Loader size="xl" />
        ) : error ? (
          <Text c="red">{error}</Text>
        ) : (
          <SimpleGrid cols={2}>            
              {artesanatos.map((artesanatos) => (
                <CardArtesanato key={artesanatos.id} artesanato={artesanatos} />
              ))}            
          </SimpleGrid>
        )}
      </Container>
    </section>
  );
}
