import {
  Container,
  Table,
  Loader,
  Text,
  Checkbox,
  Button,
  Modal,
  TextInput,
  Group,
  Alert,
  InputBase,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { IMaskInput } from "react-imask";

interface UsuarioModel {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  receberEmail: boolean;
}
export default function EditarUsuario() {
  const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<UsuarioModel | null>(null); // Usuário sendo editado
  const [deleteUsuarioId, setDeleteUsuarioId] = useState<number | null>(null); // Usuário sendo deletado
  const [showModal, setShowModal] = useState<boolean>(false); // Modal para edição

  // Faz a requisição para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5287/api/Usuario");
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              `Erro ${error.response.status}: ${
                error.response.data?.message || "Falha ao carregar os usuários"
              }`
            );
          } else if (error.request) {
            setError(
              "Nenhuma resposta do servidor. Verifique sua conexão ou o status do servidor."
            );
          } else {
            setError(`Erro inesperado: ${error.message}`);
          }
        } else {
          setError(`Erro: ${error}`);
        }
        console.error("Detalhes do erro:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para editar usuário
  const editarUsuario = (usuario: UsuarioModel) => {
    setEditingUsuario(usuario);
    setShowModal(true);
  };

  // Função para salvar o usuário editado
  const salvarUsuario = async () => {
    if (editingUsuario) {
      try {
        await axios.put(
          `http://localhost:5287/api/Usuario/${editingUsuario.id}`,
          editingUsuario
        );
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === editingUsuario.id ? editingUsuario : usuario
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("Erro ao editar usuário:", error);
      }
    }
  };

  // Função para deletar usuário
  const deletarUsuario = async (usuarioId: number) => {
    try {
      await axios.delete(`http://localhost:5287/api/Usuario/${usuarioId}`);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== usuarioId)
      );
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  // Renderiza as linhas da tabela
  const rows = usuarios.map((usuario) => (
    <Table.Tr key={usuario.id}>
      <Table.Td>{usuario.nome}</Table.Td>
      <Table.Td>{usuario.cpf}</Table.Td>
      <Table.Td>{usuario.email}</Table.Td>
      <Table.Td>
        <Checkbox checked={usuario.receberEmail} readOnly />
      </Table.Td>
      <Table.Td>
        <Group>
          <Button size="xs" onClick={() => editarUsuario(usuario)}>
            Editar
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => deletarUsuario(usuario.id)}
          >
            Deletar
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <section>
      <Container>
        <Text size="xl" mb="lg">
          Lista de Usuários
        </Text>

        {loading ? (
          <Loader size="xl" />
        ) : error ? (
          <Text c="red">{error}</Text>
        ) : (
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nome</Table.Th>
                <Table.Th>CPF</Table.Th>
                <Table.Th>E-mail</Table.Th>
                <Table.Th>Receber E-mail</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}

        {/* Modal para edição do usuário */}
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          title="Editar Usuário"
        >
          <TextInput
            label="Nome"
            value={editingUsuario?.nome || ""}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, nome: e.target.value } : null
              )
            }
          />
          <InputBase
            w={300}
            radius="md"
            label="CPF:"
            placeholder="CPF"
            id="CPF"
            typeof="number"
            value={editingUsuario?.cpf || ""}
            component={IMaskInput}
            mask="000.000.000-00"
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, cpf: e.target.value } : null
              )
            }
            readOnly
          />
          <TextInput
            label="E-mail"
            value={editingUsuario?.email || ""}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, email: e.target.value } : null
              )
            }
          />
          <Group p="right" mt="md">
            <Button onClick={salvarUsuario}>Salvar</Button>
          </Group>
        </Modal>
      </Container>
    </section>
  );
}
