# UC-005 – Bắt đầu bài học đầu tiên

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-005
> - **Trạng thái:** Approved
> - **Người sở hữu:** Frontend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UJ-001](file:///d:/ai-learning-platform/docs/user-journey/UJ-001_First_Learning_Experience.md), [API-002](file:///d:/ai-learning-platform/docs/api/API-002_Learning.md)

---

# Mục tiêu

Cho phép người học bắt đầu bài học đầu tiên trong Learning Path mà không cần tìm kiếm hoặc lựa chọn thủ công.

Hệ thống sẽ luôn biết người học nên học gì tiếp theo.

---

# Điều kiện trước

- Learning Path đã được tạo.
- Dashboard đã hiển thị.
- Có bài học đầu tiên trong Learning Path.

---

# Điều kiện sau

- Người học bắt đầu học.
- Tiến độ được ghi nhận.
- AI Tutor sẵn sàng hỗ trợ.

---

# Luồng chính

1. Dashboard hiển thị bài học tiếp theo.
2. Người học nhấn **Bắt đầu học**.
3. Backend tải nội dung bài học.
4. Hệ thống đánh dấu bài học là **Đang học**.
5. Hiển thị Knowledge Unit đầu tiên.

---

# Nội dung bài học

Một bài học bao gồm:

- Giới thiệu bài học.
- Danh sách Knowledge Unit.
- Content Block.
- Ví dụ minh họa.
- Flashcard.
- Mini Quiz.

---

# Luồng thay thế

## A1 - Không tìm thấy bài học

- Hiển thị thông báo.
- Cho phép tải lại.

---

## A2 - Lỗi kết nối

- Hiển thị thông báo.
- Cho phép thử lại.

---

# Quy tắc nghiệp vụ

- Một người học chỉ có một bài học đang học tại một thời điểm.
- Tiến độ được lưu sau mỗi Knowledge Unit.
- Có thể tiếp tục từ vị trí đã học nếu thoát ứng dụng.

---

# API liên quan

## Lấy bài học hiện tại

```http
GET /v1/learning-path/current-lesson
```

### Response

```json
{
  "lessonId": "lesson_001",
  "title": "DNA và cấu trúc phân tử",
  "chapter": "Cơ sở phân tử của sự di truyền",
  "knowledgeUnits": 5,
  "estimatedTime": 20
}
```

## Bắt đầu bài học

```http
POST /v1/lessons/{lessonId}/start
```

### Response

```json
{
  "status": "started"
}
```

---

# Database

## Bảng

- lessons
- lesson_progress
- learning_progress

---

# AI Impact

AI được cung cấp:

- Learning Goal.
- Subject.
- Lesson.
- Knowledge Unit hiện tại.
- Mastery hiện tại.

Điều này giúp AI trả lời đúng ngữ cảnh bài học.

---

# UI liên quan

## Dashboard

Hiển thị:

- Tiếp tục học.
- Thời gian dự kiến.
- Tiến độ.

## Lesson Screen

Hiển thị:

- Tiêu đề bài học.
- Thanh tiến độ.
- Nội dung.
- Nút Hỏi AI.
- Nút Tiếp tục.

---

# Tiêu chí hoàn thành

- Người học mở được bài học.
- Nội dung hiển thị đầy đủ.
- Tiến độ được ghi nhận.
- AI Tutor sẵn sàng hoạt động.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-004 – AI tạo lộ trình học
- UC-006 – Hỏi AI Tutor
