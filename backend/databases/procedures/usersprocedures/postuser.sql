CREATE OR ALTER PROCEDURE registerUser(
	@uid VARCHAR(200), @uname VARCHAR(200), @uemail VARCHAR(150),
	@upassword VARCHAR(300)
)
AS
BEGIN
	INSERT INTO USERS(uid,uname,uemail,upassword) VALUES(@uid,@uname,@uemail,@upassword)
END