# SPEC-002 – Non-functional Requirements

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPEC-002
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [SPEC-001](file:///d:/ai-learning-platform/docs/spec/SPEC-001_First_Learning_Experience.md)

## Performance

| Hạng mục | Mục tiêu |
| --- | --- |
| API read p95 | ≤ 500 ms, không gồm AI provider |
| API write p95 | ≤ 800 ms, không gồm tác vụ AI dài |
| Quiz grading p95 | ≤ 2 giây |
| Mobile cold start | ≤ 3 giây trên thiết bị mục tiêu |
| AI first response | ≤ 5 giây hoặc hiển thị trạng thái tiến trình |

## Availability và resilience

- Backend MVP target: 99.5% theo tháng.
- AI provider failure không làm mất Learning/Quiz data.
- External call có timeout, bounded retry và circuit breaker khi phù hợp.
- Side effect quan trọng dùng idempotency key.
- Integration event dùng outbox/inbox.

## Security

- TLS cho mọi kết nối ngoài local development.
- Token lưu trong secure storage trên mobile.
- Password hash bằng thuật toán adaptive được cấu hình hiện hành.
- Least privilege cho database và cloud credentials.
- Không log token, password, answer key trước submit hoặc prompt chứa PII.
- Rate limit cho authentication, AI và submit endpoint.
- Dependency và secret scanning trong CI.

## Privacy

- Thu thập dữ liệu tối thiểu.
- Tách product analytics khỏi nội dung hội thoại.
- Có retention policy cho AI message, usage, webhook và audit.
- Account deletion dùng anonymization/erasure theo loại dữ liệu và nghĩa vụ pháp lý.

## Accessibility

- Text scale không phá layout chính.
- Tất cả control có semantic label.
- Contrast tối thiểu theo WCAG AA cho text thông thường.
- Không dùng màu là tín hiệu duy nhất.
- Quiz và onboarding dùng được bằng screen reader.

## Observability

- Correlation ID xuyên client → API → worker → AI Gateway.
- Structured logs, metrics và traces cho critical path.
- Dashboard cho error rate, latency, AI usage/cost, queue lag và DB health.
- Alert phải có owner và runbook.

## Maintainability

- Module boundary được kiểm tra bằng dependency rule/test.
- Public API và event có version.
- Migration chạy tự động trong CI.
- Code mới có unit/integration test theo risk, không theo tỷ lệ coverage hình thức.

## Disaster recovery

- Database backup tự động và restore drill.
- Mục tiêu ban đầu: RPO ≤ 15 phút, RTO ≤ 4 giờ khi production.
- Object storage và secrets có recovery procedure.

## Quality gates

- [ ] Format/lint/type check đạt.
- [ ] Unit và integration test đạt.
- [ ] Migration test đạt.
- [ ] Không có secret trong repository.
- [ ] Contract thay đổi đã cập nhật docs.
- [ ] Critical accessibility checks đạt.

