CREATE OR ALTER PROCEDURE updateUserecords(
	@uid VARCHAR(200),@uname VARCHAR(200), @uemail VARCHAR(150), @upassword VARCHAR(300), @urole VARCHAR(100), @uprofPic NVARCHAR(250)
)
AS
BEGIN
	UPDATE USERS SET uname=@uname,  upassword=@upassword, urole=@urole, uprofPic=@uprofPic WHERE uid=@uid AND uemail=@uemail
END



CREATE OR ALTER PROCEDURE resetUserPassword(@userid VARCHAR(200), @oldpwd VARCHAR(300), @newpwd VARCHAR(300))
AS
BEGIN
	IF EXISTS(SELECT uid FROM USERS WHERE uid=@userid upassword=@oldpwd)
		BEGIN
			UPDATE USERS SET upassword=@newpwd WHERE uid=@userid
		END
END


CREATE OR ALTER PROCEDURE resetUserPassword(@userid VARCHAR(200), @oldpwd VARCHAR(300), @newpwd VARCHAR(300))
AS
BEGIN
	IF EXISTS(SELECT uid FROM USERS WHERE uid = @userid AND upassword = @oldpwd)
	BEGIN
		UPDATE USERS SET upassword = @newpwd WHERE uid = @userid;
	END
	ELSE
	BEGIN
		RAISERROR('Invalid user or old password', 16, 1);
		RETURN
	END
END



CREATE OR ALTER PROCEDURE resetUserPassword(@userid VARCHAR(200),@newpwd VARCHAR(300))
AS
BEGIN
	
		UPDATE USERS SET upassword = @newpwd WHERE uid = @userid;
	
END