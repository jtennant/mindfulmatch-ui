'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

// Simple debounce hook implementation
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function RefineSearchBox() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [distance, setDistance] = useState<number>(
        Number(searchParams.get('distance')) || 20
    );
    const [type, setType] = useState(searchParams.get('type') || 'Both');

    const debouncedLocation = useDebounce(location, 500);
    const debouncedDistance = useDebounce(distance, 300);

    // Update state when URL params change (e.g. back button)
    useEffect(() => {
        const urlLocation = searchParams.get('location') || '';
        const urlDistance = Number(searchParams.get('distance')) || 20;
        const urlType = searchParams.get('type') || 'Both';

        // Only update state if it differs significantly to avoid fighting with local state
        if (urlLocation !== location) setLocation(urlLocation);
        if (urlDistance !== distance) setDistance(urlDistance);
        if (urlType !== type) setType(urlType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // Effect to trigger search when debounced values or type changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        // Check if values actually changed from URL to avoid unnecessary pushes
        const currentUrlLocation = searchParams.get('location') || '';
        const currentUrlDistance = Number(searchParams.get('distance')) || 20;
        const currentUrlType = searchParams.get('type') || 'Both';

        if (
            debouncedLocation === currentUrlLocation &&
            debouncedDistance === currentUrlDistance &&
            type === currentUrlType
        ) {
            return;
        }

        if (debouncedLocation) {
            params.set('location', debouncedLocation);
        } else {
            params.delete('location');
        }

        params.set('distance', debouncedDistance.toString());
        params.set('type', type);

        router.push(`/search/results?${params.toString()}`);
    }, [debouncedLocation, debouncedDistance, type, router, searchParams]);

    return (
        <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Refine your search
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Location */}
                <Box>
                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                        Location
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="City or Zip code"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        variant="outlined"
                    />
                </Box>

                {/* Distance Slider */}
                <Box>
                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                        Distance: {distance} miles
                    </Typography>
                    <Slider
                        value={distance}
                        onChange={(_, value) => setDistance(value as number)}
                        min={1}
                        max={50}
                        valueLabelDisplay="auto"
                        sx={{ mt: 1 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
                        <Typography variant="caption" color="text.secondary">1 mile</Typography>
                        <Typography variant="caption" color="text.secondary">50 miles</Typography>
                    </Box>
                </Box>

                {/* Type Selection */}
                <FormControl>
                    <FormLabel id="type-radio-group-label" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '0.875rem', mb: 1 }}>
                        Type
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="type-radio-group-label"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <FormControlLabel value="Both" control={<Radio size="small" />} label="Any" />
                        <FormControlLabel value="In-person" control={<Radio size="small" />} label="In-person" />
                        <FormControlLabel value="Remote" control={<Radio size="small" />} label="Remote" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Paper>
    );
}
