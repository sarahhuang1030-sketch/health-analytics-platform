import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Procedure = {
  procedure: string;
  total_cost: number;
  count: number;
};

type Props = {
  data: Procedure[];
};

export default function TopProceduresChart({ data }: Props) {
  return (
    <div
      style={{
        width: 650,
        height: 430,
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>
        Top Procedures by Total Cost
      </h3>

      

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="procedure"
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis    tickFormatter={(value) => `$${(value / 1_000_000).toFixed(1)}M`}/>
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Bar dataKey="total_cost" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


