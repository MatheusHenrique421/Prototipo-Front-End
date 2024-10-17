import UsuarioForm from "../../components/UsuarioForm";

export default function CadastroUsuario() {
  return (
    // <section>
    //   <Container>
    //     <h1>Criar uma nova conta</h1>
    //     <Center>
    //       <form
    //         style={{
    //           borderRadius: "5px",
    //           border: "solid",
    //           padding: "30px",
    //         }}
    //       >
    //         <SimpleGrid cols={1}>
    //           <TextInput
    //             w={300}
    //             radius="md"
    //             label="Nome:"
    //             placeholder="Nome"
    //             // value={}
    //             // onChange={(e) => setNome(e.target.value)}
    //           />
    //           <TextInput
    //             w={300}
    //             radius="md"
    //             label="CPF:"
    //             placeholder="CPF"
    //             // value={}
    //             // onChange={(e) => setNome(e.target.value)}
    //           />
    //           <TextInput
    //             w={300}
    //             radius="md"
    //             label="E-mail:"
    //             placeholder="E-mail"
    //             // value={}
    //             // onChange={(e) => setNome(e.target.value)}
    //           />
    //           <TextInput
    //             w={300}
    //             radius="md"
    //             label="Confirmar e-mail:"
    //             placeholder="Confirmar e-mail"
    //             // value={}
    //             // onChange={(e) => setNome(e.target.value)}
    //           />
    //           <PasswordInput
    //             w={300}
    //             radius="md"
    //             label="Senha:"
    //             placeholder="Senha"
    //             // value={}
    //             // onChange={(e) => setNome(e.target.value)}
    //           />
    //           <Radio label="Quero receber novidades no e-mail." />
    //           <Button type="submit" radius="md">
    //             Cadastrar
    //           </Button>
    //           <div>
    //             <hr />
    //           </div>
    //           <Center>
    //             <Link to="/Login">
    //               <Text>Entrar com e-mail e senha</Text>
    //             </Link>
    //           </Center>
    //         </SimpleGrid>
    //       </form>
    //     </Center>
    //   </Container>
    // </section>
    <UsuarioForm />
  );
}
