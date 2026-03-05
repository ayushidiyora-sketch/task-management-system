import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings
} from "lucide-react";
import "../styles/login.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">
          <CheckSquare size={24} />
        </span>
        <span className="logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="menu-item">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tasks" className="menu-item">
          <CheckSquare size={18} />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/analytics" className="menu-item">
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/settings" className="menu-item">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;