DROP TABLE IF EXISTS ProfessionalQualifications;

CREATE TABLE ProfessionalQualifications (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ProfessionalUsername NVARCHAR(50) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Keywords NVARCHAR(150) NOT NULL
);