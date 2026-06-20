import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CatalogBanner from "./components/Banner";
import Filters from "./components/Filters";
import type { Book } from "./components/Book";
import BookCard from "./components/Book";

const MOCK_BOOKS: Book[] = [
  { id: 1, title: "Crime e Castigo", author: "Fiódor Dostoievski", category: "Romance", available: true, coverBgColor: "#754437" },
  { id: 2, title: "Metamorfose", author: "Franz Kafka", category: "Clássico", available: true, coverBgColor: "#28374A" },
  { id: 3, title: "Sobre a Bravidade da Vida", author: "Senêca", category: "Clássico", available: true, coverBgColor: "#6B6751" },  
];
const CATEGORIES = ["Todos", "Disponíveis", "Romance", "Naturalismo", "Clássicos", "Biografia"];

export default function Catalog() {
  const [books] = useState<Book[]>(MOCK_BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  return (
    <Box sx={{ width: '100%' }}>
      <CatalogBanner 
        userName="Maria"
        totalBooks={3} 
        availableBooks={2} 
        activeLoans={1} 
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Filters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}