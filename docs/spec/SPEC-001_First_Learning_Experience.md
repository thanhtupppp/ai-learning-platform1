# SPEC-001 – First Learning Experience

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPEC-001
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UJ-001](file:///d:/ai-learning-platform/docs/user-journey/UJ-001_First_Learning_Experience.md), [Use Cases](file:///d:/ai-learning-platform/docs/use-case/README.md)

## Mục tiêu kỹ thuật

Triển khai một vertical slice hoàn chỉnh từ Guest onboarding đến lưu tiến độ sau Quiz, không yêu cầu đăng ký trước khi học.

## Thành phần

| Thành phần | Trách nhiệm |
| --- | --- |
| Mobile App | UI, local session, navigation và presentation state |
| Backend API | Authentication, orchestration và business rules |
| Learning Module | Goal, path, content, progress và mastery |
| AI Module/Gateway | Learning Path generation và contextual tutor |
| Quiz Module | Quiz delivery, submit và grading |
| PostgreSQL | Transactional source of truth |
| Worker | Outbox processing và tác vụ AI bất đồng bộ |

## Luồng end-to-end

```text
Create Guest Session
  → Select Goal
  → Select Subject
  → Request Learning Path
  → Poll/receive Learning Path status
  → Load Dashboard
  → Start Knowledge Unit
  → Ask AI Tutor
  → Start and submit Quiz
  → Update Mastery
  → Link Guest to Account
```

## State machine phía client

```text
booting
  ├── unauthenticated → guestOnboarding
  ├── guest → dashboard/onboardingResume
  └── authenticated → dashboard
```

Mỗi bước onboarding phải có trạng thái `idle`, `submitting`, `success`, `recoverableError`. Không điều hướng hai lần khi request bị retry.

## Yêu cầu chức năng

### Guest session

- Tạo session idempotent theo installation ID.
- Credential được lưu bằng secure storage.
- Resume được sau khi app restart.

### Learning Path

- Tạo path là tác vụ bất đồng bộ nếu vượt ngưỡng latency đồng bộ.
- API trả status `PENDING`, `READY`, `FAILED`.
- Fallback path dựa trên curriculum có sẵn khi AI không khả dụng.

### Lesson và Knowledge Unit

- Nội dung có version.
- Progress update idempotent theo activity ID.
- Client không tự tính Mastery.

### AI Tutor

- Request luôn có conversation ID và learning context ID.
- Response lưu model/prompt version, usage và citations khi có RAG.
- Timeout không chặn việc tiếp tục học.

### Quiz

- Attempt chỉ submit một lần.
- Answer key không gửi trước submit.
- Grading tạo `QuizAttemptGraded`; Learning cập nhật Mastery đúng một lần.

### Account linking

- Merge dữ liệu trong transaction/application workflow có audit.
- Retry không tạo duplicate ownership.

## Error handling

- Mọi lỗi API theo API_CONVENTIONS.
- Client phân biệt validation, authentication, conflict, rate limit và temporary failure.
- Tác vụ AI có fallback/retry giới hạn; không retry vô hạn.

## Offline và network loss

Sprint 1 không hỗ trợ học offline đầy đủ. Client phải:

- Cache read-only nội dung vừa tải.
- Giữ draft input cục bộ.
- Không báo thành công trước khi server xác nhận side effect.
- Cho phép retry an toàn nhờ idempotency key.

## Telemetry

Events tối thiểu:

- `guest_session_created`
- `goal_selected`
- `subject_selected`
- `learning_path_ready`
- `knowledge_unit_started`
- `ai_tutor_question_sent`
- `quiz_submitted`
- `first_lesson_completed`
- `account_linked`

Không gửi nội dung hội thoại hoặc PII vào product analytics mặc định.

## Acceptance criteria

- [ ] Luồng chính hoàn thành trên một thiết bị thật.
- [ ] App resume đúng ở mọi bước onboarding.
- [ ] Retry không tạo Guest, Learning Path, Attempt hoặc Progress trùng.
- [ ] AI failure có fallback rõ ràng.
- [ ] Quiz Result và Mastery nhất quán.
- [ ] Guest data còn nguyên sau account linking.
- [ ] Contract, integration và end-to-end test bao phủ luồng chính.

