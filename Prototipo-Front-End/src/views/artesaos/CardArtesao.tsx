import { TbHome, TbNotes, TbCubeSend } from "react-icons/tb";
import { ArtesaoModel } from "../../models/ArtesaoModel";
//import {  } from "../../services/Api";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  SimpleGrid,
  Center,
} from "@mantine/core";

interface CardArtesaoProps {
  artesao: ArtesaoModel;
}

export default function CardArtesao({ artesao }: CardArtesaoProps) {
  // Verifica se o ID do artesão é válido antes de tentar buscar a imagem
  useEffect(() => {
    if (!artesao.id || !artesao.id) {
      console.warn("Artesão ou ID inválido:", artesao.id);
      return;
    }
  }, [artesao]);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          id="imagemPerfil"
          src={artesao.imagemUrl}
          height={100}
          p="sm"
          alt={`Foto de ${artesao.nomeArtesao}`}
        />
      </Card.Section>
      <Center>
        <Text fw={500} mt="md">
          {artesao.nomeArtesao}
        </Text>
      </Center>
      <SimpleGrid cols={2}>
        <Badge
          variant="light"
          color={artesao.receberEncomendas ? "green" : "red"}
          mt="xs"
          p="sm"
        >
          <TbNotes />{" "}
          {artesao.receberEncomendas
            ? "Aceita encomendas"
            : "Não aceita encomendas"}
        </Badge>
        <Badge
          ml="xl"
          variant="light"
          color={artesao.enviaEncomendas ? "orange" : "red"}
          mt="xs"
          p="sm"
        >
          <TbCubeSend />{" "}
          {artesao.enviaEncomendas ? "Envia encomendas" : "Somente retirada"}
        </Badge>
      </SimpleGrid>
      <Text size="sm" c="dimmed" m="sm" mt="xs" lineClamp={2}>
        {artesao.descricaoPerfil}
      </Text>
      <SimpleGrid cols={2}>
        <Badge variant="default" mt="xs" p="sm">
          <TbHome /> {artesao.cidade} - {artesao.estado}
        </Badge>
      </SimpleGrid>
      <Link to={acessaArtesaoComID()}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Acessar
        </Button>
      </Link>
    </Card>
  );

  function acessaArtesaoComID() {
    return `/ExibirArtesao/id=${artesao.id}`;
  }
}
