import { createRoot } from 'react-dom/client';
import Portfolio from './components/Portfolio';
import './index.css';

// Create a function to initialize the portfolio component
function initPortfolio(elementId: string) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  const root = createRoot(container);
  root.render(<Portfolio />);
}

// Make the init function available globally
declare global {
  interface Window {
    initVisigencePortfolio: typeof initPortfolio;
  }
}
window.initVisigencePortfolio = initPortfolio;