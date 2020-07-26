CREATE PROCEDURE [dbo].[command_info]
	@user NVARCHAR(512)
AS
BEGIN
  if(exists(select admin from dmnsd where id=@user and admin=1))
  begin
    select * from command
  end
  else
  begin
    select a.* from command a join rights b on a.id = b.cn where a.hide_yn = 0 and  b.xem = 1 and  b.nsd in (select nh_nsd1 from dmnsd where id=@user)
  end

end
GO
INSERT INTO rpts (code,stt,name,name2,title0,title2,rpt,rpt_chart,store,pilotcolumn,pilotrow,pilotdata,pilotheader,pilotheader2,pilotwidth,pilotformat,pilotreadonly,gridid,tbform,idform,line_min,user_permit_print1,user_permit_print12,so_lien,ten_lien1,ten_lien2,ten_lien3,ten_lien4,ten_lien5,ten_lien6,ten_lien7,ten_lien8,ten_lien9,ngay_tao,nguoi_tao,ngay_sua,nguoi_sua,trang_thai,logo,mau_so ) VALUES ( N'command_info', N'1', N'Mẫu chuẩn', N'Stander Form', N'Command Info', N'Command Info', N'command_info', N'', N'command_info', N'', N'', N'', N'', N'', N'', N'', N'', N'command_info', N'', N'', N'0', N'', N'', N'1', N'', N'', N'', N'', N'', N'', N'', N'', N'', '20180706 02:10:38 PM', N'', Null, N'', 0, Null, N'' )
