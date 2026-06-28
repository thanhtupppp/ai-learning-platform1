# Sprint 3 (Milestone 3) – Content & Scale

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-003
> - **Trạng thái:** 📋 Planned
> - **Người sở hữu:** Tech Lead / Content Team
> - **Cập nhật cuối:** 2026-06-28
> - **Prerequisite:** Sprint 2 (Retention) được ship
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md)

## Mục tiêu

Mở rộng nội dung lên nhiều môn học production-ready và xây dựng Admin/Authoring workflow cho phép Content Team tự quản lý.

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 3A | 2 tuần | Admin Console + Content Authoring |
| Sprint 3B | 2 tuần | Search + Media Pipeline + Multi-subject |
| Sprint 3 Review | Cuối tuần 4 | Demo + Content audit |

---

## Scope

### Admin Console (`apps/admin`)

- [ ] Dashboard tổng quan (users, active sessions, content stats).
- [ ] Content Authoring:
  - CRUD Subjects, Topics, Knowledge Units.
  - Rich text editor (TipTap hoặc ProseMirror).
  - Upload media (video, image, audio) lên MinIO.
  - Preview trước khi publish.
- [ ] Content Versioning:
  - Mỗi Knowledge Unit có version history.
  - Publish / Unpublish / Archive workflow.
  - Rollback về version trước.
- [ ] User Management (ban, unban, view progress).

### Backend (`services/api`)

- [ ] **Media Pipeline**:
  - Upload API + presigned URL (MinIO/S3).
  - Video transcoding queue (FFmpeg worker).
  - Image resize + WebP conversion.
  - CDN integration cho media delivery.
- [ ] **Full-text Search**:
  - Đánh index subjects, topics, knowledge units.
  - Search API: `GET /api/v1/search?q=...`.
  - Suggest / autocomplete.
- [ ] **Content versioning schema migration**.
- [ ] **Multi-subject support**: Ưtu tiên 5 môn đầu tiên (Toán, Vật lý, Hoá học, Sinh học, Tiếng Anh).

### AI Gateway

- [ ] RAG cho media content (video transcript indexing).
- [ ] Auto-generate lesson summary khi content publish.

### Infrastructure

- [ ] Setup CDN (Cloudflare hoặc AWS CloudFront).
- [ ] Media storage bucket policies.
- [ ] Background job queue (Bull/BullMQ) cho media processing.

---

## Success Metrics

| Metric | Mục tiêu |
|--------|----------|
| Số môn học production-ready | ≥ 5 |
| Số Knowledge Units | ≥ 200 |
| Content publish time | < 5 phút từ draft đến live |
| Search latency | < 200ms |

---

## Definition of Done

- Content Team có thể tự publish bài học không cần dev.
- Media upload và delivery hoạt động ở mọi loại nội dung.
- Search trả về kết quả liên quan cho query tiếng Việt.

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [DB-002 Subject & Content](../database/DB-002_Subject_Content.md)
- [API-006 Content](../api/API-006_Content.md)
