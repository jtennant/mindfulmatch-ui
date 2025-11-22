'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

interface ImpressionGraphProps {
    data: { date: string; value: number }[];
}

export default function ImpressionGraph({ data }: ImpressionGraphProps) {
    const xLabels = data.map((d) => d.date);
    const values = data.map((d) => d.value);

    return (
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Impressions (Last 30 Days)
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
                <LineChart
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    series={[
                        {
                            data: values,
                            area: true,
                            label: 'Cumulative Impressions',
                            color: '#1976d2',
                        },
                    ]}
                    height={300}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                />
            </div>
        </Paper>
    );
}
