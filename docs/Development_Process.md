# Quy trình phát triển dự án

## Mục đích

Tài liệu này mô tả quy trình phát triển chính thức của AI Learning Platform.

Mục tiêu là đảm bảo tất cả thành viên trong dự án làm việc theo cùng một quy trình và cùng một tiêu chuẩn.

---

# Nguyên tắc

Dự án áp dụng các nguyên tắc:

- Documentation First
- API First
- Learner First
- AI First

Không bắt đầu lập trình khi chưa xác định rõ yêu cầu và thiết kế.

---

# Quy trình phát triển

Mỗi tính năng phải trải qua các bước sau:

```text
Ý tưởng
    ↓
PRD
    ↓
User Journey
    ↓
Use Case
    ↓
API Contract
    ↓
Database Design
    ↓
UI/UX
    ↓
Implementation
    ↓
Testing
    ↓
Release
```

---

# Quy tắc

- Không viết code khi chưa có PRD.
- Không thiết kế Database khi chưa có API Contract.
- Không triển khai UI khi chưa có User Journey.
- Mọi thay đổi kiến trúc phải được ghi nhận bằng ADR.

---

# Sprint

Mỗi Sprint cần tạo ra:

- Chức năng có thể chạy.
- Có thể kiểm thử.
- Có thể demo.
- Có tài liệu cập nhật.

---

# Git

Mỗi commit chỉ nên giải quyết một mục tiêu rõ ràng.

Ví dụ:

- docs:
- feat:
- fix:
- refactor:
- test:
- ci:
- chore:

---

# Review

Một tính năng chỉ được xem là hoàn thành khi:

- Tài liệu hoàn chỉnh.
- Code được review.
- Test đạt.
- Có thể triển khai.

---

# Mục tiêu

Xây dựng một nền tảng học tập có khả năng mở rộng, dễ bảo trì và có thể phát triển trong nhiều năm.
