// import { BuscarArtesanatoPorId } from "../../services/ArtesanatoService";
// import { ArtesanatoModel } from "../../models/ArtesanatoModel";
// import WhatsAppLink from "../../components/WhatsAppLink";
// import { Link, useParams } from "react-router-dom";
// import { Carousel } from "@mantine/carousel";
// import { useEffect, useState } from "react";
// import { HiGift } from "react-icons/hi";
// import {
//   Alert,
//   Center,
//   Checkbox,
//   Container,
//   Divider,
//   SimpleGrid,
//   Text,
//   Image,
//   Badge,
//   Fieldset,
//   Flex,
//   ActionIcon,
// } from "@mantine/core";
// import { TbZoomIn } from "react-icons/tb";

// export default function ExibirArtesanato() {
//   const [artesanato, setArtesanato] = useState<ArtesanatoModel | null>(null);
//   const [, setErro] = useState<string | null>(null);
//   const [showAlert] = useState(true);

//   const { id } = useParams<{ id?: string }>();
//   // Verifica se o id é válido antes de usá-lo
//   const artesanatoId = id && id.startsWith("id=") ? id.split("=")[1] : id;
//   console.log("ID recebido via URL corrigido:", artesanatoId);
//   const icon = <HiGift />;

//   const telefone = "5546991191993";
//   const mensagem = `Olá, estou interessado no artesanato "${artesanato?.TituloArtesanato}". Ele ainda está disponível?`;

//   useEffect(() => {
//     if (!artesanatoId) return;

//     const carregarArtesanato = async () => {
//       try {
//         // Buscar artesão
//         const artesaoEncontrado = await BuscarArtesanatoPorId(artesanatoId);
//         setArtesanato(artesaoEncontrado);

//         console.log(
//           `Artesão Encontrado: ${JSON.stringify(artesaoEncontrado, null, 2)}`
//         );
//       } catch (err) {
//         console.log(err);
//         setErro("Erro ao carregar dados do artesão ou sua imagem.");
//       }
//     };

//     carregarArtesanato();
//   }, [id]);

//   // Renderização condicional enquanto os dados são carregados
//   if (!artesanato) {
//     return (
//       <section>
//         <Container>
//           <Center>
//             <Text>Carregando informações do artesanato...</Text>
//           </Center>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section>
//       <Container>
//         <Text size="xl" w={700} mb="md">
//           <Link
//             to={`/ExibirArtesao/id=${artesanato.ArtesaoId}`}
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               cursor: "pointer",
//             }}
//             aria-label={`Acessar o perfil do artesão ${artesanato.TituloArtesanato}`}
//           >
//             Voltar para o perfil do Artesão {artesanato.TituloArtesanato}
//           </Link>
//         </Text>
//         {/* Exibe a imagem de perfil e o nome do artesão */}
//         {/* <Carousel withIndicators slideGap="sm" loop align="start">
//           {artesanato?.ImagemUrl &&
//             artesanato.ImagemUrl.length > 0 &&
//             artesanato.ImagemUrl.map((imagemUrl: string, index: number) => (
//               <Carousel.Slide key={index}>
//                 <div
//                   style={{
//                     padding: "10px",
//                     margin: "10px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "#f5f5f5", // Cor de fundo para imagens pequenas
//                   }}
//                 >
//                   <Image
//                     id={`descricaoPerfil-${index}`}
//                     src={imagemUrl.toString()} // URL direta da imagem
//                     alt={`Foto de ${artesanato.TituloArtesanato} - Imagem ${
//                       index + 1
//                     }`}
//                     fit="contain"
//                     width="70%"
//                     height="70%"
//                   />
//                 </div>
//               </Carousel.Slide>
//             ))}
//         </Carousel> */}

