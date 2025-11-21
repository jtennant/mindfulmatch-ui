'use client';

import { use } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

interface Props {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        accountCreated?: string;
    }>;
}

export default function MessageSentPage({ params, searchParams }: Props) {
    const { id } = use(params);
    const search = use(searchParams);
    const accountCreated = search.accountCreated === 'true';

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <CheckCircleOutlineIcon
                    color="success"
                    sx={{ fontSize: 80, mb: 2 }}
                />

                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Message Sent!
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                    The therapist will get back to you typically within 1-2 days.
                </Typography>

                <Stack spacing={2}>
                    <Button
                        component="a"
                        href={`/therapist/${id}`}
                        variant="contained"
                        fullWidth
                        size="large"
                    >
                        Back to Therapist Profile
                    </Button>

                    <Button
                        component="a"
                        href="/search"
                        variant="outlined"
                        fullWidth
                        size="large"
                    >
                        Back to Search Results
                    </Button>

                    {accountCreated && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                                You requested to create an account. Log in to track your activity.
                            </Typography>
                            <Button
                                component="a"
                                href="/login"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                size="large"
                            >
                                Log In to Your Account
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
}
