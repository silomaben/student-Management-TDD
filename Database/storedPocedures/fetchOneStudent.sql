CREATE OR ALTER PROCEDURE fetchOneStudent (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT id, full_name, fee_balance, currentClass FROM students WHERE id = @id
    END


