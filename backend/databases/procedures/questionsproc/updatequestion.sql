CREATE OR ALTER PROCEDURE updateQuestion(
	@qid VARCHAR(200), @qtitle VARCHAR(400), @qbody TEXT
)
AS
BEGIN
	UPDATE QUESTIONS SET qtitle=@qtitle, qbody=@qbody WHERE qid=@qid AND qisDeleted=0
END
EXEC updateQuestion @qid='qq32', @qtitle='How do i style the inner paragraphs with italics and colors with a nice border', @qbody='<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>'
