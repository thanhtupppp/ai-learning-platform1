# Sprint 0 – Foundation

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-000
> - **Trạng thái:** ✅ Completed
> - **Người sở hữu:** Tech Lead / Product Lead
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md)

## Mục tiêu

Xây dựng nền tảng tài liệu và contract đủ rõ để bắt đầu code. Không có line code sản phẩm nào được viết trong sprint này.

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 0 | Tuần 1 | Vision + Architecture + ADR |
| Sprint 0 | Tuần 2 | PRD + Use Case + API Contract |
| Sprint 0 | Tuần 3 | Database schema + AI design + UI baseline |
| Sprint 0 | Tuần 4 | Review toàn bộ, chốt gap, chuẩn bị Sprint 1 |

---

## Deliverables đã hoàn thành

### Vision & Architecture
- [x] `docs/VISION.md` – Tầm nhìn sản phẩm
- [x] `docs/Architecture.md` – Kiến trúc hệ thống
- [x] `docs/PROJECT_BIBLE.md` – Nguyên tắc nền tảng

### ADR (Architecture Decision Records)
- [x] ADR-001 – Kiến trúc nội dung đa môn
- [x] ADR-002 – Modular Monolith
- [x] ADR-003 – AI Gateway
- [x] ADR-004 – Guest-first Authentication
- [x] ADR-005 – Event-driven Communication
- [x] ADR-006 – Backend Stack (NestJS)
- [x] ADR-007 – Frontend Stack (React + Vite)
- [x] ADR-008 – Mobile Framework (Flutter)

### Product Requirements
- [x] `docs/prd/PRD-001_First_Learning_Experience.md`
- [x] `docs/prd/PRD-002_Account_and_Gamification.md`
- [x] `docs/uj/UJ-001_New_Learner_Journey.md`

### Use Cases (UC-001 – UC-012)
- [x] UC-001 – Chọn mục tiêu học tập
- [x] UC-002 – Tạo Learning Path
- [x] UC-003 – Học Knowledge Unit
- [x] UC-004 – Hỏi AI Tutor
- [x] UC-005 – Làm Mini Quiz
- [x] UC-006 – Theo dõi tiến độ
- [x] UC-007 – Guest Session Management
- [x] UC-008 – Link Guest Account
- [x] UC-009 – Đăng ký tài khoản
- [x] UC-010 – Đăng nhập
- [x] UC-011 – Xem Progress Dashboard
- [x] UC-012 – Mua gói Premium

### API Contracts (API-001 – API-008)
- [x] API-001 – Authentication
- [x] API-002 – Learning
- [x] API-003 – AI Tutor
- [x] API-004 – Assessment
- [x] API-005 – User Profile
- [x] API-006 – Content
- [x] API-007 – Payment
- [x] API-008 – Notification

### Database Schema (DB-001 – DB-008)
- [x] DB-001 – Identity
- [x] DB-002 – Subject & Content
- [x] DB-003 – Learning & Assessment
- [x] DB-004 – AI
- [x] DB-005 – Gamification
- [x] DB-006 – Notification
- [x] DB-007 – Payment
- [x] DB-008 – Analytics

### AI Design
- [x] AI-001 – AI Gateway
- [x] AI-002 – RAG Pipeline
- [x] AI-003 – Evaluation & Safety
- [x] AI-004 – Prompt Templates
- [x] AI-005 – Cost Management

### Spec & Process
- [x] SPEC-001 – Functional Requirements
- [x] SPEC-002 – Non-Functional Requirements
- [x] SPEC-003 – Integration Events
- [x] SPEC-004 – Environment Setup
- [x] SPEC-005 – Testing Strategy
- [x] `docs/Development_Process.md`

---

## Exit Criteria (đã đạt)

- [x] Không còn khoảng trống contract chặn Flutter/Backend bootstrap.
- [x] Mọi quyết định kỹ thuật được ghi lại trong ADR.
- [x] API contract được xem xét bởi cả backend và frontend lead.
- [x] Database schema phản ánh đầy đủ use cases đã document.

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [SPRINT-001 Plan](SPRINT-001_Plan.md)
