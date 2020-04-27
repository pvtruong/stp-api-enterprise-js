sp_configure 'show advanced options', 1
GO
RECONFIGURE;
GO
sp_configure 'Ole Automation Procedures', 1
GO
RECONFIGURE;
GO
sp_configure 'show advanced options', 1
GO
RECONFIGURE;
GO
CREATE procedure HTTP_Request(
 @sUrl nvarchar(512),
 @method varchar(64)='GET',

 @contentType varchar(64) = 'application/json'
)
As
BEGIN
	Declare @obj int ,@hr int ,@msg nvarchar(4000)
	exec @hr = sp_OACreate 'MSXML2.ServerXMLHttp', @obj OUT
	if @hr <> 0
	begin
		Raiserror('sp_OACreate MSXML2.ServerXMLHttp.3.0 failed', 16,1)
		return
	end

	--open request
	exec @hr = sp_OAMethod @obj, 'open', NULL, @method, @sUrl, false
	if @hr <>0 begin set @msg = 'sp_OAMethod Open failed' goto eh end
	--set header
	exec @hr = sp_OAMethod @obj, 'setRequestHeader', NULL, 'Content-Type', @contentType
	if @hr <>0 begin set @msg = 'sp_OAMethod setRequestHeader failed' goto eh end
	--send request
	exec @hr = sp_OAMethod @obj, send, NULL, ''

	if @hr <>0 begin set @msg = 'sp_OAMethod Send failed' goto eh end
	--get response text
	EXEC @hr=sp_OAGetProperty @Obj,'ResponseText',@msg OUTPUT
  IF @hr <> 0 EXEC sp_OAGetErrorInfo @Obj
	--destroy connect
	exec @hr = sp_OADestroy @obj
	return @msg
	eh:
	exec @hr = sp_OADestroy @obj
	return @msg
END
