import {
  Badge,
  Button,
  Card,
  Text,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface CardArtesanatoProps {
  artesanato: ArtesanatoModel;
}
export default function CardArtesanato({ artesanato }: CardArtesanatoProps) {
  useEffect(() => {
    if (!artesanato.id || !artesanato.id) {
      console.warn("Artesanato ou ID inválido:", artesanato.id);
      return;
    }
  }, [artesanato]);

  return (
    <Card
      shadow="xl"
      padding="md"
      radius="md"
      withBorder
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Section>
        <Carousel
          withIndicators
          slideSize="100%"
          slideGap="md"
          loop
          align="start"
        >
          {artesanato?.imagemUrl?.map((url, index) => (
            <Carousel.Slide key={index}>
              <Image
                p="sm"
                id="descricaoPerfil"
                src={url}
                alt={`Imagem ${index + 1} do artesanato ${
                  artesanato.tituloArtesanato
                }`}
                style={{
                  width: "100%",
                  height: "300px", // Limita a altura
                  objectFit: "contain", // Mantém as proporções
                  borderRadius: "8px", // Opção estética
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>
      <Text fw={500} size="md">
        {artesanato.tituloArtesanato}
      </Text>
      <SimpleGrid cols={artesanato?.categoriaTags?.length || 1}>
        {artesanato?.categoriaTags.map((tag, index) => (
          <Badge key={index} variant="default" mt="xs" size="sm">
            {tag}
          </Badge>
        ))}
      </SimpleGrid>
      <Badge
        variant="outline"
        color={artesanato.sobEncomenda ? "orange" : "null"}
        mt="xs"
      >
        {artesanato.sobEncomenda ? "Somente sob encomenda" : ""}
      </Badge>
      {!artesanato.sobEncomenda &&
        artesanato.quantidadeArtesanato !== undefined && (
          <Badge color="blue" variant="outline">
            Quantidade disponível: {artesanato.quantidadeArtesanato}
          </Badge>
        )}
      <Badge variant="transparent" color="lime" mt="xs" size="sm">
        Aceita Cartão
      </Badge>
      <Text size="sm" c="dimmed" mt="xs">
        R$: {artesanato.preco},00
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        Tempo de produção {artesanato.tempoCriacaoHr} Horas
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        {artesanato.id}
      </Text>
      <Link to={acessaArtesanatoComID()}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Acessar
        </Button>
      </Link>
    </Card>
  );
  function acessaArtesanatoComID() {
    return `/ExibirArtesanato/${artesanato.id}`;
  }
}
