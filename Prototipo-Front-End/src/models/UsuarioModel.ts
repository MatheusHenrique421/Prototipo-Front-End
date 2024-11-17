export interface UsuarioModel {
    id:string,
    nome: string,
    CPF: string,
    email: string,
    confirmaEmail: string,
    senha: string,
    receberEmail: boolean,
    role: string
    artesaoId: string,
}