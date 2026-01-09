import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from urllib.parse import urlparse

# Optional local dev default (only used if you set LOCAL_DOCKER=1)
LOCAL_DOCKER_URL = "postgresql+psycopg2://postgres:postgres@db:5432/hospital_db"

DATABASE_URL = os.getenv("DATABASE_URL")

p = urlparse(DATABASE_URL)
print("DB_HOST:", p.hostname)
print("DB_PORT:", p.port)

# ✅ If you're running locally with docker-compose, set LOCAL_DOCKER=1
if not DATABASE_URL and os.getenv("LOCAL_DOCKER") == "1":
    DATABASE_URL = LOCAL_DOCKER_URL

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set. On Render, add DATABASE_URL in your service Environment variables."
    )

# ✅ Render often provides postgres://..., but SQLAlchemy expects postgresql://...
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Detect local docker hostname (docker-compose service name)
is_local_docker = ("@db:" in DATABASE_URL) or ("db:5432" in DATABASE_URL)

engine_kwargs = {
    # Helps avoid stale connections causing random failures
    "pool_pre_ping": True,
}

if not is_local_docker:
    # ✅ Render/external Postgres: require SSL, and avoid reusing dropped SSL conns
    engine_kwargs["connect_args"] = {"sslmode": "require"}
    engine_kwargs["poolclass"] = NullPool

engine = create_engine(DATABASE_URL, **engine_kwargs)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
