# Sprint 2 (Milestone 2) – Retention

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-002
> - **Trạng thái:** 📋 Planned
> - **Người sở hữu:** Tech Lead / Product Lead
> - **Cập nhật cuối:** 2026-06-28
> - **Prerequisite:** Sprint 1 được ship và exit criteria đạt
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md), [SPRINT-001](SPRINT-001_Plan.md)

## Mục tiêu

Tăng retention: học sinh quay lại học mỗi ngày nhờ Spaced Repetition, Streak, XP và gợi ý cá nhân hóa dựa trên Mastery.

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 2 | 3 tuần | Core retention features |
| Sprint 2 Review | Cuối tuần 3 | Demo + Metrics review |

---

## Scope

### Backend (`services/api`)

- [ ] **Spaced Repetition Engine**
  - Thuật toán SM-2 (SuperMemo) cho review queue.
  - Cập nhật `next_review_at` sau mỗi quiz session.
  - API: `GET /api/v1/review/queue` – danh sách topics cần ôn hôm nay.
- [ ] **Streak System**
  - Tính streak ngày học liên tiếp.
  - Streak freeze (1 lần/tuần cho Premium).
  - Event: `streak.updated`, `streak.broken`.
- [ ] **XP & Level System**
  - XP khi hoàn thành lesson, quiz, streak milestone.
  - Level tăng theo XP threshold.
  - API: `GET /api/v1/gamification/profile`.
- [ ] **Recommendation Engine (rule-based)**
  - Gợi ý topic tiếp theo dựa trên Mastery score thấp nhất.
  - Gợi ý môn học mới dựa trên learning goal.
- [ ] **Learning Analytics**
  - API: `GET /api/v1/analytics/summary` – weekly stats.
  - Ghi `analytics_events` cho mọi hành động học tập.

### AI Gateway

- [ ] Adaptive difficulty: điều chỉnh độ khó quiz dựa trên mastery score.
- [ ] Generate daily motivational message cá nhân hóa.

### Web App (`apps/web`)

- [ ] Màn hình Review Queue (ôn tập theo Spaced Repetition).
- [ ] Streak counter + flame animation trên Dashboard.
- [ ] XP bar + Level badge.
- [ ] Weekly progress chart.
- [ ] Push notification opt-in flow.

### Mobile App (`apps/mobile`)

- [ ] Streak reminder notification (FCM).
- [ ] Review session flow.
- [ ] XP animation khi lên level.

---

## Success Metrics

| Metric | Mục tiêu |
|--------|----------|
| D7 Retention | ≥ 35% |
| D30 Retention | ≥ 20% |
| Average Session/Week | ≥ 4 sessions |
| Streak ≥ 7 ngày (% user) | ≥ 20% |

---

## Dependencies

- Sprint 1 đã có: Guest mode, Auth, Learning Path, Quiz, Mastery score.
- FCM setup cho push notifications.

---

## Definition of Done

- Spaced Repetition queue tính toán đúng theo SM-2.
- Streak tăng khi user hoàn thành ínhh 1 lesson/ngày.
- XP cấp phát đúng, không được double-credit.
- Unit test coverage ≥ 70% cho Streak và Spaced Repetition logic.

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [SPRINT-001](SPRINT-001_Plan.md)
- [DB-005 Gamification](../database/DB-005_Gamification.md)
- [DB-008 Analytics](../database/DB-008_Analytics.md)
