DROP TABLE IF EXISTS Transactions;

CREATE TABLE Transactions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    AmountPaid NVARCHAR(10) NOT NULL,
    TransactionDate NVARCHAR(50) NOT NULL
);