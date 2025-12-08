from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Procedure

router = APIRouter(prefix="/procedures", tags=["Procedures"])

@router.get("/")
def list_procedures(limit: int = 20, db: Session = Depends(get_db)):
    return db.query(Procedure).limit(limit).all()

@router.get("/by-patient/{patient_id}")
def procedures_by_patient(patient_id: str, db: Session = Depends(get_db)):
    return db.query(Procedure).filter(Procedure.patient == patient_id).all()
