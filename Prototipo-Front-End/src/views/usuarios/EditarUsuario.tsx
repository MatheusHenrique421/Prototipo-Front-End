import { listarUsuarios } from "../../services/UsuarioService";
import { useEffect, useState } from "react";
import axios from "axios";
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
  InputBase,
  PasswordInput,
  Radio,
} from "@mantine/core";

interface UsuarioModel {
  id: string;
  nome: string;
  CPF: string;
  email: string;
  senha: string;
  confirmaEmail: string;
  receberEmail: boolean;
}
export default function EditarUsuario() {
  const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<UsuarioModel | null>(
    null
  ); // Usuário sendo editado
  const [showModal, setShowModal] = useState<boolean>(false); // Modal para edição

  // Faz a requisição para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await listarUsuarios(); // Use a função de API
        // Mapeie a resposta para ajustar os campos
        const usuariosComCPF = data.map((usuario: any) => ({
          ...usuario,
          CPF: usuario.cpf, // Mapeia o campo 'cpf' para 'CPF'
        }));

        setUsuarios(usuariosComCPF);
      } catch (error) {
        setError(
          "Erro ao carregar usuários. Verifique sua conexão ou tente novamente."
        );
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
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
  const deletarUsuario = async (usuarioId: string) => {
    // Encontra o nome do usuário pelo ID
    const usuario = usuarios.find((u) => u.id === usuarioId);

    // Se não encontrar o usuário, avisa e retorna
    if (!usuario) {
      alert("Usuário não encontrado.");
      return;
    }

    // Exibe o nome no alerta
    const confirmacao = window.confirm(
      `Deseja excluir o usuário: ${usuario.nome}?`
    );

    if (!confirmacao) return; // Interrompe se o usuário cancelar

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
      <Table.Td style={{ whiteSpace: 'nowrap', minWidth: '150px' }}>{usuario.nome}</Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap', minWidth: '150px' }}>        {usuario.CPF}      </Table.Td>
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
          <Table
            
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
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
            value={editingUsuario?.CPF || ""}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, CPF: e.target.value } : null
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
          <TextInput
            label="Confirmar E-mail"
            value={editingUsuario?.confirmaEmail || ""}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, confirmaEmail: e.target.value } : null
              )
            }
          />
          <PasswordInput
            label="Confirmar E-mail"
            value={editingUsuario?.senha || ""}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, senha: e.target.value } : null
              )
            }
          />
          <Radio
            p="sm"
            id="receberEmail"
            label="Quero ser um arteão."
            value={String(editingUsuario?.receberEmail || false)}
            checked={!!editingUsuario?.receberEmail}
            onChange={(e) =>
              setEditingUsuario((prev) =>
                prev ? { ...prev, receberEmail: e.currentTarget.checked } : null
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
