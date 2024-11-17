import { Card, Image, Text, Badge, Button } from "@mantine/core";
import { ArtesaoModel } from "../../models/ArtesaoModel";
import { buscarUrlDaImagem } from "../../services/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CardArtesaoProps {
  artesao: ArtesaoModel;
}

export default function CardArtesao({ artesao }: CardArtesaoProps) {
    const [urlDaImagem, setUrlDaImagem] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    
  // Verifica se o ID do artesão é válido antes de tentar buscar a imagem
  useEffect(() => {
    if (!artesao.id || artesao.id === null) {
      console.warn("ID do artesão não encontrado ou inválido:", artesao.id);
      return; // Não faz a requisição se o ID for zero ou inválido
    }

    const buscarImagem = async () => {
      try {
        // Buscando a URL da imagem usando o ID do artesão
        const dataUri = await buscarUrlDaImagem(parseInt(artesao.id));
        console.log("ID do Artesão:", parseInt(artesao.id).toPrecision());
        setUrlDaImagem(dataUri); // Atualiza o estado com a URL da imagem
      } catch (err) {
        setErro("Erro ao carregar a imagem. Tente novamente mais tarde.");
        console.error("Erro ao buscar a imagem:", err);
      }
    };

    buscarImagem();
  }, [artesao]); // Reexecuta a função sempre que 'artesao' mudar

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          id="imagemPerfil"
          src={urlDaImagem}
          height={100}
          p="sm"
          alt={`Foto de ${artesao.nomeArtesao}`}
        />
      </Card.Section>
      <Text fw={500} mt="md">
        {artesao.nomeArtesao}
      </Text>
      <Badge color={artesao.receberEncomendas ? "green" : "red"} mt="xs">
        {artesao.receberEncomendas
          ? "Aceita encomendas"
          : "Não aceita encomendas"}
      </Badge>
      <Badge color={artesao.enviaEncomendas ? "green" : "red"} mt="xs">
        {artesao.enviaEncomendas ? "Envia encomendas" : "Não envia encomendas"}
      </Badge>
      <Text size="sm" c="dimmed">
        {/* CPF: {artesao.cpf} */}
      </Text>
      <Text size="sm" c="dimmed">
        {/* E-mail: {artesao.email} */}
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        {artesao.descricaoPerfil}
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        {artesao.id}
      </Text>
      <Link to={acessaArtesaoComID()}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Ver Perfil do Artesão
        </Button>
      </Link>
    </Card>
  );

  function acessaArtesaoComID() {
    return `/ExibirArtesao/${artesao.id}`;
  }
}
