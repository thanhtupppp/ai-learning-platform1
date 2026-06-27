# Product and Engineering Roadmap

## Nguyên tắc

Roadmap mô tả outcome và dependency, không phải cam kết ngày phát hành. Mỗi milestone chỉ bắt đầu khi exit criteria của milestone trước đạt.

## Sprint 0 – Foundation

### Outcome

Repo, tài liệu và contract đủ rõ để bắt đầu code.

### Deliverables

- Vision, Project Bible, Architecture, ADR.
- PRD-001, UJ-001, UC-001→008.
- SPEC, API, Database, AI và UI baseline.
- Documentation traceability và development process.

### Exit criteria

- Không còn khoảng trống contract chặn Flutter/Backend bootstrap.
- Quyết định chưa chốt được ghi rõ, không bị ngầm giả định.

## Sprint 1 – First Learning Experience

### Outcome

Người dùng mới hoàn thành Knowledge Unit đầu tiên, dùng AI Tutor, làm Quiz và giữ tiến độ sau account linking.

### In scope

- Guest Mode.
- Learning Goal và Subject.
- Learning Path ban đầu.
- Dashboard và Knowledge Unit.
- AI Tutor contextual.
- Mini Quiz và Mastery.
- Account linking.

### Out of scope

Gamification, payment, social learning, classroom, advanced recommendation và offline-first.

## Milestone 2 – Retention

- Review queue và spaced repetition.
- Recommendation dựa trên Mastery.
- XP/Level/Streak tối thiểu.
- Learning analytics cho người học.

## Milestone 3 – Content and Scale

- Authoring/admin workflow.
- Content versioning và publishing governance.
- Nhiều môn học production-ready.
- Search và media pipeline.

## Milestone 4 – Monetization

- Plan, subscription, entitlement và payment provider.
- Chỉ bắt đầu sau khi pricing/value proposition được xác thực.

## Milestone 5 – Advanced AI

- RAG production hardening.
- Adaptive assessment.
- Model/prompt experimentation có evaluation gate.
- Proactive AI Coach khi có consent và safety policy.

## Engineering sequence

```text
Flutter bootstrap
  → Backend bootstrap
  → PostgreSQL + migrations
  → Core vertical slice
  → CI/CD and observability
  → Sprint 1 feature delivery
```

Mỗi bước là commit/PR có mục tiêu rõ ràng, test được và không trộn refactor ngoài phạm vi.

