import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Paper, Typography } from '@mui/material';

const data = [
    { month: 'Jan', revenue: 12300 },
    { month: 'Feb', revenue: 9800 },
    { month: 'Mar', revenue: 11000 },
    { month: 'Apr', revenue: 12500 },
    { month: 'May', revenue: 13000 },
    { month: 'Jun', revenue: 14000 },
    { month: 'Jul', revenue: 15000 },
    { month: 'Aug', revenue: 14500 },
    { month: 'Sep', revenue: 13800 },
    { month: 'Oct', revenue: 14200 },
    { month: 'Nov', revenue: 14800 },
    { month: 'Dec', revenue: 15500 },
];

export default function RevenueChart() {
    return (
        <Paper sx={{ p: 2, mt: 2, overflowX: 'auto', minWidth: 900 }}>
            <Typography variant="h6">Revenue 2024</Typography>
            <Typography variant="body2" color="green">+1.3% vs last year</Typography>
            <div style={{ width: 900, height: 320 }}>
                <LineChart width={900} height={320} data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#00c853" />
                </LineChart>
            </div>
        </Paper>
    );
}
