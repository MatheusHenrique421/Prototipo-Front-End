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
    if (!artesao.id || !artesao.id) {
      console.warn("Artesão ou ID inválido:", artesao.id);
      return;
    }

    const carregarImagem = async () => {
      try {
        if (artesao.imagemPerfil) {
          // Se `imagemPerfil` já é Base64, não é necessário converter
          const imagemBase64 = `data:image/png;base64,${artesao.imagemPerfil}`;
          setUrlDaImagem(imagemBase64);
        } else {
          // Caso a imagem não esteja disponível, tenta buscar da API
          const url = await buscarUrlDaImagem(artesao.id);
          if (url) {
            setUrlDaImagem(url);
          } else {
            throw new Error("URL da imagem é nula.");
          }
        }
      } catch (error: any) {
        setErro(error.message || "Erro ao carregar a imagem.");
      }
    };

    carregarImagem();
  }, [artesao]);

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
    return `/ExibirArtesao/id=${artesao.id}`;
  }
}
