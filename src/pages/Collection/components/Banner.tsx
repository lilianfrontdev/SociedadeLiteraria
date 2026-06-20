import { Box, Typography, Stack } from "@mui/material";
import Book from "../../../assets/book.png";

interface BannerProps {
  userName?: string;
  totalBooks: number;
  availableBooks: number;
  activeLoans: number;
}

function Banner({
  userName,
  totalBooks,
  availableBooks,
  activeLoans,
}: BannerProps) {
  return (
    <Box
      sx={{
        bgcolor: "#D3C7AD",
        color: "secondary.main",
        px: 4,
        py: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 3,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: "text.primary",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            letterSpacing: "1.5px",
            opacity: 0.7,
            textTransform: "uppercase",
          }}
        >
          Bem-vinda de volta, {userName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={Book}
            alt="Livro"
            sx={{
              height: 64,
              width: "auto",
              objectFit: "contain",
            }}
          ></Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              mt: 0.5,
            }}
          >
            Acervo de obras
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={6} sx={{ pb: 0.5 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "'Fraunces', serif",
              color: "secondary.main",
              lineHeight: 1,
            }}
          >
            {totalBooks.toLocaleString("pt-BR")}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              opacity: 0.6,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Obras no acervo
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "'Fraunces', serif",
              color: "text.secondary",
              lineHeight: 1,
            }}
          >
            {availableBooks.toLocaleString("pt-BR")}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              opacity: 0.6,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Disponíveis
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: "'Fraunces', serif",
              color: "secondary.main",
              lineHeight: 1,
            }}
          >
            {activeLoans}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              opacity: 0.6,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Empréstimos ativos
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Banner;
