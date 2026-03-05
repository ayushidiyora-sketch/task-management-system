import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/settings.css";
import { UserContext } from "../context/UserContext";
import { FiSave, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Settings = () => {
  const { user } = useContext(UserContext);
 const userEmail = localStorage.getItem("userEmail");
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || localStorage.getItem("userEmail") || "",
    phone: user?.phone || "",
  });
 const navigate = useNavigate();
 const [sidebarOpen, setSidebarOpen] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // 🔥 later API call here
    console.log("Updated Profile:", profile);

    alert("Profile updated successfully!");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("userPassword");

    if (passwordData.currentPassword !== storedPassword) {
      alert("Current password is incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    localStorage.setItem("userPassword", passwordData.newPassword);
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };
  const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };
  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
            {/* overlay for mobile menu */}
            <div className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={toggleSidebar}></div>
      <div className="dashboard-main">
       <Topbar onMenuClick={toggleSidebar} />

        <div className="dashboard-content settings-page">
          <h1>Settings</h1>

   
          <div className="settings-card">
            <h3>Edit Profile</h3>

            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value=  {userEmail || "Guest"}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <button type="submit" className="btn btn-addtask">
                <FiSave size={16} /> Save Changes
              </button>
            </form>
          </div>

  
        </div>
            <Footer />
      </div>
    
    </div>
  );
};

export default Settings;