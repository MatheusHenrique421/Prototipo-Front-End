import { ArtesaoModel } from "../models/ArtesaoModel";
import {
  atualizaArtesao,
  buscarArtesaoPorId,
  cadastrarArtesao,
} from "../services/Api";
import { useNavigate } from "react-router-dom";
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
} from "@mantine/core";

interface ArtesaoFormProps {
  artesao: ArtesaoModel;
  onSubmit: (updatedArtesao: ArtesaoModel) => void;
}

const ArtesaoForm: React.FC<ArtesaoFormProps> = ({ artesao, onSubmit }) => {
  const [imagemRedimensionada, setImagemRedimensionada] = useState<
    string | null
  >(artesao.imagemPerfil || null);
  const usuarioId = localStorage.getItem("usuarioId"); // Recupere o ID do usuário
  const [, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const [artesaoState, setArtesao] = useState<ArtesaoModel>({
    ...artesao,
    id: artesao.id || crypto.randomUUID(),
    nomeArtesao: artesao.nomeArtesao || "",
    telefone: artesao.telefone || "",
    whatsApp: artesao.whatsApp || "",
    descricaoPerfil: artesao.descricaoPerfil || "",
    usuarioId: usuarioId || "",
    receberEncomendas: artesao.receberEncomendas || false,
    enviaEncomendas: artesao.enviaEncomendas || false,
    imagemPerfil: artesao.imagemPerfil || "",
    fotoUrl: artesao.fotoUrl || "",
    CEP: artesao.CEP || "",
    estado: artesao.estado || "",
    cidade: artesao.cidade || "",
    rua: artesao.rua || "",
    bairro: artesao.bairro || "",
    complemento: artesao.complemento || "",
    numero: artesao.numero || "",
    semNumero: artesao.semNumero || false,
  });

  // Função que busca as informações do CEP
  const buscarCep = async () => {
    if (!artesaoState.CEP) return; // Se o CEP estiver vazio, não faz a requisição

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${artesaoState.CEP}/json/`
      );
      const data = await response.json();

      // Verifica se a resposta é válida
      if (!data.erro) {
        setArtesao({
          ...artesaoState,
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

  const redimensionarImagem = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 1000; // Diminuir a largura para um tamanho mais razoável
        const MAX_HEIGHT = 1000; // Ajuste a altura de acordo
        const MAX_SIZE = 1 * 1024 * 1024; // 1MB
        let width = img.width;
        let height = img.height;        
        const fileSize = file.size;

        if (fileSize > MAX_SIZE) {
          alert("O arquivo é muito grande. Tente com uma imagem menor.");
          return;
        }
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = (width * MAX_HEIGHT) / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const imagemBase64 = canvas.toDataURL("image/jpeg", 0.8); // Comprimir um pouco a imagem
        setImagemRedimensionada(imagemBase64);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      // // Verifique o tipo da imagem
      const fileType = file.type;
      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        alert(
          "Formato de arquivo não suportado. Apenas JPEG e PNG são permitidos."
        );
        return;
      }

      const formData = new FormData();
      formData.append("imagem", file);

      // Enviar a imagem via API
      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log("Imagem enviada com sucesso:", data))
        .catch((error) => console.error("Erro ao enviar imagem:", error));

      // Processa a nova imagem
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          setArtesao({ ...artesaoState, imagemPerfil: base64String });
        }
      };

      redimensionarImagem(file);
      reader.readAsDataURL(file);
    } else if (!imagemRedimensionada) {
      // Caso nenhum arquivo seja selecionado, mantenha a imagem existente
      setArtesao({ ...artesaoState, imagemPerfil: artesao.imagemPerfil });
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

    console.log(
      "Tentando cadastrar Artesão:",
      JSON.stringify(artesaoState, null, 2)
    );

    try {
      // Verificar se o artesão já existe com o ID informado
      if (artesaoState.id) {
        const artesaoExistente = await buscarArtesaoPorId(artesaoState.id);

        if (artesaoExistente) {
          // Se o ID já existe, faz a edição
          const dadosEditados = await atualizaArtesao(
            artesaoState.id,
            artesaoState
          );
          console.log("Artesão editado com sucesso:", dadosEditados);

          alert("Artesão editado com sucesso!");
          navigate(`/ExibirArtesao/${artesaoState.id}`);
          return;
        }
      }

      // Caso o ID não exista, faz o cadastro
      const data = await cadastrarArtesao(artesaoState);

      console.log(
        "Usuário cadastrado com sucesso. Dados retornados da API:",
        JSON.stringify(data, null, 2)
      );

      alert("Artesão cadastrado com sucesso!");
      // Redirecionar para a página de cadastro (assumindo que a permissão já foi verificada)
      navigate(`/ExibirArtesao/${artesaoState.id}`);
    } catch (error: any) {
      setErrorMessage(error.message);

      console.log(
        "Tamanho da string base64:",
        artesaoState.imagemPerfil.length
      );
      console.error("Erro ao cadastrar Artesão:", error.message || error);
      console.log(artesaoState);
    }
  };

  return (
    <section>
      <Container>
        <Center>
          <form onSubmit={handleSubmit}>
            <Fieldset legend="Informações do Artesão">
              <Center>
                <SimpleGrid cols={2}>
                  <Avatar
                    variant="default"
                    radius="xl"
                    size="xl"
                    src={
                      imagemRedimensionada
                        ? imagemRedimensionada
                        : artesaoState.imagemPerfil
                    }
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
                  value={artesaoState.nomeArtesao}
                  onChange={handleChange}
                  required
                />
                <InputBase
                  w={350}
                  radius="md"
                  label="Telefone:"
                  placeholder="(99) 9 9999-9999"
                  id="telefone"
                  value={artesaoState.telefone}
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
                  value={artesaoState.whatsApp}
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
                value={artesaoState.descricaoPerfil}
                onChange={handleChange}
              />
              <Fieldset legend="Informações sobre encomendas">
                <SimpleGrid cols={2} spacing="sm">
                  <Checkbox
                    p="md"
                    id="receberEncomendas"
                    label="Aceito receber encomendas."
                    checked={artesaoState.receberEncomendas}
                    onChange={handleChange}
                  />
                  <Checkbox
                    p="md"
                    id="enviaEncomendas"
                    label="Aceita enviar encomendas."
                    checked={artesaoState.enviaEncomendas}
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
                    value={artesaoState.CEP ? String(artesaoState.CEP) : ""}
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
                    value={artesaoState.estado}
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
                    value={artesaoState.cidade}
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
                    value={artesaoState.rua}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    label="Bairro:"
                    placeholder="Bairro exemplo x"
                    type="text"
                    id="bairro"
                    value={artesaoState.bairro}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={150}
                    radius="md"
                    label="Complemento:"
                    placeholder="Apto x ou "
                    type="text"
                    id="complemento"
                    value={artesaoState.complemento}
                    onChange={handleChange}
                  />
                  <TextInput
                    w={70}
                    radius="md"
                    label="N°:"
                    placeholder="0000"
                    type="text"
                    id="numero"
                    value={artesaoState.numero}
                    onChange={handleChange}
                  />
                  <Checkbox
                    p="xl"
                    ml="-100px"
                    label="Sem N°"
                    id="semNumero"
                    checked={artesaoState.semNumero}
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
