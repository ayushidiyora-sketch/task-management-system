import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import "../styles/topbar.css";

function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sample notifications
  const [notifications] = useState([
    { id: 1, message: "Task 'Fix login bug' marked as completed", time: "2 min ago", type: "completed" },
    { id: 2, message: "New high priority task assigned to you", time: "15 min ago", type: "high-priority" },
    { id: 3, message: "Task 'Design landing page' due tomorrow", time: "1 hour ago", type: "due-soon" }
  ]);

  const unreadCount = notifications.length;

  // ✅ fetch email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
    setIsDropdownOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userEmail) return "U";
    return userEmail.substring(0, 1).toUpperCase();
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        {/* menu button for mobile */}
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={24} />
        </button>

        {/* Notification Bell */}
        <div className="notification-wrapper">
         

          {/* Notification Dropdown */}
          <div
            className={`notification-dropdown ${isNotificationOpen ? "open" : ""}`}
            onMouseEnter={() => setIsNotificationOpen(true)}
            onMouseLeave={() => setIsNotificationOpen(false)}
          >
            <div className="notification-header">
              <h6>Notifications</h6>
              {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
            </div>

            <div className="notification-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className={`notification-item ${notification.type}`}>
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="notification-empty">
                  <p>No notifications</p>
                </div>
              )}
            </div>

            <div className="notification-footer">
              <button className="view-all-btn">View All Notifications</button>
            </div>
          </div>
        </div>

        <span className="user-email">
          {userEmail || "Guest"}
        </span>

        {/* User Profile Icon with Dropdown */}
        <div className="user-profile-wrapper">
          <button
            className="user-icon-btn"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            title={userEmail || "Guest"}
          >
            <div className="user-avatar">
              {getUserInitials()}
            </div>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`user-dropdown ${isDropdownOpen ? "open" : ""}`}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">{getUserInitials()}</div>
                <div className="dropdown-text">
                  <p className="dropdown-email">{userEmail || "Guest"}</p>
                  <p className="dropdown-status">Account</p>
                </div>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <button className="dropdown-item" onClick={handleSettings}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
              </svg>
              Settings
            </button>

            <button className="dropdown-item logout-item" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              Logout
            </button>
          </div>
           <button
            className="notification-btn"
            onMouseEnter={() => setIsNotificationOpen(true)}
            onMouseLeave={() => setIsNotificationOpen(false)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;