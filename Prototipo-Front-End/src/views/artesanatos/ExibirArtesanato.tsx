import { BuscarArtesanatoPorId } from "../../services/Api";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import WhatsAppLink from "../../components/WhatsAppLink";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { HiGift } from "react-icons/hi";
import {
  Alert,
  Center,
  Checkbox,
  Container,
  Divider,
  SimpleGrid,
  Text,
  Image,
  Badge,
  Fieldset,
  Flex,
} from "@mantine/core";

export default function ExibirArtesanato() {
  const [artesanato, setArtesanato] = useState<ArtesanatoModel | null>(null);
  const [, setErro] = useState<string | null>(null);
  const [showAlert] = useState(true);

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

        console.log(
          `Artesão Encontrado: ${JSON.stringify(artesaoEncontrado, null, 2)}`
        );
      } catch (err) {
        console.log(err);
        setErro("Erro ao carregar dados do artesão ou sua imagem.");
      }
    };

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
        <Carousel withIndicators slideGap="sm" loop align="start">
          {artesanato?.imagemUrl &&
            artesanato.imagemUrl.length > 0 &&
            artesanato.imagemUrl.map((imagemUrl: string, index: number) => (
              <Carousel.Slide key={index}>
                <div
                  style={{
                    padding: "10px",
                    margin: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5", // Cor de fundo para imagens pequenas
                  }}
                >
                  <Image
                    id={`descricaoPerfil-${index}`}
                    src={imagemUrl.toString()} // URL direta da imagem
                    alt={`Foto de ${artesanato.tituloArtesanato} - Imagem ${
                      index + 1
                    }`}
                    fit="contain"
                    width="70%"
                    height="70%"
                  />
                </div>
              </Carousel.Slide>
            ))}
        </Carousel>
        <Flex
          mt="sm"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Badge
            size="lg"
            color={artesanato.sobEncomenda ? "orange" : "null"}
            mt="xs"
          >
            {artesanato.sobEncomenda ? "Somente sob encomenda" : ""}
          </Badge>
          <WhatsAppLink telefone={telefone} mensagem={mensagem} />
          {!artesanato.sobEncomenda && (
            <Text size="lg" w={500} ml="xl">
              Quantidade em estoque: {artesanato.quantidadeArtesanato}
            </Text>
          )}
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
                {`Peso: ${artesanato.pesoArtesanato} gr`}
              </SimpleGrid>
              <SimpleGrid cols={2} p="xl">
                Tempo de produção: {artesanato.tempoCriacaoHr} Horas.
              </SimpleGrid>
            </Text>
          </Fieldset>
          <Text size="md" ta="center" w={500} p="xl" c={"red"}>
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
