import { ArtesanatoModel, getHoraAtual } from "../models/ArtesanatoModel";
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarArtesanato } from "../services/Api";
//import { format } from "date-fns";
import { useState } from "react";
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
  //const idCorreto = id && id.startsWith("id=") ? id.split("=")[1] : id;
  const artesaoIdFromParams = id?.startsWith("id=") ? id.split("=")[1] : id;
  const artesaoId =
    artesaoIdFromParams || localStorage.getItem("artesaoId") || "";
  const artesanatoId = crypto.randomUUID();
  const [artesanato, setArtesanato] = useState<ArtesanatoModel>({
    id: artesanatoId || crypto.randomUUID(),
    usuarioId: "",
    artesaoId: artesaoId || "",
    imagemUrl: [],
    imagem: [] as (string | File)[],
    sobEncomenda: false,
    tituloArtesanato: "",
    categoriaTags: [],
    descricaoArtesanato: "",
    preco: 0,
    quantidadeArtesanato: 0,
    larguraArtesanato: 0,
    alturaArtesanato: 0,
    comprimentoArtesanato: 0,
    pesoArtesanato: 0,
    dataCriacao: new Date(),
    tempoCriacaoHr: getHoraAtual(), // Hora e minutos atuais no formato HH:mm
  });

  const compressImage = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number
  ): Promise<File | null> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const width = img.width;
          const height = img.height;

          // Calcula a nova largura e altura mantendo a proporção da imagem
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          const newWidth = width * ratio;
          const newHeight = height * ratio;

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                });
                resolve(compressedFile);
              } else {
                reject("Erro ao compactar a imagem.");
              }
            },
            file.type,
            quality
          );
        } else {
          reject("Não foi possível obter o contexto do canvas.");
        }
      };

      img.onerror = () => {
        reject("Erro ao carregar a imagem.");
      };
    });
  };

  const handleFilesChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      const fileReaders: Promise<File | null>[] = Array.from(files).map(
        (file) => {
          return compressImage(file, 800, 800, 0.7) // Ajuste o tamanho máximo e a qualidade
            .then((compressedImage) => {
              return compressedImage as File | null; // Garante que o retorno seja File ou null
            })
            .catch((error) => {
              console.error("Erro ao compactar a imagem:", error);
              return null; // Retorna null em caso de erro
            });
        }
      );

      // Após a compactação, atualiza o estado com todos os arquivos compactados
      Promise.all(fileReaders)
        .then((compressedFiles) => {
          // Filtra os arquivos válidos
          const validFiles = compressedFiles.filter(
            (file) => file !== null
          ) as File[];
          // Atualiza o estado com todas as imagens válidas
          setArtesanato({ ...artesanato, imagem: validFiles });
        })
        .catch((error) => console.error("Erro ao carregar imagens:", error));
    } else {
      setArtesanato({ ...artesanato, imagem: [] }); // Define como array vazio se não houver arquivos
    }
  };

  const handleChange = (
    value: string | boolean | string[] | number,
    id: string
  ) => {
    setArtesanato((prevState) => ({
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
    const formData = new FormData();

    // Formatação da data
    const dataFormatada = artesanato.dataCriacao
      ? artesanato.dataCriacao.toISOString()
      : null;

    // Adiciona a dataCriacao ao FormData, caso tenha um valor
    if (dataFormatada) {
      formData.append("dataCriacao", dataFormatada);
    }

    // Itera sobre as propriedades do objeto artesanato
    Object.entries(artesanato).forEach(([key, value]) => {
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

    // Verifique se a imagem foi selecionada antes de tentar adicioná-la
    if (artesanato.imagem) {
      formData.append("imagem", artesanato.imagem.toString()); // Adiciona o arquivo de imagem ao FormData
    } else {
      console.error("Imagem não fornecida.");
    }
    // Exemplo de envio para a API
    console.log(
      "Dados do artesanato enviados:",
      JSON.stringify(artesanato, null, 2)
    );
    try {
      console.log(
        "TENTANDO ENVIAR O FORM DATA:" ,
        JSON.stringify(formData, null, 2)
      );
      const data = await cadastrarArtesanato(formData);

      console.log(
        "Dados ENVIADOS RETORNADOS********** da API:",
        JSON.stringify(data, null, 2)
      );

      alert("Artesão cadastrado com sucesso!");
      // Redirecionar para a página de cadastro (assumindo que a permissão já foi verificada)
      navigate(`/ExibirArtesanato/${artesanato.id}`);
    } catch (error: any) {
      setErrorMessage(error.message);

      console.log("Tamanho da string base64:", artesanato.imagem);
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
                </List>
              </Center>
              <SimpleGrid cols={2}>
                <FileInput
                  id="imagem"
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
                    {Array.isArray(artesanato.imagem) &&
                    artesanato.imagem.length > 0 ? (
                      artesanato.imagem.map((img, index) => {
                        const src =
                          img instanceof File ? URL.createObjectURL(img) : img;
                        return (
                          <Avatar
                            variant="filled"
                            radius="sm"
                            size="xl"
                            key={index}
                            src={src}
                            alt={`Imagem ${index + 1}`}
                          />
                        );
                      })
                    ) : (
                      <p>Nenhuma imagem disponível</p>
                    )}
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
                  id="preco"
                  onChange={(value) => handleChange(value, "preco")}
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
                <NumberInput
                  radius="md"
                  label="Tempo de produção:"
                  placeholder="Em horas"
                  type="text"
                  id="tempoCriacaoHr"
                  onChange={(value) => handleChange(value, "tempoCriacaoHr")}
                  decimalScale={2}
                />
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
