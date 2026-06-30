import { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Link, Grid, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import loginIlustracao from "../../assets/books.png";
import logo from "../../assets/logo-light.png";
import RegisterForm from "./components/RegisterForm";
import { login } from "../../services/AuthService";
import { ApiError } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    try {
      await login({ email, senha: password });
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao autenticar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          bgcolor: "primary.main",
          px: 4,
          py: 6,
          boxSizing: "border-box"
        }}
      >
        <Box component="img" src={logo} alt="Logo Sociedade Literária" sx={{ height: 100, width: "auto", objectFit: "contain" }} />
        <Box component="img" src={loginIlustracao} alt="Ilustração de Livros Empilhados" sx={{ width: "85%", maxHeight: "55vh", objectFit: "contain" }} />
        <Box sx={{ textAlign: "center", maxWidth: "80%" }}>
          <Typography sx={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.25rem", color: "background.default", lineHeight: 1.4 }}>
            "O segredo da existência humana não está apenas em viver, mas em saber para que se vive."
          </Typography>
          <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "rgba(251, 248, 240, 0.6)", mt: 1, textTransform: "uppercase", letterSpacing: "1px" }}>
            — Fiódor Dostoiévski
          </Typography>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", px: { xs: 3, sm: 6, md: 10 }, py: 4 }}
      >
        {isRegistering ? (
          <RegisterForm
            onBackToLogin={() => setIsRegistering(false)}
            onRegistered={() => setIsRegistering(false)}
          />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ textAlign: "left", mb: 1 }}>
              <Typography variant="h4" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "text.primary" }}>
                Entrar
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "'Inter', sans-serif", color: "text.secondary", mt: 0.5 }}>
                Insira suas credenciais para acessar o acervo
              </Typography>
            </Box>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{ inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } } }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" }
              }}
            />

            <TextField
              label="Senha"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" }
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: -1 }}>
              <Link href="#" variant="caption" sx={{ color: "secondary.main", fontFamily: "'Inter', sans-serif", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                Esqueceu a senha?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: "secondary.main",
                color: "background.default",
                py: 1.5,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": { bgcolor: "#5C342A", boxShadow: "none" }
              }}
            >
              {loading ? "Autenticando..." : "Entrar"}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsRegistering(true)}
              sx={{
                borderColor: "secondary.main",
                color: "secondary.main",
                py: 1.5,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { borderColor: "#5C342A", backgroundColor: "rgba(117, 68, 55, 0.04)" }
              }}
            >
              Criar nova conta
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}