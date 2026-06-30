import { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register } from "../../../services/AuthService";
import { ApiError } from "../../../services/api";

interface RegisterFormProps {
  onBackToLogin: () => void;
  onRegistered: () => void;
}

export default function RegisterForm({ onBackToLogin, onRegistered }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    setGeneralError(null);
    setLoading(true);
    try {
      await register({
        nome: name,
        cpf,
        email,
        senha: password,
        confirmarSenha: confirmPassword,
      });
      onRegistered();
    } catch (error) {
      if (error instanceof ApiError) {
        if (Object.keys(error.errors).length > 0) {
          setFieldErrors(error.errors);
        } else {
          setGeneralError(error.message);
        }
      } else {
        setGeneralError("Erro inesperado ao cadastrar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Box sx={{ textAlign: "left", mb: 1 }}>
        <Typography variant="h4" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#2A2E26" }}>
          Criar conta
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "'Inter', sans-serif", color: "text.secondary", mt: 0.5 }}>
          Cadastre-se para solicitar empréstimos de obras
        </Typography>
      </Box>

      {generalError && <Alert severity="error">{generalError}</Alert>}

      <TextField
        label="Nome completo"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!fieldErrors.nome}
        helperText={fieldErrors.nome}
        slotProps={{ inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } } }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#754437" }
        }}
      />

      <TextField
        label="CPF"
        variant="outlined"
        fullWidth
        required
        value={cpf}
        onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))}
        error={!!fieldErrors.cpf}
        helperText={fieldErrors.cpf}
        slotProps={{ inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } } }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#754437" }
        }}
      />

      <TextField
        label="E-mail"
        variant="outlined"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        slotProps={{ inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } } }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#754437" }
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
        error={!!fieldErrors.senha}
        helperText={fieldErrors.senha}
        slotProps={{
          inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#754437" }
        }}
      />

      <TextField
        label="Confirmar senha"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!fieldErrors.confirmarSenha}
        helperText={fieldErrors.confirmarSenha}
        slotProps={{ inputLabel: { sx: { fontFamily: "'Inter', sans-serif" } } }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6DFCE" },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#754437" }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          bgcolor: "#754437",
          color: "#FBF8F0",
          py: 1.5,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          boxShadow: "none",
          "&:hover": { bgcolor: "#5C342A", boxShadow: "none" }
        }}
      >
        {loading ? "Cadastrando..." : "Cadastrar conta"}
      </Button>

      <Button
        variant="text"
        fullWidth
        onClick={onBackToLogin}
        sx={{
          color: "#754437",
          fontFamily: "'Inter', sans-serif",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": { backgroundColor: "rgba(117, 68, 55, 0.04)" }
        }}
      >
        Já possui uma conta? Voltar ao login
      </Button>
    </Box>
  );
}