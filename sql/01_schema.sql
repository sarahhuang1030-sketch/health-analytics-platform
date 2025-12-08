CREATE TABLE patients (
    id VARCHAR(64) PRIMARY KEY,
    birthdate DATE,
    deathdate DATE,
    race VARCHAR(50),
    ethnicity VARCHAR(50),
    gender VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(20)
);

CREATE TABLE organizations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE payers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE encounters (
    id VARCHAR(64) PRIMARY KEY,
    start TIMESTAMP,
    stop  TIMESTAMP,
    patient VARCHAR(64) REFERENCES patients(id),
    organization VARCHAR(64) REFERENCES organizations(id),
    payer VARCHAR(64) REFERENCES payers(id),
    encounterclass VARCHAR(50),
    description VARCHAR(255),
    baseencountercost DECIMAL(12,2),
    totalclaimcost DECIMAL(12,2),
    payercoverage DECIMAL(12,2)
);

CREATE TABLE procedures (
    id VARCHAR(64) PRIMARY KEY,
    encounter VARCHAR(64) REFERENCES encounters(id),
    code VARCHAR(50),
    description VARCHAR(255),
    base_cost DECIMAL(12,2)
);
