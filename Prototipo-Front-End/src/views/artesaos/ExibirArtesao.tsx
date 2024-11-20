import { BuscarArtesaoPorId, buscarUrlDaImagem } from "../../services/Api";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArtesaoModel } from "../../models/ArtesaoModel";
import { Link, useParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import { HiGift } from "react-icons/hi";
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

export default function ExibirArtesao() {
  const [urlDaImagem, setUrlDaImagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  const [artesao, setArtesao] = useState<ArtesaoModel | null>(null);
  const { id } = useParams<{ id?: string }>();
  // Verifica se o id é válido antes de usá-lo
  const artesaoId = id && id.startsWith("id=") ? id.split("=")[1] : id;
  console.log("ID recebido via URL corrigido:", artesaoId);
  
  const icon = <HiGift />;

  function acessaArtesaoComID() {
    return `/CadastrarArtesanato`;
  }

  useEffect(() => {
    if (!artesaoId) return;

    const carregarArtesao = async () => {
      try {
        // Buscar artesão
        const artesaoEncontrado = await BuscarArtesaoPorId(artesaoId);
        setArtesao(artesaoEncontrado);

        // Verificar se a URL da imagem existe e buscar
        const dataUri = await buscarUrlDaImagem(artesaoId); // A função que você precisa implementar
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
        const dataUri = await buscarUrlDaImagem(artesaoId);
        console.log("ID do Artesão:", artesaoId);
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
              src={
                artesao.imagemPerfil?.startsWith("data:image")
                  ? urlDaImagem
                  : `data:image/png;base64,${artesao.imagemPerfil}`
              }
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
            defaultChecked={artesao.receberEncomendas}
            label="Recebe encomendas"
          />

          <Checkbox
            defaultChecked={artesao.enviaEncomendas}
            label="Envia Encomendas"
          />
        </SimpleGrid>
        {/* Informações de endereço */}
        <Divider label="Obras do Artista" mt="md" mb="md" />
        <Link to={acessaArtesaoComID()}
        onClick={() => {
          if (artesaoId) localStorage.setItem("artesaoId", artesaoId);
        }}>
          <Button variant="filled" color="green">
            Cadastrar
          </Button>
        </Link>
      </Container>
    </section>
  );
}
