import React, { useState, useMemo } from 'react';
import { Typography, Paper, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
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
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Page
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FormControl>
          <InputLabel id="interval-label">Time Interval (minutes)</InputLabel>
          <Select
            labelId="interval-label"
            value={interval}
            label="Time Interval (minutes)"
            onChange={e => setInterval(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            {intervals.map(i => (
              <MenuItem key={i} value={i}>{i} minutes</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#1976d2" strokeWidth={2} dot />
          <ReferenceLine y={average} label="Avg" stroke="#ff9800" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        The orange dashed line shows the average price. Hover or tap on chart points for details. (Currently displaying sample data.)
      </Typography>
    </Paper>
  );
};

export default StockPage;
