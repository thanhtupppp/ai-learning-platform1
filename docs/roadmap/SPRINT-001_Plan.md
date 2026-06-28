# Sprint 1 Plan

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-001
> - **Trạng thái:** Draft
> - **Người sở hữu:** Tech Lead
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md), [PRD-001](../prd/PRD-001_First_Learning_Experience.md)

## Mục tiêu Sprint 1

Xây dựng **First Learning Experience** – luồng cốt lõi cho phép learner trải nghiệm đầy đủ từ khi mở app đến khi hoàn thành bài học đầu tiên mà không cần đăng ký tài khoản.

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 1 | 2 tuần (Tuần 1-2) | Core backend + Auth + Learning Path |
| Sprint 1 Review | Cuối tuần 2 | Demo + Retrospective |

---

## Scope Sprint 1

### Backend API (`services/api`)

- [ ] Setup NestJS project với Modular Monolith structure
- [ ] Setup Prisma ORM + PostgreSQL migration
- [ ] **Module: Identity** – Guest session creation, JWT auth
- [ ] **Module: Subject** – CRUD subjects, topics
- [ ] **Module: Learning** – Generate learning path (rule-based, AI ở Sprint 2)
- [ ] **Module: Content** – Serve lesson content
- [ ] **Module: Assessment** – Mini quiz (only multiple choice)
- [ ] API Endpoints: `API-001`, `API-002` (partial)

### AI Gateway (`services/ai-gateway`)

- [ ] Setup Python FastAPI project
- [ ] Implement `/generate-path` endpoint (gọi LLM)
- [ ] Implement `/ask-tutor` endpoint với RAG basic
- [ ] Model: Gemini Flash (tiết kiệm chi phí)

### Web App (`apps/web`)

- [ ] Setup React + Vite + TailwindCSS
- [ ] Màn hình: Onboarding → Chọn mục tiêu → Chọn môn học
- [ ] Màn hình: Learning Path preview
- [ ] Màn hình: Lesson viewer
- [ ] Màn hình: Mini quiz

### Shared (`packages/shared`)

- [ ] DTO types dùng chung
- [ ] Zod validation schemas
- [ ] API client (axios wrapper)

---

## Definition of Done (DoD)

Một task được coi là **Done** khi:

1. Code được review và approved bởi ít nhất 1 người.
2. Unit tests đã viết và pass (coverage ≥ 70%).
3. Không có TypeScript errors.
4. API endpoint đã test bằng Postman/Insomnia và kết quả khớp API Contract.
5. PR merge vào `develop` branch.

---

## Out of Scope (Sprint 1)

- Payment / Subscription
- Gamification (points, badges)
- Notification
- Admin Console
- Mobile App (Flutter)
- Advanced RAG (chunking, re-ranking)
- Social features

---

## Rủi ro và Mitigation

| Rủi ro | Xác suất | Mitigation |
|--------|----------|------------|
| AI Gateway latency cao | Medium | Implement timeout + fallback rule-based path |
| LLM cost vượt budget | Low | Token limit per call, cache responses |
| Schema thay đổi giữa sprint | Medium | Freeze DB schema sau ngày 3 |

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [PRD-001 First Learning Experience](../prd/PRD-001_First_Learning_Experience.md)
- [Architecture](../Architecture.md)
- [SPEC-004 Environment Setup](../spec/SPEC-004_Environment_Setup.md)
