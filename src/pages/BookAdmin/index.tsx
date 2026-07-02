import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { createLivro } from "../../services/BookService";
import { ApiError } from "../../services/api";

const CATEGORIES = ["Romance", "Naturalismo", "Clássicos", "Biografia"];

export default function BookRegister() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeTotal, setQuantidadeTotal] = useState("");
  const [publicacao, setPublicacao] = useState("");

  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFieldErrors({});
    setErrorMessage(null);
    setSaving(true);

    try {
      await createLivro({
        titulo,
        categoria,
        quantidadeTotal: Number(quantidadeTotal),
        publicacao,
      });
      navigate("/admin/livros");
    } catch (error) {
      if (error instanceof ApiError) {
        if (Object.keys(error.errors).length > 0) {
          setFieldErrors(error.errors);
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("Erro inesperado ao cadastrar o livro");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "text.primary", mb: 0.5 }}
        >
          Novo livro
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Cadastre uma nova obra no acervo
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Título"
            fullWidth
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            error={!!fieldErrors.titulo}
            helperText={fieldErrors.titulo}
          />

          <TextField
            select
            label="Categoria"
            fullWidth
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            error={!!fieldErrors.categoria}
            helperText={fieldErrors.categoria}
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantidade total"
            type="number"
            fullWidth
            required
            value={quantidadeTotal}
            onChange={(e) => setQuantidadeTotal(e.target.value)}
            error={!!fieldErrors.quantidade}
            helperText={fieldErrors.quantidade}
            slotProps={{ htmlInput: { min: 0 } }}
          />

          <TextField
            label="Data de publicação"
            type="date"
            fullWidth
            required
            value={publicacao}
            onChange={(e) => setPublicacao(e.target.value)}
            error={!!fieldErrors.publicacao}
            helperText={fieldErrors.publicacao}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              fullWidth
              sx={{
                bgcolor: "secondary.main",
                color: "background.default",
                py: 1.5,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { bgcolor: "#5C342A", boxShadow: "none" },
              }}
            >
              {saving ? (
                <CircularProgress size={22} sx={{ color: "background.default" }} />
              ) : (
                "Cadastrar livro"
              )}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              disabled={saving}
              onClick={() => navigate("/admin/livros")}
              sx={{ borderColor: "secondary.main", color: "secondary.main", py: 1.5, textTransform: "none" }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}