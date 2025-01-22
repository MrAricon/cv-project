import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';
import CVForm from "./CVForm.jsx";
import CVPreview from "./CVPreview.jsx";
import StatsChart from "./StatsChart.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/cv-project/login" />;
};

const Navigation = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/cv-project/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Portfolio Manager
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="text-gray-300 mr-4">Bienvenido, {user.email}</span>
                <button 
                  onClick={logout} 
                  className="text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/cv-project/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  Iniciar Sesión
                </Link>
                <Link to="/cv-project/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-4 transition-all duration-300">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const triggerUpdate = () => setUpdateTrigger(prev => prev + 1);
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <Navigation />
          <div className="max-w-7xl mx-auto p-6">
            <Routes>
              <Route path="/cv-project/login" element={<Login />} />
              <Route path="/cv-project/register" element={<Register />} />
              <Route path="/cv-project/" element={
                <PrivateRoute>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                        <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Actualizar CV</h2>
                        <CVForm onUpdate={triggerUpdate} />
                      </div>
                      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                        <h2 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Vista Previa del CV</h2>
                        <CVPreview updateTrigger={updateTrigger} />
                      </div>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                      <h2 className="text-3xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Estadísticas del CV</h2>
                      <StatsChart />
                    </div>
                  </div>
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
