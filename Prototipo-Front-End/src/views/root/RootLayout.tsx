import {
  AppShell,
  AppShellFooter,
  Burger,
  Group,
  UnstyledButton,
  Text,
  Center,
  Flex,
  TextInput,
  Button,
  Menu,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import classes from "./style.module.css";
export default function RootLayouyt() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
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
                {/* Menu Dropdown Artesanatos */}
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
                {/* Menu Dropdown Artesãos*/}
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
                <UnstyledButton
                   ml="930px"
                  component={Link}
                  to="/Login"
                  className={classes.control}
                >
                  Login
                </UnstyledButton>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={5}>
          <UnstyledButton className={classes.control}>Home</UnstyledButton>
          <UnstyledButton className={classes.control}>
            Galeria de Artes
          </UnstyledButton>
          <UnstyledButton className={classes.control}>
            Artesanatos
          </UnstyledButton>
          <UnstyledButton className={classes.control}>Artesãos</UnstyledButton>
          <UnstyledButton className={classes.control}>
            Comunidade
          </UnstyledButton>
        </AppShell.Navbar>

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
