CREATE OR ALTER PROCEDURE fetchAllStudents
AS
BEGIN SELECT id, full_name, fee_balance, currentClass FROM students WHERE isDeleted=0
END
