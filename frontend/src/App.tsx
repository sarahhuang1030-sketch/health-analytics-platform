import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import TopProceduresChart from "./components/TopProceduresChart";
import ProcedureCostLineChart from "./components/ProcedureCostLineChart";

//local
// const API_BASE = "http://localhost:8000";

const API_BASE = process.env.REACT_APP_API_BASE || "https://health-analytics-platform.onrender.com";

//added helper functions for formatting
const fmtNumber = (v: unknown) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n.toLocaleString() : null;
};

const fmtCurrency = (v: unknown) => {
  const s = fmtNumber(v);
  return s === null ? null : `$${s}`;
};

function App() {
// State for counts
  const [patientCount, setPatientCount] = useState<number | null>(null);
  const [encounterCount, setEncounterCount] = useState<number | null>(null);
  const [procedureCount, setProcedureCount] = useState<number | null>(null);
  const [totalCostCount, setTotalCostCount] = useState<number | null>(null);
  const [avgPatientCount, setavgPatientCount] = useState<number | null>(null);

  // State for errors
  const [patientError, setPatientError] = useState<string | null>(null);
  const [encounterError, setEncounterError] = useState<string | null>(null);
  const [procedureError, setProcedureError] = useState<string | null>(null);
  const [totalCostError, setTotalCostError] = useState<string | null>(null);
  const [avgPatientError, setavgPatientError] = useState<string | null>(null); 

  //add the new state for TopProceduresChart
  const [topProcedures, setTopProcedures] = useState<any[]>([]);
  const [topProceduresError, setTopProceduresError] = useState<string | null>(null);

  // State for Procedure Cost by Year data
  const [procedureCostByYear, setProcedureCostByYear] = useState<
  { year: number; total_cost: number }[]
>([]);

//state for filtering the procedure
const [topLimit, setTopLimit] = useState<number>(10);

//state for setting the yearly procedure cost
const [selectedYear, setSelectedYear] = useState<number | "all">("all");



  useEffect(() => {

    // Fetch patient count
    const fetchPatientCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analytics/patient-count`);
       // console.log("patient-count response:", res.data);
        setPatientCount(Number(res.data["patient-count"]));
      } catch (err) {
        console.error(err);
        setPatientError("Failed to fetch patient count");
      }
    };

    // Fetch encounter count
     const fetchEncounterCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analytics/encounter-count`);
        setEncounterCount(res.data.encounter_count);
      } catch (err) {
        console.error(err);
        setEncounterError("Failed to fetch encounter count");
      }
    };

    // Fetch procedure count
     const fetchProcedureCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analytics/procedure-count`);
        setProcedureCount(Number(res.data["procedure-count"]));
      } catch (err) {
        console.error(err);
        setProcedureError("Failed to fetch procedure count");
      }
    };

    //fetch total cost
    const fetchTotalCostCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analytics/total-procedure-cost`);
        setTotalCostCount(Number(res.data["total-procedure-cost"]));
      } catch (err) {
        console.error(err);
        setTotalCostError("Failed to fetch total cost");
      }
    };
    
    //fetch average patient cost 
    const fetchavgPatientCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analytics/avg-cost-per-patient`);
        setavgPatientCount(Number(res.data["avg-cost-per-patient"]));
      } catch (err) {
        console.error(err);
        setavgPatientError("Failed to fetch average patient cost");
      }
    };

    // Fetch top procedures
   const fetchTopProcedures = async () => {
  try {
    const res = await axios.get(
      `${API_BASE}/analytics/top-procedures?limit=${topLimit}`
    );
    setTopProcedures(res.data);
  } catch (err) {
    console.error(err);
    setTopProceduresError("Failed to fetch top procedures");
  }
};


 const fetchProcedureCostByYear = async () => {
  try {
    const yearParam =
      selectedYear === "all" ? "" : `?year=${selectedYear}`;

    const res = await axios.get(
      `${API_BASE}/analytics/procedure-costs-by-year${yearParam}`
    );

    setProcedureCostByYear(res.data);
  } catch (err) {
    console.error(err);
  }
};



    // Trigger all fetches in parallel
    //  Promise.all([fetchPatientCount(), fetchEncounterCount(), fetchProcedureCount(), fetchTotalCostCount(), 
    //   fetchavgPatientCount(), fetchTopProcedures(), fetchProcedureCostByYear()]);
    Promise.allSettled([
  fetchPatientCount(),
  fetchEncounterCount(),
  fetchProcedureCount(),
  fetchTotalCostCount(),
  fetchavgPatientCount(),
  fetchTopProcedures(),
  fetchProcedureCostByYear(),
]);


  }, [topLimit, selectedYear]); //refetch when topLimit or selectedYear changes

  return (
    <div style={{
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Inter, system-ui, sans-serif",
    background: "#f9fafb",
  }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Healthcare Analytics Dashboard</h1>
  <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
  Real-world analytics built with FastAPI, PostgreSQL, and React
</p>

{/* Displaying errors if any */}
    {patientError && <p style={{ color: "red" }}>{patientError}</p>}
    {encounterError && <p style={{ color: "red" }}>{encounterError}</p>}
    {procedureError && <p style={{ color: "red" }}>{procedureError}</p>}
    {totalCostError && <p style={{ color: "red" }}>{totalCostError}</p>}
    {avgPatientError && <p style={{ color: "red" }}>{avgPatientError}</p>}

{/* displaying counts or loading states */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  }}
>
  <Card
    title="Total Patients"
    value={patientCount ?? "Loading..."}
  />

  <Card
    title="Total Encounters"
    value={encounterCount ?? "Loading..."}
  />

<Card title="Total Procedures" value={fmtNumber(procedureCount) ?? "Loading..."} />

<Card title="Total Procedure Cost" value={fmtCurrency(totalCostCount) ?? "Loading..."} />

<Card title="Avg Cost per Patient" value={fmtCurrency(avgPatientCount) ?? "Loading..."} />

</div>

      {/* {patientCount === null ? (
        <p>Loading patient count…</p>
      ) : (
        <p>Total Patients: {patientCount}</p>
      )}

      {encounterCount === null ? (
        <p>Loading encounter count…</p>
      ) : (
        <p>Total Encounters: {encounterCount}</p>
      )}

      {procedureCount === null ? (
        <p>Loading procedure count…</p>
      ) : (
        <p>Total Procedures: {procedureCount}</p>
      )}
      
      {totalCostCount === null ? (
        <p>Loading total cost…</p>
      ) : (
        <p>Total Cost of Procedures: ${totalCostCount}</p>
      )}
      
      {avgPatientCount === null ? ( 
        <p>Loading average patient cost…</p>
      ) : (
        <p>Average Cost per Patient: ${avgPatientCount}</p>
      )} */}

{/* ===== Charts Section ===== */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
    alignItems: "start",
  }}
>

{/* filtering the bar chart, place on the left*/}
<div >
  <h2>Top Procedures:</h2>
  <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>Show:</label>
      <select
        value={topLimit}
        onChange={(e) => setTopLimit(Number(e.target.value))}
      >
    <option value={5}>Top 5</option>
    <option value={10}>Top 10</option>
    <option value={20}>Top 20</option>
  </select>
</div>


{/* adding top procedure bar chart */}
      {topProcedures.length > 0 ? (
      <TopProceduresChart data={topProcedures} />
    ) : (
      <div style={{
        height: 280,
        borderRadius: "12px",
        background: "#e5e7eb",
        animation: "pulse 1.5s infinite",
      }} > 
      Loading top procedures…</div>
    )}
  </div>


    {/* filtering for the line chart, place right */}
<div>
  <h2>Procedure Cost Trends</h2>

  <div style={{ marginBottom: "1rem" }}>
    <label style={{ marginRight: "0.5rem" }}>Year:</label>
    <select
      value={selectedYear}
      onChange={(e) =>
        setSelectedYear(
          e.target.value === "all"
            ? "all"
            : Number(e.target.value)
        )
      }
    >
      <option value="all">All Years</option>
      <option value={2011}>2011</option>
      <option value={2012}>2012</option>
      <option value={2013}>2013</option>
      <option value={2014}>2014</option>
      <option value={2015}>2015</option>
      <option value={2016}>2016</option>
      <option value={2017}>2017</option>
      <option value={2018}>2018</option>
      <option value={2019}>2019</option>
      <option value={2020}>2020</option>
      <option value={2021}>2021</option>
      <option value={2022}>2022</option>
    </select>
  </div>
       <div
    style={{
      background: "#fff",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h3 style={{marginBottom: "1rem"}}>Procedure Cost Trend Over Time</h3>
  {procedureCostByYear.length > 0 ? (
    <ProcedureCostLineChart data={procedureCostByYear} />
  ) : (
    <div style={{
  height: 280,
  borderRadius: "12px",
  background: "#e5e7eb",
  animation: "pulse 1.5s infinite",
  }} >
  Loading trend chart…</div>
  )}
  </div>
</div>
</div>
</div>
   
  );
}

export default App;
