# UC-008 – Liên kết tài khoản Guest

## Thông tin

- **Mã:** UC-008
- **Tên:** Liên kết tài khoản Guest
- **Liên quan:** PRD-001, UJ-001
- **Độ ưu tiên:** Cao
- **Tác nhân chính:** Người học

---

# Mục tiêu

Cho phép người học chuyển từ chế độ Guest sang tài khoản chính thức mà không làm mất toàn bộ dữ liệu đã học.

Dữ liệu cần được giữ lại gồm:

- Learning Path
- Tiến độ học
- Mastery Score
- Kết quả Quiz
- Lịch sử AI Tutor
- Cài đặt học tập

---

# Điều kiện trước

- Người dùng đang sử dụng Guest Mode.
- Đã hoàn thành ít nhất một bài học hoặc có dữ liệu học tập.
- Có kết nối Internet.

---

# Điều kiện sau

- Guest Account được liên kết với tài khoản chính thức.
- Toàn bộ dữ liệu học tập được giữ nguyên.
- Người dùng tiếp tục học mà không bị gián đoạn.

---

# Luồng chính

1. Hệ thống hiển thị lời mời đăng nhập sau khi người dùng hoàn thành bài học đầu tiên.
2. Người dùng chọn **Đăng nhập** hoặc **Đăng ký**.
3. Người dùng xác thực tài khoản.
4. Backend kiểm tra Anonymous User.
5. Hệ thống liên kết dữ liệu Guest với tài khoản mới.
6. Xóa phiên Guest.
7. Người dùng tiếp tục sử dụng tài khoản chính.

---

# Luồng thay thế

## A1 - Người dùng bỏ qua

- Tiếp tục sử dụng Guest Mode.
- Hiển thị nhắc lại sau.

---

## A2 - Tài khoản đã có dữ liệu

Nếu tài khoản đã tồn tại dữ liệu học tập:

- Hiển thị lựa chọn:
  - Giữ dữ liệu hiện có.
  - Gộp dữ liệu (nếu hỗ trợ trong tương lai).

Trong MVP, ưu tiên giữ dữ liệu của tài khoản chính và bỏ dữ liệu Guest nếu người dùng xác nhận.

---

## A3 - Lỗi liên kết

- Không xóa dữ liệu Guest.
- Hiển thị thông báo lỗi.
- Cho phép thử lại.

---

# Quy tắc nghiệp vụ

- Một Anonymous User chỉ được liên kết một lần.
- Sau khi liên kết thành công, Anonymous User không còn được sử dụng.
- Quá trình liên kết phải đảm bảo không mất dữ liệu.
- Việc liên kết phải thực hiện theo cơ chế giao dịch (transaction) để đảm bảo toàn vẹn dữ liệu.

---

# Dữ liệu được chuyển

- Learning Profile
- Learning Path
- Lesson Progress
- Quiz Result
- Mastery
- AI Conversation
- Learning Settings

---

# UI liên quan

## Màn hình mời đăng nhập

Hiển thị sau khi người dùng hoàn thành bài học đầu tiên.

Thông điệp:

> Bạn đã hoàn thành bài học đầu tiên! Đăng nhập để lưu tiến độ và tiếp tục học trên mọi thiết bị.

Nút:

- Đăng nhập
- Đăng ký
- Để sau

---

# Tiêu chí hoàn thành

- Liên kết tài khoản thành công.
- Không mất dữ liệu học tập.
- Người dùng tiếp tục học bình thường.
- Hệ thống chuyển hoàn toàn sang tài khoản chính thức.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-001 – Bắt đầu học với Guest Mode
- UC-007 – Hoàn thành Mini Quiz
