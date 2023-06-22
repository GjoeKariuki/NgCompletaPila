CREATE OR ALTER PROCEDURE deleteUserecords(@uemail VARCHAR(150))
AS
BEGIN
	UPDATE USERS SET uisDeleted=1 WHERE uemail=@uemail
END