//         <Carousel
//           withIndicators
//           slideSize="100%"
//           slideGap="md"
//           loop
//           align="start"
//           styles={{
//             control: {
//               backgroundColor: "white",
//               border: "2px solid var(--mantine-color-gray-4)",
//               color: "var(--mantine-color-dark-6)",
//               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//               "&:hover": {
//                 backgroundColor: "var(--mantine-color-gray-1)",
//                 borderColor: "var(--mantine-color-gray-6)",
//               },
//             },
//             indicator: {
//               backgroundColor: "var(--mantine-color-gray-3)",
//               border: "1px solid var(--mantine-color-gray-5)",
//               "&[data-active]": {
//                 backgroundColor: "var(--mantine-color-dark-6)",
//               },
//             },
//           }}
//         >
//           {artesanato?.ImagemUrl?.map((url, index) => (
//             <Carousel.Slide key={index}>
//               <div style={{ position: "relative" }}>
//                 <Image
//                   p="sm"
//                   id="descricaoPerfil"
//                   src={url}
//                   alt={`Imagem ${index + 1} do artesanato ${
//                     artesanato.TituloArtesanato
//                   }`}
//                   style={{
//                     width: "100%",
//                     height: "400px",
//                     objectFit: "cover",
//                     objectPosition: "center",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <ActionIcon
//                   style={{
//                     position: "absolute",
//                     top: "20px",
//                     right: "20px",
//                     backgroundColor: "rgba(255, 255, 255, 0.9)",
//                     color: "var(--mantine-color-dark-6)",
//                   }}
//                   size="lg"
//                   radius="xl"
//                   onClick={() => window.open(url, "_blank")}
//                 >
//                   <TbZoomIn size={20} />
//                 </ActionIcon>
//               </div>
//             </Carousel.Slide>
//           ))}
//         </Carousel>
//         {showAlert && (
//           <Alert
//             variant="outline"
//             color="yellow"
//             title="Atenção sobre encomendas"
//             icon={icon}
//             m="sm"
//           >
//             Atenção, se o{" "}
//             <Text fw={700} span>
//               Receber encomendas
//             </Text>{" "}
//             estiver habilitado, este artesão aceita encomendas. E se o
//             <Text fw={700} span>
//               {" "}
//               Enviar Encomendas
//             </Text>
//             , estiver desabilitado, ele atua somente com retirada, no seu local
//             definido.
//             <SimpleGrid cols={2} p="md">
//               <Checkbox
//                 defaultChecked={artesanato.SobEncomenda}
//                 label="Recebe encomendas"
//                 disabled
//               />
//               <Checkbox
//                 defaultChecked={artesanato.SobEncomenda}
//                 label="Envia Encomendas"
//                 disabled
//               />
//             </SimpleGrid>
//           </Alert>
//         )}
//         <Flex
//           mt="sm"
//           gap="md"
//           justify="flex-start"
//           align="flex-start"
//           direction="row"
//           wrap="wrap"
//         >
//           <Badge
//             size="lg"
//             color={artesanato.SobEncomenda ? "orange" : "null"}
//             mt="xs"
//           >
//             {artesanato.SobEncomenda ? "Somente sob encomenda" : ""}
//           </Badge>
//           {!artesanato.SobEncomenda && (
//             <Badge
//               size="lg"
//               color={artesanato.QuantidadeArtesanato > 0 ? "blue" : "null"}
//               mt="xs"
//             >
//               {artesanato.QuantidadeArtesanato > 0
//                 ? `${artesanato.QuantidadeArtesanato} Und em estoque`
//                 : "Sem estoque"}
//             </Badge>
//           )}
//         </Flex>
//         <Divider label="Como entrar em contato" mt="md" mb="md" />
//         <WhatsAppLink telefone={telefone} mensagem={mensagem} />
//         <SimpleGrid cols={4}></SimpleGrid>
//         {/* Descrição do perfil */}
//         <Divider label="Descrição do artesão" mt="md" mb="md" />
//         <SimpleGrid cols={2}>
//           <Fieldset>
//             <Text size="md" w={600}>
//               <SimpleGrid cols={2} p="xl">
//                 Altura: {artesanato.AlturaArtesanato} cm
//               </SimpleGrid>
//               <SimpleGrid cols={2} p="xl">
//                 Largura: {artesanato.ComprimentoArtesanato} cm
//               </SimpleGrid>
//               <SimpleGrid cols={2} p="xl">
//                 Comprimento: {artesanato.ComprimentoArtesanato} cm
//               </SimpleGrid>
//               <SimpleGrid cols={2} p="xl">
//                 {`Peso: ${artesanato.PesoArtesanato} gr`}
//               </SimpleGrid>
//               <SimpleGrid cols={2} p="xl">
//                 Tempo de produção: {artesanato.TempoCriacaoHr} Horas.
//               </SimpleGrid>
//             </Text>
//           </Fieldset>
//           <Text size="md" ta="center" w={500} p="xl" c={"red"}>
//             {artesanato.DescricaoArtesanato}
//           </Text>
//         </SimpleGrid>
//         <Fieldset legend="Descrição sobre o artesanato">
//           <SimpleGrid cols={2}>
//             <Text size="lg" w={500}>
//               {artesanato.TituloArtesanato}
//             </Text>
//           </SimpleGrid>
//         </Fieldset>

