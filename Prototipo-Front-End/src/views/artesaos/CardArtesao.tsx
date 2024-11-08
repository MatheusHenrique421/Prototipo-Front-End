import { Card, Image, Text, Badge, Button } from "@mantine/core";
import { ArtesaoModel } from "../../models/ArtesaoModel";

interface CardArtesaoProps {
  artesao: ArtesaoModel;
}

export default function CardArtesao({ artesao }: CardArtesaoProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={artesao.imagemPerfil}
          height={160}
          alt={`Foto de ${artesao.nomeArtesao}`}
        />
      </Card.Section>

      <Text fw={500} mt="md">
        {artesao.nomeArtesao}
      </Text>
      <Badge color={artesao.receberEncomendas ? "green" : "red"} mt="xs">
        {artesao.receberEncomendas ? "Aceita encomendas" : "Não aceita encomendas"}
      </Badge>
      <Badge color={artesao.enviaEncomendas ? "green" : "red"} mt="xs">
        {artesao.enviaEncomendas ? "Envia encomendas" : "Não envia encomendas"}
      </Badge>
      <Text size="sm" c="dimmed">
        {/* CPF: {artesao.cpf} */}
      </Text>
      <Text size="sm" c="dimmed">
        {/* E-mail: {artesao.email} */}
      </Text>
      <Text size="sm" c="dimmed" mt="xs">
        {artesao.descricaoPerfil}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Ver Perfil do Artesão
      </Button>
    </Card>
  );
}
