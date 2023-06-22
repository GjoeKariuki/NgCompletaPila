CREATE OR ALTER PROCEDURE updateComment(
	@cid VARCHAR(200), @cbody TEXT
)
AS
BEGIN
	UPDATE COMMENTS SET  cbody=@cbody WHERE cid=@cid 
END