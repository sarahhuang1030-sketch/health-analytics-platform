from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Encounter

router = APIRouter(prefix="/encounters", tags=["Encounters"])

@router.get("/")
def list_encounters(limit: int = 20, db: Session = Depends(get_db)):
    return db.query(Encounter).limit(limit).all()

@router.get("/{encounter_id}")
def get_encounter(encounter_id: str, db: Session = Depends(get_db)):
    return db.query(Encounter).filter(Encounter.id == encounter_id).first()
