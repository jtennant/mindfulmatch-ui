import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Session {
    id: string;
    name: string;
    date: string;
    time: string;
    type: 'Client' | 'Supervisor' | 'Therapy';
    status: 'Confirmed' | 'Pending';
}

interface SessionListProps {
    title: string;
    sessions: Session[];
}

export default function SessionList({ title, sessions }: SessionListProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Button size="small">View All</Button>
            </Box>
            <List>
                {sessions.map((session) => (
                    <ListItem key={session.id} divider>
                        <ListItemText
                            primary={session.name}
                            secondary={`${session.date} at ${session.time}`}
                        />
                        <Box>
                            <Chip
                                label={session.status}
                                color={session.status === 'Confirmed' ? 'success' : 'warning'}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </ListItem>
                ))}
                {sessions.length === 0 && (
                    <ListItem>
                        <ListItemText primary="No upcoming sessions." />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
}
