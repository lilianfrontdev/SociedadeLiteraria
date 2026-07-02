import { AppBar, Toolbar, Box, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'; 
import logo from "../assets/logo-light.png";
import { Link } from "react-router-dom";

interface UserProfile {
  name: string;
  avatarUrl?: string;
  role?: string; 
}

interface MainHeaderProps {
  user?: UserProfile | null;
}

function MainHeader({ user }: MainHeaderProps) {
  const isAdmin = user?.role === "Administrador";

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        backgroundColor: "primary.main",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo Sociedade Literária"
              sx={{
                height: 90,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box
            component="nav"
            sx={{
              display: "flex",
              gap: 3,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                color: "background.default",
                textDecoration: "none",
                borderBottom: "2px solid #754437",
                pb: 0.5,
              }}
            >
              Acervo
            </Box>

            <Box
              component={Link}
              to="/emprestimos"
              sx={{
                color: "rgba(251, 248, 240, 0.7)",
                textDecoration: "none",
                pb: 0.5,
                transition: "color 0.2s",
                "&:hover": { color: "background.default" },
              }}
            >
              Meus empréstimos
            </Box>

            {isAdmin && (
              <Box
                component={Link}
                to="/admin/livros"
                sx={{
                  color: "rgba(251, 248, 240, 0.7)",
                  textDecoration: "none",
                  pb: 0.5,
                  transition: "color 0.2s",
                  "&:hover": { color: "background.default" },
                }}
              >
                Gerenciar acervo
              </Box>
            )}
          </Box>

          <Avatar
          component={Link}
          to="/perfil"
            src={user?.avatarUrl}
            sx={{
              backgroundColor: "secondary.main",
              color: "backgorund.default",
              fontSize: "0.85rem",
              fontWeight: 600,
              width: 36,
              height: 36,
              cursor: 'pointer'
            }}
          >
            {user ? (
              !user.avatarUrl && getInitials(user.name)
            ) : (
              <PersonIcon sx={{ fontSize: 20 }} />
            )}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;