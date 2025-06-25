import { UsuarioModel } from "../models/UsuarioModel";
import React, { useState, FormEvent } from "react";
import { cadastrarUsuario } from "../services/UsuarioService";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  SimpleGrid,
  Container,
  TextInput,
  Fieldset,
  Center,
  Button,
  Title,
  Text,
} from "@mantine/core";

const UsuarioForm: React.FC = () => {
  const navigate = useNavigate();
  const [, setErrorMessage] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioModel>({
    Id: "",
    Nome: "",    
    Email: "",    
    SenhaHash: "",    
    Role: "Usuario",
    ArtesaoId: "",
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
       navigate(`/CadastrarArtesao/${data.Id}`);
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
                  value={usuario.Nome}
                  onChange={(e) =>
                    setUsuario({ ...usuario, Nome: e.target.value })
                  }
                  required
                />                
                <TextInput
                  w={300}
                  radius="md"
                  label="E-mail:"
                  placeholder="seuEmail@email.com"
                  id="email"
                  value={usuario.Email}
                  onChange={(e) =>
                    setUsuario({ ...usuario, Email: e.target.value })
                  }
                  required
                />
               
                <PasswordInput
                  w={300}
                  radius="md"
                  label="Senha:"
                  placeholder="Senha"
                  id="senha"
                  value={usuario.SenhaHash}
                  onChange={(e) =>
                    setUsuario({ ...usuario, SenhaHash: e.target.value })
                  }
                  required
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
