# ADR-001 – Kiến trúc nội dung đa môn

## Trạng thái

**Đã chốt**

---

# Bối cảnh

AI Learning Platform không chỉ phục vụ một môn học mà được thiết kế để hỗ trợ nhiều môn trong tương lai như:

- Sinh học
- Toán
- Vật lý
- Hóa học
- Tiếng Anh
- Lịch sử
- Địa lý
- ...

Nếu thiết kế dữ liệu theo từng môn riêng biệt sẽ dẫn đến:

- Khó mở rộng.
- Trùng lặp dữ liệu.
- Khó bảo trì.
- AI khó tái sử dụng.

---

# Vấn đề

Làm thế nào để một nền tảng có thể:

- Hỗ trợ nhiều môn học.
- Tái sử dụng kiến trúc.
- Không phải sửa hệ thống khi thêm môn mới.

---

# Quyết định

Hệ thống sử dụng **kiến trúc nội dung đa môn (Multi-Subject Content Architecture)**.

Mọi môn học đều sử dụng cùng một mô hình dữ liệu.

```text
Subject
    ↓
Chapter
    ↓
Lesson
    ↓
Knowledge Unit
    ↓
Content Block
```

Knowledge Unit là đơn vị kiến thức nhỏ nhất và là nền tảng của AI cũng như toàn bộ hệ thống học tập.

---

# Lý do

Mô hình này giúp:

- Chuẩn hóa dữ liệu giữa các môn học.
- AI chỉ cần hiểu một cấu trúc duy nhất.
- Dễ mở rộng thêm môn mới.
- Giảm trùng lặp dữ liệu.

---

# Lợi ích

- Hỗ trợ không giới hạn số lượng môn học.
- Tái sử dụng CMS.
- Tái sử dụng AI Tutor.
- Tái sử dụng Quiz Engine.
- Tái sử dụng Learning Path.

---

# Đánh đổi

- Thiết kế ban đầu phức tạp hơn.
- Cần chuẩn hóa cấu trúc nội dung.
- Đòi hỏi đội biên soạn tuân thủ cùng một mô hình dữ liệu.

---

# Phạm vi ảnh hưởng

Ảnh hưởng đến:

- CMS
- Database
- AI
- Learning
- Assessment
- Search

---

# Giải pháp thay thế đã cân nhắc

### Thiết kế riêng cho từng môn

Ưu điểm:

- Dễ triển khai ban đầu.

Nhược điểm:

- Không mở rộng.
- Khó bảo trì.
- AI khó tái sử dụng.

Giải pháp này không được lựa chọn.

---

# Ghi chú

ADR này là nền tảng cho toàn bộ hệ thống nội dung và là cơ sở để xây dựng các ADR tiếp theo.
