CREATE OR ALTER PROCEDURE updateAnswerVotes(
	@avid VARCHAR(200), @aid VARCHAR(200), @aupvotes INT, @adownvotes INT, @apreffered INT
)
AS
BEGIN
	UPDATE ANSWERVOTES SET aupvotes=@aupvotes, adownvotes=@adownvotes, apreffered=@apreffered WHERE avid=@avid AND aid=@aid
END