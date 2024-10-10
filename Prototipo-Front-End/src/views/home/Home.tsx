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
} from "@mantine/core";

export function Home() {
  return (
    <section>
      <Container>
        <h1>Tela Home</h1>
        <Card shadow="sm" padding="md" radius="md" withBorder mt="lg">
          <Card.Section component="a" href="https://mantine.dev/">
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Flex justify="center" align="center">
            <Group
              align="center"
              justify="space-between"
              mt="md"
              mb="xs"
              gap="md"
            >
              <Text fw={500}>Seja Bem Vindo!</Text>
            </Group>
          </Flex>

          <Text size="lg" c="dimmed" style={{ textAlign: "center" }}>
            Descubra artistas e incriveis artesanatos feitos à mão, conheça todo
            o processo e muito mais.
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      </Container>

      <section>
        <Container>
          <SimpleGrid mt="lg" mb="lg" cols={2}>
            <div>
              <Text size="xl" fw={700} mt="md" mb="md">
                Artesanatos em Destaque
              </Text>
              <Text size="md" c="dimmed" style={{ textAlign: "left" }}>
                Descubra artistas e incriveis artesanatos feitos à mão, conheça
                todo o processo e muito mais.
              </Text>
              <Button color="blue" mt="md" radius="md">
                Conheça-os
              </Button>
            </div>
            <div>
              <Card
                shadow="sm"
                padding="xl"
                component="a"
                mt="md"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                <Card.Section>
                  <Image
                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    h={160}
                    alt="No way!"
                  />
                </Card.Section>
              </Card>
            </div>
          </SimpleGrid>
          {/* //criar o for para este SimpleGrid */}
          <div>
            <SimpleGrid mt="lg" mb="lg" cols={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="lg" mb="lg">
                  <Badge color="orange">On Sale</Badge>
                </Group>
                <Text fw={500}>Descricao trab</Text>
                <NumberFormatter
                  prefix="R$:"
                  value={10}
                  decimalSeparator={","}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
              </Card>
            </SimpleGrid>
          </div>
          <hr />
        </Container>
      </section>
      <section>
        <Container>
          <SimpleGrid mt="lg" mb="lg" cols={2}>
            <div>
              <Card
                shadow="sm"
                padding="xl"
                component="a"
                mt="md"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                <Card.Section>
                  <Image
                    radius="md"
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                  />
                </Card.Section>
              </Card>
            </div>
            <div>
              <Text
                size="xl"
                fw={700}
                mt="md"
                mb="md"
                style={{ textAlign: "center" }}
              >
                Categorias de Artesanatos
              </Text>
              <Text size="md" c="dimmed" style={{ textAlign: "center" }}>
                Descubra artistas e incriveis artesanatos feitos à mão, conheça
                todo o processo e muito mais.
              </Text>
              <Flex justify="center">
                <Button color="blue" mt="md" radius="md">
                  Explore
                </Button>
              </Flex>
              <Flex
                gap="xl"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <SimpleGrid mt="lg" mb="lg" cols={3}>
                  <Group>
                    <Avatar
                      component="a"
                      href="https://github.com/rtivital"
                      target="_blank"
                      src="avatar.png"
                      alt="it's me"
                      size="xl"
                    />
                    <Text>asdkpasokd</Text>
                  </Group>
                  <Avatar
                    component="a"
                    href="https://github.com/rtivital"
                    target="_blank"
                    src="avatar.png"
                    alt="it's me"
                    size="xl"
                  />
                  <Avatar
                    component="a"
                    href="https://github.com/rtivital"
                    target="_blank"
                    src="avatar.png"
                    alt="it's me"
                    size="xl"
                  />
                </SimpleGrid>
              </Flex>
            </div>
          </SimpleGrid>
          <hr />
        </Container>
      </section>
      <section>
        <Container>
          <Flex justify="center" align="center">
            <Group
              align="center"
              justify="space-between"
              mt="md"
              mb="xs"
              gap="md"
            >
              <Text size="xl" fw={700}>
                Comunidade do Artesaato
              </Text>
            </Group>
          </Flex>
          <Text size="md" c="dimmed" style={{ textAlign: "center" }}>
            Descubra artistas e incriveis artesanatos feitos à mão, conheça todo
            o processo e muito mais.
          </Text>

          {/* criar o for para a publicação */}
          <SimpleGrid mt="lg" mb="lg" p="xl" cols={1}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group>
                <Avatar
                  component="a"
                  href="https://github.com/rtivital"
                  target="_blank"
                  src="avatar.png"
                  alt="it's me"
                  size="sm"
                />
                <Stack mb="sm">
                  <Text mt={0}>Nome do Artista</Text>
                  <Text size="sm" mt={0} c="dimmed">
                    Hrs atras - Nome da Loja{" "}
                  </Text>
                </Stack>
              </Group>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={200}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="lg" mb="lg">
                <Badge color="orange">Categorias do artesanato</Badge>
              </Group>
              <Text c="dimmed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis earum nesciunt dolore ullam quae. Saepe similique
                omnis, quo optio quod nostrum voluptatum ex rem fugiat, itaque
                consequuntur iusto facilis sequi?
              </Text>
              <b>
                <NumberFormatter
                  prefix="R$:"
                  value={10}
                  decimalSeparator={","}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
              </b>
            </Card>
          </SimpleGrid>
        </Container>
      </section>
    </section>
  );
}
