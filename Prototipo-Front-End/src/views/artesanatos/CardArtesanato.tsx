import {
  SimpleGrid,
  Tooltip,
  Button,
  Group,
  Badge,
  Image,
  Card,
  Text,
  Box,
} from "@mantine/core";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import styles from "./style.module.css"; 
import { useEffect } from "react";

interface CardArtesanatoProps {
  artesanato: ArtesanatoModel;
  isCompact?: boolean;
}

export default function CardArtesanato({
  artesanato,
  isCompact = false,
}: CardArtesanatoProps) {

  useEffect(() => {
    if (!artesanato.Id || !artesanato.Id) {
      console.warn("Artesanato ou ID inválido:", artesanato.Id);
      return;
    }
  }, [artesanato]);

  return (
    <Card
      shadow={isCompact ? "md" : "xl"}
      padding={isCompact ? "sm" : "md"}
      radius="md"
      withBorder
      style={{
        minHeight: isCompact ? "250px" : "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Section>
        <Carousel
          withIndicators={!isCompact} // Remove indicadores na versão compacta
          slideSize="100%"
          slideGap="md"
          loop
          align="start"
          classNames={{
            control: styles.control,
            indicator: styles["carousel-indicator"], // ou styles.carouselIndicator se você renomear no CSS
          }}
        >
          {artesanato?.ImagemUrl?.map((url, index) => (
            <Carousel.Slide key={index}>
              <Image
                p={isCompact ? "xs" : "sm"}
                id="descricaoPerfil"
                src={url}
                alt={`Imagem ${index + 1} do artesanato ${
                  artesanato.TituloArtesanato
                }`}
                style={{
                  width: "100%",
                  height: isCompact ? "150px" : "300px", // Altura menor para versão compacta
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "8px",
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card.Section>

      {/* TITULO */}
      <Tooltip label={artesanato.TituloArtesanato}>
        <Text fw={500} ta="center" size={isCompact ? "sm" : "md"} truncate="end" title={artesanato.TituloArtesanato}>
          {artesanato.TituloArtesanato}
        </Text>
      </Tooltip>

      {/* TAGS COM TOOLTIPS */}
      {artesanato?.CategoriaTags?.length > 0 && (
        <SimpleGrid
          cols={
            isCompact
              ? Math.min(2, artesanato.CategoriaTags.length)
              : artesanato.CategoriaTags.length
          }
        >
          {/* Renderizar tags baseado na versão */}
          {(isCompact
            ? artesanato.CategoriaTags.slice(0, 2)
            : artesanato.CategoriaTags
          ).map((tag, index) => (
            <Tooltip key={index} label={`Categoria: ${tag}`} withArrow>
              <Badge
                variant="default"
                mt="xs"
                size={isCompact ? "xs" : "sm"}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </Badge>
            </Tooltip>
          ))}

          {/* Badge de "mais tags" apenas se compacto e há mais de 2 tags */}
          {isCompact && artesanato.CategoriaTags.length > 2 && (
            <Tooltip
              label={`Outras categorias: ${artesanato.CategoriaTags.slice(
                2
              ).join(", ")}`}
              withArrow
              multiline
              w={200}
            >
              <Badge
                variant="default"
                mt="xs"
                size="xs"
                color="gray"
                style={{ cursor: "pointer" }}
              >
                +{artesanato.CategoriaTags.length - 2}
              </Badge>
            </Tooltip>
          )}
        </SimpleGrid>
      )}

      {/* QUANTIDADE OPÇÃO DE CARTÃO */}
      <Group justify="space-between" align="center" mt="md">
        <Group gap="xs">
          {/* Badges do lado esquerdo */}
          {artesanato.SobEncomenda && (
            <Badge
              variant="outline"
              color="orange"
              size={isCompact ? "xs" : "sm"}
            >
              Somente sob encomenda
            </Badge>
          )}

          {!artesanato.SobEncomenda &&
            artesanato.QuantidadeArtesanato !== undefined && (
              <Badge
                color="blue"
                variant="outline"
                size={isCompact ? "xs" : "sm"}
              >
                {artesanato.QuantidadeArtesanato} unidades Disponíveis
              </Badge>
            )}
        </Group>

        {/* Badge do lado direito */}
        {!isCompact && (
          <Badge variant="transparent" color="lime" size="sm">
            Aceita Cartão
          </Badge>
        )}
      </Group>

      
      {/* PREÇO E TEMPO PRODUÇÃO */}
      <Group justify="space-between" align="center">
        <Box>
          <Text component="span" size="sm" c="dimmed">
            Valor:{" "}
          </Text>
          <Text component="span" fw={500} c="green">
            R$ {artesanato.Preco},00
          </Text>
        </Box>
        <Text size="sm" c="dimmed">
          Tempo de produção:{" "}
          {formatarTempoProdução(Number(artesanato.TempoCriacaoHr))}
        </Text>
      </Group>

      {/*   */}
      <Link to={acessaArtesanatoComID()}>
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          size={isCompact ? "xs" : "sm"}
        >
          Acessar
        </Button>
      </Link>

    </Card>
  );

  function acessaArtesanatoComID() {
    return `/ExibirArtesanato/${artesanato.Id}`;
  }

  function formatarTempoProdução(horas: number): string {
    if (horas < 24) {
      return `${horas} ${horas === 1 ? "hora" : "horas"}`;
    }

    const dias = Math.floor(horas / 24);
    const horasRestantes = horas % 24;

    if (horasRestantes === 0) {
      return `${dias} ${dias === 1 ? "dia" : "dias"}`;
    }

    return `${dias} ${dias === 1 ? "dia" : "dias"} e ${horasRestantes} ${
      horasRestantes === 1 ? "hora" : "horas"
    }`;
  }
}
