import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Toolbar, Typography, CssBaseline, Divider } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GridOnIcon from '@mui/icons-material/GridOn';
import StockPage from './components/StockPage';
import CorrelationHeatmap from './components/CorrelationHeatmap';

const drawerWidth = 220;

const navItems = [
  { text: 'Stock Chart', icon: <ShowChartIcon />, path: '/' },
  { text: 'Correlation Heatmap', icon: <GridOnIcon />, path: '/heatmap' },
];

function App() {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#232323',
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: '#fff' }}>
            Stock Dashboard
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {navItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={selected}
                sx={{
                  color: selected ? '#232323' : '#fff',
                  background: selected ? '#e0e0e0' : 'inherit',
                  borderRadius: 2,
                  my: 1,
                  mx: 1,
                  '&:hover': { background: '#444', color: '#fff' },
                  fontWeight: selected ? 700 : 400,
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/heatmap" element={<CorrelationHeatmap />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
