from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Patient

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/")
def get_patients(limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Patient).limit(limit).all()

@router.get("/{patient_id}")
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    return db.query(Patient).filter(Patient.id == patient_id).first()
