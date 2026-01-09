from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/patient-count")
def patient_count(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT COUNT(*) FROM patients")).scalar()
    return {"patient-count": result}

@router.get("/total-procedure-cost")
def total_procedure_cost(db: Session = Depends(get_db)):
    result = db.execute(
        text("SELECT COALESCE(SUM(base_cost), 0) FROM procedures")
    ).scalar()
    return {"total-procedure-cost": float(result)}

@router.get("/top-procedures")
def top_procedures(limit: int = 10, db: Session = Depends(get_db)):
    query = text("""
        SELECT
            description,
            SUM(base_cost) AS total_cost,
            COUNT(*) AS procedure_count
        FROM procedures
        GROUP BY description
        ORDER BY total_cost DESC
        LIMIT :limit
    """)

    results = db.execute(query, {"limit": limit}).fetchall()

    return [
        {
            "procedure": row.description,
            "total-cost": float(row.total_cost),
            "count": row.procedure_count
        }
        for row in results
    ]

@router.get("/procedure-costs-by-year")
def procedure_costs_by_year(year: int | None = None, db: Session = Depends(get_db)):
    if year:
        query = text("""
            SELECT
                EXTRACT(YEAR FROM start)::INT AS year,
                SUM(base_cost) AS total_cost
            FROM procedures
            WHERE EXTRACT(YEAR FROM start) = :year
            GROUP BY year
            ORDER BY year
        """)
        results = db.execute(query, {"year": year}).fetchall()
    else:
        query = text("""
            SELECT
                EXTRACT(YEAR FROM start)::INT AS year,
                SUM(base_cost) AS total_cost
            FROM procedures
            GROUP BY year
            ORDER BY year
        """)
        results = db.execute(query).fetchall()

    return [
        {"year": row.year, "total-cost": float(row.total_cost)}
        for row in results
    ]


@router.get("/encounter-count")
def encounter_count(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT COUNT(*) FROM encounters")).scalar()
    return {"encounter_count": result}

@router.get("/avg-cost-per-patient")
def avg_cost_per_patient(db: Session = Depends(get_db)):
    result = db.execute(
        text("""
        SELECT 
          ROUND(
            COALESCE(SUM(base_cost), 0) / NULLIF(COUNT(DISTINCT patient), 0),
            2
          )
        FROM procedures
        """)
    ).scalar()

    return {"avg-cost-per-patient": result}

@router.get("/procedure-count")
def procedure_count(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT COUNT(*) FROM procedures")).scalar()
    return {"procedure-count": result}