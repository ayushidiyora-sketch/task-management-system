import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Completed", value: 2 },
  { name: "Pending", value: 2 },
  { name: "High Priority", value: 2 }
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function TaskPieChart() {
  return (
    <div style={{ width: "100%", height: 260, display: "flex" }}>
      {/* Chart */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
        {data.map((item, index) => (
          <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: COLORS[index]
              }}
            />
            <span style={{ fontSize: 14 }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskPieChart;