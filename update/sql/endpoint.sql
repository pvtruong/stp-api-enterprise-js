CREATE TABLE [dbo].[endpoint](
	[ep_id] [nvarchar](512) NOT NULL,
	[endpoint] [nvarchar](512) NOT NULL,
	[userPublicKey] [nvarchar](512) NOT NULL,
	[userAuth] [nvarchar](512) NOT NULL,
	[trang_thai] [bit] NOT NULL,
	[nguoi_tao] [nvarchar](16) NULL,
	[nguoi_sua] [char](16) NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL
) ON [PRIMARY]
GO
CREATE PROCEDURE [dbo].[register_endpoint]
	@endpoint NVARCHAR(512),
	@user NVARCHAR(512),
	@userPublicKey NVARCHAR(512)='',
	@userAuth NVARCHAR(512)=''
AS
BEGIN
	declare @ep_id NVARCHAR(512)

	SELECT @ep_id =
		CAST(N'' AS XML).value(
			  'xs:base64Binary(xs:hexBinary(sql:column("bin")))'
			, 'VARCHAR(MAX)'
		)
	FROM (
		SELECT CAST(@endpoint AS VARBINARY(MAX)) AS bin
	) AS bin_sql_server_temp;

	insert into endpoint(ep_id,endpoint,userPublicKey,userAuth,nguoi_tao,ngay_tao,trang_thai)
	values (@ep_id,@endpoint,@userPublicKey,@userAuth,@user,getdate(),1)
	select @ep_id
end
GO
CREATE PROCEDURE [dbo].[remove_endpoint]
	@ep_id NVARCHAR(512)
AS
BEGIN
	delete from endpoint where ep_id = @ep_id
	select 1
end
GO
CREATE PROCEDURE [dbo].[get_endpoint]
	@user NVARCHAR(512)
AS
BEGIN
	select * from endpoint where nguoi_tao = @user
end
GO
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'get_endpoint', N'1', N'Get endpoint', N'Get endpoint', N'Get endpoint', N'Get endpoint', N'get_endpoint', N'', N'get_endpoint', N'', N'', N'', N'', N'', N'', N'', N'', N'get_endpoint', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', '20180706 02:10:38 PM', N'', Null, N'', 0, Null, N'' )
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'register_endpoint', N'1', N'Dang ky endpoint', N'Dang ky endpoint', N'Dang ky endpoint', N'Dang ky endpoint', N'register_endpoint', N'', N'register_endpoint', N'', N'', N'', N'', N'', N'', N'', N'', N'register_endpoint', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', '20180706 02:10:38 PM', N'', Null, N'', 0, Null, N'' )
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'remove_endpoint', N'1', N'Xoa endpoint', N'Xoa endpoint', N'Xoa endpoint', N'Xoa endpoint', N'remove_endpoint', N'', N'remove_endpoint', N'', N'', N'', N'', N'', N'', N'', N'', N'remove_endpoint', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', getdate(), N'', Null, N'', 0, Null, N'' )
