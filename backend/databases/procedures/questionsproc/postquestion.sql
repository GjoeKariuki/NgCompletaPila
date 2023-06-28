CREATE OR ALTER PROCEDURE postQuestion(
	@qid VARCHAR(200), @uemail VARCHAR(150), @qtitle VARCHAR(400), @qbody TEXT, @tname
)
AS
BEGIN
	DECLARE @uid VARCHAR(200)

	SELECT @uid=uid from USERS WHERE uemail=@uemail

	INSERT INTO QUESTIONS(qid,uid,qtitle,qbody) VALUES(@qid,@uid,@qtitle,@qbody)
END
EXEC postQuestion @qid='qq34', @uemail='samuelndambuki401@gmail.com', @qtitle='How do i style the inner paragraphs with italics and colors', @qbody='<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>'
