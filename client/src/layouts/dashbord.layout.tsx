import { Outlet } from 'react-router-dom';
import './dashbord.layouts.css';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="icon">
          <img src="https://kakushin.io/images/logo.png" alt="Icon" />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
