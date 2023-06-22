CREATE OR ALTER PROCEDURE updateUserecords(
	@uid VARCHAR(200),@uname VARCHAR(200), @uemail VARCHAR(150), @upassword VARCHAR(300), @urole VARCHAR(100), @uprofPic NVARCHAR(250)
)
AS
BEGIN
	UPDATE USERS SET uname=@uname,  upassword=@upassword, urole=@urole, uprofPic=@uprofPic WHERE uid=@uid AND uemail=@uemail
END
