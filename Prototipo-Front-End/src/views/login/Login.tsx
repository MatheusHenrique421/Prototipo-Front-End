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
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../../services/Api";
import { LoginModel } from "../../models/LoginModel";

const initialLoginState: LoginModel = {
  usuarioId:"",
  email: "",
  senha: "",
  token:""
};

export default function Login() {
  const [login, setLogin] = useState<LoginModel>(initialLoginState);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const data = await loginUsuario(login);

      // Salve o ID ou token no localStorage ou estado global
      localStorage.setItem("usuarioId", data.usuarioId); // Assumindo que o backend retorna o ID
      
      alert("Login realizado com sucesso!");      
      console.log("Login bem sucedido!", data);
      console.log("usuarioId:", data.usuarioId);
      
      // Redirecionar para a página de cadastro (assumindo que a permissão já foi verificada)
      navigate("/CadastrarArtesao");
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Exibir uma mensagem de erro mais amigável para o usuário
      alert(
        "Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde."
      );
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
                value={login.email}
                onChange={handleChange}
                required
              />
              <div>
                <Group p="apart" mb="xs"></Group>
                <PasswordInput
                  w={300}
                  radius="md"
                  label="Senha:"
                  placeholder="Senha"
                  id="senha"
                  value={login.senha}
                  onChange={handleChange}
                  required
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
                <Link to="/CadastrarUsuario">
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
