import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/settings.css";
import { UserContext } from "../context/UserContext";
import { FiSave } from "react-icons/fi";

const Settings = () => {
  const { user } = useContext(UserContext);

  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || localStorage.getItem("userEmail") || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // 🔥 later API call here
    console.log("Updated Profile:", profile);

    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content settings-page">
          <h1>Settings</h1>

          {/* Account Info */}
          {/* <div className="settings-card">
            <h3>Account Information</h3>
            <p>
              <strong>Email:</strong> {profile.email || "Guest"}
            </p>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div> */}

          {/* Profile Edit */}
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
                  value={profile.email}
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

              <button type="submit" className="btn btn-primary">
                <FiSave size={16} /> Save Changes
              </button>
            </form>
          </div>

          {/* Preferences */}
          {/* <div className="settings-card">
            <h3>Preferences</h3>
            <p>Coming soon...</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Settings;