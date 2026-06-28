# DB-008 – Database Standards and Operations

> **Thông tin quản trị:**
> - **Mã tài liệu:** DB-008
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [DB-001](file:///d:/ai-learning-platform/docs/database/DB-001_Core_ERD.md), [DB-009](file:///d:/ai-learning-platform/docs/database/DB-009_plan.md)

---

## 1. Mục tiêu

Định nghĩa các tiêu chuẩn dùng chung để schema của các domain nhất quán, an toàn, có thể migration, quan sát và khôi phục.

DB-008 không sở hữu entity nghiệp vụ.

## 2. Công nghệ mặc định

- PostgreSQL là transactional database chính.
- Redis chỉ dùng cho cache, distributed lock có kiểm soát và dữ liệu tạm thời.
- Object storage dùng cho media; database chỉ lưu metadata và URL/key.
- Vector storage thuộc DB-010 RAG, không trộn vào bảng nghiệp vụ.

Việc chọn managed service không làm thay đổi logical schema.

---

## 3. Naming Convention

| Thành phần | Quy ước | Ví dụ |
| --- | --- | --- |
| Table | `snake_case`, số nhiều | `quiz_attempts` |
| Column | `snake_case` | `created_at` |
| Primary key | `id` | `id UUID` |
| Foreign key | `<entity>_id` | `quiz_id` |
| Unique constraint | `uq_<table>_<columns>` | `uq_users_email` |
| Index | `idx_<table>_<columns>` | `idx_attempts_user_created` |
| Check | `ck_<table>_<rule>` | `ck_quiz_score_range` |
| Foreign key | `fk_<table>_<target>` | `fk_questions_quiz` |

Tên vật lý trong PostgreSQL dùng snake_case dù application model dùng camelCase.

---

## 4. Kiểu dữ liệu chuẩn

- ID nghiệp vụ: `UUID`.
- Timestamp: `TIMESTAMPTZ`, lưu UTC.
- Ngày theo lịch: `DATE`.
- Tiền: `BIGINT` minor unit cùng `CHAR(3)` currency.
- Điểm phần trăm: `DECIMAL`, không dùng float.
- Enum có khả năng thay đổi: `VARCHAR` + check constraint hoặc lookup table.
- Metadata linh hoạt: `JSONB`, chỉ dùng khi cấu trúc không phải quan hệ cốt lõi.
- Vector: không đặt trong entity nghiệp vụ.

Mỗi bảng mutable có `created_at` và `updated_at`. Aggregate cần concurrent update có `version`.

---

## 5. Primary Key và Foreign Key

- UUID được sinh tại application hoặc database bằng chuẩn thống nhất.
- FK nội domain được enforce vật lý.
- Reference liên domain có thể dùng FK trong Modular Monolith, nhưng ownership migration thuộc domain nguồn.
- Không dùng cascade delete cho dữ liệu lịch sử, thanh toán, attempt hoặc ledger.
- Cascade chỉ dùng cho child chưa publish hoặc dữ liệu cấu hình an toàn.

---

## 6. Delete Policy

- Ưu tiên trạng thái `ARCHIVED`, `RETIRED`, `REVOKED` thay vì soft-delete chung cho mọi bảng.
- Dữ liệu nháp không có reference có thể hard-delete.
- Ledger, payment, audit và learning result không được hard-delete.
- Yêu cầu xóa tài khoản thực hiện anonymization theo policy thay vì phá vỡ lịch sử nghiệp vụ.

---

## 7. Migration Standard

Mỗi migration phải:

- Có mã duy nhất, thứ tự rõ ràng và được lưu trong Git.
- Chỉ có một mục tiêu nghiệp vụ.
- Chạy được trên database rỗng và database có dữ liệu mẫu.
- Có kế hoạch rollback hoặc roll-forward.
- Không phụ thuộc thao tác thủ công không được ghi lại.
- Được kiểm tra trong CI trước merge.

Quy trình production ưu tiên Expand → Migrate → Contract:

1. Thêm schema tương thích ngược.
2. Deploy application đọc/ghi cả cấu trúc cần thiết.
3. Backfill theo batch có checkpoint.
4. Chuyển hoàn toàn sang schema mới.
5. Xóa cấu trúc cũ ở release sau.

Không rename/drop column trực tiếp trong cùng release đang có application cũ.

---

## 8. Index Standard

- Index phải xuất phát từ truy vấn thực tế.
- FK thường xuyên join cần index.
- Composite index theo thứ tự filter/sort phổ biến.
- Không index mọi column hoặc JSONB mặc định.
- Dùng partial index cho tập active khi có lợi.
- Kiểm tra `EXPLAIN (ANALYZE, BUFFERS)` trước tối ưu production.
- Theo dõi unused và duplicate index.

---

## 9. Transaction và Concurrency

- Transaction boundary theo aggregate.
- Dùng optimistic concurrency qua `version` cho cập nhật cạnh tranh.
- Dùng row lock cho thao tác tài chính hoặc submit chỉ được xảy ra một lần.
- API retry phải dùng idempotency key khi tạo side effect quan trọng.
- Không giữ transaction database trong khi gọi external API.
- Integration event được ghi bằng Outbox Pattern trong cùng transaction.

---

## 10. Security

- Application dùng account riêng, least privilege.
- Migration account tách khỏi runtime account.
- TLS cho kết nối database.
- Secret lưu trong secret manager, không commit vào Git.
- PII nhạy cảm được mã hóa hoặc token hóa theo threat model.
- Query luôn parameterized.
- Production access có audit và thời hạn.
- Không dùng production dump trực tiếp ở development.

---

## 11. Backup và Disaster Recovery

Baseline đề xuất:

- Automated daily backup.
- Point-in-time recovery khi môi trường production hỗ trợ.
- Backup mã hóa và tách quyền truy cập.
- Restore drill định kỳ; backup chưa restore thử không được xem là hợp lệ.
- RPO và RTO phải được xác nhận trước production launch.

Mục tiêu ban đầu đề xuất:

- RPO ≤ 15 phút.
- RTO ≤ 4 giờ.

Các giá trị này là mục tiêu kỹ thuật, cần product/business phê duyệt.

---

## 12. Observability

Theo dõi tối thiểu:

- Connection usage và pool saturation.
- Query latency p50/p95/p99.
- Slow query và lock wait.
- Deadlock, transaction rollback.
- Replication lag.
- Database size và table/index growth.
- Backup/restore status.
- Migration duration và failure.

Log không được chứa password, token, answer key chưa công bố hoặc PII không cần thiết.

---

## 13. Environment

- Local, test, staging và production dùng database tách biệt.
- Schema production chỉ thay đổi qua migration pipeline.
- Seed data tách thành reference data và demo data.
- Integration test chạy trên PostgreSQL thật hoặc container tương thích, không thay bằng database có semantics khác.

---

## 14. Review Checklist

- [ ] Tên bảng, cột và constraint đúng quy ước.
- [ ] Ownership domain rõ ràng.
- [ ] Kiểu dữ liệu không gây mất chính xác.
- [ ] Constraint bảo vệ invariant quan trọng.
- [ ] Index gắn với truy vấn cụ thể.
- [ ] Migration tương thích ngược.
- [ ] Có rollback/roll-forward và backfill plan.
- [ ] Không lưu secret hoặc dữ liệu nhạy cảm không cần thiết.
- [ ] Backup, restore và monitoring được cập nhật khi cần.

