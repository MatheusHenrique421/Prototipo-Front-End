import {
  Container,
  Text,
  Avatar,
  SimpleGrid,
  Group,
  Divider,
  Center,
  Button,
  Alert,
  Checkbox,
} from "@mantine/core";
import { ArtesaoModel } from "../../models/ArtesaoModel";
import {  buscarUrlDaImagem } from "../../services/Api";
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiGift } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";



export default function ExibirArtesao() {
  const { artesaoId } = useParams<{ artesaoId: string }>();
  const [artesao, setArtesao] = useState<ArtesaoModel | null>(null);
  const [urlDaImagem, setUrlDaImagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  if (!artesaoId || isNaN(Number(artesaoId))) {
    console.error("ID do artesão inválido ou ausente 89789789789789879");
    return <div>Erro: ID do artesão não encontrado ou inválido.</div>;
  }
  
  const artesaoIdNumber = parseInt(artesaoId, 10);
  const icon = <HiGift />;

  if (isNaN(artesaoIdNumber)) {
    console.warn(
      "***ID do artesão não encontrado ou inválido:",
      artesaoIdNumber
    );
  }

  useEffect(() => {
    if (!artesaoIdNumber || artesaoIdNumber === 0) {
      console.log(artesaoIdNumber + " id é isso");
      console.warn(
        "ID do artesão não encontrado ou inválido:",
        artesaoIdNumber.valueOf
      );
      return;
    }
    const buscarImagem = async () => {
      try {
        // Buscando a URL da imagem usando o ID do artesão
        const dataUri = await buscarUrlDaImagem(artesaoIdNumber);
        console.log("ID do Artesão:", artesaoIdNumber);
        setUrlDaImagem(dataUri); // Atualiza o estado com a URL da imagem
      } catch (err) {
        setErro("Erro ao carregar a imagem. Tente novamente mais tarde.");
        console.error("Erro ao buscar a imagem:", err);
      }
    };

    buscarImagem();
  }, [artesao]); // Reexecuta a função sempre que 'artesao' mudar

  // useEffect(() => {
  //   const fetchArtesao = async () => {
  //     try {
  //       const artesaodata = await BuscarArtesaoPorId(parseInt(artesaoId, 10));
  //       console.log("Dados do artesão:", artesaodata);
  //       console.log(artesaoIdNumber + " id é isso");
  //       setArtesao(Array.isArray(artesaodata) ? artesaodata[0] : artesaodata); // Extrai o primeiro item se for um array
  //     } catch (error) {
  //       console.error("Erro ao buscar o perfil do artesão:", error);
  //     }
  //   };

  //   fetchArtesao();
  // }, [artesaoIdNumber]);

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
        {/* Exibe a imagem de perfil e o nome do artesão */}
        <Center>
          <Group align="center" mb="xl">
            <Avatar
              size="xl"
              radius="xl"
              id="imagemPerfil"
              src={urlDaImagem}
              alt={`Foto de ${artesao.nomeArtesao}`}
            />
          </Group>
        </Center>
        <SimpleGrid cols={2}>
          <Text size="lg" w={500}>
            {artesao.nomeArtesao}
          </Text>
          <Text size="lg" w={500}>
            {artesao.cidade} - {artesao.estado}
            {/* Informações de contato */}
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
            , estiver desabilitado, ele atua somente com retirada, no seu local
            definido.
          </Alert>
        )}
        <SimpleGrid cols={2} p="md">
          <Checkbox
            checked={artesao.receberEncomendas}
            label="Recebe encomendas"
          />

          <Checkbox
            checked={artesao.enviaEncomendas}
            label="Envia Encomendas"
          />
        </SimpleGrid>
        {/* Informações de endereço */}
        <Divider label="Obras do Artista" mt="md" mb="md" />
        <Link to="/CadastrarArtesanato">
          <Button variant="filled" color="green">
            Cadastrar
          </Button>
        </Link>
      </Container>
    </section>
  );
}
