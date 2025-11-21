import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function LoginPage() {
    return (
        <Container maxWidth="sm" sx={{ py: 12 }}>
            <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please sign in to your account
                    </Typography>
                </Box>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ py: 1.5, mt: 2 }}
                    >
                        Sign In
                    </Button>

                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                        (This is a placeholder login page)
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
