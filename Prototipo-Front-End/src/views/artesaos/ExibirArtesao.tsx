import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArtesaoModel } from "../../models/ArtesaoModel";
import { BuscarArtesanatoPorId, buscarArtesaoPorId } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import { HiGift } from "react-icons/hi";
import {
  Container,
  Text,
  SimpleGrid,
  Group,
  Divider,
  Center,
  Button,
  Alert,
  Image,
  Checkbox,
  Fieldset,
  Grid,
} from "@mantine/core";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import CardArtesanato from "../artesanatos/CardArtesanato";

export default function ExibirArtesao() {
  const icon = <HiGift />;
  const [showAlert] = useState(true);
  const [, setErro] = useState<string | null>(null);
  const { id } = useParams<{ id?: string }>();
  const [artesao, setArtesao] = useState<ArtesaoModel | null>(null);
  const artesaoId = id && id.startsWith("id=") ? id.split("=")[1] : id;
  const [artesanatos, setArtesanatos] = useState<ArtesanatoModel[]>([]);
  function acessaArtesaoComID() {
    return `/CadastrarArtesanato`;
  }

  console.log(
    `*****************Artesanatos Encontrados: ${JSON.stringify(artesanatos, null, 2)}`
  );
  
  useEffect(() => {
    if (!artesaoId) return;

    const carregarArtesao = async () => {
      try {
        const artesaoEncontrado = await buscarArtesaoPorId(artesaoId);
        setArtesao(artesaoEncontrado);

        console.log(
          `Artesão Encontrado: ${JSON.stringify(artesaoEncontrado, null, 2)}`
        );
      } catch (err) {
        console.log(err);
        setErro("Erro ao carregar dados do artesão ou sua imagem.");
      }
    };

    const carregarArtesanatos = async () => {
      try {
        const response = await BuscarArtesanatoPorId(artesaoId); // Supondo que esta seja a função da API
        const artesanatos = Array.isArray(response) ? response : [response]; // Certifique-se de que seja um array
        setArtesanatos(artesanatos);

        console.log(
          `*****************Artesanatos Encontrados: ${JSON.stringify(artesanatos, null, 2)}`
        );
      } catch (err) {
        console.log("Erro ao carregar os artesanatos:", err);
      }
    };

    carregarArtesanatos();
    carregarArtesao();
  }, [id]);

  // Renderização condicional enquanto os dados são carregados
  if (!artesao) {
    return (
      <section>
        <Container>
          <Center>
            <Text>Carregando informações do artesão...</Text>
          </Center>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <Text size="xl" w={700} mb="md">
          Perfil do {artesao.nomeArtesao}
        </Text>
        <Link to={`/EditarArtesao/${artesaoId}`}>
          <Button variant="filled" color="orange">
            Editar
          </Button>
        </Link>
        {/* Exibe a imagem de perfil e o nome do artesão */}
        <Fieldset m="md">
          <Center>
            <Group align="center" mb="xl">
              <Image
                h={300}
                w="auto"
                radius="md"
                fit="contain"
                id="imagemPerfil"
                alt={`Foto de ${artesao.nomeArtesao}`}
                src={
                  artesao.imagem instanceof File
                    ? URL.createObjectURL(artesao.imagem)
                    : Array.isArray(artesao.imagemUrl)
                    ? artesao.imagemUrl[0] // Usa o primeiro valor se for um array
                    : artesao.imagemUrl
                }
              />
            </Group>
          </Center>
          <SimpleGrid cols={2}>
            <Text size="lg" w={500}>
              {artesao.nomeArtesao}
            </Text>
            <Text size="lg" w={500}>
              {artesao.cidade} - {artesao.estado}
            </Text>
          </SimpleGrid>
          <Divider label="Como entrar em contato" mt="md" mb="md" />
          <SimpleGrid cols={4}>
            <Button
              leftSection={<FaFacebook />}
              variant="filled"
              color="blue"
              onClick={() =>
                window.open(`https://wa.me/${artesao.whatsApp}`, "_blank")
              }
            >
              Facebook
            </Button>
            <Button
              leftSection={<FaInstagram />}
              variant="filled"
              color="#e619db"
              onClick={() =>
                window.open(`https://wa.me/${artesao.whatsApp}`, "_blank")
              }
            >
              Instagram
            </Button>
            <Button
              leftSection={<FaWhatsapp />}
              variant="filled"
              color="teal"
              onClick={() =>
                window.open(`https://wa.me/+55${artesao.whatsApp}`, "_blank")
              }
            >
              WhatsApp
            </Button>
            <Button
              leftSection={<HiOutlineMail />}
              variant="filled"
              color="gray"
              onClick={() =>
                window.open(`https://wa.me/${artesao.whatsApp}`, "_blank")
              }
            >
              E-mail
            </Button>
            <Text>
              <strong>Telefone:</strong> {artesao.telefone}
            </Text>
          </SimpleGrid>
          {/* Descrição do perfil */}
          <Divider label="Descrição do artesão" mt="md" mb="md" />
          <Text ta="center">{artesao.descricaoPerfil}</Text>
          {/* Informações sobre encomendas */}
          <Divider label="Encomendas" mt="md" mb="md" />
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
              , estiver desabilitado, ele atua somente com retirada, no seu
              local definido.
            </Alert>
          )}
          <SimpleGrid cols={2} p="md">
            <Checkbox
              readOnly
              label="Recebe encomendas"
              checked={artesao.receberEncomendas}
            />
            <Checkbox
              readOnly
              label="Envia Encomendas"
              checked={artesao.enviaEncomendas}
            />
          </SimpleGrid>
          {/* Informações de endereço */}
        </Fieldset>
        <Divider label="Obras do Artista" mt="md" mb="md" />
        <Link
          to={acessaArtesaoComID()}
          onClick={() => {
            if (artesaoId) localStorage.setItem("artesaoId", artesaoId);
          }}
        >
          <Button variant="filled" color="green">
            Cadastrar
          </Button>
        </Link>
        <Grid>
          {artesanatos.length > 0 ? (
            artesanatos.map((artesanato) => (
              <Grid.Col span={4} key={artesanato.id}>
                <CardArtesanato artesanato={artesanato} />
              </Grid.Col>
            ))
          ) : (
            <Text size="sm" color="dimmed">
              Nenhum artesanato cadastrado ainda.
            </Text>
          )}
        </Grid>
      </Container>
    </section>
  );
}
