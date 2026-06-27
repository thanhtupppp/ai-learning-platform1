# UC-002 – Chọn mục tiêu học

## Thông tin

- **Mã:** UC-002
- **Tên:** Chọn mục tiêu học
- **Liên quan:** PRD-001, UJ-001
- **Độ ưu tiên:** Cao
- **Tác nhân chính:** Người học

---

# Mục tiêu

Cho phép người dùng xác định mục tiêu học tập để hệ thống AI có cơ sở xây dựng lộ trình học phù hợp.

Mục tiêu học là một trong những dữ liệu đầu tiên được lưu trong hồ sơ học tập của người dùng.

---

# Điều kiện trước

- Người dùng đã khởi động ứng dụng.
- Đã có Anonymous User hoặc đã đăng nhập.
- Người dùng đang ở bước thiết lập ban đầu.

---

# Điều kiện sau

- Mục tiêu học được lưu thành công.
- Người dùng được chuyển sang bước chọn môn học.

---

# Luồng chính

1. Hệ thống hiển thị màn hình **Chọn mục tiêu học**.
2. Người dùng chọn một mục tiêu.
3. Người dùng nhấn **Tiếp tục**.
4. Hệ thống kiểm tra dữ liệu.
5. Hệ thống lưu mục tiêu học.
6. Chuyển sang màn hình **Chọn môn học**.

---

# Các mục tiêu hỗ trợ

- Ôn thi THPT
- Ôn thi Đại học
- Học trên lớp
- Tự học
- Nâng cao kiến thức
- Khác

Danh sách này có thể được cấu hình từ CMS trong tương lai.

---

# Luồng thay thế

### A1 - Người dùng chưa chọn mục tiêu

- Hiển thị thông báo:

  > Vui lòng chọn mục tiêu học tập.

- Không cho phép chuyển bước.

---

### A2 - Lỗi kết nối

Nếu không thể lưu dữ liệu:

- Hiển thị thông báo lỗi.
- Cho phép thử lại.

---

# Quy tắc nghiệp vụ

- Mỗi người dùng chỉ có một mục tiêu học chính tại một thời điểm.
- Người dùng có thể thay đổi mục tiêu trong phần Cài đặt sau này.
- AI sẽ sử dụng mục tiêu học để xây dựng Learning Path và Recommendation.

---

# API liên quan

### Lưu mục tiêu học

```http
POST /v1/users/learning-goal
```

Request

```json
{
  "goal": "high_school_exam"
}
```

Response

```json
{
  "success": true
}
```

---

# Database

Bảng:

- users
- user_learning_profile

Trường được cập nhật:

- learning_goal
- updated_at

---

# AI Impact

Thông tin này sẽ được sử dụng để:

- Sinh Learning Path.
- Chọn độ khó bài học.
- Đề xuất Knowledge Unit.
- Cá nhân hóa AI Tutor.

---

# UI liên quan

Màn hình:

**Goal Selection**

Thành phần:

- Tiêu đề.
- Danh sách mục tiêu.
- Nút Tiếp tục.

---

# Tiêu chí hoàn thành

- Người dùng chọn được mục tiêu học.
- Dữ liệu được lưu thành công.
- Chuyển sang bước chọn môn học.
- Không xảy ra lỗi chặn.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-003 – Chọn môn học
