import { ArtesanatoModel } from "../models/ArtesanatoModel";
import { useState } from "react";
import { cadastrarArtesanato } from "../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Fieldset,
  FileInput,
  FileInputProps,
  Group,
  List,
  NumberInput,
  Pill,
  SimpleGrid,
  TagsInput,
  TextInput,
  Title,
} from "@mantine/core";

const ArtesanatoForm: React.FC = () => {
  const [, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const idCorreto = id && id.startsWith("id=") ? id.split("=")[1] : id;
  const artesaoIdFromParams = id?.startsWith("id=") ? id.split("=")[1] : id;
  const artesaoId =
    artesaoIdFromParams || localStorage.getItem("artesaoId") || "";
  const artesanatoId = crypto.randomUUID();
  const [artesanato, setArtesao] = useState<ArtesanatoModel>({
    id: artesanatoId,
    usuarioId: "",
    artesaoId: artesaoId || "",
    imagensArtesanato: [],
    sobEncomenda: false,
    categoriaTags: [],
    tituloArtesanato: "",
    precoArtesanato: 0,
    quantidadeArtesanato: 0,
    descricaoArtesanato: "",
    larguraArtesanato: 0,
    alturaArtesanato: 0,
    comprimentoArtesanato: 0,
    pesoArtesanato: 0,
    dataCriacao: new Date(), // Data atual
    //tempoCriacaoHr: getHoraAtual(), // Hora e minutos atuais no formato HH:mm
    tempoCriacaoHr: "00:00:00", // Exemplo de 1.5 horas formatado para "01:30:00"
  });

  const compressImage = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        // Calcula as novas dimensões mantendo a proporção
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * ratio;
        const height = img.height * ratio;

        canvas.width = width;
        canvas.height = height;

        // Desenha a imagem no canvas
        ctx?.drawImage(img, 0, 0, width, height);

        // Converte a imagem para base64 com a qualidade desejada
        const compressedDataUrl = canvas.toDataURL(file.type, quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        reject(new Error("Erro ao carregar imagem"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFilesChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      const fileReaders: Promise<string>[] = Array.from(files).map((file) => {
        return compressImage(file, 800, 800, 0.7) // Ajuste o tamanho máximo e a qualidade
          .then((compressedImage) => compressedImage)
          .catch((error) => {
            console.error("Erro ao compactar a imagem:", error);
            return ""; // Retorna uma string vazia caso haja erro na compactação
          });
      });

      Promise.all(fileReaders)
        .then((base64Images) => {
          setArtesao({ ...artesanato, imagensArtesanato: base64Images });
        })
        .catch((error) => console.error("Erro ao carregar imagens:", error));
    } else {
      setArtesao({ ...artesanato, imagensArtesanato: [] });
    }
  };

  const handleChange = (
    value: string | boolean | string[] | number,
    id: string
  ) => {
    setArtesao((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Exemplo de envio para a API
    console.log(
      "Dados do artesanato enviados:",
      JSON.stringify(artesanato, null, 2)
    );
    try {
      const data = await cadastrarArtesanato(artesanato);

      console.log(
        "Usuário cadastrado com sucesso. Dados retornados da API:",
        JSON.stringify(data, null, 2)
      );

      alert("Artesão cadastrado com sucesso!");
      // Redirecionar para a página de cadastro (assumindo que a permissão já foi verificada)
      navigate(`/ExibirArtesanato/${artesanato.id}`);
    } catch (error: any) {
      setErrorMessage(error.message);

      console.log(
        "Tamanho da string base64:",
        artesanato.imagensArtesanato.length
      );
      console.error("Erro ao cadastrar Artesão:", error.message || error);
      console.log(artesanato);
    }
  };

  return (
    <section>
      <Container>
        <Title>Cadastrar Artesanato</Title>
        <Center>
          <form onSubmit={handleSubmit}>
            <Fieldset legend="Informações do Artesanato">
              <Center>
                <List>
                  <List.Item>Limite de 4 fotos.</List.Item>
                  <List.Item>Formato e peso: JPEG e PNG de até 10MB.</List.Item>
                  <List.Item>Install dependencies with yarn</List.Item>
                </List>
              </Center>

              <SimpleGrid cols={2}>
                <FileInput
                  id="imagensArtesanato"
                  label="Selecione os arquivos"
                  placeholder="Selecione até 4 arquivos"
                  onChange={(files) =>
                    handleFilesChange(files as File[] | null)
                  }
                  valueComponent={ValueComponent}
                  multiple={true}
                  accept="image/png,image/jpeg"
                />
              </SimpleGrid>
              <Center>
                <Group mt="md">
                  <SimpleGrid cols={4} spacing="sm">
                    {artesanato.imagensArtesanato.map((src, index) => (
                      <Avatar
                        variant="filled"
                        radius="sm"
                        size="xl"
                        key={index}
                        src={src}
                        alt={`Imagem ${index + 1}`}
                      />
                    ))}
                  </SimpleGrid>
                </Group>
              </Center>
              <Divider label="Dados do artesanato" mt="sm" />
              <Checkbox
                id="sobEncomenda"
                mt="sm"
                mb="sm"
                checked={artesanato.sobEncomenda}
                onChange={(e) => handleChange(e.target.checked, "sobEncomenda")}
                label="Este trabalho é feito somente sob encomenda."
              />
              <TagsInput
                id="categoriaTags"
                label="Insira os nichos em que você atua:"
                description="Adicione até 3 tags"
                placeholder="Insira a tag"
                maxTags={5}
                defaultValue={["Crochê", "Macramê"]}
                onChange={(tags) => handleChange(tags, "categoriaTags")}
              />
              <SimpleGrid cols={3}>
                <TextInput
                  radius="md"
                  label="Título do artesanato:"
                  placeholder="Título do artesanato"
                  type="text"
                  id="tituloArtesanato"
                  onChange={(e) =>
                    handleChange(e.target.value, "tituloArtesanato")
                  }
                />
                <NumberInput
                  radius="md"
                  label="Preço:"
                  placeholder="R$:"                  
                  id="precoArtesanato"
                  onChange={(value) => handleChange(value, "precoArtesanato")}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
                <NumberInput
                  radius="md"
                  label="Quantidade:"
                  placeholder={
                    artesanato.sobEncomenda
                      ? "Trabalho sob encomenda"
                      : "Quantidade possui em estoque"
                  }
                  id="quantidadeArtesanato"
                  onChange={(value) =>
                    handleChange(value, "quantidadeArtesanato")
                  }
                  value={artesanato.quantidadeArtesanato || undefined}
                  disabled={artesanato.sobEncomenda}
                />
              </SimpleGrid>
              <SimpleGrid cols={2}>
                <TextInput
                  radius="md"
                  label="Descrição do produto:"
                  placeholder="Detalhes sobre o produto, processo criativo..."
                  type="text"
                  id="descricaoArtesanato"
                  onChange={(e) =>
                    handleChange(e.target.value, "descricaoArtesanato")
                  }
                />
                {/* <NumberInput
                  radius="md"
                  label="Tempo de produção:"
                  placeholder="Em horas"
                  type="text"
                  id="tempoCriacaoHr"
                  onChange={(value) => handleChange(value, "tempoCriacaoHr")}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=":"
                /> */}
              </SimpleGrid>
              <Divider label="Caracteristicas do artesanato" mt="sm" />
              <SimpleGrid cols={4}>
                <NumberInput
                  radius="md"
                  label="Largura:"
                  placeholder="Largura em cm"
                  type="text"
                  id="larguraArtesanato"
                  onChange={(value) => handleChange(value, "larguraArtesanato")}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
                <NumberInput
                  radius="md"
                  label="Altura:"
                  placeholder="Altura em cm"
                  id="alturaArtesanato"
                  onChange={(value) => handleChange(value, "alturaArtesanato")}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
                <NumberInput
                  radius="md"
                  label="Comprimento:"
                  placeholder="Comprimento em cm"
                  id="comprimentoArtesanato"
                  onChange={(value) =>
                    handleChange(value, "comprimentoArtesanato")
                  }
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
                <NumberInput
                  radius="md"
                  label="Peso:"
                  placeholder="Peso em gramas"
                  id="pesoArtesanato"
                  onChange={(value) => handleChange(value, "pesoArtesanato")}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
              </SimpleGrid>

              <Button m="sm" type="submit" radius="md" color="orange">
                Voltar
              </Button>
              <Button type="submit" radius="md" color="green">
                Salvar
              </Button>
            </Fieldset>
          </form>
        </Center>
      </Container>
    </section>
  );
};

export default ArtesanatoForm;
