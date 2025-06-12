import React, { useState, useMemo } from 'react';
import { Typography, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// Mock data generator for demonstration
const generateMockData = (minutes) => {
  const now = new Date();
  return Array.from({ length: minutes }, (_, i) => {
    const time = new Date(now.getTime() - (minutes - i - 1) * 60000);
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: 100 + Math.sin(i / 5) * 10 + Math.random() * 5,
    };
  });
};

const intervals = [5, 15, 30, 60];

const StockPage = () => {
  const [interval, setInterval] = useState(15);
  const data = useMemo(() => generateMockData(interval), [interval]);
  const average = useMemo(() => data.reduce((sum, d) => sum + d.price, 0) / data.length, [data]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Card sx={{ mb: 3, p: 2, boxShadow: 3, border: '1.5px solid #e0e0e0', background: '#fff' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, color: '#232323' }}>
            Stock Chart
          </Typography>
          <FormControl>
            <InputLabel id="interval-label">Interval</InputLabel>
            <Select
              labelId="interval-label"
              value={interval}
              label="Interval"
              onChange={e => setInterval(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              {intervals.map(i => (
                <MenuItem key={i} value={i}>{i} min</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={{ p: 3, boxShadow: '0 4px 24px 0 #e0e0e033', border: '1.5px solid #e0e0e0', background: '#fff' }}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#232323" />
            <YAxis domain={['auto', 'auto']} stroke="#232323" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#43B0A5" strokeWidth={2} dot />
            <ReferenceLine y={average} label="Avg" stroke="#FFB26B" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          The orange dashed line shows the average price. Hover or tap on chart points for details. (Currently displaying sample data.)
        </Typography>
      </Card>
    </Box>
  );
};

export default StockPage;
