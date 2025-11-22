import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';

interface ActivityItem {
    id: string;
    type: 'notification' | 'booking';
    message: string;
    date: string;
}

interface ActivityFeedProps {
    activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Account Activity
            </Typography>
            <List>
                {activities.map((activity) => (
                    <ListItem key={activity.id}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: activity.type === 'booking' ? 'primary.main' : 'secondary.main' }}>
                                {activity.type === 'booking' ? <EventIcon /> : <NotificationsIcon />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={activity.message}
                            secondary={activity.date}
                        />
                    </ListItem>
                ))}
                {activities.length === 0 && (
                    <ListItem>
                        <ListItemText primary="No recent activity." />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
}
