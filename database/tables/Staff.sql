DROP TABLE IF EXISTS Staff;

CREATE TABLE Staff (
    Username NVARCHAR(50) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL
);