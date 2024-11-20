import { Badge, Button, Card, Text, Image } from "@mantine/core";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import { buscarUrlDaImagem } from "../../services/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "@mantine/carousel";

interface CardArtesanatoProps {
  artesanato: ArtesanatoModel;
}

export default function CardArtesanato({ artesanato }: CardArtesanatoProps) {
  const [urlDaImagem, setUrlDaImagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Verifica se o ID do Artesanato é válido antes de tentar buscar a imagem
  useEffect(() => {
    if (!artesanato.id || !artesanato.id) {
      console.warn("Artesanato ou ID inválido:", artesanato.id);
      return;
    }
    const carregarImagem = async () => {
      try {
        if (artesanato.imagensArtesanato) {
          // Se `imagemPerfil` já é Base64, não é necessário converter
          const imagemBase64 = `data:image/png;base64,${artesanato.imagensArtesanato}`;
          setUrlDaImagem(imagemBase64);
        } else {
          // Caso a imagem não esteja disponível, tenta buscar da API
          const url = await buscarUrlDaImagem(artesanato.id);
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
    //carregarImagem()
  }, [artesanato]);

  return (
    <Card shadow="xl" padding="md" radius="md" withBorder>
      <Card.Section>
        <Carousel
          withIndicators
          slideSize="100%"
          slideGap="md"
          loop
          align="start"
        >
          <Carousel.Slide>
            <Image
              id="descricaoPerfil"
              src={urlDaImagem}
              alt={`Foto de ${artesanato.tituloArtesanato}`}              
              fit="cover"
              p="sm"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="https://via.placeholder.com/400x200/00FF00/FFFFFF?text=Slide+2"
              alt="Slide 2"
              fit="cover"
              p="sm"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="https://via.placeholder.com/400x200/0000FF/FFFFFF?text=Slide+3"
              alt="Slide 3"
              fit="cover"
              p="sm"
            />
          </Carousel.Slide>
        </Carousel>
      </Card.Section>

      <Text fw={500} mt="md">
        {artesanato.tituloArtesanato}
      </Text>
      {/* <Badge color={artesanato.receberEncomendas ? "green" : "red"} mt="xs">
        {artesanato.receberEncomendas
          ? "Aceita encomendas"
          : "Não aceita encomendas"}
      </Badge> */}
      <Badge color={artesanato.sobEncomenda ? "orange" : "null"} mt="xs">
        {artesanato.sobEncomenda ? "Somente sob encomenda" : ""}
      </Badge>
      <Text size="sm" c="dimmed">
        {/* CPF: {artesanato.cpf} */}
      </Text>
      <Text size="sm" c="dimmed">
        {/* E-mail: {artesanato.email} */}
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
       R$: {artesanato.precoArtesanato}
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        Tempo levado para produzir {artesanato.tempoCriacaoHr}
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
