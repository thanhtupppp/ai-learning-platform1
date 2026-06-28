# Thuật ngữ dự án (Glossary)

> **Thông tin quản trị:**
> - **Mã tài liệu:** GLOS
> - **Trạng thái:** Approved
> - **Người sở hữu:** Product Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [Project Bible](PROJECT_BIBLE.md)

## Mục đích

Tài liệu này định nghĩa các thuật ngữ được sử dụng xuyên suốt dự án AI Learning Platform.

Mục tiêu là đảm bảo tất cả thành viên trong nhóm có cùng cách hiểu về các khái niệm quan trọng.

---

# Knowledge Unit

Đơn vị kiến thức nhỏ nhất mà người học có thể học, đánh giá và theo dõi mức độ thành thạo.

Ví dụ:

- DNA
- Gene
- Phiên mã
- Nguyên phân

Knowledge Unit là nền tảng của toàn bộ hệ thống.

---

# Knowledge Graph

Đồ thị biểu diễn mối quan hệ giữa các Knowledge Unit.

Ví dụ:

```text
DNA
 ├── Gene
 │     └── Phiên mã
 └── Tái bản DNA
```

Knowledge Graph giúp AI xác định:

- Kiến thức tiên quyết.
- Kiến thức liên quan.
- Lộ trình học.

---

# Learning Path

Lộ trình học được cá nhân hóa cho từng người học.

Learning Path được xây dựng dựa trên:

- Mục tiêu học tập.
- Mức độ thành thạo.
- Tiến độ học.
- Knowledge Graph.
- Đề xuất từ AI.

---

# Mastery

Mức độ thành thạo của người học đối với một Knowledge Unit.

Mastery không chỉ dựa trên điểm số mà còn xem xét:

- Kết quả Quiz.
- Lịch sử ôn tập.
- Khả năng ghi nhớ.
- Tần suất trả lời đúng.

---

# Learning State

Trạng thái học tập hiện tại của người học.

Bao gồm:

- Tiến độ.
- Mastery.
- Mục tiêu.
- Lộ trình.
- Lịch ôn tập.

---

# AI Tutor

Trợ lý học tập thông minh.

AI Tutor có nhiệm vụ:

- Giải thích kiến thức.
- Trả lời câu hỏi.
- Đưa ví dụ.
- Phân tích lỗi sai.
- Động viên người học.

AI Tutor luôn sử dụng ngữ cảnh học tập hiện tại để trả lời.

---

# AI Gateway

Lớp trung gian giữa Backend và các mô hình AI.

Chức năng:

- Xây dựng Prompt.
- Chọn mô hình AI.
- Quản lý chi phí.
- Cache.
- Logging.
- Chuẩn hóa phản hồi.

---

# Assessment

Hoạt động đánh giá kết quả học tập.

Bao gồm:

- Quiz.
- Mock Exam.
- Flashcard.
- Tự luận.
- Adaptive Test.

---

# Content Block

Đơn vị nội dung nhỏ trong một bài học.

Ví dụ:

- Đoạn văn.
- Hình ảnh.
- Video.
- Công thức.
- Ví dụ.
- Ghi chú.

---

# Capability

Một khả năng mà hệ thống phải cung cấp.

Ví dụ:

- AI Tutor.
- Learning Path.
- Quiz.
- Search.
- Recommendation.

---

# Domain

Một miền nghiệp vụ trong hệ thống.

Ví dụ:

- Content.
- Assessment.
- Learning.
- AI.
- Knowledge.

Mỗi Domain chịu trách nhiệm cho một nhóm nghiệp vụ riêng biệt.

---

# Module

Một thành phần triển khai của hệ thống.

Mỗi Module thường tương ứng với một Domain và có trách nhiệm quản lý dữ liệu cũng như nghiệp vụ của riêng mình.

---

# User Journey

Mô tả hành trình của người dùng khi thực hiện một mục tiêu cụ thể trong ứng dụng.

User Journey là cơ sở để thiết kế:

- UI/UX.
- API.
- Database.
- AI Flow.

---

# PRD (Product Requirements Document)

Tài liệu mô tả yêu cầu sản phẩm.

PRD trả lời câu hỏi:

> Người dùng cần gì?

---

# ADR (Architecture Decision Record)

Tài liệu ghi lại các quyết định kiến trúc đã được thống nhất.

ADR trả lời câu hỏi:

> Chúng ta chọn giải pháp kỹ thuật nào và vì sao?

---

# SPEC (Technical Specification)

Tài liệu đặc tả kỹ thuật phục vụ triển khai.

SPEC trả lời câu hỏi:

> Hệ thống sẽ được xây dựng như thế nào?

---

# Nguyên tắc

Nếu trong quá trình phát triển xuất hiện một thuật ngữ mới có ảnh hưởng đến nhiều tài liệu hoặc nhiều module, thuật ngữ đó phải được bổ sung vào Glossary trước khi sử dụng rộng rãi.
