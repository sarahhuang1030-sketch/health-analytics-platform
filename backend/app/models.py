from sqlalchemy import Column, String, DateTime, Float, Numeric, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# ----------------------
# Patients
# ----------------------
class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True)
    birthdate = Column(DateTime)
    deathdate = Column(DateTime)
    prefix = Column(String)
    first = Column(String)
    last = Column(String)
    suffix = Column(String)
    maiden = Column(String)
    marital = Column(String)
    race = Column(String)
    ethnicity = Column(String)
    gender = Column(String)
    birthplace = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    county = Column(String)
    zip = Column(String)
    lat = Column(Float)
    lon = Column(Float)

# ----------------------
# Organizations
# ----------------------
class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String, primary_key=True)
    name = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip = Column(String)
    lat = Column(Float)
    lon = Column(Float)

# ----------------------
# Payers
# ----------------------
class Payer(Base):
    __tablename__ = "payers"

    id = Column(String, primary_key=True)
    name = Column(String)
    address = Column(String)
    city = Column(String)
    state_headquartered = Column(String)
    zip = Column(String)
    phone = Column(String)

# ----------------------
# Encounters
# ----------------------
class Encounter(Base):
    __tablename__ = "encounters"

    id = Column(String, primary_key=True)
    start_time = Column(DateTime)
    stop_time = Column(DateTime)
    patient = Column(String)
    organization = Column(String)
    payer = Column(String)
    encounterclass = Column(String)
    code = Column(String)
    description = Column(Text)
    base_encounter_cost = Column(Numeric)
    total_claim_cost = Column(Numeric)
    payer_coverage = Column(Numeric)
    reasoncode = Column(String)
    reasondescription = Column(Text)

# ----------------------
# Procedures
# ----------------------
class Procedure(Base):
    __tablename__ = "procedures"

    start_time = Column(DateTime)
    stop_time = Column(DateTime)
    patient = Column(String, primary_key=True)
    encounter = Column(String)
    code = Column(String)
    description = Column(Text)
    base_cost = Column(Numeric)
    reasoncode = Column(String)
    reasondescription = Column(Text)
