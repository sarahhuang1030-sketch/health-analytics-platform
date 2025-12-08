# Healthcare Analytics Platform

A full-stack healthcare analytics dashboard that ingests real patient data,
processes it with PostgreSQL, exposes insights via FastAPI, and visualizes
trends using React and Recharts.


## Architecture Diagram
CSV Data
   ↓
PostgreSQL
   ↓
FastAPI Analytics API
   ↓
React Dashboard (Charts & Filters)


### Features
- Patient, encounter, and procedure analytics
- Cost aggregation & trend analysis
- Dynamic filters (Top N, Year)
- RESTful analytics API
- Responsive data visualizations


#### Tech Stack
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Frontend: React, TypeScript, Recharts
- Infrastructure: Docker, Docker Compose



