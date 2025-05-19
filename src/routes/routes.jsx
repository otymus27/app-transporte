import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx'; // Página pública
import PrivateRoute from './PrivateRoute.jsx';
import SetorPage from '../pages/Setor/SetorPage.jsx';
import UsuariosPage from '../pages/Usuarios/UsuariosPage.jsx';
import MotoristasPage from './pages/Motoristas/MotoristasPage.jsx';
import EmprestimosPage from '../pages/Emprestimos/EmprestimosPage.jsx';
import EmprestimosRelatorio from '../components/Relatorios/EmprestimosRelatorio.jsx';
import CarrosPage from '../pages/Carro/CarrosPage.jsx';
import SolicitacaoPage from '../pages/Solicitacao/SolicitacaoPage.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>} />
        <Route
          path="/carro"
          element={
            <PrivateRoute>
              <CarrosPage></CarrosPage>
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <UsuariosPage></UsuariosPage>
            </PrivateRoute>
          }
        />

        <Route
          path="/motorista"
          element={
            <PrivateRoute>
              <MotoristasPage></MotoristasPage>
            </PrivateRoute>
          }
        />

        <Routes
          path="/setor"
          element={
            <PrivateRoute>
              <SetorPage></SetorPage>
            </PrivateRoute>
          }
        />

        <Routes
          path="/solicitacao"
          element={
            <PrivateRoute>
              <SolicitacaoPage></SolicitacaoPage>
            </PrivateRoute>
          }
        />

        
      </Routes>
    </Router>
  );
};

export default AppRoutes;