
CREATE OR ALTER PROCEDURE postAnswer(
	@aid VARCHAR(200), @qid VARCHAR(200), @atitle VARCHAR(400), @abody TEXT
)
AS
BEGIN
	DECLARE @uid VARCHAR(200) 

	SELECT @uid=uid FROM QUESTIONS WHERE qid=@qid

	INSERT INTO ANSWERS(aid,qid,uid,atitle,abody) VALUES(@aid,@qid,@uid,@atitle,@abody)
END