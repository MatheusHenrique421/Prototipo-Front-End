import { BuscarArtesanatoPorId, buscarUrlDaImagem } from "../../services/Api";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import { HiOutlineMail } from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { HiGift } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Image,
  Badge,
  Box,
  Portal,
  Fieldset,
  Flex,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { __BaseInputProps } from "./../../../node_modules/@mantine/core/lib/components/Input/Input.d";
import WhatsAppLink from "../../components/WhatsAppLink";

export default function ExibirArtesanato() {
  const [urlDaImagem, setUrlDaImagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  const [artesanato, setArtesanato] = useState<ArtesanatoModel | null>(null);
  const { id } = useParams<{ id?: string }>();
  // Verifica se o id é válido antes de usá-lo
  const artesanatoId = id && id.startsWith("id=") ? id.split("=")[1] : id;
  console.log("ID recebido via URL corrigido:", artesanatoId);
  const icon = <HiGift />;

  const telefone = "5546991191993";
  const mensagem = `Olá, estou interessado no artesanato "${artesanato?.tituloArtesanato}". Ele ainda está disponível?`;

  useEffect(() => {
    if (!artesanatoId) return;

    const carregarArtesao = async () => {
      try {
        // Buscar artesão
        const artesaoEncontrado = await BuscarArtesanatoPorId(artesanatoId);
        setArtesanato(artesaoEncontrado);

        // Verificar se a URL da imagem existe e buscar
        const dataUri = await buscarUrlDaImagem(artesanatoId); // A função que você precisa implementar
        if (dataUri) {
          setUrlDaImagem(dataUri);
        }

        console.log(
          `Artesão Encontrado: ${JSON.stringify(artesaoEncontrado, null, 2)}`
        );
      } catch (err) {
        console.log(err);
        setErro("Erro ao carregar dados do artesão ou sua imagem.");
      }
    };

    const buscarImagem = async () => {
      try {
        // Buscando a URL da imagem usando o ID do artesão
        const dataUri = await buscarUrlDaImagem(artesanatoId);
        console.log("ID do Artesão:", artesanatoId);
        setUrlDaImagem(dataUri); // Atualiza o estado com a URL da imagem
      } catch (err) {
        setErro("Erro ao carregar a imagem. Tente novamente mais tarde.");
        console.error("Erro ao buscar a imagem:", err);
      }
    };

    buscarImagem();
    // Reexecuta a função sempre que 'artesao' mudar

    carregarArtesao();
  }, [id]);

  // Renderização condicional enquanto os dados são carregados
  if (!artesanato) {
    return (
      <section>
        <Container>
          <Center>
            <Text>Carregando informações do artesanato...</Text>
          </Center>
        </Container>
      </section>
    );
  }
  return (
    <section>
      <Container>
        <Text size="xl" w={700} mb="md">
          <Link
            to={`/ExibirArtesao/id=${artesanato.artesaoId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
            aria-label={`Acessar o perfil do artesão ${artesanato.tituloArtesanato}`}
          >
            Voltar para o perfil do Artesão {artesanato.tituloArtesanato}
          </Link>
        </Text>
        {/* Exibe a imagem de perfil e o nome do artesão */}
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
              src="https://via.placeholder.com/400x200/3dx43xxdf/ghjghj?text=Slide+1"
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
        <Flex
          mt="lg"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Badge size="lg" color={artesanato.sobEncomenda ? "orange" : "null"} mt="xs">
            {artesanato.sobEncomenda ? "Somente sob encomenda" : ""}
          </Badge>
          {!artesanato.sobEncomenda && (
            <Text size="lg" w={500} ml="xl">
              Quantidade em estoque: {artesanato.quantidadeArtesanato}
            </Text>
          )}
          <WhatsAppLink telefone={telefone} mensagem={mensagem} />
        </Flex>
        <Divider label="Como entrar em contato" mt="md" mb="md" />
        <SimpleGrid cols={4}></SimpleGrid>
        {/* Descrição do perfil */}
        <Divider label="Descrição do artesão" mt="md" mb="md" />
        <SimpleGrid cols={2}>
          <Fieldset>
            <Text size="md" w={600}>
              <SimpleGrid cols={2} p="xl">
                Altura: {artesanato.alturaArtesanato} cm
              </SimpleGrid>
              <SimpleGrid cols={2} p="xl">
                Largura: {artesanato.comprimentoArtesanato} cm
              </SimpleGrid>
              <SimpleGrid cols={2} p="xl">
                Comprimento: {artesanato.comprimentoArtesanato} cm
              </SimpleGrid>
              <SimpleGrid cols={2} p="xl">
                Peso: {artesanato.pesoArtesanato} gr
              </SimpleGrid>
              <SimpleGrid cols={2} p="xl">
                Tempo de produção: {artesanato.tempoCriacaoHr}
              </SimpleGrid>
            </Text>
          </Fieldset>
          <Text  size="md" ta="center" w={500} p="xl" c={"red"}>
            {artesanato.descricaoArtesanato}
          </Text>
        </SimpleGrid>        
        <Fieldset legend="Descrição sobre o artesanato">
          <SimpleGrid cols={2}>
            <Text size="lg" w={500}>
              {artesanato.tituloArtesanato}
            </Text>
            <Text size="lg" w={500}>
              {/* //{artesanato.cidade} - {artesanato.estado} */}
              {/* Informações de contato */}
            </Text>
          </SimpleGrid>
        </Fieldset>
        {showAlert && (
          <Alert
            variant="outline"
            color="yellow"
            title="Atenção sobre encomendas"
            icon={icon}
            m="sm"
          >
            Atenção, se o{" "}
            <Text fw={700} span>
              Receber encomendas
            </Text>{" "}
            estiver habilitado, este artesão aceita encomendas. E se o
            <Text fw={700} span>
              {" "}
              Enviar Encomendas
            </Text>
            , estiver desabilitado, ele atua somente com retirada, no seu local
            definido.
          </Alert>
        )}
        <SimpleGrid cols={2} p="md">
          <Checkbox
            defaultChecked={artesanato.sobEncomenda}
            label="Recebe encomendas"
          />

          <Checkbox
            defaultChecked={artesanato.sobEncomenda}
            label="Envia Encomendas"
          />
        </SimpleGrid>
        {/* Informações de endereço */}
        <Divider label="Mais trabalhos do Artista" mt="md" mb="md" />
      </Container>
    </section>
  );
}
