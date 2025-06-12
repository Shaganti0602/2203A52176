import React, { useState, useMemo } from 'react';
import { Typography, Paper, Box, FormControl, InputLabel, Select, MenuItem, Tooltip as MuiTooltip } from '@mui/material';
import { ResponsiveContainer } from 'recharts';

// Simple heatmap rendering using divs and CSS for demonstration
const generateMockHeatmapData = (stocks, minutes) => {
  // Generate a symmetric matrix with values between -1 and 1
  const data = Array.from({ length: stocks }, (_, i) =>
    Array.from({ length: stocks }, (_, j) =>
      i === j ? 1 : Math.round((Math.random() * 2 - 1) * 100) / 100
    )
  );
  return data;
};

const stockNames = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX'];
const intervals = [5, 15, 30, 60];

const getColor = (value) => {
  // Blue for negative, white for zero, red for positive
  const r = value > 0 ? 255 : 0;
  const b = value < 0 ? 255 : 0;
  const g = 255 - Math.abs(Math.round(value * 255));
  return `rgb(${r},${g},${b})`;
};

const CorrelationHeatmap = () => {
  const [interval, setInterval] = useState(15);
  const data = useMemo(() => generateMockHeatmapData(stockNames.length, interval), [interval]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Correlation Heatmap
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
      <Box sx={{ overflowX: 'auto', mb: 2 }}>
        <Box component="table" sx={{ borderCollapse: 'collapse', minWidth: 400 }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ width: 60 }}></Box>
              {stockNames.map((name, idx) => (
                <Box component="th" key={idx} sx={{ px: 1, py: 0.5, fontWeight: 'bold', textAlign: 'center' }}>{name}</Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {data.map((row, i) => (
              <Box component="tr" key={i}>
                <Box component="th" sx={{ px: 1, py: 0.5, fontWeight: 'bold', textAlign: 'center' }}>{stockNames[i]}</Box>
                {row.map((value, j) => (
                  <MuiTooltip key={j} title={`Corr: ${value}`}> 
                    <Box
                      component="td"
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: getColor(value),
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        color: Math.abs(value) > 0.7 ? '#fff' : '#222',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      {i === j ? '' : value}
                    </Box>
                  </MuiTooltip>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <Box sx={{ width: 30, height: 20, background: 'rgb(0,255,255)', border: '1px solid #ccc' }} />
        <Typography variant="body2">Strong Negative</Typography>
        <Box sx={{ width: 30, height: 20, background: 'rgb(255,255,255)', border: '1px solid #ccc' }} />
        <Typography variant="body2">Zero</Typography>
        <Box sx={{ width: 30, height: 20, background: 'rgb(255,255,255)', border: '1px solid #ccc', backgroundImage: 'linear-gradient(to right, rgb(0,255,255), rgb(255,255,255), rgb(255,0,0))' }} />
        <Typography variant="body2">Color Legend</Typography>
        <Box sx={{ width: 30, height: 20, background: 'rgb(255,0,0)', border: '1px solid #ccc' }} />
        <Typography variant="body2">Strong Positive</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Hover over cells for correlation values. (Data is mock; connect to backend for real data.)
      </Typography>
    </Paper>
  );
};

export default CorrelationHeatmap;
