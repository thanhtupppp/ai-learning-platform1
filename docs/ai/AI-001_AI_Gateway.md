# AI-001 – AI Gateway

> **Thông tin quản trị:**
> - **Mã tài liệu:** AI-001
> - **Trạng thái:** Approved
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [ADR-003](file:///d:/ai-learning-platform/docs/adr/ADR-003_AI_Gateway.md), [API-003](file:///d:/ai-learning-platform/docs/api/API-003_AI_Tutor.md)

## Mục tiêu

Cung cấp một cổng duy nhất cho mọi tác vụ AI, độc lập provider và có quan sát chi phí, chất lượng, độ trễ.

## Capability

- `learning_path.generate`
- `tutor.answer`
- `content.explain`
- `quiz.explain_result`
- `summary.generate`

Business module gọi capability, không chọn provider/model trực tiếp.

## Request nội bộ

```json
{
  "requestId": "uuid",
  "capability": "tutor.answer",
  "userId": "uuid",
  "conversationId": "uuid",
  "context": {
    "subjectId": "uuid",
    "lessonId": "uuid",
    "knowledgeUnitId": "uuid"
  },
  "input": {
    "message": "Vì sao DNA có cấu trúc xoắn kép?"
  },
  "options": {
    "language": "vi",
    "stream": false
  }
}
```

## Pipeline

```text
Validate
  → Authorize and redact
  → Resolve prompt version
  → Retrieve context (nếu capability yêu cầu)
  → Select model
  → Execute with timeout
  → Validate/safety check
  → Persist usage and provenance
  → Return normalized response
```

## Model policy

Model selection dựa trên capability, quality tier, latency budget, context size, availability và cost ceiling. Fallback chỉ dùng model đã được evaluation cho cùng capability.

## Prompt management

- Prompt có stable code và immutable version.
- Request lưu prompt version và model version.
- Thay prompt production cần evaluation và rollout có kiểm soát.
- Không nhúng business secret vào prompt.

## Reliability

- Timeout theo capability.
- Retry tối đa cho lỗi transient và chỉ khi an toàn.
- Circuit breaker theo provider/model.
- Learning Path có deterministic fallback.
- AI Tutor failure không chặn lesson hoặc quiz.

## Observability

Theo dõi request count, latency, error, token, estimated cost, fallback rate, safety rejection và evaluation score. Nội dung prompt/response chỉ log theo policy có redaction và retention.

## Data ownership

- AI Conversation/Message: DB-004.
- Embedding/Retrieval: DB-010.
- Learning context: DB-003.
- Gateway không cập nhật trực tiếp Mastery hoặc Progress.

