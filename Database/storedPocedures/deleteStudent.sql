CREATE OR ALTER PROCEDURE deleteStudent (@id VARCHAR(200))
AS
BEGIN 
    UPDATE students SET isDeleted=1  WHERE id=@id
END