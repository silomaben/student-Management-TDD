CREATE OR ALTER PROCEDURE addNewStudent(@id VARCHAR(200), @full_name  VARCHAR(200), @fee_balance INT, @currentClass VARCHAR(200))
AS
BEGIN
    INSERT INTO students(id, full_name, fee_balance, currentClass) VALUES (@id, @full_name , @fee_balance, @currentClass)
END




-- DROP PROC addNewStudent
-- SELECT * FROM students


