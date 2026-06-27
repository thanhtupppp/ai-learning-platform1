# PROJECT BIBLE

## Vision

Build an AI Learning OS that helps learners understand deeply, remember longer, and achieve learning goals with personalized guidance.

## Mission

Create an AI-first learning platform that provides structured content, personalized learning paths, contextual tutoring, continuous assessment, and measurable mastery.

## Target Users

- Học sinh THPT, ưu tiên người học trên thiết bị di động.
- Sinh viên và người tự học cần lộ trình rõ ràng.
- Người học muốn kết hợp nội dung, AI Tutor và đánh giá trong một trải nghiệm liên tục.

## Product Principles

- Learner First.
- AI assists learning; it does not replace verified learning content.
- Knowledge Unit Centric.
- Guided Learning before open-ended exploration.
- Guest First, account later.
- Privacy and safety by design.
- Long-term maintainability over premature distribution.

## Architecture Principles

- Modular Monolith cho backend giai đoạn đầu.
- API-first contract giữa client và backend.
- AI Gateway tách ứng dụng khỏi model provider.
- PostgreSQL là nguồn dữ liệu giao dịch chính.
- Embedding và Vector Store thuộc RAG domain riêng.
- Domain sở hữu dữ liệu và invariant của chính mình.

## Sprint 1 Outcome

Người dùng mới có thể trong một luồng liên tục:

1. Bắt đầu bằng Guest Mode.
2. Chọn mục tiêu và môn học.
3. Nhận Learning Path ban đầu.
4. Học Knowledge Unit đầu tiên.
5. Hỏi AI Tutor trong đúng ngữ cảnh.
6. Hoàn thành Mini Quiz và thấy Mastery thay đổi.
7. Liên kết tài khoản để giữ tiến độ.

## Source of Truth

- Product scope: `docs/prd/`.
- Architecture decisions: `docs/adr/`.
- Implementation design: `docs/spec/`.
- Contracts: `docs/api/`.
- Data ownership: `docs/database/`.
- Shared terminology: `docs/Glossary.md`.

## Current Milestone

Sprint 0 – Documentation baseline trước khi bootstrap Flutter và Backend.
