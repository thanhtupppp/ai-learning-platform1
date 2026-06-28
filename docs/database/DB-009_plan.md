# DB-009 – Database Implementation Plan

> **Thông tin quản trị:**
> - **Mã tài liệu:** DB-009
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [DB-001](file:///d:/ai-learning-platform/docs/database/DB-001_Core_ERD.md), [DB-008](file:///d:/ai-learning-platform/docs/database/DB-008_database.md)

---

## 1. Mục tiêu

Chuyển các thiết kế database thành migration, test và quy trình vận hành theo từng giai đoạn nhỏ, có thể review và rollback.

DB-009 là execution plan, không định nghĩa thêm entity nghiệp vụ.

---

## 2. Nguyên tắc triển khai

- Một migration/commit có một mục tiêu rõ ràng.
- Domain nền tảng triển khai trước domain phụ thuộc.
- Schema, application code và event contract được version cùng nhau.
- Không triển khai bảng chưa có use case hoặc owner.
- Không tối ưu sớm bằng partition, denormalization hoặc vector index.
- Mỗi phase phải có exit criteria đo được.

---

## 3. Thứ tự triển khai

```text
Foundation
   │
   ├── Authentication (DB-002)
   │
   ├── Learning (DB-003)
   │      │
   │      ├── AI (DB-004)
   │      └── Quiz (DB-005)
   │             │
   │             └── Gamification (DB-006)
   │
   └── Payment (DB-007, khi Product yêu cầu)

Cross-cutting standards: DB-008
RAG/Vector: DB-010, chỉ khi có use case được duyệt
```

---

## 4. Phase 0 – Tooling và baseline

### Deliverables

- PostgreSQL local bằng Docker Compose.
- Migration tool được chọn theo backend stack.
- Runtime role và migration role tách biệt.
- CI tạo database sạch và chạy toàn bộ migration.
- Script reset/seed chỉ dành cho local/test.
- Quy ước naming theo DB-008.

### Exit criteria

- Một developer mới khởi tạo database bằng một lệnh được tài liệu hóa.
- CI phát hiện migration lỗi hoặc schema drift.
- Secret không nằm trong repository.

---

## 5. Phase 1 – Authentication

Triển khai DB-002 trước vì các domain khác reference `userId`.

### Công việc

- Tạo user identity và authentication tables đã duyệt.
- Constraint unique cho normalized identity.
- Test guest account và account linking.
- Seed role/permission reference data nếu cần.

### Exit criteria

- Đăng ký, đăng nhập và guest linking có integration test.
- Migration rollback/roll-forward được kiểm tra.

---

## 6. Phase 2 – Learning Core

Triển khai DB-003 theo từng aggregate, không tạo toàn bộ schema trong một migration.

Thứ tự đề xuất:

1. Subject và Course.
2. Lesson và KnowledgeUnit.
3. ContentBlock.
4. Enrollment và LearningProgress.
5. KnowledgeProgress và LearningPath.

### Exit criteria

- Có thể tạo và publish nội dung học hợp lệ.
- User bắt đầu và tiếp tục bài học.
- Progress và Mastery invariant được database bảo vệ.

---

## 7. Phase 3 – AI Core

Triển khai phần tối thiểu của DB-004:

- AIConversation.
- AIMessage.
- PromptTemplate và version.
- AIModel.
- AIUsage và TokenUsage.
- Outbox cho integration event.

Chưa triển khai Embedding hoặc Vector trong phase này.

### Exit criteria

- Hội thoại truy xuất được theo User và context học tập.
- Usage/cost có thể audit.
- Retry không tạo message hoặc usage trùng.

---

## 8. Phase 4 – Quiz

Triển khai DB-005 theo hai migration group:

1. Quiz, Question, QuestionOption.
2. QuizAttempt, AttemptAnswer và event outbox.

### Exit criteria

- UC-007 và API-004 chạy end-to-end.
- Submit idempotent và không lộ answer key.
- Attempt cũ tái hiện được bằng snapshot.
- `QuizAttemptGraded` cập nhật Mastery đúng một lần.

---

## 9. Phase 5 – Gamification

Chỉ triển khai sau khi event Learning/Quiz ổn định.

### Thứ tự

1. GamificationProfile và XPTransaction.
2. LevelDefinition.
3. LearningStreak.
4. Achievement khi có requirement cụ thể.

### Exit criteria

- Event retry không trao XP hai lần.
- Profile rebuild được từ XP ledger.
- Streak đúng với timezone của User.

---

## 10. Phase 6 – Payment

DB-007 không nằm trên critical path của First Learning Experience. Chỉ bắt đầu khi pricing và provider đã được duyệt.

### Thứ tự

1. Plan và Subscription.
2. Webhook inbox.
3. Invoice và PaymentTransaction.
4. Entitlement projection.

### Exit criteria

- Webhook signature, retry và out-of-order được test.
- Payment data không chứa PCI-sensitive fields.
- Entitlement không phụ thuộc truy vấn provider theo thời gian thực.

---

## 11. Migration Workflow

Mỗi thay đổi schema đi theo quy trình:

1. Cập nhật DB document/ADR nếu quyết định thay đổi.
2. Tạo migration nhỏ, deterministic.
3. Thêm constraint và index cần thiết.
4. Thêm migration test trên database rỗng.
5. Test upgrade từ schema release trước.
6. Review query plan của truy vấn chính.
7. Deploy staging và chạy smoke test.
8. Backup/checkpoint trước production migration.
9. Deploy production và theo dõi metric.
10. Xác nhận exit criteria và ghi changelog release.

---

## 12. Backfill Plan

Backfill dữ liệu lớn phải:

- Chạy theo batch có cursor/checkpoint.
- Idempotent và resume được.
- Giới hạn transaction size.
- Theo dõi throughput, error và replication lag.
- Không khóa bảng lâu.
- Tách khỏi DDL migration khi thời gian chạy không chắc chắn.

---

## 13. Test Strategy

### Migration test

- Up migration trên database rỗng.
- Upgrade từ version trước.
- Rollback hoặc roll-forward recovery.
- Constraint negative test.

### Integration test

- Transaction boundary.
- Concurrent update và optimistic lock.
- Idempotency cho submit, event và payment.
- Outbox/inbox retry.

### Performance test

- Query theo access pattern chính.
- Dataset có kích thước gần production dự kiến.
- Kiểm tra p95, lock wait và index usage.

---

## 14. Release và Rollback

- Dùng Expand → Migrate → Contract cho breaking change.
- Không rollback application nếu schema mới không tương thích với bản cũ.
- Ưu tiên roll-forward cho migration đã ghi dữ liệu.
- Feature flag dùng để tách deploy schema khỏi bật tính năng.
- Mỗi production migration phải có owner và communication channel.

---

## 15. Definition of Done

Một database change hoàn thành khi:

- [ ] Tài liệu domain và migration nhất quán.
- [ ] Migration chạy qua CI trên PostgreSQL.
- [ ] Constraint và index đã được review.
- [ ] Integration test bao phủ invariant chính.
- [ ] Không có schema drift.
- [ ] Có rollback hoặc roll-forward plan.
- [ ] Metric và alert cần thiết đã có.
- [ ] Không làm lộ secret hoặc PII.
- [ ] Exit criteria của phase được đáp ứng.

---

## 16. Milestone đề xuất

| Milestone | Nội dung | Điều kiện bắt đầu |
| --- | --- | --- |
| M0 | Tooling + Authentication | Backend bootstrap |
| M1 | Learning Core | M0 hoàn thành |
| M2 | AI Core + Quiz | M1 ổn định |
| M3 | Gamification | Event contract ổn định |
| M4 | Payment | Pricing/provider được duyệt |
| M5 | RAG/Vector | Use case và tải thực tế được duyệt |

