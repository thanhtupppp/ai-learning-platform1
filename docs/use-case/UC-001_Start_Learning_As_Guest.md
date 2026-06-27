# UC-001 – Bắt đầu học với Guest Mode

## Thông tin

- **Mã:** UC-001
- **Tên:** Bắt đầu học với Guest Mode
- **Liên quan:** PRD-001, UJ-001
- **Độ ưu tiên:** Cao

---

# Mục tiêu

Cho phép người dùng trải nghiệm ứng dụng ngay mà không cần đăng nhập.

Người dùng vẫn có thể:

- Chọn mục tiêu học.
- Chọn môn học.
- Học bài đầu tiên.
- Hỏi AI Tutor.
- Làm Mini Quiz.

Tiến độ sẽ được lưu bằng **Anonymous User**.

---

# Tác nhân

### Chính

- Người học

### Phụ

- Backend
- AI Gateway

---

# Điều kiện trước

- Người dùng chưa đăng nhập.
- Ứng dụng đã khởi động thành công.
- Có kết nối Internet.

---

# Luồng chính

1. Người dùng mở ứng dụng.
2. Chọn **Bắt đầu học**.
3. Hệ thống tạo Anonymous User.
4. Hệ thống lưu Anonymous ID vào thiết bị.
5. Chuyển sang bước chọn mục tiêu học.

---

# Luồng thay thế

### A1

Nếu Anonymous User đã tồn tại.

→ Tiếp tục sử dụng Anonymous ID cũ.

---

### A2

Nếu không có Internet.

→ Hiển thị thông báo lỗi.

---

# Kết quả

- Anonymous User được tạo.
- Có thể lưu tiến độ học.
- Người dùng chưa cần đăng nhập.

---

# Quy tắc nghiệp vụ

- Một thiết bị chỉ có một Anonymous User tại một thời điểm.
- Anonymous User có thể liên kết với tài khoản thật sau này.
- Không mất dữ liệu khi liên kết tài khoản.

---

# API liên quan

- POST /v1/auth/guest

---

# Database

- anonymous_users
- learning_progress

---

# Tiêu chí hoàn thành

- Người dùng có thể bắt đầu học mà không cần đăng nhập.
- Hệ thống tạo Anonymous User thành công.
- Có thể lưu tiến độ học.
