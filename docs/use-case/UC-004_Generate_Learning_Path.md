# UC-004 – AI tạo lộ trình học

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-004
> - **Trạng thái:** Approved
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UJ-001](file:///d:/ai-learning-platform/docs/user-journey/UJ-001_First_Learning_Experience.md), [API-002](file:///d:/ai-learning-platform/docs/api/API-002_Learning.md)

---

# Mục tiêu

Tự động xây dựng lộ trình học cá nhân hóa cho người học dựa trên:

- Mục tiêu học tập.
- Môn học đã chọn.
- Trình độ hiện tại (nếu có).
- Knowledge Graph.
- Quy tắc học tập của hệ thống.

Người dùng không cần tự chọn bài học đầu tiên.

---

# Điều kiện trước

- Người dùng đã chọn mục tiêu học.
- Người dùng đã chọn ít nhất một môn học.
- Anonymous User hoặc User đã được tạo.

---

# Điều kiện sau

- Learning Path được tạo.
- Dashboard hiển thị bài học đầu tiên.
- AI Recommendation sẵn sàng hoạt động.

---

# Luồng chính

1. Người dùng hoàn thành bước chọn môn học.
2. Backend gửi yêu cầu đến AI Gateway.
3. AI Gateway thu thập dữ liệu người dùng.
4. AI phân tích thông tin.
5. AI sinh Learning Path ban đầu.
6. Backend lưu Learning Path.
7. Dashboard hiển thị bài học đầu tiên.

---

# Dữ liệu đầu vào

AI sử dụng:

- Learning Goal.
- Subject.
- Anonymous/User ID.
- Knowledge Graph của môn học.
- Quy tắc sắp xếp bài học.

> Ở lần đầu sử dụng, AI chưa có lịch sử học nên Learning Path sẽ dựa trên cấu trúc chuẩn của môn học.

---

# Dữ liệu đầu ra

Learning Path gồm:

- Môn học.
- Chương.
- Bài học đầu tiên.
- Danh sách Knowledge Unit.
- Độ ưu tiên.
- Gợi ý ôn tập ban đầu.

---

# Luồng thay thế

## A1 - AI Gateway không phản hồi

- Backend sử dụng Learning Path mặc định.
- Người dùng vẫn có thể bắt đầu học.

---

## A2 - Không tìm thấy dữ liệu môn học

- Hiển thị thông báo lỗi.
- Ghi log để theo dõi.
- Không tạo Learning Path.

---

# Quy tắc nghiệp vụ

- Mỗi người dùng có một Learning Path riêng.
- Learning Path có thể thay đổi theo tiến độ học.
- Không tạo lại Learning Path nếu đã tồn tại, trừ khi người dùng thay đổi mục tiêu hoặc môn học.
- AI chỉ đề xuất bài học nằm trong chương trình đã được CMS phê duyệt.

---

# API liên quan

## Tạo Learning Path

```http
POST /v1/learning-path/generate
```

### Request

```json
{
  "userId": "anonymous-user-id"
}
```

### Response

```json
{
  "learningPathId": "lp_001",
  "firstLessonId": "lesson_001",
  "status": "generated"
}
```

---

# Database

## Bảng

- learning_paths
- learning_path_items
- recommendations

---

# AI Impact

AI chịu trách nhiệm:

- Phân tích hồ sơ học tập.
- Chọn bài học đầu tiên.
- Đề xuất thứ tự học.
- Cập nhật Learning Path theo thời gian.

---

# UI liên quan

## Màn hình

**Generating Learning Path**

Hiển thị:

- Biểu tượng AI.
- Thanh tiến trình.
- Thông điệp:

> AI đang xây dựng lộ trình học dành riêng cho bạn...

Sau khi hoàn tất, tự động chuyển đến Dashboard.

---

# Tiêu chí hoàn thành

- Learning Path được tạo thành công.
- Dashboard hiển thị bài học đầu tiên.
- Người dùng không cần thao tác thêm.
- Có cơ chế dự phòng nếu AI không khả dụng.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-003 – Chọn môn học
- UC-005 – Bắt đầu bài học đầu tiên
