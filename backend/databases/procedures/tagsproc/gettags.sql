CREATE OR ALTER PROCEDURE getTagbyid(@tid VARCHAR(200))
AS
BEGIN
	SELECT * FROM TAGS WHERE tid=@tid
END

CREATE OR ALTER PROCEDURE gettagByQid (@qid VARCHAR(200))
AS
BEGIN
	SELECT * FROM TAGS WHERE qid=@qid
END


CREATE OR ALTER PROCEDURE getallTags
AS
BEGIN
	SELECT * FROM TAGS
END