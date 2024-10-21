import {
  Button,
  Center,
  Container,
  TextInput,
  Text,
  PasswordInput,
  SimpleGrid,
  Anchor,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate  }from "react-router-dom";
import { loginUsuario } from "../../services/Api";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [erro, setErro] = useState("");
  const history = useNavigate(); // ou useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await loginUsuario({ email, senha });
        console.log("Login bem-sucedido:", response);
        
        // Redirecionar para outra página, por exemplo:
        history('/dashboard'); // ou useNavigate('/dashboard') com useNavigate

        // Se você usasse um estado global (como o Context API ou Redux), poderia também atualizar o estado de login aqui
    } catch (err: any) {
        // Aqui, você pode verificar o tipo do erro se precisar de uma manipulação mais específica
        setErro("Falha no login. Verifique suas credenciais.");
    }
};

  return (
    <section>
      <Container>
        <h1>Login</h1>
        <Center>
          <form
            onSubmit={handleSubmit}
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <Group p="apart" mb="xs"></Group>
                <PasswordInput
                  w={300}
                  radius="md"
                  label="Senha:"
                  placeholder="Senha"
                  id="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <Anchor href="#">Esqueceu a senha?</Anchor>
              </div>
              {erro && <p style={{ color: "red" }}>{erro}</p>}
              <Button type="submit" radius="md">
                Entrar
              </Button>
              <div>
                <hr />
              </div>
              <Center>
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
