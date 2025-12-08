# Healthcare Analytics Platform

Demostrates full-stack development, analytics, data modeling, API design, Sockerization, and production deployment. 
Healthcare analytics dashboard that ingests real patient data,
processes it with PostgreSQL, exposes insights via FastAPI, and visualizes
trends using React and Recharts.

## 🚀 Live Demo
- Frontend: [https://health-analytics-frontend.onrender.com](https://health-analytics-platform-frontend.onrender.com/)
- Backend API: [https://health-analytics-platform.onrender.com](https://health-analytics-platform.onrender.com/docs)

## Architecture Diagram
CSV Data -> PostgreSQL -> FastAPI Analytics API ->React Dashboard (Charts & Filters)
Deployed on Render using Docker

### Features
- Patient, encounter, and procedure analytics
- Cost aggregation & trend analysis
- Dynamic filters (Top N, Year)
- RESTful analytics API
- Responsive data visualizations


#### Tech Stack
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Frontend: React, TypeScript, Recharts
- Infrastructure: Docker, Docker Compose, Render

<img width="1915" height="1029" alt="Screenshot 2025-12-07 185519" src="https://github.com/user-attachments/assets/ad3a841d-8746-46b0-9e7d-799fbf38d134" />

<img width="1911" height="943" alt="Screenshot 2025-12-07 231444" src="https://github.com/user-attachments/assets/acf474c2-ce25-40fb-a88b-004d7ac5ae21" />

## 🗄 Data Source
Synthetic healthcare dataset obtained from the Maven Analytics Data Playground.  
The dataset represents anonymized patient records, encounters, procedures, and costs and is used strictly for analytics, visualization, and system design demonstration.

