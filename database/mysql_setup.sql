CREATE TABLE IF NOT EXISTS JobPosts (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    EmployerID NVARCHAR(50) NOT NULL,
    JobName NVARCHAR(50) NOT NULL,
    CompanyJobID NVARCHAR(50) NOT NULL,
    ContactFirstName NVARCHAR(50) NOT NULL,
    ContactLastName NVARCHAR(50) NOT NULL,
    ContactPhone NVARCHAR(50) NOT NULL,
    ContactEmail NVARCHAR(50) NOT NULL,
    StartDate NVARCHAR(50) NOT NULL,
    EndDate NVARCHAR(50) NOT NULL,
    StartTime NVARCHAR(50) NOT NULL,
    EndTime NVARCHAR(50) NOT NULL,
    HourlyRate NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Professionals (
    Username NVARCHAR(50) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL,
    AddressLine NVARCHAR(50) NOT NULL,
    City NVARCHAR(50) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(50) NOT NULL,
    SchoolName NVARCHAR(50) NOT NULL,
    DegreeName NVARCHAR(50) NOT NULL,
    CompletionDate NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Employers (
    Username NVARCHAR(50) PRIMARY KEY,
    CompanyName NVARCHAR(50) NOT NULL,
    AddressLine NVARCHAR(50) NOT NULL,
    City NVARCHAR(50) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(50) NOT NULL,
    ContactFirstName NVARCHAR(50) NOT NULL,
    ContactLastName NVARCHAR(50) NOT NULL,
    ContactPhone NVARCHAR(50) NOT NULL,
    ContactEmail NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Staff (
    Username NVARCHAR(50) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    Username NVARCHAR(50) PRIMARY KEY,
    Password NVARCHAR(50) NOT NULL,
    UserType NVARCHAR(50) NOT NULL,
    IsActive BIT NOT NULL,
    FirstTimeLogin BIT NOT NULL
);

CREATE TABLE IF NOT EXISTS JobQualifications (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    JobPostID INT NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Keywords NVARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS ProfessionalQualifications (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ProfessionalUsername NVARCHAR(50) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Keywords NVARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS Transactions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    AmountPaid NVARCHAR(10) NOT NULL,
    TransactionDate NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS NewProfessionalRequests (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL,
    AddressLine NVARCHAR(50) NOT NULL,
    City NVARCHAR(50) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(50) NOT NULL,
    SchoolName NVARCHAR(50) NOT NULL,
    DegreeName NVARCHAR(50) NOT NULL,
    CompletionDate NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS NewEmployerRequests (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    CompanyName NVARCHAR(50) NOT NULL,
    AddressLine NVARCHAR(50) NOT NULL,
    City NVARCHAR(50) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(50) NOT NULL,
    ContactFirstName NVARCHAR(50) NOT NULL,
    ContactLastName NVARCHAR(50) NOT NULL,
    ContactPhone NVARCHAR(50) NOT NULL,
    ContactEmail NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS DeleteProfessionalRequests (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS DeleteEmployerRequests (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS JobMatchings (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    JobPostID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Balances (
    Username NVARCHAR(50) PRIMARY KEY,
    DueDate NVARCHAR(50) NOT NULL,
    AmountDue NVARCHAR(10) NOT NULL
);