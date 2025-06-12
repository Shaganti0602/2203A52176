import React, { useState, useMemo } from 'react';
import { Typography, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip as MuiTooltip, Divider } from '@mui/material';

const generateMockHeatmapData = (stocks, minutes) => {
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
  // Green for positive, red for negative, white for zero
  if (value === 1) return '#7BC47F'; // strong positive
  if (value === -1) return '#FF6B6B'; // strong negative
  if (value === 0) return '#fff';
  // interpolate between red and green
  if (value > 0) return `rgba(123,196,127,${value})`;
  if (value < 0) return `rgba(255,107,107,${-value})`;
  return '#fff';
};

const CorrelationHeatmap = () => {
  const [interval, setInterval] = useState(15);
  const data = useMemo(() => generateMockHeatmapData(stockNames.length, interval), [interval]);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Card sx={{ mb: 3, p: 2, boxShadow: 3, border: '1.5px solid #e0e0e0', background: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, color: '#232323' }}>
            Correlation Heatmap
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
        <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ background: '#e0e0e0' }}>
                <TableCell sx={{ background: '#e0e0e0', color: '#232323', fontWeight: 700 }}></TableCell>
                {stockNames.map((name, idx) => (
                  <TableCell key={idx} align="center" sx={{ background: '#e0e0e0', color: '#232323', fontWeight: 'bold' }}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#232323', background: '#f5f5f5' }}>{stockNames[i]}</TableCell>
                  {row.map((value, j) => (
                    <MuiTooltip key={j} title={`Corr: ${value}`}>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: getColor(value),
                          color: Math.abs(value) > 0.7 ? '#fff' : '#232323',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          minWidth: 40,
                          height: 40,
                        }}
                      >
                        {i === j ? '' : value}
                      </TableCell>
                    </MuiTooltip>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Box sx={{ width: 30, height: 20, background: '#FF6B6B', border: '1px solid #ccc' }} />
          <Typography variant="body2">Strong Negative</Typography>
          <Box sx={{ width: 30, height: 20, background: '#fff', border: '1px solid #ccc' }} />
          <Typography variant="body2">Zero</Typography>
          <Box sx={{ width: 30, height: 20, background: 'linear-gradient(to right, #FF6B6B, #fff, #7BC47F)', border: '1px solid #ccc' }} />
          <Typography variant="body2">Color Legend</Typography>
          <Box sx={{ width: 30, height: 20, background: '#7BC47F', border: '1px solid #ccc' }} />
          <Typography variant="body2">Strong Positive</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Hover over cells for correlation values. (Currently displaying sample data.)
        </Typography>
      </Card>
    </Box>
  );
};

export default CorrelationHeatmap;