//         {/* Informações de endereço */}
//         <Divider label="Mais trabalhos do Artista" mt="md" mb="md" />
//       </Container>
//     </section>
//   );
// }

import { BuscarArtesanatoPorId } from "../../services/ArtesanatoService";
import { ArtesanatoModel } from "../../models/ArtesanatoModel";
import WhatsAppLink from "../../components/WhatsAppLink";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import {
  Center,
  Container,
  Divider,
  Text,
  Image,
  Badge,
  Flex,
  ActionIcon,
  Button,
  Box,
  Group,
  Paper,
  Stack,
} from "@mantine/core";
import { TbArrowLeft, TbCategory, TbUser, TbZoomIn } from "react-icons/tb";
import { buscarArtesaoPorId } from "../../services/ArtesaoService";
import { ArtesaoModel } from "../../models/ArtesaoModel";

export default function ExibirArtesanato() {
  const [artesanato, setArtesanato] = useState<ArtesanatoModel | null>(null);
  const [artesao, setArtesao] = useState<ArtesaoModel | null>(null);
  const [, setErro] = useState<string | null>(null);

  const { id } = useParams<{ id?: string }>();
  // Verifica se o id é válido antes de usá-lo
  const artesanatoId = id && id.startsWith("id=") ? id.split("=")[1] : id;
  console.log("ID recebido via URL corrigido:", artesanatoId);

  const telefone = "5546991191993";
  const mensagem = `Olá, estou interessado no artesanato "${artesanato?.TituloArtesanato}". Ele ainda está disponível?`;

  // Primeiro useEffect: Carrega o artesanato
  useEffect(() => {
    if (!artesanatoId) return;

    const carregarArtesanato = async () => {
      try {
        const artesanatoEncontrado = await BuscarArtesanatoPorId(artesanatoId);
        setArtesanato(artesanatoEncontrado);

        console.log(
          `ARTESANATO Encontrado: ${JSON.stringify(
            artesanatoEncontrado,
            null,
            2
          )}`
        );
      } catch (err) {
        console.log(err);
        setErro("Erro ao carregar dados do artesanato.");
      }
    };

    carregarArtesanato();
  }, [artesanatoId]);

  // Segundo useEffect: Carrega o artesão após ter o artesanato
  useEffect(() => {
    if (!artesanato?.ArtesaoId) return;

    const carregarArtesao = async () => {
      try {
        const artesaoEncontrado = await buscarArtesaoPorId(
          artesanato.ArtesaoId
        );
        setArtesao(artesaoEncontrado);

        console.log(
          `ARTESÃO Encontrado: ${JSON.stringify(artesaoEncontrado, null, 2)}`
        );
      } catch (error) {
        console.error("Erro ao carregar artesão:", error);
        setErro("Erro ao carregar dados do artesão.");
      }
    };

    carregarArtesao();
  }, [artesanato?.ArtesaoId]);

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
        {/* 1. NAVEGAÇÃO/BREADCRUMB - Primeiro para orientação */}
        <Flex
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
          mb="md"
        >
          <Button
            variant="outline"
            color="blue"
            size="sm"
            component={Link}
            to="/Artesanatos"
            leftSection={<TbArrowLeft size={16} />}
          >
            Ver todos os artesanatos
          </Button>

          <Button
            variant="filled"
            color="blue"
            size="sm"
            component={Link}
            to={`/ExibirArtesao/id=${artesanato.ArtesaoId}`}
            leftSection={<TbUser size={16} />}
            disabled={!artesao}
          >
            {artesao
              ? `Perfil de ${artesao.NomeArtesao.split(" ")[0]}`
              : "Carregando perfil..."}
          </Button>
        </Flex>
        {/* 2. TÍTULO DO ARTESANATO - Logo após navegação */}
        <Text component="h1" size="2rem" ta="center" mb="xl" fw={700}>
          {artesanato.TituloArtesanato}
        </Text>
        {/* 3. GALERIA DE IMAGENS - Elemento visual principal */}
        <Carousel
          withIndicators
          slideSize="100%"
          slideGap="md"
          loop
          align="start"
          styles={{
            control: {
              backgroundColor: "white",
              border: "2px solid var(--mantine-color-gray-4)",
              color: "var(--mantine-color-dark-6)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "var(--mantine-color-gray-1)",
                borderColor: "var(--mantine-color-gray-6)",
              },
            },
            indicator: {
              backgroundColor: "var(--mantine-color-gray-3)",
              border: "1px solid var(--mantine-color-gray-5)",
              "&[data-active]": {
                backgroundColor: "var(--mantine-color-dark-6)",
              },
            },
          }}
        >
          {artesanato?.ImagemUrl?.map((url, index) => (
            <Carousel.Slide key={index}>
              <div style={{ position: "relative" }}>
                <Image
                  p="sm"
                  id="descricaoPerfil"
                  src={url}
                  alt={`Imagem ${index + 1} do artesanato ${
                    artesanato.TituloArtesanato
                  }`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "8px",
                  }}
                />
                <ActionIcon
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "var(--mantine-color-dark-6)",
                  }}
                  size="lg"
                  radius="xl"
                  onClick={() => window.open(url, "_blank")}
                >
                  <TbZoomIn size={20} />
                </ActionIcon>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* 4. STATUS/BADGES - Informação importante sobre disponibilidade */}
        <Stack mb="xl">
          {/* Linha principal de informações */}
          <Group grow>
            {artesanato.SobEncomenda && (
              <Paper
                p="sm"
                bg="orange.0"
                radius="md"
                style={{ border: "1px solid var(--mantine-color-orange-3)" }}
              >
                <Text size="sm" fw={500} c="orange.7" ta="center">
                  📋 Somente sob encomenda
                </Text>
              </Paper>
            )}

            {!artesanato.SobEncomenda && (
              <Paper
                p="sm"
                bg={artesanato.QuantidadeArtesanato > 0 ? "blue.0" : "red.0"}
                radius="md"
                style={{
                  border: `1px solid var(--mantine-color-${
                    artesanato.QuantidadeArtesanato > 0 ? "blue" : "red"
                  }-3)`,
                }}
              >
                <Text
                  size="sm"
                  fw={500}
                  c={artesanato.QuantidadeArtesanato > 0 ? "blue.7" : "red.7"}
                  ta="center"
                >
                  📦{" "}
                  {artesanato.QuantidadeArtesanato > 0
                    ? `${artesanato.QuantidadeArtesanato} em estoque`
                    : "Sem estoque"}
                </Text>
              </Paper>
            )}

            {artesanato.Preco > 0 && (
              <Paper
                p="sm"
                bg="green.0"
                radius="md"
                style={{ border: "1px solid var(--mantine-color-green-3)" }}
              >
                <Text size="sm" fw={500} c="green.7" ta="center">
                  💰 R$ {artesanato.Preco.toFixed(2)}
                </Text>
              </Paper>
            )}
          </Group>

          {/* Categorias em linha separada */}
          {artesanato.CategoriaTags && artesanato.CategoriaTags.length > 0 && (
            <Box>
              <Flex justify="space-between" align="baseline" mb="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  🏷️ Categorias do artesanato:
                </Text>
                <Text size="sm" c="dimmed" fw={500}>
                  💬 Entre em contato direto com artesão
                </Text>
              </Flex>
              <Flex justify="space-between" align="center" gap="md" wrap="wrap">
                <Flex gap="md" wrap="wrap" flex="1">
                  {artesanato.CategoriaTags.map((tag, index) => {
                    return (
                      <Badge
                        key={index}
                        variant="default"
                        size="lg"
                        radius="md"
                        leftSection={<TbCategory size={16} />}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </Flex>
                <WhatsAppLink telefone={telefone} mensagem={mensagem} />
              </Flex>
            </Box>
          )}
        </Stack>

        <Stack gap="lg">
          <Box
            pl="lg"
            style={{ borderLeft: "3px solid var(--mantine-color-blue-5)" }}
          >
            <Text fw={500} size="lg" mb="sm">
              Descrição
            </Text>
            <Text size="md" ta="justify" c="dimmed">
              {artesanato.DescricaoArtesanato}
            </Text>
          </Box>

          <Box
            pr="lg"
            style={{ borderRight: "3px solid var(--mantine-color-green-5)" }}
          >
            <Text fw={500} size="lg" mb="sm">
              Materiais Utilizados
            </Text>
            <Text size="md" ta="justify" c="dimmed">
              {artesanato.MateriaisUtilizados}
            </Text>
          </Box>
        </Stack>

        {/* 9. OUTROS TRABALHOS - Cross-selling no final */}
        <Divider label="Mais trabalhos do Artista" mt="lg" mb="md" />
          

      </Container>
    </section>
  );
}
