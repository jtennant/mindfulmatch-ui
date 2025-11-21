'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Both');
  const [concern, setConcern] = useState('Anxiety');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (concern) params.append('concern', concern);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Box sx={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
            Find Your Perfect Match
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Connect with professional therapists who understand your needs and can help you thrive.
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <form onSubmit={handleSearch}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                placeholder="e.g. London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                select
                fullWidth
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="In-person">In-person</MenuItem>
                <MenuItem value="Both">Both</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Concern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              >
                <MenuItem value="Anxiety">Anxiety</MenuItem>
                <MenuItem value="Depression">Depression</MenuItem>
                <MenuItem value="Stress">Stress</MenuItem>
                <MenuItem value="Relationships">Relationships</MenuItem>
                <MenuItem value="Trauma">Trauma</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 700,
                  minWidth: '120px'
                }}
              >
                Search
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
