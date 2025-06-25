import { TbHome, TbNotes, TbCubeSend, TbCategory } from "react-icons/tb";
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

// export default function CardArtesao({ artesao }: CardArtesaoProps) {
//   // Verifica se o ID do artesão é válido antes de tentar buscar a imagem
//   useEffect(() => {
//     if (!artesao.Id || !artesao.Id) {
//       console.warn("Artesão ou ID inválido:", artesao.Id);
//       return;
//     }
//   }, [artesao]);

//   return (
//     <Card shadow="sm" padding="md" radius="md" withBorder>
//       <Card.Section>
//         <Image
//           id="imagemPerfil"
//           src={artesao.FotoUrl}
//           height={300}
//           p="sm"
//           alt={`Foto de ${artesao.NomeArtesao}`}
//         />
//       </Card.Section>
//       <Center>
//         <Text fw={500} mt="md">
//           {artesao.NomeArtesao}
//         </Text>
//       </Center>
//       <SimpleGrid cols={2}>
//         <Badge
//           variant="light"
//           color={artesao.ReceberEncomendas ? "green" : "red"}
//           mt="xs"
//           p="sm"
//         >
//           <TbNotes />{" "}
//           {artesao.ReceberEncomendas
//             ? "Aceita encomendas"
//             : "Não aceita encomendas"}
//         </Badge>
//         <Badge
//           ml="xl"
//           variant="light"
//           color={artesao.EnviaEncomendas ? "orange" : "red"}
//           mt="xs"
//           p="sm"
//         >
//           <TbCubeSend />{" "}
//           {artesao.EnviaEncomendas ? "Envia encomendas" : "Somente retirada"}
//         </Badge>
//       </SimpleGrid>
//       <Text size="sm" c="dimmed" m="sm" mt="xs" lineClamp={2}>
//         {artesao.DescricaoPerfil}
//       </Text>
//       <SimpleGrid cols={2}>
//         <Badge variant="default" mt="xs" p="sm">
//           <TbHome /> {artesao.Cidade} - {artesao.Estado}
//         </Badge>
//       </SimpleGrid>
//       <Link to={acessaArtesaoComID()}>
//         <Button color="blue" fullWidth mt="md" radius="md">
//           Acessar
//         </Button>
//       </Link>
//     </Card>
//   );

export default function CardArtesao({ artesao }: CardArtesaoProps) {
  useEffect(() => {
    if (!artesao.Id) {
      console.warn("Artesão ou ID inválido:", artesao.Id);
      return;
    }
  }, [artesao]);

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      className="transition hover:shadow-xl"
    >
      {/* Imagem */}
      <Card.Section>
        <Image
          id="imagemPerfil"
          src={artesao.FotoUrl}
          height={250}
          p="sm"
          alt={`Foto de ${artesao.NomeArtesao}`}
          fit="cover"
          radius="md"
        />
      </Card.Section>

      {/* Nome */}
      <Center mt="md">
        <Text fw={700} size="lg">
          {artesao.NomeArtesao}
        </Text>
      </Center>

      {/* Badges principais */}
      <SimpleGrid cols={2} spacing="md" mt="md">
        <Badge
          variant="light"
          color={artesao.ReceberEncomendas ? "green" : "red"}
          size="lg"
          radius="md"
          leftSection={<TbNotes size={16} />}
        >
          {artesao.ReceberEncomendas
            ? "Aceita encomendas"
            : "Não aceita encomendas"}
        </Badge>

        <Badge
          variant="light"
          color={artesao.EnviaEncomendas ? "orange" : "red"}
          size="lg"
          radius="md"
          leftSection={<TbCubeSend size={16} />}
        >
          {artesao.EnviaEncomendas ? "Envia encomendas" : "Somente retirada"}
        </Badge>
      </SimpleGrid>

      {/* Descrição */}
      <Text size="sm" c="dimmed" mt="md" lineClamp={2} ta="center">
        {artesao.DescricaoPerfil}
      </Text>

      {/* Localização */}
      <Center mt="md" mb="md">
        <Badge
          variant="default"
          size="lg"
          radius="md"
          leftSection={<TbHome size={16} />}
        >
          {artesao.Cidade} - {artesao.Estado}
        </Badge>
      </Center>
      <Badge
        variant="default"
        size="lg"
        radius="md"
        leftSection={<TbCategory  size={16} />}
      >
        {artesao.NichoAtuacao}
      </Badge>
      {/* Botão */}
      <Link to={acessaArtesaoComID()}>
        <Button color="blue" fullWidth mt="lg" radius="xl">
          Acessar
        </Button>
      </Link>
    </Card>
  );
  function acessaArtesaoComID() {
    return `/ExibirArtesao/id=${artesao.Id}`;
  }
}
