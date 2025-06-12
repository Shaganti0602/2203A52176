import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import StockPage from './components/StockPage';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stock Price Aggregation
          </Typography>
          <Button color="inherit" component={Link} to="/">Stock Page</Button>
          <Button color="inherit" component={Link} to="/heatmap">Correlation Heatmap</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/heatmap" element={<CorrelationHeatmap />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
