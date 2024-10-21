import { Container, Table, Loader, Text, Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface UsuarioModel {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  receberEmail: boolean;
}
export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Faz a requisição para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5287/api/Usuario"); // Corrigido o prefixo do URL
        setUsuarios(response.data); // Atualiza o estado com os dados recebidos
        setLoading(false); // Para o carregamento
      } catch (error) {
        setLoading(false);

        // Verifica se o erro é um erro de resposta do servidor (HTTP status code)
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Erros com resposta do servidor (status code 4xx ou 5xx)
            setError(
              `Erro ${error.response.status}: ${
                error.response.data?.message || "Falha ao carregar os usuários"
              }`
            );
          } else if (error.request) {
            // Erros onde a requisição foi feita mas não houve resposta (ex: erro de rede)
            setError(
              "Nenhuma resposta do servidor. Verifique sua conexão ou o status do servidor."
            );
          } else {
            // Qualquer outro erro que possa ter ocorrido
            setError(`Erro inesperado: ${error.message}`);
          }
        } else {
          // Caso o erro não seja relacionado ao Axios
          setError(`Erro: ${error}`);
        }

        console.error("Detalhes do erro:", error); // Log para ajudar no debug
      }
    };

    fetchUsuarios();
  }, []);

  // Renderiza as linhas da tabela
  const rows = usuarios.map((usuario) => (
    <Table.Tr key={usuario.nome}>
      <Table.Td>{usuario.nome}</Table.Td>
      <Table.Td>{usuario.cpf}</Table.Td>
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
