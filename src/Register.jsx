import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(''); // Added for username
    const { login } = useAuth(); // Assuming this sets user info in context
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const action = "register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://paucano.ddns.net/cv_site/api.php', {
                username,
                email,
                password,
                action,
            });

            if (response.data.success) {
                // Automatically log the user in after registration
                login({ email }); // Assuming `useAuth` context has a `login` function
                navigate('/cv-project/'); // Redirect to the home page or dashboard
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            // Handle errors
            console.error('Registration error:', error);
            setErrorMessage('An error occurred while registering. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-md transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Registrarse
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            required
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            required
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/cv-project/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
