# UC-003 – Chọn môn học

## Thông tin

- **Mã:** UC-003
- **Tên:** Chọn môn học
- **Liên quan:** PRD-001, UJ-001
- **Độ ưu tiên:** Cao
- **Tác nhân chính:** Người học

---

# Mục tiêu

Cho phép người học lựa chọn các môn học muốn học để hệ thống AI xây dựng lộ trình học phù hợp.

Thông tin này sẽ được sử dụng trong quá trình:

- Sinh Learning Path.
- Đề xuất bài học.
- Cá nhân hóa AI Tutor.
- Theo dõi tiến độ theo từng môn.

---

# Điều kiện trước

- Người dùng đã hoàn thành bước chọn mục tiêu học.
- Đã có Anonymous User hoặc tài khoản người dùng.
- Hệ thống đã tải danh sách môn học.

---

# Điều kiện sau

- Danh sách môn học được lưu thành công.
- Người dùng được chuyển sang bước AI tạo Learning Path.

---

# Luồng chính

1. Hệ thống hiển thị danh sách môn học.
2. Người dùng chọn một hoặc nhiều môn.
3. Người dùng nhấn **Tiếp tục**.
4. Hệ thống kiểm tra dữ liệu.
5. Hệ thống lưu danh sách môn học.
6. Chuyển sang bước **AI tạo Learning Path**.

---

# Danh sách môn học (MVP)

- Toán
- Ngữ văn
- Tiếng Anh
- Vật lý
- Hóa học
- Sinh học
- Lịch sử
- Địa lý
- Giáo dục Kinh tế và Pháp luật
- Tin học

> Danh sách môn học được quản lý từ CMS và có thể mở rộng trong tương lai.

---

# Luồng thay thế

## A1 - Chưa chọn môn học

- Hiển thị thông báo:

> Vui lòng chọn ít nhất một môn học.

- Không cho phép chuyển bước.

---

## A2 - Lỗi lưu dữ liệu

- Hiển thị thông báo lỗi.
- Cho phép người dùng thử lại.

---

# Quy tắc nghiệp vụ

- Người dùng phải chọn tối thiểu một môn học.
- Có thể chọn nhiều môn học.
- Có thể thay đổi danh sách môn học trong phần Hồ sơ/Cài đặt sau này.
- AI chỉ xây dựng Learning Path cho các môn đã chọn.

---

# API liên quan

## Lưu danh sách môn học

```http
POST /v1/users/subjects
```

### Request

```json
{
  "subjects": ["biology", "mathematics"]
}
```

### Response

```json
{
  "success": true
}
```

---

# Database

## Bảng

- users
- subjects
- user_subjects

---

# AI Impact

Thông tin môn học sẽ được sử dụng để:

- Sinh Learning Path.
- Đề xuất bài học đầu tiên.
- Chọn Knowledge Graph phù hợp.
- Cá nhân hóa AI Tutor.
- Cá nhân hóa Quiz.

---

# UI liên quan

## Màn hình

**Subject Selection**

### Thành phần

- Danh sách môn học.
- Ô tìm kiếm (tương lai).
- Nút Tiếp tục.

---

# Tiêu chí hoàn thành

- Người dùng chọn ít nhất một môn học.
- Dữ liệu được lưu thành công.
- Chuyển sang bước AI tạo Learning Path.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-002 – Chọn mục tiêu học
- UC-004 – AI tạo Learning Path
