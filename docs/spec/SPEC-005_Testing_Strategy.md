# SPEC-005: Testing Strategy

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPEC-005
> - **Trạng thái:** Draft
> - **Người sở hữu:** Backend Team / QA
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [Architecture](../Architecture.md), [Development Process](../Development_Process.md)

## Mục đích

Định nghĩa chiến lược kiểm thử cho toàn bộ dự án theo từng layer.

---

## Testing Pyramid

```
          /\
         /E2E\
        /------\
       /  Integ. \
      /------------\
     /   Unit Tests  \
    /------------------\
```

- **Unit Tests (70%)**: Nhanh, độc lập, test logic thuần tuý.
- **Integration Tests (20%)**: Test tương tác giữa các module, database.
- **E2E Tests (10%)**: Test luồng người dùng hoàn chỉnh.

---

## Backend API (NestJS)

### Unit Tests

- **Tool**: Jest + @nestjs/testing
- **Mục tiêu coverage**: ≥ 80% cho services, use cases.
- **Conventions**:
  - File: `*.spec.ts` cạnh file source.
  - Mock tất cả dependencies (repositories, external services).
  - Dùng `describe` → `it` structure.

```typescript
// learning.service.spec.ts
describe('LearningService', () => {
  it('should generate learning path when goal is provided', async () => {
    // arrange
    const mockGoal = { subject: 'math', level: 'beginner' };
    // act
    const result = await service.generatePath(mockGoal);
    // assert
    expect(result.path).toHaveLength(greaterThan(0));
  });
});
```

### Integration Tests

- **Tool**: Jest + Supertest + test database (PostgreSQL container)
- Test API endpoints end-to-end với real database.
- Dùng `beforeAll` / `afterAll` để setup/teardown database.

### Test Database

```bash
# Chạy test database riêng biệt
docker run -d --name ai-learning-test-db \
  -e POSTGRES_DB=ai_learning_test \
  -e POSTGRES_PASSWORD=test123 \
  -p 5433:5432 postgres:16
```

---

## AI Gateway

- **Mock LLM responses** trong unit tests — không gọi thật vào OpenAI/Gemini.
- **Contract tests**: Verify AI response schema khớp với interface.
- **Golden tests**: Lưu snapshot prompt + response để phát hiện regression.

```python
# test_ai_gateway.py
def test_tutor_response_schema():
    response = ai_gateway.ask_tutor(question="What is photosynthesis?")
    assert "answer" in response
    assert "sources" in response
    assert len(response["answer"]) > 0
```

---

## Frontend (React / Flutter)

### Web (React/Vite)

- **Tool**: Vitest + React Testing Library
- Test components theo behavior, không theo implementation.
- `*.test.tsx` cạnh component.

### Mobile (Flutter)

- **Tool**: flutter_test (built-in)
- Unit test business logic (BLoC/Cubit).
- Widget tests cho critical UI flows.

---

## E2E Tests

- **Tool**: Playwright (Web), Maestro (Mobile)
- Chỉ test happy path của critical user journeys:
  1. Guest → chọn mục tiêu → hoàn thành bài học đầu tiên.
  2. Đăng ký tài khoản → liên kết tiến độ guest.
  3. Hỏi AI Tutor → nhận câu trả lời.
  4. Hoàn thành quiz → nhận feedback.

---

## CI/CD Integration

```yaml
# .github/workflows/test.yml
jobs:
  test:
    steps:
      - run: pnpm test:unit        # Unit tests tất cả packages
      - run: pnpm test:integration  # Integration tests với test DB
      - run: pnpm test:coverage     # Coverage report
```

**Coverage gates:**
- PR blocked nếu unit test coverage < 70%.
- E2E chạy chỉ trên nhánh `main` và `develop`.

---

## Tài liệu liên quan

- [Development Process](../Development_Process.md)
- [Architecture](../Architecture.md)
- [SPEC-002 Non-Functional Requirements](SPEC-002_Non_Functional_Requirements.md)
