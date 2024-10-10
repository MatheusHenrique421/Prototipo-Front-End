import { Container, Table, Loader, Text, TableData } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface UsuarioModel {
  id: number;
  nome: string;
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
  const rows = usuarios.map((usuario) => (usuario.id, usuario.nome));

  const tableData = {
    caption: "Some elements from periodic table",
    head: ["Id", "Nome"],
    body: [rows],
  };

  return (
    <section>
      <Container>
        <Text size="xl" mb="lg">
          Lista de Usuários
        </Text>
        {/* Verifica se está carregando */}
        {loading ? (
          <Loader size="lg" />
        ) : error ? (
          <Text c="red">{error}</Text>
        ) : (
          <Table>
            <caption>{tableData.caption}</caption>
            <thead>
              <tr>
                {tableData.head.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.body.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </section>
  );
}
