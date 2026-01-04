import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Voluntario from './pages/voluntario/Voluntario';
import Home from './pages/home/Home';
import Donate from './pages/donate/Donate';
import './App.css';

// Componente para proteger rotas (Só acessa se estiver logado)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Componente para rota pública (Só acessa se NÃO estiver logado - ex: Login)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Rotas Protegidas */}
        <Route 
          path="/voluntario" 
          element={
            <PrivateRoute>
              <Voluntario />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/donate" 
          element={
            <PrivateRoute>
              <Donate />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
