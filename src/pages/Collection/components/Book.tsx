import { Card, Box, Typography, CardContent, Divider, Button, Grid } from "@mui/material";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  available: boolean;
  coverBgColor?: string; 
  libraryCode?: string; 
}

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const initialLetter = book.title.charAt(0).toUpperCase();
  
  const getCoverBg = (id: number) => {
    const colors = ['#754437', '#28374A', '#6B6751']; 
    return colors[id % colors.length];
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card 
        elevation={0}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: '#FFFFFF', 
          border: '1px solid #E6DFCE',
          borderRadius: 1, 
          boxShadow: 'none',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}
      >
        <Box
          sx={{
            height: 280,
            bgcolor: book.coverBgColor || getCoverBg(book.id),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 12,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
              borderRight: '1px solid rgba(255,255,255,0.08)'
            }}
          />

          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: '5.5rem',
              color: '#FBF8F0',
              userSelect: 'none'
            }}
          >
            {initialLetter}
          </Typography>
        </Box>

        <CardContent sx={{ px: 3, pt: 2, pb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 600, 
              color: '#A19A88', 
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {book.category}
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontFamily: "'Fraunces', serif", 
              fontWeight: 700, 
              color: '#2A2E26',
              mt: 0.5,
              lineHeight: 1.2
            }}
          >
            {book.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: "'Inter', sans-serif", 
              color: 'text.secondary',
              mt: 0.5,
              flexGrow: 1 
            }}
          >
            {book.author}
          </Typography>

          <Divider sx={{ my: 2, borderStyle: 'dashed', borderColor: '#E6DFCE' }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: "'Inter', sans-serif", 
                color: '#A19A88',
                fontWeight: 500
              }}
            >
              {book.libraryCode || `${860 + book.id}.3 / ${book.author.substring(0, 3).toUpperCase()}`}
            </Typography>

            <Box
              sx={{
                border: book.available ? '1px dashed #6B6751' : '1px dashed #754437',
                borderRadius: '4px',
                px: 1.2,
                py: 0.4,
                bgcolor: book.available ? 'rgba(107, 103, 81, 0.05)' : 'rgba(117, 68, 55, 0.05)',
                transform: 'rotate(-2deg)'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                  color: book.available ? '#6B6751' : '#754437',
                  textTransform: 'uppercase'
                }}
              >
                {book.available ? "Disponível" : "Emprestado"}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Button 
          variant="contained" 
          disabled={!book.available}
          fullWidth
          sx={{ 
            bgcolor: 'background.paper', 
            color: 'primary.main',
            py: 1.5,
            borderRadius: 0, 
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.95rem',
            borderTop: '1px solid #E6DFCE',
            boxShadow: 'none',
            '&:hover': { 
              bgcolor: '#D3C7AD',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              bgcolor: '#F5F2EB',
              color: 'rgba(40, 55, 74, 0.3)'
            }
          }}
        >
          Solicitar empréstimo
        </Button>
      </Card>
    </Grid>
  );
}

export default BookCard;