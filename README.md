# APIs cho STP Enterprise
## Hướng dẫn cài đặt: Chỉ cài đặt chương trình này trên server chứa STP Service của chương trình [STP Enterprise](https://ungdungquanly.vn/downloads/STP_ENTERPRISE_FULL_2017.exe)
  * Cài đặt NodeJS bản mới nhất. [Download](https://nodejs.org)
  * Clone mã nguồn của ứng dụng trực tiếp từ Github hoặc [download](https://github.com/pvtruong/stp-api-enterprise-js/archive/master.zip) và giải nén. Các bước sau giả sử mã nguồn của chương trình đang ở thư mục `d:/STP-API-ENTERPRISE_JS`
  * Mở command line (trên Windows) hoặc terminal (trên Linux), chuyển thư mục làm việc đến thư mục chứa mã nguồn ở trên, ví dụ:
  `cd d:/STP-API-ENTERPRISE_JS`
  * Cài đặt các thư viện cần thiết bằng `npm`
  `npm install`
  * Sau khi cài đặt xong, chạy lệnh sau để khởi động chương trình
  `node app.js`
## Hướng dẫn sử dụng API:
### Lấy token để kết nối với chương trình
	- Url: http://localhost:1986/api/{database}/token
	- Headers:
		+ username: tên người dùng để truy cập vào ứng dụng STP Enterprise. người dùng này phải có quyền admin
		+ password: mật khẩu của người dùng trên
	- Thay thế {database} bằng tên database cần chạy API
### Xoá token (logout)
    - Url: http://localhost:1986/api/{database}/logout
	- Headers:
		+ access-token: token lấy được ở bước trên
	- Thay thế {database} bằng tên database cần chạy API
### Các hàm API danh mục
#### 1. Danh mục khách hàng
        - Url: http://localhost:1986/api/{database}/list/dmkh
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		- Thay thế {database} bằng tên database cần chạy API
#### 2. Danh mục tài khoản
        - Url: http://localhost:1986/api/{database}/list/dmtk
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		- Thay thế {database} bằng tên database cần chạy API
#### 3. Danh mục vật tư
        - Url: http://localhost:1986/api/{database}/list/dmvt
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		- Thay thế {database} bằng tên database cần chạy API
#### 4. Danh mục hợp đồng
        - Url: http://localhost:1986/api/{database}/list/dmhd
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		- Thay thế {database} bằng tên database cần chạy API
### Các hàm API báo cáo
#### 1. Bảng cân đối phát sinh công nợ của các hợp đồng
		- Url: http://localhost:1986/api/{database}/report/rcdpshopdong/1
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		-  Parameters:
			+ tu_ngay: tính từ ngày. Ví dụ báo cáo từ ngày 1/1/2017 thì giá trị của biến này là: `2017-01-01`
            	+ den_ngay: tính đến ngày. Ví dụ  báo cáo đến ngày 31/12/2017 thì giá trị của biến này là: `2017-12-31`
            	+ tk: giá trị là `131` hoặc `331`
		- Thay thế {database} bằng tên database cần chạy API
		
#### 2. Kết quả hoạt động kinh doanh: Báo cáo kết quả hoạt động kinh doanh (theo thông tư 200)
        - Url: http://localhost:1986/api/{database}/report/rbckqhdkd_200/1
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		-  Parameters:
			+ dFrom: tính từ ngày kỳ này. Ví dụ  báo cáo từ ngày 1/1/2017 thì giá trị của biến này là: `2017-01-01`
            	+ dTo: tính đến ngày kỳ này. Ví dụ  báo cáo đến ngày 31/12/2017 thì giá trị của biến này là: `2017-12-31`
            	+ dPrevBegin: tính từ ngày kỳ trước. Ví dụ  báo cáo từ ngày 1/1/2016 thì giá trị của biến này là: `2016-01-01`
            	+ dPrevEnd: tính đến ngày kỳ trước. Ví dụ  báo cáo đến ngày 31/12/2016 thì giá trị của biến này là: `2016-12-31`
            	+ cForm: luôn có giá trị là `02`
		- Thay thế {database} bằng tên database cần chạy API
        

#### 3. Tiền: Bảng cân đối phát sinh các tài khoản 1111, 1131 và các tài khoản 1121
        - Url: http://localhost:1986/api/{database}/report/rcandoipstk_200/1
		- Headers:
			+ access-token: token lấy được từ bước lấy token
		-  Parameters:
			+ dFrom: tính từ ngày. Ví dụ  báo cáo từ ngày 1/1/2017 thì giá trị của biến này là: `2017-01-01`
            	+ dTo: tính đến ngày. Ví dụ  báo cáo đến ngày 31/12/2017 thì giá trị của biến này là: `2017-12-31`
            	+ cAcct: `111` hoặc `112` hoặc `113`
		- Thay thế {database} bằng tên database cần chạy API
        
 
