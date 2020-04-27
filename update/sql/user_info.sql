CREATE PROCEDURE [dbo].[user_info]
	@user NVARCHAR(512)
AS
BEGIN
  select id as email,admin,idname as name from dmnsd where id = @user
end
GO
CREATE PROCEDURE [dbo].[app_info]
AS
BEGIN
  select * from options where groupcode ='ctyinfo'
end
GO
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'user_info', N'1', N'Mẫu chuẩn', N'Stander Form', N'User Info', N'User Info', N'user_info', N'', N'user_info', N'', N'', N'', N'', N'', N'', N'', N'', N'user_info', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', '20180706 02:10:38 PM', N'', Null, N'', 0, Null, N'' )
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'app_info', N'1', N'Mẫu chuẩn', N'Stander Form', N'app_info', N'app_info', N'app_info', N'', N'app_info', N'', N'', N'', N'', N'', N'', N'', N'', N'user_info', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', getdate(), N'', Null, N'', 0, Null, N'' )
