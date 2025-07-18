import { Grid, Paper, Typography } from '@mui/material';

const stats = [
    { title: 'Total check-ins', value: '235k', change: '+5.4%', color: 'green' },
    { title: 'Total check-outs', value: '201k', change: '-2.5%', color: 'red' },
    { title: 'Other stays', value: '34k' },
];

export default function DashboardStats() {
    return (
        <Grid container spacing={2}>
            {stats.map((s, i) => (
                <Grid item xs={12} md={4} key={i}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle2">{s.title}</Typography>
                        <Typography variant="h5">{s.value}</Typography>
                        {s.change && (
                            <Typography variant="body2" color={s.color === 'green' ? 'green' : 'red'}>
                                {s.change} vs last year
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
