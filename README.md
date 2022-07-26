# api-backend-project-by-truong-son
### API Viết Bởi Node JS và sử dụng database PHP MYSQL 
* Áp Dụng mô hình MVC ( model , Controller, View ) Nhưng Server nó chỉ có nhiệm vụ trả ra API ( dữ liệu ) nên app này sẽ không có view


* ![image](https://user-images.githubusercontent.com/97645406/180594601-2ecf95f2-a305-45bd-a04a-8291923e49c0.png)

# npm init
cài đặt môi trường và engine 

 ### API là gì?
API là cơ chế cho phép 2 thành phần phần mềm giao tiếp với nhau bằng một tập hợp các định nghĩa và giao thức. Ví dụ: hệ thống phần mềm của cơ quan thời tiết chứa dữ liệu về thời tiết hàng ngày. Ứng dụng thời tiết trên điện thoại của bạn sẽ “trò chuyện” với hệ thống này qua API và hiển thị thông tin cập nhật về thời tiết hàng ngày trên điện thoại của bạn.
 ### API hoạt động như thế nào?
Kiến trúc API thường được giải thích dưới dạng máy chủ và máy khách. Ứng dụng gửi yêu cầu được gọi là máy khách, còn ứng dụng gửi phản hồi được gọi là máy chủ. Như vậy, trong ví dụ về thời tiết, cơ sở dữ liệu của cơ quan thời tiết là máy chủ còn ứng dụng di động là máy khách. 

### Nó Hoạt Động

![image](https://user-images.githubusercontent.com/97645406/180594503-060bd089-865c-42a6-ad24-ee95dfd5b3c4.png)


API hoạt động theo 4 cách khác nhau, tùy vào thời điểm và lý do chúng được tạo ra.
API SOAP 
Các API này sử dụng Giao thức truy cập đối tượng đơn giản. Máy chủ và máy khách trao đổi thông đệp bằng XML. Đây là loại API kém linh hoạt được dùng phổ biến trước đây.
API RPC
Những API này được gọi là Lệnh gọi thủ tục từ xa. Máy khách hoàn thành một hàm (hoặc thủ tục) trên máy chủ còn máy chủ gửi kết quả về cho máy khách.
API Websocket
API Websocket là một phiên bản API web hiện đại khác sử dụng các đối tượng JSON để chuyển dữ liệu. API WebSocket hỗ trợ hoạt động giao tiếp hai chiều giữa ứng dụng máy khách và máy chủ. Máy chủ có thể gửi thông điệp gọi lại cho các máy khách được kết nối, điều này khiến loại API này hiệu quả hơn API REST.
API REST
Đây là loại API phổ biến và linh hoạt nhất trên web hiện nay. Máy khách gửi yêu cầu đến máy chủ dưới dạng dữ liệu. Máy chủ dùng dữ liệu đầu vào từ máy khách này để bắt đầu các hàm nội bộ và trả lại dữ liệu đầu ra cho máy khách. Hãy cùng xem xét API REST chi tiết hơn ở bên dưới.
API REST là gì?
REST là từ viết tắt của Chuyển trạng thái đại diện. REST xác định một tập hợp các hàm như GET, PUT, DELETE, v.v. mà máy khách có thể dùng để truy cập vào dữ liệu của máy chủ. Máy khách và máy chủ trao đổi dữ liệu qua giao thức HTTP.

Tính năng chính của API REST là tính không trạng thái. Tính không trạng trái nghĩa là máy chủ không lưu dữ liệu của máy khách giữa các yêu cầu. Các yêu cầu mà máy khách gửi cho máy chủ tương tự như URL mà bạn nhập vào trình duyệt để truy cập vào trang web. Phản hồi từ máy chủ là dữ liệu thuần chứ không được kết xuất thành đồ họa như thường thấy trên trang web.
API web là gì?
API Web hoặc API Dịch vụ web là một giao diện xử lý ứng dụng giữa máy chủ web và trình duyệt web. Mọi dịch vụ web đều là API nhưng không phải tất cả API đều là dịch vụ web. API REST là một loại API Web đặc biệt sử dụng phong cách kiến trúc tiêu chuẩn được giải thích ở trên.

Việc tồn tại các thuật ngữ khác nhau xoay quanh API - như API Java hoặc API dịch vụ - là do về mặt lịch sử, API được tạo ra trước mạng lưới toàn cầu. Các API web hiện đại là API REST và các thuật ngữ này có thể được dùng thay thế cho nhau.
Tiện ích tích hợp API là gì?
Tiện ích tích hợp API là các thành phần phần mềm tự động cập nhật dữ liệu giữa máy khách và máy chủ. Một số ví dụ về tiện ích tích hợp API bao gồm khi dữ liệu tự động đồng bộ với đám mây từ thư viện hình ảnh trong điện thoại của bạn hoặc máy tính xách tay của bạn tự động đồng bộ ngày giờ khi bạn đến một múi giờ khác. Các doanh nghiệp cũng có thể sử dụng chúng để tự động hóa nhiều chức năng của hệ thống một cách hiệu quả.
API REST mang lại những lợi ích gì?
API REST mang lại 4 lợi ích chính:

1. Tích hợp 
API được sử dụng để tích hợp ứng dụng mới với hệ thống phần mềm hiện tại. Điều này làm tăng tốc độ phát triển vì không cần phải viết lại từng chức năng từ đầu. Bạn có thể sử dụng API để tận dụng mã hiện có.
2. Đổi mới 
Rất nhiều lĩnh vực có thể thay đổi khi một ứng dụng mới ra mắt. Doanh nghiệp cần khẩn trương phản ứng và hỗ trợ việc triển khai nhanh chóng các dịch vụ đổi mới. Họ có thể thực hiện việc này bằng cách thực hiện các thay đổi ở cấp độ API mà không cần phải viết lại toàn bộ mã.
3. Mở rộng
API mang lại cơ hội độc đáo cho các doanh nghiệp để đáp ứng nhu cầu khách hàng của họ trên những nền tảng khác nhau. Ví dụ: API bản đồ cho phép tích hợp thông tin bản đồ qua các trang web, nền tảng Android, iOS, v.v. Mọi doanh nghiệp đều có thể cung cấp quyền truy cập tương tự vào cơ sở dữ liệu nội bộ của họ bằng API miễn phí hoặc trả phí.
4. Dễ duy trì
API đóng vai trò là cổng giữa hai hệ thống. Mỗi hệ thống đều phải thực hiện các thay đổi nội bộ để API không bị tác động. Bằng cách này, mọi sự thay đổi về mã trong tương lai do một bên thực hiện sẽ không tác động đến bên còn lại.
API có những loại khác nhau nào?
API được phân loại theo cả kiến trúc và phạm vi sử dụng. Chúng ta đã khám phá các loại kiến trúc API chính, vậy nên hãy cùng xem xét phạm vi sử dụng nhé.

API riêng
Đây là những API nội bộ của một doanh nghiệp và chỉ dùng để kết nối các hệ thống cũng như dữ liệu trong doanh nghiệp đó.
API công cộng 
Những API này dành cho công chúng, có thể được sử dụng bởi bất kỳ ai. Những loại API này có thể yêu cầu sự ủy quyền hay chi phí nào đó, hoặc không yêu cầu.
API đối tác 
Những API này chỉ dành cho các nhà phát triển bên ngoài được ủy quyền để hỗ trợ những mối quan hệ hợp tác giữa doanh nghiệp với doanh nghiệp.
API tổng hợp 
Những API này kết hợp hai API khác nhau trở lên để giải quyết những yêu cầu hay hành vi phức tạp của hệ thống. 
Điểm cuối API là gì và vì sao nó lại quan trọng?
Điểm cuối API là điểm tiếp xúc cuối cùng trong hệ thống giao tiếp của API. Những điểm cuối này bao gồm URL máy chủ, dịch vụ và những địa điểm kỹ thuật số cụ thể khác, từ đây thông tin được gửi đi và tiếp nhận giữa các hệ thống. Điểm cuối API rất quan trọng đối với doanh nghiệp vì 2 lý do chính: 

1. Bảo mật
Điểm cuối API khiến hệ thống dễ bị tấn công. Việc giám sát API để ngăn tình trạng lạm dụng là rất quan trọng.
2. Hiệu năng
Điểm cuối API, nhất là những điểm cuối có lưu lượng truy cập cao, có thể gây ra tình trạng nghẽn mạng và ảnh hưởng đến hiệu năng hệ thống.
Làm thế nào để bảo mật API REST?
Mọi API đều phải được bảo mật bằng phương thức xác thực và giám sát đầy đủ. Có 2 cách chính để bảo mật cho API REST:

1. Token xác thực 
Những token này được sử dụng để cho phép người dùng thực hiện lệnh gọi API. Token xác thực kiểm tra xem thông tin nhận dạng người dùng nhập có chính xác không và họ có quyền truy cập lệnh gọi API cụ thể đó không. Ví dụ: khi bạn đăng nhập vào máy chủ email, máy khách email của bạn sẽ dùng token xác thực để bảo mật hoạt động truy cập.
2. Khóa API 
Khóa API xác thực chương trình hoặc ứng dụng thực hiện lệnh gọi API. Các khóa này nhận dạng ứng dụng và đảm bảo khóa có quyền truy cập cần thiết để thực hiện lệnh gọi API cụ thể. Khóa API không bảo mật như token nhưng chúng cho phép giám sát API để thu thập dữ liệu về việc sử dụng. Bạn có thể nhận thấy những chuỗi ký tự và chữ số dài trong URL trình duyệt khi bạn truy cập các trang web khác nhau. Chuỗi này là một khóa API mà trang web sử dụng để thực hiện lệnh gọi API nội bộ.
Làm thế nào để tạo API?
Việc xây dựng một API mà các nhà phát triển khác sẽ tin tưởng và muốn sử dụng đòi hỏi phải thẩm định kỹ lưỡng và nhiều công sức. Sau đây là 5 bước cần thực hiện để thiết kế API chất lượng cao:

1. Lên kế hoạch cho API 
Thông số kỹ thuật của API, ví dụ như OpenAPI, cung cấp bản thiết kế cho API của bạn. Bạn nên dự liệu trước các tình huống sử dụng khác nhau và đảm bảo rằng API tuân thủ các tiêu chuẩn phát triển API hiện hành.
2. Xây dựng API
 Các nhà thiết kế API dựng nguyên mẫu cho API bằng mã nguyên mẫu. Sau khi đã kiểm thử nguyên mẫu, nhà phát triển có thể tùy chỉnh nguyên mẫu này theo thông số kỹ thuật nội bộ.
3. Kiểm thử API  
Kiểm thử API tương tự như kiểm thử phần mềm và phải được thực hiện để ngăn lỗi và khiếm khuyết. Công cụ kiểm thử API có thể được sử dụng để thử nghiệm khả năng chống đỡ các cuộc tấn công mạng của API.
4. Lập tài liệu cho API  
Mặc dù không cần giải thích gì về API, tài liệu về API đóng vai trò là hướng dẫn để nâng cao tính khả dụng. Các API được lập tài liệu đầy đủ, cung cấp các chức năng và trường hợp sử dụng đa dạng thường phổ biến hơn trong kiến trúc hướng đến dịch vụ.
5. Đưa API ra thị trường 
Tương tự như thị trường bán lẻ trực tuyến Amazon, nhà phát triển có thể mua bán các API khác trên sàn giao dịch API. Bạn có thể niêm yết API để kiếm tiền từ nó.
