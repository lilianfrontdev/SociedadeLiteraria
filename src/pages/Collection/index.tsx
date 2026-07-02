import { useEffect, useMemo, useState } from "react";
import { Box, Container, Grid, CircularProgress, Alert, Typography } from "@mui/material";
import CatalogBanner from "./components/Banner";
import Filters from "./components/Filters";
import type { Book } from "./components/Book";
import BookCard from "./components/Book";
import { ApiError } from "../../services/api";
import { getLivros, mapLivroToBook } from "../../services/BookService";

const CATEGORIES = ["Todos", "Disponíveis", "Romance", "Naturalismo", "Clássicos", "Biografia"];

export default function Catalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    let isMounted = true;

    async function loadBooks() {
      setLoading(true);
      setErrorMessage(null);
      try {
        const livros = await getLivros();
        if (isMounted) {
          setBooks(livros.map(mapLivroToBook));
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof ApiError ? error.message : "Erro inesperado ao carregar o acervo"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Todos" ||
        (selectedCategory === "Disponíveis" ? book.available : book.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.available).length;
  const activeLoans = 0;

  return (
    <Box sx={{ width: "100%" }}>
      <CatalogBanner
        userName="Maria"
        totalBooks={totalBooks}
        availableBooks={availableBooks}
        activeLoans={activeLoans}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {!loading && !errorMessage && filteredBooks.length === 0 && (
          <Typography sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
            Nenhum livro encontrado.
          </Typography>
        )}

        {!loading && !errorMessage && filteredBooks.length > 0 && (
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}