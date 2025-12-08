import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    year: number;
    total_cost: number;
  }[];
};

export default function ProcedureCostLineChart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Procedure Cost Trend Over Time
      </h2>

      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="total_cost"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
