from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analytics, patients, encounters, procedures

app = FastAPI(title="Healthcare Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(analytics.router)
app.include_router(patients.router)
app.include_router(encounters.router)
app.include_router(procedures.router)
