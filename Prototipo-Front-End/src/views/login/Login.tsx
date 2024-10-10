import {
  Button,
  Center,
  Container,
  TextInput,
  Text,
  PasswordInput,
  Radio,
  SimpleGrid,
  Anchor,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section>
      <Container>
        <h1>Login</h1>
        <Center>
          <form
            style={{
              borderRadius: "5px",
              border: "solid",
              padding: "30px",
            }}
          >
            <SimpleGrid cols={1}>
              <TextInput
                w={300}
                radius="md"
                label="E-mail:"
                placeholder="E-mail"
                // value={}
                // onChange={(e) => setNome(e.target.value)}
              />
              <div>
                <Group p="apart" mb="xs"></Group>
                <PasswordInput
                  w={300}
                  radius="md"
                  label="Senha:"
                  placeholder="Senha"
                  // value={}
                  // onChange={(e) => setNome(e.target.value)}
                />
                <Anchor href="#">Esqueceu a senha?</Anchor>
              </div>
              <Button type="submit" radius="md">
                Cadastrar
              </Button>
              <div>
                <hr />
              </div>
              <Center>
                {/* quando cadastrar e redirecionar a tela diretamente para terminar o cadastro.. */}
                <Link to="/CadastroUsuario">
                  <Text>Criar uma nova conta</Text>
                </Link>
              </Center>
            </SimpleGrid>
          </form>
        </Center>
      </Container>
    </section>
  );
}
