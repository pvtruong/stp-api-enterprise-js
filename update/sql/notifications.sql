INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 30.00000, N'duyet_so1', N'sys', N'', N'', N'Danh sach user duyet SO1', N'Danh sach user duyet SO1', N'admin', N'admin', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 40.00000, N'duyet_hd2', N'sys', N'', N'', N'Danh sach user duyet HD2', N'Danh sach user duyet HD2', N'admin', N'admin', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 50.00000, N'duyet_pc1', N'sys', N'', N'', N'Danh sach user duyet PC1', N'Danh sach user duyet PC1', N'admin', N'admin', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 60.00000, N'duyet_bn1', N'sys', N'', N'', N'Danh sach user duyet BN1', N'Danh sach user duyet BN1', N'admin', N'admin', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 31.00000, N'tb_yc_duyet_so1', N'sys', N'', N'', N'Thong bao yeu cau duyet SO1', N'Thong bao yeu cau duyet SO1', N'Yeu cau duyet don hang %s', N'Yeu cau duyet don hang %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 32.00000, N'tb_da_duyet_so1', N'sys', N'', N'', N'Thong bao da duyet SO1', N'Thong bao da duyet SO1', N'Da duyet don hang %s', N'Da duyet don hang %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 41.00000, N'tb_yc_duyet_hd2', N'sys', N'', N'', N'Thong bao yeu cau duyet HD2', N'Thong bao yeu cau duyet HD2', N'Yeu cau duyet hoa don %s', N'Yeu cau duyet hoa don %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 42.00000, N'tb_da_duyet_hd2', N'sys', N'', N'', N'Thong bao da duyet HD2', N'Thong bao da duyet HD2', N'Da duyet hoa don %s', N'Da duyet hoa don %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 51.00000, N'tb_yc_duyet_pc1', N'sys', N'', N'', N'Thong bao yeu cau duyet PC1', N'Thong bao yeu cau duyet PC1', N'Yeu cau duyet phieu chi %s', N'Yeu cau duyet phieu chi %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 52.00000, N'tb_da_duyet_pc1', N'sys', N'', N'', N'Thong bao da duyet PC1', N'Thong bao da duyet PC1', N'Da duyet phieu chi %s', N'Da duyet phieu chi %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 61.00000, N'tb_yc_duyet_bn1', N'sys', N'', N'', N'Thong bao yeu cau duyet BN1', N'Thong bao yeu cau duyet BN1', N'Yeu cau duyet bao no %s', N'Yeu cau duyet bao no %s', N'', N'', N'', 0 )
INSERT INTO options (stt,name,GroupCode,GroupTilte1,GroupTitle2,Title1,Title2,Value1,Value2,des1,des2,type,reg ) VALUES ( 62.00000, N'tb_da_duyet_bn1', N'sys', N'', N'', N'Thong bao da duyet BN1', N'Thong bao da duyet BN1', N'Da duyet bao no %s', N'Da duyet bao no %s', N'', N'', N'', 0 )
GO
create PROCEDURE [dbo].[sendNotifications]
@ma_ct varchar(16),
@stt_rec varchar(16),
@users_from_options nvarchar(64),
@content_from_options nvarchar(128),
@event varchar(16)='YC_DUYET'
As
Begin
	declare @users nvarchar(512),@notify nvarchar(512),@database varchar(128)
	SELECT @database = DB_NAME()
	select @users = rtrim(ltrim(value1)) from options where name = @users_from_options
	select @notify = rtrim(ltrim(value1)) from options where name = @content_from_options

	if @users is not null or @users <> ''
	begin
		declare  @user as varchar(30),@endpoint as varchar(512),@url as nvarchar(4000)
		DECLARE crTran CURSOR FOR select a.items,b.endpoint from dbo.Split(@users,',') a join endpoint b on a.items=b.nguoi_tao
		OPEN crTran
		FETCH NEXT FROM crTran INTO @user,@endpoint
			WHILE @@FETCH_STATUS = 0
				BEGIN
					if(@user<>'')
					begin
						set @url  = 'http://localhost:1986/api/' + @database + '/send-notification/' + @user + '/' + @event +'?endpoint=' + @endpoint + '&title=' + @notify + '&ma_ct=' + @ma_ct + '&stt_rec=' + @stt_rec
						--select @url,@database,@user,@event,@notify,@ma_ct,@stt_rec,@endpoint
						exec HTTP_Request @url
					end
					FETCH NEXT FROM crTran INTO @user,@endpoint
				END
		CLOSE crTran
		DEALLOCATE crTran
	end

end
