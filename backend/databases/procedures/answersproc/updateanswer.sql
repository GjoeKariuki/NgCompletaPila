CREATE OR ALTER PROCEDURE updateAnswer(
	@aid VARCHAR(200), @atitle VARCHAR(400), @abody TEXT
)
AS
BEGIN
	UPDATE ANSWERS SET atitle=@atitle, abody=@abody WHERE aid=@aid AND aisDeleted=0
END