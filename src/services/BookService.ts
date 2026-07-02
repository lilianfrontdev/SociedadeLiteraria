import { apiRequest, ApiError } from "./api";
import type { Book } from "../pages/Collection/components/Book";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LivroPayload {
  categoria: string;
  titulo: string;
  quantidadeTotal: number;
  publicacao: string; 
}

export function createLivro(payload: LivroPayload) {
  return apiRequest<LivroResponse>("/api/Livros", {
    method: "POST",
    body: JSON.stringify({
      Categoria: payload.categoria,
      Titulo: payload.titulo,
      QuantidadeTotal: payload.quantidadeTotal,
      QuantidadeDisponivel: payload.quantidadeTotal,
      Publicacao: payload.publicacao,
    }),
  });
}

export interface LivroResponse {
  id: number;
  categoria: string;
  titulo: string;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  publicacao: string;
}

export async function getLivros(): Promise<LivroResponse[]> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/Livros`);
  } catch {
    throw new ApiError(
      "Não foi possível conectar ao servidor. Verifique se a API está rodando.",
    );
  }

  if (!response.ok) {
    throw new ApiError("Não foi possível carregar o acervo");
  }

  return response.json();
}

export function getLivro(id: number) {
  return apiRequest<LivroResponse>(`/api/Livros/${id}`);
}

export function mapLivroToBook(livro: LivroResponse): Book {
  return {
    id: livro.id,
    title: livro.titulo,
    author: "Autor não informado",
    category: livro.categoria,
    available: livro.quantidadeDisponivel > 0,
  };
}
