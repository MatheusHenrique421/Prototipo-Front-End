import { ArtesaoFormProps, ArtesaoModel } from "../models/ArtesaoModel";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  atualizaArtesao,
  cadastrarArtesao,
} from "../services/Api";

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
  FileInputProps,
  Pill,
} from "@mantine/core";

const ArtesaoForm: React.FC<ArtesaoFormProps> = ({ artesao }) => {
  const [, setImagemUrl] = useState<string | null>(null);
  const usuarioId = localStorage.getItem("usuarioId");
  const [, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useParams<{ id: string; }>(); // Captura o ID da rota
  //const isEditing = !!id; // Define se está em modo de edição

  const [artesaoState, setArtesaoState] = useState<ArtesaoModel>({
    ...artesao,
    id: artesao.id || crypto.randomUUID(),
    nomeArtesao: artesao.nomeArtesao || "",
    telefone: artesao.telefone || "",
    whatsApp: artesao.whatsApp || "",
    descricaoPerfil: artesao.descricaoPerfil || "",
    usuarioId: usuarioId || "",
    receberEncomendas: artesao.receberEncomendas || false,
    enviaEncomendas: artesao.enviaEncomendas || false,
    imagem: artesao.imagem || null,
    imagemUrl: artesao.imagemUrl || "",
    CEP: artesao.CEP || "",
    estado: artesao.estado || "",
    cidade: artesao.cidade || "",
    rua: artesao.rua || "",
    bairro: artesao.bairro || "",
    complemento: artesao.complemento || "",
    numero: artesao.numero || "",
    semNumero: artesao.semNumero || false,
  });
  const isEditing = artesao.id; // Define se está em modo de edição

  const handleFileChange = (file: File | null) => {
    setArtesaoState((prevState) => ({ ...prevState, imagem: file }));
  };

  // Função para redimensionar a imagem

  const handleChange = (
    value: string | boolean | string[] | number | File | null,
    id: keyof ArtesaoModel // 'keyof' garante que 'id' seja uma chave válida
  ) => {
    setArtesaoState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Função para atualizar o estado
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked, files } = e.target;

    // Verifica se o campo é do tipo 'file' (imagem)
    if (type === "file") {
      const file = files ? files[0] : null; // Pega o primeiro arquivo, caso haja
      // Se um arquivo foi selecionado, atualiza o estado com o arquivo
      if (file) {
        setArtesaoState((prevState) => ({
          ...prevState,

          [id]: [file], // Armazena o arquivo como um array com 1 item (imagem)
        }));
      }
    } else {
      // Aplica a máscara conforme o campo
      const formataTelefones =
        id === "telefone" || id === "whatsApp" ? mascaraTelefone(value) : value;

      // Lida com checkbox para valores booleanos
      if (type === "checkbox") {
        setArtesaoState((prevState) => ({
          ...prevState,
          [id]: checked,
        }));
      } else {
        setArtesaoState((prevState) => ({
          ...prevState,
          [id]: formataTelefones,
        }));
      }
    }
  };

  // Função que busca as informações do CEP
  const buscarCep = async () => {
    // Remove traços e espaços do CEP para garantir o formato correto
    const cep = artesaoState.CEP?.replace(/\D/g, "");

    if (!cep || cep.length !== 8) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${artesaoState.CEP}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        setArtesaoState((prevState) => ({
          ...prevState,
          estado: data.uf,
          cidade: data.localidade,
          rua: data.logradouro,
          bairro: data.bairro,
        }));
      } else {
        alert("CEP não encontrado!");
        setArtesaoState((prevState) => ({
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

  useEffect(() => {
    if (artesaoState.imagem instanceof File) {
      const url = URL.createObjectURL(artesaoState.imagem);
      setImagemUrl(url); // Atualiza apenas a URL da imagem
      return () => URL.revokeObjectURL(url); // Revoga a URL quando não for mais necessário
    }
  }, [artesaoState.imagem]);

  // Função de submit para cadastrar o artesão
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

  
    console.log("Estado do artesão antes de enviar:", artesaoState);

    // Verifica se a imagem foi definida e não é null ou undefined
    if (artesaoState.imagem instanceof File) {
      formData.append("imagem", artesaoState.imagem); // Adiciona a imagem ao FormData
      console.log("Imagem adicionada:", artesaoState.imagem);
    } else {
      console.error("Imagem não é um arquivo válido.");
    }

    // Adicionando outros campos do artesão
    Object.entries(artesaoState).forEach(([key, value]) => {
      console.log(`Adicionando ${key}:`, value);      
      // Verifica se o valor é um arquivo (File) e adiciona ao FormData
      if (value instanceof File) {
        formData.append(key, value); // Adiciona o arquivo
      } else if (Array.isArray(value)) {
        // Se o valor for um array, você pode querer mapear ou lidar de outra maneira
        value.forEach((item) => formData.append(key, item));
      } else {
        // Para qualquer outro tipo de dado, simplesmente adiciona como string ou número
        formData.append(key, value);
      }
    });

    console.log(
      "Tentando cadastrar Artesão:",
      JSON.stringify(artesaoState, null, 2)
    );

    if (isEditing) {
      await atualizaArtesao(artesaoState.id, formData);
    } else {
      await cadastrarArtesao(artesao);
    }

    try {
      console.log("isEditing && artesaoState.id", isEditing, artesaoState.id);
      if (isEditing) {
        console.log(
          "TENTANDO ENVIAR O FORM DATA:",
          JSON.stringify(formData, null, 2)
        );
        await atualizaArtesao(artesaoState.id, formData); // Atualizar com FormData
        alert("Cadastro atualizado com sucesso!");
        navigate(`/ExibirArtesao/${artesaoState.id}`);
        console.log(
          "Usuário ATUALIZADO com sucesso. Dados retornados da API:",
          JSON.stringify(artesaoState, null, 2)
        );
      } else {
        await cadastrarArtesao(artesao); // Criar novo cadastro
        alert("Cadastro criado com sucesso!");
        // Redirecionar para a página de cadastro (assumindo que a permissão já foi verificada)
        navigate(`/ExibirArtesao/${artesaoState.id}`);
        // console.log(
        //   "Usuário cadastrado com sucesso. Dados retornados da API:",
        //   JSON.stringify(artesao, null, 2)
        // );
        console.log(
          "Usuário CADASTRADO com sucesso. Dados retornados da API:",
          JSON.stringify(artesao, null, 2)
        );
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      alert("Erro ao salvar. Verifique os dados e tente novamente.");
      console.error("Erro ao salvar artesão:", error);
      //console.log("Tamanho da string base64:", artesao.imagem.length);
      console.error("Erro ao cadastrar Artesão:", error.message || error);
      console.log(artesao);
    }
  };

  const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
    if (value === null) {
      return null;
    }

    if (Array.isArray(value)) {
      return (
        <Pill.Group>
          {value.map((file, index) => (
            <Pill key={index}>{file.name}</Pill>
          ))}
        </Pill.Group>
      );
    }

    return <Pill>{value.name}</Pill>;
  };

  return (
    <section>
      <Container>
        <Center>
          <form onSubmit={handleSubmit}>
            <Fieldset legend="Informações do Artesão">
              {/* <Center>
                <SimpleGrid cols={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {artesao.imagem && (
                      <Avatar
                        variant="default"
                        radius="xl"
                        size={100}
                        src={URL.createObjectURL(artesao.imagem)}
                        alt="Imagem do artesão"
                        style={{
                          objectFit: "cover", // Faz a imagem se ajustar sem distorção
                          width: "100px", // Tamanho fixo
                          height: "100px", // Tamanho fixo
                          position: "relative", // Previne o deslocamento do Avatar
                        }}
                      />
                    )}
                  </div>
                  <FileInput
                    label="Foto de perfil"
                    placeholder="Selecione sua foto"
                    id="imagem"
                    onChange={(file) => handleFilesChange(file as File | null)}
                    valueComponent={ValueComponent}
                    multiple={false}
                    accept="image/png,image/jpeg"
                  />
                </SimpleGrid>
              </Center> */}

              <Center>
                <SimpleGrid cols={1} spacing="sm">
                  {" "}
                  {/* Layout em coluna para uma boa disposição */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {artesaoState.imagem && (
                      <Avatar
                        variant="default"
                        radius="xl"
                        size={100} // Tamanho fixo, mas você pode ajustar conforme a necessidade
                        //src={URL.createObjectURL(artesao.imagem)}
                        src={
                          artesaoState.imagem instanceof File
                            ? URL.createObjectURL(artesaoState.imagem)
                            : Array.isArray(artesaoState.imagemUrl)
                            ? artesaoState.imagemUrl[0] // Usa o primeiro valor se for um array
                            : artesaoState.imagemUrl
                        }
                        alt="Imagem do artesão"
                        style={{
                          objectFit: "cover", // Faz a imagem se ajustar sem distorção
                          width: "100px", // Largura fixa
                          height: "100px", // Altura fixa
                          position: "relative", // Previne o deslocamento do Avatar
                          maxWidth: "100%", // Ajuste para que o avatar ocupe até 100% do espaço disponível
                          maxHeight: "100%", // Previne esticar a imagem se for muito grande
                        }}
                      />
                    )}
                  </div>
                  <FileInput
                    label="Foto de perfil"
                    placeholder="Selecione sua foto"
                    id="imagem"
                    onChange={(file) => handleFileChange(file as File | null)}
                    valueComponent={ValueComponent}
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
                  value={artesaoState.nomeArtesao}
                  onChange={(e) => handleChange(e.target.value, "nomeArtesao")}
                  required
                />
                <InputBase
                  w={350}
                  radius="md"
                  label="Telefone:"
                  id="telefone"
                  value={artesaoState.telefone || ""}
                  placeholder="(99) 9 9999-9999"
                  onChange={handleInputChange}
                  maxLength={15}
                  //mask="(99) 99999-9999"
                />
                <InputBase
                  w={300}
                  radius="md"
                  label="Whats App:"
                  id="whatsApp"
                  value={artesaoState.whatsApp || ""}
                  placeholder="(99) 9 9999-9999"
                  onChange={handleInputChange}
                  maxLength={15}
                  //mask="(99) 99999-9999"
                />
              </SimpleGrid>
              <Textarea
                radius="md"
                label="Descrição:"
                resize="vertical"
                placeholder="Descreva sobre a sua marca. min 500 caracteres"
                id="descricaoPerfil"
                value={artesaoState.descricaoPerfil || ""}
                onChange={(e) =>
                  handleChange(e.target.value, "descricaoPerfil")
                }
                required
              />
              <Fieldset legend="Informações sobre encomendas">
                <SimpleGrid cols={2} spacing="sm">
                  <Checkbox
                    p="md"
                    id="receberEncomendas"
                    label="Aceito receber encomendas."
                    checked={artesaoState.receberEncomendas}
                    onChange={(e) =>
                      handleChange(e.target.checked, "receberEncomendas")
                    }
                  />
                  <Checkbox
                    p="md"
                    id="enviaEncomendas"
                    label="Aceita enviar encomendas."
                    checked={artesaoState.enviaEncomendas}
                    onChange={(e) =>
                      handleChange(e.target.checked, "enviaEncomendas")
                    }
                  />
                </SimpleGrid>
              </Fieldset>
              <Fieldset legend="Informações de endereço">
                <SimpleGrid cols={3} spacing="">
                  <TextInput
                    w={110}
                    required
                    radius="md"
                    label="CEP:"
                    placeholder="00000-000"
                    type="text"
                    id="CEP"
                    value={artesaoState.CEP || ""}
                    onChange={(e) =>
                      setArtesaoState({ ...artesaoState, CEP: e.target.value })
                    }
                    onBlur={buscarCep} // Chama a função ao perder o foco
                  />
                  <TextInput
                    ml="-101px"
                    w={200}
                    required
                    radius="md"
                    label="Estado:"
                    placeholder="Selecione"
                    type="text"
                    id="estado"
                    value={artesaoState.estado || ""}
                    onChange={(e) => handleChange(e.target.value, "estado")}
                  />
                  <TextInput
                    ml="-130px"
                    w={150}
                    required
                    radius="md"
                    label="Cidade:"
                    placeholder="Selecione"
                    type="text"
                    id="cidade"
                    value={artesaoState.cidade || ""}
                    onChange={(e) => handleChange(e.target.value, "cidade")}
                  />
                </SimpleGrid>
                <SimpleGrid cols={5} spacing="xs">
                  <TextInput
                    w={150}
                    required
                    radius="md"
                    label="Rua:"
                    placeholder="Rua lorem ipsum"
                    type="text"
                    id="rua"
                    value={artesaoState.rua || ""}
                    onChange={(e) => handleChange(e.target.value, "rua")}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    required
                    label="Bairro:"
                    placeholder="Bairro exemplo x"
                    type="text"
                    id="bairro"
                    value={artesaoState.bairro || ""}
                    onChange={(e) => handleChange(e.target.value, "bairro")}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    label="Complemento:"
                    placeholder="Apto x ou "
                    type="text"
                    id="complemento"
                    value={artesaoState.complemento || ""}
                    onChange={(e) =>
                      handleChange(e.target.value, "complemento")
                    }
                  />
                  <TextInput
                    w={70}
                    radius="md"
                    label="N°:"
                    placeholder="0000"
                    type="text"
                    id="numero"
                    value={artesaoState.numero || ""}
                    onChange={(e) => handleChange(e.target.value, "numero")}
                  />
                  <Checkbox
                    p="xl"
                    ml="-100px"
                    label="Sem N°"
                    id="semNumero"
                    checked={artesaoState.semNumero}
                    onChange={(e) => handleChange(e.target.value, "semNumero")}
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

const mascaraTelefone = (value: string): string => {
  // Remove qualquer caractere não numérico
  const cleaned = value.replace(/\D/g, "");

  // Aplica a máscara com base no tamanho do número
  if (cleaned.length <= 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  }
  return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
};
