import {
  Container,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  SimpleGrid,
  Badge,
  NumberFormatter,
  Avatar,
  Stack,
  Title,
  Divider,
} from "@mantine/core";
import ListarArtesanatos from "../artesanatos/ListarArtesanatos";

export function Home() {
  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <Container size="lg" pt={60} pb={40}>
        {/* Hero Section */}
        <Card shadow="lg" padding="xl" radius="lg" withBorder style={{ background: "white" }}>
          <SimpleGrid cols={2} spacing="lg">
            <div>
              <Title order={1} style={{ fontSize: 40, color: "#1C1C1E" }}>
                Bem-vindo à Galeria Artesanal
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Uma curadoria de talentos, cores e histórias. Descubra o feito à mão com alma.
              </Text>
              <Button color="grape" radius="xl" size="lg" mt="xl">
                Comece a explorar
              </Button>
            </div>
            <Image
              radius="md"
               src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              alt="Hero"
            />           
          </SimpleGrid>
        </Card>

        {/* Destaques */}
        <Title order={2} mt={80} mb={30} style={{ textAlign: "center", fontSize: 28 }}>
          Destaques da Semana
        </Title>
          <ListarArtesanatos/>
        {/* <SimpleGrid cols={3} spacing="lg">
          {[1, 2, 3].map((item) => (
            <Card key={item} shadow="sm" padding="md" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Destaque"
                />
              </Card.Section>
              <Group justify="space-between" mt="lg" mb="sm">
                <Badge color="grape">Exclusivo</Badge>
                <Text size="sm" fw={700}>
                  Artesão(a) Talento
                </Text>
              </Group>
              <Text c="dimmed" size="sm">
                Um trabalho delicado com materiais sustentáveis e técnicas ancestrais.
              </Text>
              <Text mt="md" fw={600}>
                <NumberFormatter
                  prefix="R$ "
                  value={125}
                  decimalSeparator=","
                  decimalScale={2}
                />
              </Text>
            </Card>
          ))}
        </SimpleGrid> */}

        {/* Categorias */}
        <Title order={2} mt={80} mb={30} style={{ textAlign: "center", fontSize: 28 }}>
          Categorias em Destaque
        </Title>
        <SimpleGrid cols={6} spacing="lg">
          {["Cerâmica", "Têxtil", "Madeira", "Reciclado"].map((categoria) => (
            <Card key={categoria} padding="lg" radius="md" shadow="md" withBorder>
              <Group p="center">
                <Avatar size="lg" radius="xl" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" />
              </Group>
              <Text ta="center" mt="sm" fw={700}>
                {categoria}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Publicações da Comunidade */}
        <Title order={2} mt={80} mb={30} style={{ textAlign: "center", fontSize: 28 }}>
          Da Comunidade Artesanal
        </Title>
        <SimpleGrid cols={2} spacing="lg">
          {[1, 2].map((publi) => (
            <Card key={publi} shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" size="sm" />
                <Stack gap={0}>
                  <Text fw={700}>Artesã Bruna</Text>
                  <Text size="xs" c="dimmed">
                    2h atrás - @arte_natural
                  </Text>
                </Stack>
              </Group>
              <Card.Section mt="sm">
                <Image
                  height={180}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  alt="Publicação"
                />
              </Card.Section>
              <Text mt="sm" size="sm" c="dimmed">
                Uma nova coleção de mandalas pintadas à mão, inspiradas na natureza e espiritualidade.
              </Text>
              <Group mt="md" justify="space-between">
                <Badge color="teal">Pintura</Badge>
                <Text fw={600}>
                  <NumberFormatter
                    prefix="R$ "
                    value={85}
                    decimalSeparator=","
                    decimalScale={2}
                  />
                </Text>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        <Divider my={60} />

        {/* CTA Final */}
        <Flex justify="center" direction="column" align="center" gap="md">
          <Title order={3} style={{ fontWeight: 600 }}>
            Junte-se à Comunidade
          </Title>
          <Text size="md" c="dimmed" ta="center" w="60%">
            Faça parte de um espaço onde o talento se transforma em arte, e a arte conecta pessoas.
          </Text>
          <Button size="lg" radius="xl" color="blue">
            Criar conta
          </Button>
        </Flex>
      </Container>
    </section>
  );
}
