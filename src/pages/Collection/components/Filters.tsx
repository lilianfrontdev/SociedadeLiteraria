import { Box, TextField, InputAdornment, Stack, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

function Filters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: FiltersProps) {
  return (
    <Box
      sx={{
        mb: 4,
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        flexWrap: "wrap-reverse",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          pb: 0.5,
          flexGrow: 1,
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? "filled" : "outlined"}
            sx={{
              backgroundColor:
                selectedCategory === category ? "primary.main" : "transparent",
              color: selectedCategory === category ? "background.default" : "text.primary",
              borderColor: "primary.main",
              fontFamily: "'Inter', sans-serif",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category
                    ? "primary.main"
                    : "rgba(117, 68, 55, 0.08)",
              },
            }}
          />
        ))}
      </Stack>

      <TextField
        variant="outlined"
        size="small"
        placeholder="Pesquisar..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          width: "100%",
          maxWidth: 240,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
          "& .MuiInputBase-input": { py: 0.8, fontSize: "0.875rem" },
        }}
      />
    </Box>
  );
}

export default Filters;
