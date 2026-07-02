import { apiRequest } from "./api";

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
}

export function login(payload: LoginPayload) {
  return apiRequest<null>("/Auth/login", {
    method: "POST",
    body: JSON.stringify({
      Email: payload.email,
      Senha: payload.senha,
    }),
  });
}

export function register(payload: RegisterPayload) {
  return apiRequest<UsuarioResponse>("/api/Usuarios", {
    method: "POST",
    body: JSON.stringify({
      Nome: payload.nome,
      Cpf: payload.cpf,
      Email: payload.email,
      Senha: payload.senha,
      ConfirmarSenha: payload.confirmarSenha,
    }),
  });
}