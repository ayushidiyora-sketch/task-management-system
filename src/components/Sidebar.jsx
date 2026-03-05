import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings
} from "lucide-react";
import "../styles/login.css";

function Sidebar({ isOpen = true, onClose = () => {} }) {
  // allow parent to control visibility on small screens
  return (
    <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="sidebar-logo">
        <span className="logo-icon">
          <CheckSquare size={24} />
        </span>
        <span className="logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="menu-item" onClick={onClose}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tasks" className="menu-item" onClick={onClose}>
          <CheckSquare size={18} />
          <span>Tasks</span>
        </NavLink>

        {/* <NavLink to="/analytics" className="menu-item" onClick={onClose}>
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink> */}

        <NavLink to="/settings" className="menu-item" onClick={onClose}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;