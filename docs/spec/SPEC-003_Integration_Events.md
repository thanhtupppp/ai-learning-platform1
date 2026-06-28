# SPEC-003 – Integration Events

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPEC-003
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [SPEC-001](file:///d:/ai-learning-platform/docs/spec/SPEC-001_First_Learning_Experience.md)

## Mục tiêu

Chuẩn hóa event giữa các module trong Modular Monolith và worker.

## Envelope

```json
{
  "eventId": "uuid",
  "eventType": "QuizAttemptGraded",
  "eventVersion": 1,
  "occurredAt": "2026-06-28T10:00:00Z",
  "producer": "quiz",
  "correlationId": "uuid",
  "causationId": "uuid",
  "payload": {}
}
```

## Quy tắc

- `eventId` duy nhất và consumer idempotent theo ID này.
- Event là fact đã xảy ra, tên dùng past tense.
- Payload chỉ chứa dữ liệu consumer cần; không xuất aggregate nội bộ.
- Breaking change tạo event version mới.
- Producer ghi outbox trong cùng transaction với state change.
- Consumer ghi inbox/processed marker cùng transaction với side effect.
- PII và secret không được đưa vào event nếu không bắt buộc.

## Event baseline

| Event | Producer | Consumer chính |
| --- | --- | --- |
| `GuestSessionCreated` | Identity | Analytics |
| `GuestAccountLinked` | Identity | Learning, AI, Quiz |
| `LearningPathCreated` | Learning | Notification, Analytics |
| `KnowledgeUnitCompleted` | Learning | Gamification, Recommendation |
| `QuizAttemptGraded` | Quiz | Learning, Gamification |
| `MasteryUpdated` | Learning | Recommendation, Analytics |
| `AIResponseCompleted` | AI | Analytics/Usage |
| `SubscriptionActivated` | Payment | Entitlement |

## Delivery semantics

Hệ thống giả định at-least-once delivery. Exactly-once không được giả định; idempotency là trách nhiệm của consumer.

## Failure handling

- Retry exponential backoff có giới hạn.
- Sau ngưỡng retry, chuyển dead-letter state và cảnh báo.
- Reprocess phải audit được.
- Poison message không được chặn toàn bộ queue.

