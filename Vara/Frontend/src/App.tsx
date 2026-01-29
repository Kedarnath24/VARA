import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePassword from './pages/create-password';
import UserDashboard from './pages/UserDashboard';
import { useAuthStore } from './store/authStore';

function Dashboard() {
  const { logout, user } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl">Welcome to Dashboard!</h1>
      {user && <p className="text-gray-400">Logged in as: {user.email}</p>}
      <button 
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Toaster position="top-right" theme="dark" richColors />
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/create-password" element={token ? <Navigate to="/dashboard" /> : <CreatePassword />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
