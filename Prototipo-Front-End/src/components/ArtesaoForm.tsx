import { ArtesaoModel } from "../models/ArtesaoModel";
import { cadastrarArtesao } from "../services/Api";
import { useState, FormEvent } from "react";
import { IMaskInput } from "react-imask";
import {
  Container,
  Center,
  Fieldset,
  SimpleGrid,
  Avatar,
  FileInput,
  InputBase,
  Textarea,
  Checkbox,
  TextInput,
  Button,
  Text,
} from "@mantine/core";

const ArtesaoForm: React.FC = () => {
  const [, setErrorMessage] = useState<string>("");
  const [artesao, setArtesao] = useState<ArtesaoModel>({
    id: "",
    nomeArtesao: "",
    telefone: "",
    whatsApp: "",
    descricaoPerfil: "",
    usuarioId: "",    
    receberEncomendas: false,
    enviaEncomendas: false,
    imagemPerfil: "",
    fotoUrl: "",
    CEP: "",
    estado: "",
    cidade: "",
    rua: "",
    bairro: "",
    complemento: "",
    numero: "",
    semNumero: false,
  });

  // Função que busca as informações do CEP
  const buscarCep = async () => {
    if (!artesao.CEP) return; // Se o CEP estiver vazio, não faz a requisição

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${artesao.CEP}/json/`
      );
      const data = await response.json();

      // Verifica se a resposta é válida
      if (!data.erro) {
        setArtesao({
          ...artesao,
          estado: data.uf,
          cidade: data.localidade,
          rua: data.logradouro,
          bairro: data.bairro,
        });
      } else {
        alert("CEP não encontrado!");
        setArtesao((prevState) => ({
          ...prevState,
          estado: "",
          cidade: "",
          rua: "",
          bairro: "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErrorMessage(String(error));
      alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // Atualiza o estado com a string base64 da imagem
          setArtesao({
            ...artesao,
            imagemPerfil: reader.result,
          });
          console.log(file);
        }
      };
    } else {
      setArtesao({
        ...artesao,
        imagemPerfil: "",
      });
    }
  };

  // Função para atualizar o estado de artesão ao alterar qualquer campo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;

    let newValue;

    if (type === "checkbox") {
      // Para checkbox, atribui o valor de "checked" (true ou false)
      newValue = checked;
    } else if (id === "telefone" || id === "whatsapp") {
      // Remove tudo que não for número para os campos de telefone e whatsapp
      newValue = value.replace(/\D/g, "");
    } else {
      newValue = value;
    }

    if (e.target instanceof HTMLTextAreaElement) {
      // Lógica específica para textarea, por exemplo, limitar o número de caracteres
      if (value.length > 255) {
        // Mostrar uma mensagem de erro ou cortar o texto
      }
    }

    setArtesao((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleChangeInput = (e: React.BaseSyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target && target.id && target.value) {
      const { id, value } = target;
      const newValue = value.replace(/\D/g, "");
      setArtesao((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      console.log(`ID: ${id}, Valor: ${newValue}`); // Exemplo de log
    } else {
      console.error("Evento inválido ou target não é um HTMLInputElement");
    }
  };

  // Função de submit para cadastrar o artesão
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Tentando cadastrar Artesão:", JSON.stringify(artesao, null, 2));        

    try {      
      const data = await cadastrarArtesao(artesao);
      
      console.log("Usuário cadastrado com sucesso. Dados retornados da API:", JSON.stringify(data, null, 2));
      
      alert("Artesão cadastrado com sucesso!");
    } catch (error: any) {
        setErrorMessage(error.message);
        
      console.log("Tamanho da string base64:", artesao.imagemPerfil.length);
      console.error("Erro ao cadastrar Artesão:", error.message || error);
      console.log(artesao);    
    }
  };

  return (
    <section>
      <Container>
        <Text>Cadastrar Artesão</Text>
        <Center>
          <form onSubmit={handleSubmit}>
            <Fieldset legend="Informações do Artesão">
              <Center>
                <SimpleGrid cols={2}>
                  <Avatar
                    variant="default"
                    radius="xl"
                    size="xl"
                    src={artesao.imagemPerfil}
                  />
                  <FileInput
                    label="Foto de perfil"
                    placeholder="Selecione sua foto."
                    id="imagemPerfil"
                    onChange={handleFileChange}
                    multiple={false}
                    accept="image/png,image/jpeg"
                  />
                </SimpleGrid>
              </Center>
              <SimpleGrid cols={2}>
                <InputBase
                  w={350}
                  radius="md"
                  label="Nome do perfil:"
                  placeholder="Nome do perfil"
                  type="text"
                  id="nomeArtesao"
                  value={artesao.nomeArtesao}
                  onChange={handleChange}
                  required
                />
                <InputBase
                  w={350}
                  radius="md"
                  label="Telefone:"
                  placeholder="(99) 9 9999-9999"
                  id="telefone"
                  value={artesao.telefone}
                  onChange={handleChangeInput}
                  component={IMaskInput}
                  mask="(00) 0 0000-0000"
                  type="text"
                />
                <InputBase
                  w={300}
                  radius="md"
                  label="Whats App:"
                  placeholder="(99) 9 9999-9999"
                  id="whatsApp"
                  component={IMaskInput}
                  value={artesao.whatsApp}
                  onChange={handleChangeInput}
                  mask="(00) 0 0000-0000"
                  type="text"
                />
              </SimpleGrid>
              <Textarea
                radius="md"
                label="Descrição:"
                resize="vertical"
                placeholder="Descreva sobre a sua marca. min 500 caracteres"
                id="descricaoPerfil"
                value={artesao.descricaoPerfil}
                onChange={handleChange}
              />
              <Fieldset legend="Informações sobre encomendas">
                <SimpleGrid cols={2} spacing="sm">
                  <Checkbox
                    p="md"
                    id="receberEncomendas"
                    label="Aceito receber encomendas."
                    checked={artesao.receberEncomendas}
                    onChange={handleChange}
                  />
                  <Checkbox
                    p="md"
                    id="enviaEncomendas"
                    label="Aceita enviar encomendas."
                    checked={artesao.enviaEncomendas}
                    onChange={handleChange}
                  />
                </SimpleGrid>
              </Fieldset>
              <Fieldset legend="Informações de endereço">
                <SimpleGrid cols={3} spacing="">
                  <TextInput
                    w={110}
                    radius="md"
                    label="CEP:"
                    placeholder="00000-000"
                    type="text"
                    id="CEP"
                    value={artesao.CEP ? String(artesao.CEP) : ""}
                    onChange={handleChange}
                    onBlur={buscarCep} // Chama a função ao perder o foco
                  />
                  <TextInput
                    ml="-101px"
                    w={200}
                    radius="md"
                    label="Estado:"
                    placeholder="Selecione"
                    type="text"
                    id="estado"
                    value={artesao.estado}
                    onChange={handleChange}
                  />
                  <TextInput
                    ml="-130px"
                    w={150}
                    radius="md"
                    label="Cidade:"
                    placeholder="Selecione"
                    type="text"
                    id="cidade"
                    value={artesao.cidade}
                    onChange={handleChange}
                  />
                </SimpleGrid>
                <SimpleGrid cols={5} spacing="xs">
                  <TextInput
                    w={150}
                    radius="md"
                    label="Rua:"
                    placeholder="Rua lorem ipsum"
                    type="text"
                    id="rua"
                    value={artesao.rua}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    label="Bairro:"
                    placeholder="Bairro exemplo x"
                    type="text"
                    id="bairro"
                    value={artesao.bairro}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    label="Complemento:"
                    placeholder="Apto x ou "
                    type="text"
                    id="complemento"
                    value={artesao.complemento}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={70}
                    radius="md"
                    label="N°:"
                    placeholder="0000"
                    type="text"
                    id="numero"
                    value={artesao.numero}
                    onChange={handleChange}
                  />
                  <Checkbox
                    p="xl"
                    ml="-100px"
                    label="Sem N°"
                    id="semNumero"
                    checked={artesao.semNumero}
                    onChange={handleChange}
                  />
                </SimpleGrid>
              </Fieldset>
              <Button m="md" type="submit" radius="md" color="green">
                Salvar
              </Button>
            </Fieldset>
          </form>
        </Center>
      </Container>
    </section>
  );
};

export default ArtesaoForm;
