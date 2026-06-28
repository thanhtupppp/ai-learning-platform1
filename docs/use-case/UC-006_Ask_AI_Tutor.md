# UC-006 – Hỏi AI Tutor

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-006
> - **Trạng thái:** Approved
> - **Người sở hữu:** Frontend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UJ-001](file:///d:/ai-learning-platform/docs/user-journey/UJ-001_First_Learning_Experience.md), [API-003](file:///d:/ai-learning-platform/docs/api/API-003_AI_Tutor.md)

---

# Mục tiêu

Cho phép người học đặt câu hỏi ngay trong bài học và nhận được câu trả lời phù hợp với ngữ cảnh hiện tại.

AI không chỉ trả lời đúng mà còn phải trả lời đúng với:

- Môn học.
- Chương.
- Bài học.
- Knowledge Unit.
- Mức độ hiện tại của người học.

---

# Điều kiện trước

- Người học đang ở trong một bài học.
- AI Gateway hoạt động.
- Có kết nối Internet.

---

# Điều kiện sau

- AI trả lời thành công.
- Lưu lịch sử hội thoại.
- Người học tiếp tục bài học.

---

# Luồng chính

1. Người học nhấn nút **Hỏi AI**.
2. Hệ thống mở giao diện chat.
3. Người học nhập câu hỏi.
4. Backend gửi yêu cầu tới AI Gateway.
5. AI Gateway xây dựng ngữ cảnh học tập.
6. AI tạo câu trả lời.
7. Backend trả kết quả về ứng dụng.
8. Ứng dụng hiển thị câu trả lời.

---

# Ngữ cảnh AI

AI luôn được cung cấp:

- User ID hoặc Anonymous ID.
- Learning Goal.
- Subject.
- Chapter.
- Lesson.
- Knowledge Unit hiện tại.
- Mastery hiện tại.
- Nội dung bài học.
- Lịch sử hội thoại gần nhất.

AI **không cần người dùng nhập lại ngữ cảnh**.

---

# Luồng thay thế

## A1 - AI phản hồi quá thời gian

- Hiển thị thông báo:

  > AI đang bận, vui lòng thử lại.

- Cho phép gửi lại.

---

## A2 - AI Gateway không khả dụng

- Hiển thị thông báo lỗi.
- Ghi log.
- Không làm mất tiến độ học.

---

# Quy tắc nghiệp vụ

- AI chỉ trả lời dựa trên kiến thức đã được hệ thống phê duyệt.
- AI ưu tiên giải thích hơn là đưa đáp án ngay.
- AI có thể đưa ví dụ, hình dung trực quan và câu hỏi gợi mở.
- Toàn bộ hội thoại được lưu để người học xem lại.

---

# AI Context

AI Gateway sẽ kết hợp:

- Prompt hệ thống.
- Hồ sơ người học.
- Ngữ cảnh bài học.
- Knowledge Graph.
- Nội dung Knowledge Unit.
- Lịch sử hội thoại.

Sau đó mới gửi yêu cầu tới mô hình AI.

---

# Dữ liệu lưu trữ

Hệ thống lưu:

- Câu hỏi.
- Câu trả lời.
- Thời gian.
- Lesson ID.
- Knowledge Unit ID.
- Model sử dụng.
- Thời gian phản hồi.

---

# UI liên quan

## Lesson Screen

Nút:

**💬 Hỏi AI**

---

## Chat Screen

Hiển thị:

- Lịch sử hội thoại.
- Ô nhập câu hỏi.
- Nút gửi.
- Trạng thái AI đang trả lời.

---

# Tiêu chí hoàn thành

- Người học gửi được câu hỏi.
- AI trả lời đúng ngữ cảnh.
- Hội thoại được lưu.
- Không ảnh hưởng đến tiến độ bài học.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-005 – Bắt đầu bài học đầu tiên
- UC-007 – Hoàn thành Mini Quiz
