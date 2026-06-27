# Kiến trúc hệ thống

## Mục đích

Tài liệu này mô tả kiến trúc tổng thể của AI Learning Platform và là điểm tham chiếu cho toàn bộ quá trình phát triển.

---

# Mục tiêu kiến trúc

AI Learning Platform được xây dựng với các mục tiêu:

- Dễ mở rộng.
- Dễ bảo trì.
- Hỗ trợ nhiều môn học.
- Hỗ trợ AI ngay từ thiết kế.
- Có thể phát triển trong nhiều năm.

---

# Kiến trúc tổng thể

```text
Ứng dụng

        ↓

Backend API

        ↓

Business Modules

        ↓

Database

        ↓

AI Gateway

        ↓

9Router

        ↓

LLM
```

---

# Kiến trúc triển khai

Trong giai đoạn đầu, hệ thống sử dụng **Modular Monolith**.

Mỗi module có ranh giới rõ ràng nhưng được triển khai trong cùng một backend.

Khi cần mở rộng, từng module có thể tách thành Microservice mà không ảnh hưởng lớn đến phần còn lại của hệ thống.

---

# Các module

Hệ thống gồm các module:

- Identity
- Subject
- Content
- Knowledge
- Assessment
- Learning
- AI
- Recommendation
- Analytics
- Notification
- Search
- Media
- System

Mỗi module chịu trách nhiệm cho một miền nghiệp vụ riêng và không truy cập trực tiếp dữ liệu của module khác.

---

# Kiến trúc AI

Ứng dụng không giao tiếp trực tiếp với mô hình AI.

Mọi yêu cầu đều đi qua AI Gateway.

```text
App

↓

Backend

↓

AI Gateway

↓

Model Selector

↓

9Router

↓

LLM
```

Điều này giúp:

- Không phụ thuộc vào một nhà cung cấp AI.
- Dễ thay đổi mô hình.
- Theo dõi chi phí.
- Quản lý log.
- Chuẩn hóa phản hồi.

---

# Quản lý dữ liệu

Hệ thống sử dụng:

- PostgreSQL làm cơ sở dữ liệu chính.
- pgvector phục vụ tìm kiếm ngữ nghĩa.
- Redis cho cache.
- MinIO hoặc Amazon S3 cho lưu trữ tệp.

---

# Cấu trúc mã nguồn

```text
apps/
    mobile/
    admin/
    web/

services/
    api/
    ai-gateway/
    worker/

packages/
    shared/
    design-system/
    sdk/

infrastructure/
```

---

# Nguyên tắc phát triển

Dự án tuân theo các nguyên tắc:

- Documentation First.
- API First.
- Learner First.
- AI First.
- Modular Architecture.

Mọi tính năng mới đều phải đi theo quy trình:

PRD → User Journey → Use Case → API → Database → Code

---

# Tài liệu liên quan

- PROJECT_BIBLE.md
- README.md
- Vision
- ADR
- SPEC
- PRD
