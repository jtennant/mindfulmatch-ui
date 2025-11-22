import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface StatBoxProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

export default function StatBox({ title, value, subtitle }: StatBoxProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {subtitle}
                </Typography>
            )}
        </Paper>
    );
}
