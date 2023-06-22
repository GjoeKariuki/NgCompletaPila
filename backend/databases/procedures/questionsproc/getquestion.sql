CREATE OR ALTER PROCEDURE getQuestionbyEmail(@uemail VARCHAR(200))
AS
BEGIN
	DECLARE @uid VARCHAR(200)

	SELECT @uid=uid FROM USERS WHERE uemail=@uemail
	
	SELECT * FROM QUESTIONS WHERE uid=@uid AND qisDeleted=0
END

exec getQuestionbyEmail 'samuelndambuki401@gmail.com'


CREATE OR ALTER PROCEDURE getQuestionbyQid(@qid VARCHAR(200))
AS
BEGIN
	SELECT * FROM QUESTIONS WHERE qid=@qid AND qisDeleted=0
END
EXEC getQuestionbyQid 'qq32'



CREATE OR ALTER PROCEDURE getAllQuestions 
AS
BEGIN
	SELECT * FROM QUESTIONS WHERE qisDeleted=0
END