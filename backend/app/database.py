import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@db:5432/hospital_db"
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"},
    poolclass=NullPool,          # important: avoids reused dropped SSL conns
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
