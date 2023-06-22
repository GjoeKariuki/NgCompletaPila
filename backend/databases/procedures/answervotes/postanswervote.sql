CREATE OR ALTER PROCEDURE postAnswervotes(
	@aid VARCHAR(200), @aupvotes INT, @adownvotes INT, @apreffered INT, @avid VARCHAR(200)
)
AS
BEGIN
	DECLARE @uid VARCHAR(200)

	SELECT @uid=uid FROM ANSWERS WHERE aid=@aid

	INSERT INTO ANSWERVOTES(aid,uid,aupvotes,adownvotes, apreffered,avid) VALUES(@aid, @uid,@aupvotes,@adownvotes,@apreffered,@avid)
END