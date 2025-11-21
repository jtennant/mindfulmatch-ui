import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchPage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary.main">
                    Find Your Perfect Therapist
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                    Connect with licensed professionals who can help you thrive.
                </Typography>
            </Box>

            <Box
                component="form"
                action="/search/results"
                sx={{
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <TextField
                    fullWidth
                    name="concern"
                    label="What can we help you with?"
                    placeholder="e.g., Anxiety, Depression, Relationship issues"
                    variant="outlined"
                />

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        name="location"
                        label="Location"
                        placeholder="City or Zip code"
                        variant="outlined"
                    />
                    <TextField
                        select
                        fullWidth
                        name="type"
                        label="Type"
                        defaultValue="Both"
                        variant="outlined"
                    >
                        <MenuItem value="Both">In-person & Remote</MenuItem>
                        <MenuItem value="In-person">In-person</MenuItem>
                        <MenuItem value="Remote">Remote</MenuItem>
                    </TextField>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SearchIcon />}
                    sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Search Therapists
                </Button>
            </Box>
        </Container>
    );
}
