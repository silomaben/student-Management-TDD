BEGIN 
    TRY
        CREATE TABLE students(
            id VARCHAR(200) PRIMARY KEY,
            full_name VARCHAR(500) NOT NULL,
            fee_balance VARCHAR(1000) NOT NULL,
            currentClass VARCHAR(1000) NOT NULL,
            isDeleted BIT DEFAULT 0,
        )
    END TRY
BEGIN   
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH