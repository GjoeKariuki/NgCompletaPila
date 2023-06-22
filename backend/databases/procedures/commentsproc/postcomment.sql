CREATE OR ALTER PROCEDURE postComment(
	@cid VARCHAR(200),  @aid VARCHAR(200), @cbody TEXT
)
AS
BEGIN
	DECLARE @uid VARCHAR(200)
	DECLARE @qid VARCHAR(200)

	SELECT @uid=uid, @qid=qid FROM ANSWERS WHERE aid=@aid

	INSERT INTO COMMENTS(cid,uid,qid,aid,cbody) VALUES(@cid,@uid,@qid,@aid,@cbody)
END