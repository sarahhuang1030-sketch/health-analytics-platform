import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool  # ✅ import this

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@db:5432/hospital_db"
)

# ✅ Only require SSL for non-local Docker DBs
is_local_docker = "db:5432" in DATABASE_URL or "@db:" in DATABASE_URL

engine_kwargs = {}

if not is_local_docker:
    # Render/external Postgres
    engine_kwargs["connect_args"] = {"sslmode": "require"}
    # ✅ NullPool avoids reusing dropped SSL connections on Render
    engine_kwargs["poolclass"] = NullPool

engine = create_engine(DATABASE_URL, **engine_kwargs)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
