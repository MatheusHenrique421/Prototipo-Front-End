import React, { useState, FormEvent } from "react";
import { cadastrarUsuario } from "../services/Api";
import { IMaskInput } from "react-imask";
import {
  Container,
  Center,
  SimpleGrid,
  TextInput,
  Text,
  PasswordInput,
  Radio,
  Button,
  InputBase,
} from "@mantine/core";
import { Link } from "react-router-dom";

const UsuarioForm: React.FC = () => {
  const [id] = useState<number>(Math.floor(Math.random() * 1000000));
  const [nome, setNome] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmaEmail, setConfirmaEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [receberEmail, setReceberEmail] = useState(false);
  const [, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const usuario = {
      id: id,
      nome: nome,
      CPF: CPF,
      email: email,
      confirmaEmail: confirmaEmail,
      senha: senha,
      receberEmail: receberEmail,
    };

    try {
      const data = await cadastrarUsuario(usuario);
      console.log(data);
      alert("Usuário cadastrado com sucesso!");
      console.log(usuario);
    } catch (error: any) {
      console.error("Erro ao enviar os dados:", error);
      console.log(usuario);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage(
          "Erro de rede: Não foi possível conectar à API. Verifique sua conexão ou se o servidor está rodando."
        );
        console.log(usuario);
      } else if (error.response) {
        setErrorMessage(
          `Erro: ${error.response.status} - ${error.response.data}`
        );
        console.log(usuario);
      } else {
        setErrorMessage("Ocorreu um erro inesperado ao cadastrar o usuário.");
        console.log(usuario);
      }
    }
  };

  return (
    <section>
      <Container>
        <h1>Criar uma nova conta</h1>
        <Center>
          <form
            onSubmit={handleSubmit}
            style={{
              borderRadius: "5px",
              border: "solid",
              padding: "30px",
              borderColor: "gray",
            }}
          >
            <SimpleGrid cols={1}>
              <TextInput
                w={300}
                radius="md"
                label="Nome:"
                placeholder="Nome"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <InputBase
                w={300}
                radius="md"
                label="CPF:"
                placeholder="CPF"
                id="CPF"
                typeof="number"
                value={CPF}
                component={IMaskInput}
                mask="000.000.000-00"
                onChange={(e) => setCPF((e.target as HTMLInputElement).value)}
                required
              />
              <TextInput
                w={300}
                radius="md"
                label="E-mail:"
                placeholder="seuEmail@email.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextInput
                w={300}
                radius="md"
                label="Confirmar e-mail:"
                placeholder="seuEmail@email.com"
                id="confirmaEmail"
                value={confirmaEmail}
                onChange={(e) => setConfirmaEmail(e.target.value)}
                required
              />
              <PasswordInput
                w={300}
                radius="md"
                label="Senha:"
                placeholder="Senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <Radio
                id="receberEmail"
                label="Quero receber novidades no e-mail."
                value={String(receberEmail)}
                checked={receberEmail}
                onChange={(e) => setReceberEmail(e.currentTarget.checked)}
              />
              <Button type="submit" radius="md">
                Cadastrar
              </Button>
              <div>
                <hr />
              </div>
              <Center>
                <Link to="/Login">
                  <Text>Entrar com e-mail e senha</Text>
                </Link>
              </Center>
            </SimpleGrid>
          </form>
        </Center>
      </Container>
    </section>
  );
};
export default UsuarioForm;
