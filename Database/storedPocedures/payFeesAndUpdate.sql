CREATE OR ALTER PROCEDURE updateFeeBalance (@id VARCHAR(200),@fee_balance INT)
AS
BEGIN 
-- subtract paid fees from current balance

    UPDATE students SET fee_balance WHERE id=@id
END