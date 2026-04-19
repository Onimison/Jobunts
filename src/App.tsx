/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import MasterCVSetup from './screens/MasterCVSetup';
import TailoringStudio from './screens/TailoringStudio';
import ApplicationsTracker from './screens/ApplicationsTracker';
import LoginScreen from './screens/LoginScreen';
import Settings from './screens/Settings';

export default function App() {
  // Simple auth mock for now
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile/cv" 
          element={isAuthenticated ? <MasterCVSetup /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tailor/new" 
          element={isAuthenticated ? <TailoringStudio /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/applications" 
          element={isAuthenticated ? <ApplicationsTracker /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

