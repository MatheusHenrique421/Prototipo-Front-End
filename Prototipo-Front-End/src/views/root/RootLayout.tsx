import { Link, Outlet } from "react-router-dom";
import classes from "./style.module.css";
import {
  AppShellFooter,
  UnstyledButton,
  TextInput,
  AppShell,
  Center,
  Button,
  Group,
  Text,
  Flex,
  Menu,
} from "@mantine/core";
export default function RootLayouyt() {
  
  return (
    <>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md">
            <Group justify="space-between" align="center" style={{ flex: 1 }}>
              <Group align="center" gap={0} visibleFrom="sm">
                <UnstyledButton
                  ml="300px"
                  component={Link}
                  to="/Home"
                  className={classes.control}
                >
                  Home
                </UnstyledButton>

                {/* Menu Dropdown Artesanatos*/}
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

                {/* Menu Dropdown Artesãos*/}
                <Menu>
                  <Menu.Target>
                    <UnstyledButton className={classes.control}>
                      Artesão
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

                {/* Menu Dropdown Usuários*/}
                <Menu>
                  <Menu.Target>
                    <UnstyledButton className={classes.control}>
                      Usuários
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item component={Link} to="/CadastrarUsuario">
                      Cadastrar
                    </Menu.Item>
                    <Menu.Item component={Link} to="/ListarUsuarios">
                      Listar
                    </Menu.Item>
                    <Menu.Item component={Link} to="/EditarUsuario">
                      Editar
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                {/* Menu Dropdown Login/Logout*/}
                <Menu>
                  <Menu.Target>
                    <UnstyledButton ml="930px" className={classes.control}>
                      Usuário Nome
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item component={Link} to="/CadastrarArtesao">
                      Login
                    </Menu.Item>
                    <Menu.Item component={Link} to="/ListarArtesaos">
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main mb="xl" style={{ flex: 1 }}>
          <Outlet />
        </AppShell.Main>

        <AppShellFooter pos={"static"}>
          <Center p="lg" style={{ backgroundColor: "Gray" }}>
            <Group>
              <Text w={150}>Cadastre-se e receba todas as novidades!</Text>
              <TextInput
                w={300}
                radius="md"
                placeholder="seuemail@email.com.br"
              />
              <Button radius="md">Cadastre-se</Button>
            </Group>
          </Center>
          <Flex justify="space-between" align="center" mt="xl" mb="xl">
            <Text ml="lg" mr="lg">
              © 2024 PROTÓTIPO. Todos os direitos reservados.
            </Text>
            <Group>
              <Text ml="lg" mr="lg">
                Termos de Uso
              </Text>
              <Text ml="lg" mr="lg">
                Política de Privacidade
              </Text>
            </Group>
          </Flex>
        </AppShellFooter>
      </AppShell>
    </>
  );
}
