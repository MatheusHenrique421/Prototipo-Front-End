import { UsuarioModel } from "../models/UsuarioModel";
import React, { useState, FormEvent } from "react";
import { cadastrarUsuario } from "../services/Api";
import { IMaskInput } from "react-imask";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  SimpleGrid,
  Container,
  InputBase,
  TextInput,
  Fieldset,
  Center,
  Button,
  Radio,
  Title,
  Text,
} from "@mantine/core";

const UsuarioForm: React.FC = () => {
  const navigate = useNavigate();
  const [, setErrorMessage] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioModel>({
    id: "",
    nome: "",
    CPF: "",
    email: "",
    confirmaEmail: "",
    senha: "",
    receberEmail: false,
    role: "usuario",
    artesaoId: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(
      "Tentando cadastrar usuário:",
      JSON.stringify(usuario, null, 2)
    );

    try {
      const data = await cadastrarUsuario(usuario);
      // Logs de sucesso
      console.log(
        "Usuário cadastrado com sucesso. Dados retornados da API:",
        JSON.stringify(data, null, 2)
      );
      // Feedback ao usuário
      alert("Usuário cadastrado com sucesso!");
       // Redireciona para a página de cadastro de artesão, enviando o ID do usuário
       navigate(`/CadastrarArtesao/${data.id}`);
    } catch (error: any) {
      // Captura e exibe mensagens de erro detalhadas
      setErrorMessage(error.message);
      console.error("Erro ao cadastrar usuário:", error.message || error);
    }
  };

  return (
    <section>
      <Container>
        <Center>
          <Title>Cadastre seu usuário</Title>
        </Center>
        <Center>
          <Fieldset>
            <form onSubmit={handleSubmit}>
              <SimpleGrid cols={1}>
                <TextInput
                  w={300}
                  radius="md"
                  label="Nome:"
                  placeholder="Nome"
                  type="text"
                  id="nome"
                  value={usuario.nome}
                  onChange={(e) =>
                    setUsuario({ ...usuario, nome: e.target.value })
                  }
                  required
                />
                <InputBase
                  w={300}
                  radius="md"
                  label="CPF:"
                  placeholder="CPF"
                  id="CPF"
                  typeof="number"
                  value={usuario.CPF}
                  component={IMaskInput}
                  mask="000.000.000-00"
                  onChange={(e) =>
                    setUsuario({ ...usuario, CPF: e.currentTarget.value })
                  }
                  required
                />
                <TextInput
                  w={300}
                  radius="md"
                  label="E-mail:"
                  placeholder="seuEmail@email.com"
                  id="email"
                  value={usuario.email}
                  onChange={(e) =>
                    setUsuario({ ...usuario, email: e.target.value })
                  }
                  required
                />
                <TextInput
                  w={300}
                  radius="md"
                  label="Confirmar e-mail:"
                  placeholder="seuEmail@email.com"
                  id="confirmaEmail"
                  value={usuario.confirmaEmail}
                  onChange={(e) =>
                    setUsuario({ ...usuario, confirmaEmail: e.target.value })
                  }
                  required
                />
                <PasswordInput
                  w={300}
                  radius="md"
                  label="Senha:"
                  placeholder="Senha"
                  id="senha"
                  value={usuario.senha}
                  onChange={(e) =>
                    setUsuario({ ...usuario, senha: e.target.value })
                  }
                  required
                />
                <Radio
                  id="receberEmail"
                  label="Ativar perfil de artesão."
                  value={String(usuario.receberEmail)}
                  checked={usuario.receberEmail}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      receberEmail: e.currentTarget.checked,
                    })
                  }
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
          </Fieldset>
        </Center>
      </Container>
    </section>
  );
};
export default UsuarioForm;
