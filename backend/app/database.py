import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# If you left sslmode in the URL, strip it to avoid double config
DATABASE_URL = DATABASE_URL.split("?")[0]

engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,              # avoid reusing dropped SSL conns
    pool_pre_ping=True,              # detect dead conns before using
    pool_recycle=300,                # recycle periodically
    connect_args={"sslmode": "require"},
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
