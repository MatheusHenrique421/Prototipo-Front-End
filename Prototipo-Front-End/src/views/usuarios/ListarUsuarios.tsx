import { Container, Table, Loader, Text, Checkbox } from "@mantine/core";
import { listarUsuarios } from "../../services/Api";
import { useEffect, useState } from "react";

interface UsuarioModel {
  id: string;
  nome: string;
  CPF: string;
  email: string;
  confirmaEmail: string;
  receberEmail: boolean;
  role: string;
}
export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Faz a requisição para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Chamando a função listarUsuarios
        const usuarios = await listarUsuarios();
        setUsuarios(usuarios); // Atualiza o estado com os dados recebidos
        setLoading(false); // Para o carregamento
      } catch (error) {
        setLoading(false);

        // Se ocorrer erro, setar mensagem de erro
        setError("Erro ao carregar os usuários");
        console.error("Detalhes do erro:", error);
      }
    };

    fetchUsuarios();
  }, []); // Dependência vazia, executa uma vez na montagem do componente

  // Renderiza as linhas da tabela
  const rows = usuarios.map((usuario) => (
    <Table.Tr key={usuario.nome}>
      <Table.Td>{usuario.nome}</Table.Td>
      <Table.Td>{usuario.CPF || "CPF não disponivel"}</Table.Td>
      <Table.Td>{usuario.email}</Table.Td>
      <Table.Td>
        <Checkbox checked={usuario.receberEmail} readOnly />
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
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Container>
    </section>
  );
}
