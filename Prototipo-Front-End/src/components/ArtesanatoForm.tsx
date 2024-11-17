import { ArtesanatoModel } from "../models/ArtesanatoModel";
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
  const [artesanato, setArtesao] = useState<ArtesanatoModel>({
    id: "",
    usuarioId: "",
    artesaoId: "",
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
  });

  const handleFilesChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      const fileReaders: Promise<string>[] = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result); // Converte para base64
            } else {
              reject(new Error("Erro ao ler arquivo."));
            }
          };
          reader.readAsDataURL(file);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Exemplo de envio para a API
    console.log(
      "Dados do artesão enviados:",
      JSON.stringify(artesanato, null, 2)
    );

    // Adicione aqui a lógica de envio para a API, como usando Axios.
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
                  onChange={(e) => handleChange(e.target.value, "tituloArtesanato")}
                />
                <NumberInput
                  radius="md"
                  label="Preço:"
                  placeholder="R$:"
                  type="text"
                  id="precoArtesanato"
                  onChange={(value) => handleChange(value, "precoArtesanato")}                  
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                />
                <NumberInput
                  radius="md"
                  label="Quantidade:"
                  placeholder="Quantidade posui em estoque"
                  id="quantidadeArtesanato"
                  onChange={(value) => handleChange(value, "quantidadeArtesanato")}   
                />
              </SimpleGrid>
              <SimpleGrid cols={2}>
                <TextInput
                  radius="md"
                  label="Descrição do produto:"
                  placeholder="Detalhes sobre o produto, processo criativo..."
                  type="text"
                  id="descricaoArtesanato"
                  onChange={(e) => handleChange(e.target.value, "descricaoArtesanato")}
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
                  onChange={(value) => handleChange(value, "comprimentoArtesanato")}                  
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
