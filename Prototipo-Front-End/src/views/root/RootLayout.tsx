import { Link, Outlet } from "react-router-dom";
import classes from "./style.module.css";
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  UnstyledButton,
  Group,
  Text,
  Flex,
  Menu,
  Container,
  Title,
} from "@mantine/core";

export default function RootLayout() {
  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
      withBorder={false}
      styles={{
        main: { backgroundColor: "#f9f9f9" },
      }}
    >
      <AppShellHeader>
        <Container size="xl" h="100%">
          <Group justify="space-between" align="center" h="100%">
            <Title order={3} style={{ fontFamily: "Georgia, serif" }}>
              Curadoria Artesanal
            </Title>
            <Group gap="xs">
              <UnstyledButton
                component={Link}
                to="/"
                className={classes.control}
              >
                Início
              </UnstyledButton>

              <Menu>
                <Menu.Target>
                  <UnstyledButton className={classes.control}>
                    Artesanatos
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={Link} to="/CadastrarArtesanato">
                    Cadastrar
                  </Menu.Item>
                  <Menu.Item component={Link} to="/ListarArtesanatos">
                    Listar
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <UnstyledButton className={classes.control}>
                    Artesãos
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={Link} to="/CadastrarArtesao">
                    Cadastrar
                  </Menu.Item>
                  <Menu.Item component={Link} to="/ListarArtesaos">
                    Listar
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <UnstyledButton className={classes.control}>
                    Conta
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={Link} to="/Login">
                    Login
                  </Menu.Item>
                  <Menu.Item component={Link} to="/Logout">
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </AppShellHeader>

      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShellFooter p="lg" style={{ backgroundColor: "#eeeeee" }}>
        <Container size="xl">
          <Flex justify="space-between" align="center">
            <Text size="sm">
              © {new Date().getFullYear()} Curadoria Artesanal. Todos os
              direitos reservados.
            </Text>
            <Group>
              <Text size="sm">Termos de Uso</Text>
              <Text size="sm">Política de Privacidade</Text>
            </Group>
          </Flex>
        </Container>
      </AppShellFooter>
    </AppShell>
  );
}
