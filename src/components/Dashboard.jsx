import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/login.css";
import TaskPieChart from "./TaskPieChart";
import { FiPlus } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Dashboard() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
                <div className="dashboard-content">
                    {/* STATS */}
                    <div className="stats-row">
                        <StatCard title="Total Task" value="4" icon={totalIcon} />
                        <StatCard title="Completed Task" value="2" icon={completedIcon} />
                        <StatCard title="Pending Task" value="2" icon={pendingIcon} />
                        <StatCard title="High Priority Task" value="2" icon={priorityIcon} />
                    </div>
                    <div className="row stats-chart">
                        <div className="bg-white chart-card p-4 rounded-3">
                            <h6>Task Chart</h6>
                            <TaskPieChart />
                        </div>
                        <div className="bg-white chart-card p-4 rounded-3">
                            <h6>Completed Task </h6>

                            <TaskCard
                                title="Fix login bug"
                                desc="Users report intermittent login failures on mobile"
                                status="Pending"
                                priority="High"
                                date="Mar 3"
                            />
                            <TaskCard
                                title="Fix login bug"
                                desc="Users report intermittent login failures on mobile"
                                status="Pending"
                                priority="High"
                                date="Mar 3"
                            />

                        </div>
                    </div>

                    {/* ADD TASK */}


                    <div
                        className="add-task"
                        onClick={() => navigate("/tasks")}
                        role="button"
                        tabIndex={0}
                    >
                        <FiPlus size={40} />
                        <span>Add new task</span>
                    </div>

                    {/* TASK LIST */}
                    <TaskCard
                        title="Fix login bug"
                        desc="Users report intermittent login failures on mobile"
                        status="Pending"
                        priority="High"
                        date="Mar 3"
                    />

                    <TaskCard
                        title="Design landing page"
                        desc="Create wireframes and mockups"
                        status="Completed"
                        priority="High"
                        date="Mar 5"
                        done
                    />

                </div>

                <Footer />
            </div>

        </div>
    );
}
const totalIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style={{
        padding: "13px 8px",
        background: "rgb(249, 116, 21)",
        borderRadius: "10px",
    }} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clipboard-list shrink-0"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
);

const completedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style={{
        padding: "13px 8px",
        background: "rgb(249, 116, 21)",
        borderRadius: "10px",
    }} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
);

const pendingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style={{
        padding: "13px 8px",
        background: "rgb(249, 116, 21)",
        borderRadius: "10px",
    }} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const priorityIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style={{
        padding: "13px 8px",
        background: "rgb(249, 116, 21)",
        borderRadius: "10px",
    }} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
);
function StatCard({ title, value, icon, success, warning, danger }) {
    return (
        <div
            className={`stat-card ${success ? "success" : ""} ${warning ? "warning" : ""
                } ${danger ? "danger" : ""}`}
        >
            <div className="stat-card-inner">
                <div className="stat-icon">
                    {icon}
                </div>

                <div className="title-value">
                    <p className="title-dashbord">{title}</p>
                    <h4>{value}</h4>
                </div>
            </div>
        </div>
    );
}

function TaskCard({ title, desc, status, priority, date, done }) {
    return (
        <div className="task-card">
            <div>
                <h6 className={done ? "text-decoration-line-through" : ""}>
                    {title}
                </h6>
                <small className="text-muted">{desc}</small>

                <div className="task-meta">
                    <span>{priority}</span>
                    <span className={`badge ${status.toLowerCase()}`}>
                        {status}
                    </span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;