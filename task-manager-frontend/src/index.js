import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>  {/* Wrap the app with AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
