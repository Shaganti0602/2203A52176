# Stock Price Aggregation Frontend Web Application

This is a responsive React frontend web application that delivers real-time analytical insights for stock prices.

## Features
- **Stock Page**: Chart the prices of a stock over a selectable time frame, with the average price highlighted. Users can select different time intervals (last m minutes).
- **Correlation Heatmap**: View a heatmap showing the correlation between stocks over the last 'm' minutes, with a color legend and tooltips for details.
- **Material UI**: The UI is built using Material UI for a modern, responsive experience.
- **API Ready**: Easily connect to your backend for real stock and correlation data (see `src/components/api.js`).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
- `src/components/StockPage.js`: Stock chart and controls
- `src/components/CorrelationHeatmap.js`: Correlation heatmap visualization
- `src/components/api.js`: API utility functions (replace with your backend endpoints)

## Customization
- Replace mock data and API placeholders with your backend endpoints for real-time data.
- Extend the UI as needed for additional analytics or features.

---

*Developed as per the provided requirements for a stock price aggregation frontend web application.* 