import { LoginModel } from "../../models/LoginModel";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../../services/Api";
import { FormEvent, useState } from "react";
import {
  PasswordInput,
  SimpleGrid,
  TextInput,
  Fieldset,
  Button,
  Anchor,
  Group,
  Stack,
  Title,
  Text,
} from "@mantine/core";

const initialLoginState: LoginModel = {
  usuarioId: "",
  email: "",
  senha: "",
  token: "",
};

export default function Login() {
  const [login, setLogin] = useState<LoginModel>(initialLoginState);
  const [erro] = useState("");
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
      <Stack
        h={900}
        bg="var(--mantine-color-body)"
        align="Center"
        justify="center"
        gap="xs"
      >
        <Title>LOGIN</Title>
        <Fieldset w={360}>
          <form onSubmit={handleSubmit}>
            <SimpleGrid cols={1}>
              <TextInput
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
              <SimpleGrid cols={2}>
                <Text>Não possui cadastro?</Text>
                <Anchor href="/CadastrarUsuario">Cadastre-se</Anchor>
              </SimpleGrid>
            </SimpleGrid>
          </form>
        </Fieldset>
      </Stack>
    </section>
  );
}
