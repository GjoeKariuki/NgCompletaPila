CREATE OR ALTER PROCEDURE postTag(
	@tid VARCHAR(200), @tname VARCHAR(150), @qid VARCHAR(200)
)
AS
BEGIN
	INSERT INTO TAGS(tid,tname,qid) VALUES(@tid,@tname,@qid)
END