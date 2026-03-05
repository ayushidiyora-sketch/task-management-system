import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../styles/analytic.css';
import { UserContext } from '../context/UserContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const { tasks } = useContext(UserContext);

  const countsByStatus = () => {
    const map = { pending: 0, completed: 0 };

    tasks.forEach((t) => {
      if (map[t.status] !== undefined) {
        map[t.status]++;
      }
    });

    return Object.entries(map).map(([key, value]) => ({
      name: key,
      value,
    }));
  };

  const countsByPriority = () => {
    const map = { High: 0, Medium: 0, Low: 0 };

    tasks.forEach((t) => {
      if (map[t.priority] !== undefined) {
        map[t.priority]++;
      }
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <>
      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-main">
          <Topbar />

          <div className="dashboard-content analytics-page">
            <h1>Analytics</h1>

            {tasks.length === 0 && (
              <p>No tasks available to analyze.</p>
            )}

            {tasks.length > 0 && (
              <div className="charts-container">

                {/* Status Chart */}
                <div className="chart-card">
                  <h3>Status Breakdown</h3>

                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={countsByStatus()}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                      >
                        {countsByStatus().map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Priority Chart */}
                <div className="chart-card">
                  <h3>Priority Breakdown</h3>

                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={countsByPriority()}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                      >
                        {countsByPriority().map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[(index + 1) % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

              </div>
            )}
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default Analytics;