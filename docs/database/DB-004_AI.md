# DB-004 – AI Domain

> **Thông tin quản trị:**
> - **Mã tài liệu:** DB-004
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [DB-001](file:///d:/ai-learning-platform/docs/database/DB-001_Core_ERD.md), [API-003](file:///d:/ai-learning-platform/docs/api/API-003_AI_Tutor.md), [AI-001](file:///d:/ai-learning-platform/docs/ai/AI-001_AI_Gateway.md)

---

# Mục tiêu

Thiết kế mô hình dữ liệu cho AI Domain.

AI Domain chịu trách nhiệm:

- Quản lý hội thoại AI.
- Lưu lịch sử Chat.
- Quản lý Prompt.
- Theo dõi Token Usage.
- Theo dõi AI Usage.
- Quản lý AI Model.
- Hỗ trợ Recommendation Engine.
- Hỗ trợ AI Analytics.

---

# Phạm vi

AI Domain bao gồm các Entity:

- AIConversation
- AIMessage
- PromptTemplate
- AIModel
- AIUsage
- TokenUsage

---

# Domain Overview

```text
User
    │
    ▼
AIConversation
    │
    ▼
AIMessage

AIConversation
        │
        ├── Lesson
        ├── KnowledgeUnit
        ├── Subject
        └── Course

AIMessage
        │
        ▼
AIUsage

AIUsage
        │
        ▼
TokenUsage

PromptTemplate

AIModel
```

---

# AI Conversation Flow

```text
User

↓

AI Conversation

↓

User Message

↓

Prompt Builder

↓

AI Model

↓

AI Response

↓

Token Usage

↓

Analytics
```

---

# Relationship Summary

| Parent         | Child          | Cardinality |
| -------------- | -------------- | ----------- |
| User           | AIConversation | 1:N         |
| AIConversation | AIMessage      | 1:N         |
| AIModel        | AIUsage        | 1:N         |
| AIUsage        | TokenUsage     | 1:N         |
| PromptTemplate | AIConversation | 1:N         |

---

# Entity Details

Trong các phần tiếp theo sẽ thiết kế chi tiết:

1. AIConversation
2. AIMessage
3. PromptTemplate
4. AIModel
5. AIUsage
6. TokenUsage

---

# Design Rules

- UUID Primary Key
- Soft Delete
- Audit Fields
- Token Tracking
- Cost Tracking
- AI Model Versioning

---

# Sprint Output

Sau khi DB-004 hoàn thành:

- Thiết kế AI Database.
- Chuẩn bị Recommendation Engine.
- Chuẩn bị RAG.
- Chuẩn bị AI Analytics.
- Sinh Prisma Schema.

# Entity: AIConversation

## Mục đích

AIConversation đại diện cho một phiên làm việc giữa User và hệ thống AI.

Một Conversation có thể phục vụ nhiều mục đích khác nhau như:

- AI Tutor
- AI Q&A
- AI Recommendation
- AI Quiz
- AI Summary
- AI Flashcard
- AI Writing Assistant

Conversation giúp lưu toàn bộ ngữ cảnh trao đổi để AI có thể trả lời liên tục và chính xác.

---

# Quan hệ

```text
User
    │
    └── 1:N AIConversation
                │
                └── 1:N AIMessage

AIConversation
        │
        ├── N:1 Subject
        ├── N:1 Course
        ├── N:1 Lesson
        └── N:1 KnowledgeUnit
```

---

# Thuộc tính

| Field               | Type         | Nullable | Unique | Mô tả                                         |
| ------------------- | ------------ | -------- | ------ | --------------------------------------------- |
| id                  | UUID         | ❌       | ✅     | Khóa chính                                    |
| userId              | UUID         | ❌       | ❌     | FK → User                                     |
| subjectId           | UUID         | ✅       | ❌     | FK → Subject                                  |
| courseId            | UUID         | ✅       | ❌     | FK → Course                                   |
| lessonId            | UUID         | ✅       | ❌     | FK → Lesson                                   |
| knowledgeUnitId     | UUID         | ✅       | ❌     | FK → KnowledgeUnit                            |
| title               | VARCHAR(255) | ✅       | ❌     | Tiêu đề hội thoại                             |
| conversationType    | ENUM         | ❌       | ❌     | TUTOR / QNA / QUIZ / SUMMARY / RECOMMENDATION |
| aiModelId           | UUID         | ❌       | ❌     | FK → AIModel                                  |
| systemPromptVersion | VARCHAR(50)  | ✅       | ❌     | Phiên bản Prompt                              |
| status              | ENUM         | ❌       | ❌     | ACTIVE / ARCHIVED / CLOSED                    |
| lastMessageAt       | TIMESTAMP    | ✅       | ❌     | Tin nhắn gần nhất                             |
| createdAt           | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                                 |
| updatedAt           | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                            |
| deletedAt           | TIMESTAMP    | ✅       | ❌     | Soft Delete                                   |

---

# Index

- PK(id)
- INDEX(userId)
- INDEX(subjectId)
- INDEX(courseId)
- INDEX(lessonId)
- INDEX(knowledgeUnitId)
- INDEX(aiModelId)
- INDEX(lastMessageAt)
- INDEX(status)

---

# Quy tắc nghiệp vụ

- Một Conversation chỉ thuộc một User.
- Một Conversation có nhiều AIMessage.
- Conversation có thể không gắn với Lesson hoặc KnowledgeUnit (ví dụ AI hỏi đáp chung).
- Khi người dùng học trong Lesson, Conversation nên gắn với Lesson và KnowledgeUnit để AI có đầy đủ ngữ cảnh.
- Không xóa cứng Conversation để giữ lịch sử học tập.

---

# Ví dụ

## AI Tutor

```text
Sinh học

↓

Lesson: ADN

↓

Knowledge Unit: Cấu trúc ADN

↓

Conversation
```

---

## AI Hỏi đáp chung

```text
User

↓

AI Conversation

↓

Không gắn Lesson
```

---

# Vai trò trong hệ thống

AIConversation là điểm bắt đầu của:

- AI Tutor
- AI Chat
- AI Recommendation
- AI Quiz
- AI Summary

Mọi AIMessage đều thuộc về một AIConversation.

---

# AI Context

Conversation lưu ngữ cảnh học tập nhưng không lưu nội dung tin nhắn.

Ngữ cảnh bao gồm:

- User
- Subject
- Course
- Lesson
- KnowledgeUnit
- AI Model
- Prompt Version

Nội dung trao đổi sẽ được quản lý bởi AIMessage.

---

# Future Extension

AIConversation có thể mở rộng để hỗ trợ:

- Multi-Agent Conversation
- Voice Conversation
- Image Conversation
- File Conversation
- Shared Conversation
- Teacher Review
- Conversation Rating

# Entity: AIMessage

## Mục đích

AIMessage đại diện cho một tin nhắn trong AIConversation.

Tin nhắn có thể được tạo bởi:

- User
- AI Assistant
- System

AIMessage là Entity lưu toàn bộ lịch sử trao đổi giữa người học và AI.

Đây là bảng có tốc độ tăng dữ liệu nhanh nhất trong AI Domain.

---

# Quan hệ

```text
AIConversation
        │
        └── 1:N AIMessage
                    │
                    ├── N:1 AIUsage
                    └── N:1 PromptTemplate (optional)
```

---

# Thuộc tính

| Field            | Type      | Nullable | Unique | Mô tả                            |
| ---------------- | --------- | -------- | ------ | -------------------------------- |
| id               | UUID      | ❌       | ✅     | Khóa chính                       |
| conversationId   | UUID      | ❌       | ❌     | FK → AIConversation              |
| parentMessageId  | UUID      | ✅       | ❌     | FK → AIMessage                   |
| role             | ENUM      | ❌       | ❌     | SYSTEM / USER / ASSISTANT / TOOL |
| content          | TEXT      | ❌       | ❌     | Nội dung tin nhắn                |
| contentFormat    | ENUM      | ❌       | ❌     | MARKDOWN / TEXT / JSON           |
| promptTemplateId | UUID      | ✅       | ❌     | FK → PromptTemplate              |
| aiUsageId        | UUID      | ✅       | ❌     | FK → AIUsage                     |
| sequenceNumber   | INT       | ❌       | ❌     | Thứ tự trong Conversation        |
| responseTimeMs   | INT       | ✅       | ❌     | Thời gian phản hồi               |
| status           | ENUM      | ❌       | ❌     | PENDING / COMPLETED / FAILED     |
| createdAt        | TIMESTAMP | ❌       | ❌     | Thời điểm tạo                    |
| updatedAt        | TIMESTAMP | ❌       | ❌     | Thời điểm cập nhật               |
| deletedAt        | TIMESTAMP | ✅       | ❌     | Soft Delete                      |

---

# Index

- PK(id)
- INDEX(conversationId)
- INDEX(parentMessageId)
- INDEX(promptTemplateId)
- INDEX(aiUsageId)
- INDEX(role)
- INDEX(sequenceNumber)
- INDEX(status)
- UNIQUE(conversationId, sequenceNumber)

---

# Quy tắc nghiệp vụ

- Một AIMessage chỉ thuộc một AIConversation.
- sequenceNumber phải tăng liên tục trong một Conversation.
- Message của User không có aiUsageId.
- Message của AI phải có aiUsageId sau khi hoàn thành.
- Không chỉnh sửa nội dung sau khi đã lưu, chỉ được Soft Delete nếu cần.

---

# Luồng hội thoại

```text
Conversation

1 USER
"ADN là gì?"

↓

2 ASSISTANT
"ADN là..."

↓

3 USER
"Cho ví dụ"

↓

4 ASSISTANT
"Ví dụ..."
```

---

# Thread Message

Nếu hỗ trợ hội thoại phân nhánh trong tương lai:

```text
Message 1
│
├── Message 2
│      └── Message 3
│
└── Message 4
```

`parentMessageId` giúp xây dựng cây hội thoại mà không cần thay đổi cấu trúc bảng.

---

# Vai trò trong hệ thống

AIMessage lưu:

- Câu hỏi của User.
- Câu trả lời của AI.
- Prompt của System.
- Tool Call (nếu có).

---

# Ghi chú thiết kế

Không lưu:

- Token.
- Chi phí.
- Model.

Các dữ liệu này được lưu trong AIUsage để tránh lặp dữ liệu.

---

# Future Extension

Có thể mở rộng thêm:

- Image Message
- Voice Message
- File Attachment
- Tool Result
- Citation
- Streaming Response
- Message Feedback
- Message Rating

# Entity: PromptTemplate

## Mục đích

PromptTemplate quản lý các System Prompt được sử dụng trong toàn bộ AI Platform.

Thay vì hard-code prompt trong Backend, tất cả prompt được quản lý trong Database để:

- Thay đổi Prompt mà không cần deploy.
- Version hóa Prompt.
- A/B Testing.
- Theo dõi hiệu quả Prompt.
- Tái sử dụng Prompt giữa các AI Feature.

PromptTemplate không lưu lịch sử hội thoại, mà chỉ lưu mẫu Prompt.

---

# Quan hệ

```text
PromptTemplate
        │
        ├── 1:N AIConversation
        └── 1:N AIUsage
```

---

# Thuộc tính

| Field       | Type         | Nullable | Unique | Mô tả                                               |
| ----------- | ------------ | -------- | ------ | --------------------------------------------------- |
| id          | UUID         | ❌       | ✅     | Khóa chính                                          |
| code        | VARCHAR(100) | ❌       | ✅     | Mã Prompt                                           |
| name        | VARCHAR(200) | ❌       | ❌     | Tên Prompt                                          |
| description | TEXT         | ✅       | ❌     | Mô tả                                               |
| promptType  | ENUM         | ❌       | ❌     | SYSTEM / USER / TOOL                                |
| feature     | ENUM         | ❌       | ❌     | TUTOR / QUIZ / SUMMARY / FLASHCARD / RECOMMENDATION |
| version     | VARCHAR(20)  | ❌       | ❌     | Phiên bản Prompt                                    |
| template    | TEXT         | ❌       | ❌     | Nội dung Prompt                                     |
| variables   | JSONB        | ✅       | ❌     | Danh sách biến                                      |
| aiModelId   | UUID         | ✅       | ❌     | FK → AIModel mặc định                               |
| isDefault   | BOOLEAN      | ❌       | ❌     | Prompt mặc định                                     |
| status      | ENUM         | ❌       | ❌     | DRAFT / ACTIVE / DEPRECATED                         |
| createdAt   | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                                       |
| updatedAt   | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                                  |
| deletedAt   | TIMESTAMP    | ✅       | ❌     | Soft Delete                                         |

---

# Index

- PK(id)
- UNIQUE(code)
- INDEX(feature)
- INDEX(promptType)
- INDEX(aiModelId)
- INDEX(status)
- INDEX(isDefault)

---

# Quy tắc nghiệp vụ

- Mỗi Prompt có một `code` duy nhất.
- Chỉ có một Prompt mặc định (`isDefault = true`) cho mỗi `feature`.
- Prompt đang được sử dụng không được xóa cứng.
- Prompt mới phải tăng `version`.

---

# Variables

PromptTemplate hỗ trợ biến động.

Ví dụ:

```text
{{userName}}

{{subject}}

{{course}}

{{lesson}}

{{knowledgeUnit}}

{{learningGoal}}

{{masteryScore}}

{{language}}
```

Backend sẽ thay thế các biến trước khi gửi đến AI Model.

---

# Ví dụ

## AI Tutor

```text
Bạn là gia sư AI.

Môn học:
{{subject}}

Bài học:
{{lesson}}

Đơn vị kiến thức:
{{knowledgeUnit}}

Điểm Mastery:
{{masteryScore}}

Hãy giải thích dễ hiểu...
```

---

## AI Summary

```text
Hãy tóm tắt bài học sau:

{{lesson}}

Nội dung:

{{content}}
```

---

# Versioning

```text
Tutor Prompt

v1

↓

v2

↓

v3
```

Conversation cũ vẫn tham chiếu đúng phiên bản Prompt đã sử dụng.

---

# A/B Testing

Có thể chạy đồng thời:

```text
Tutor Prompt v3

50%

Tutor Prompt v4

50%
```

Sau đó so sánh:

- User Rating
- Token Usage
- Response Time
- Conversation Length

---

# Vai trò trong hệ thống

PromptTemplate được sử dụng bởi:

- AI Tutor
- AI Summary
- AI Quiz Generator
- AI Flashcard
- AI Recommendation
- AI Evaluation

---

# Ghi chú thiết kế

PromptTemplate chỉ lưu mẫu Prompt.

Không lưu:

- Tin nhắn.
- Token.
- Chi phí.
- AI Response.

Các dữ liệu này được quản lý bởi AIConversation, AIMessage và AIUsage.

---

# Future Extension

Có thể mở rộng:

- Multi-language Prompt
- Prompt Category
- Prompt Tag
- Prompt Approval Workflow
- Prompt Performance Analytics
- Prompt Marketplace

````

---

## 📌 Góp ý kiến trúc

Đến đây mình muốn đề xuất một thay đổi quan trọng.

### Không lưu Prompt trong AIConversation

Thay vì:

```text
AIConversation

systemPrompt
````

Nên dùng:

```text
PromptTemplate

↓

AIConversation

↓

promptTemplateId
```

hoặc lưu thêm `promptVersion` nếu cần truy vết.

### Lợi ích

- Không lặp dữ liệu.
- Dễ thay đổi Prompt.
- Dễ rollback phiên bản.
- Dễ A/B Testing.
- Dễ thống kê Prompt nào hoạt động hiệu quả.

Đây là cách hầu hết các hệ thống AI production quản lý Prompt.

---

## Tiếp theo

Entity tiếp theo sẽ là **`AIModel`**.

Đây sẽ là nơi quản lý:

- OpenAI GPT
- Gemini
- Claude
- DeepSeek
- Mistral
- Llama

để toàn bộ hệ thống không phụ thuộc vào một nhà cung cấp AI duy nhất và có thể chuyển đổi model linh hoạt trong tương lai.

# Entity: AIModel

## Mục đích

AIModel quản lý thông tin các mô hình AI được sử dụng trong hệ thống.

Entity này giúp hệ thống:

- Hỗ trợ nhiều AI Provider.
- Chuyển đổi Model linh hoạt.
- Theo dõi chi phí.
- Quản lý phiên bản Model.
- Định tuyến yêu cầu AI theo từng tính năng.

AIModel là lớp trừu tượng giữa ứng dụng và nhà cung cấp AI.

---

# Quan hệ

```text
AIModel
    │
    ├── 1:N AIConversation
    ├── 1:N PromptTemplate
    └── 1:N AIUsage
```

---

# Thuộc tính

| Field               | Type          | Nullable | Unique | Mô tả                                                   |
| ------------------- | ------------- | -------- | ------ | ------------------------------------------------------- |
| id                  | UUID          | ❌       | ✅     | Khóa chính                                              |
| provider            | ENUM          | ❌       | ❌     | OPENAI / GOOGLE / ANTHROPIC / MISTRAL / META / DEEPSEEK |
| modelCode           | VARCHAR(100)  | ❌       | ✅     | Mã Model                                                |
| displayName         | VARCHAR(150)  | ❌       | ❌     | Tên hiển thị                                            |
| description         | TEXT          | ✅       | ❌     | Mô tả                                                   |
| apiVersion          | VARCHAR(50)   | ✅       | ❌     | Phiên bản API                                           |
| contextWindow       | INT           | ❌       | ❌     | Context Window                                          |
| maxOutputTokens     | INT           | ❌       | ❌     | Số token tối đa                                         |
| supportsVision      | BOOLEAN       | ❌       | ❌     | Hỗ trợ hình ảnh                                         |
| supportsAudio       | BOOLEAN       | ❌       | ❌     | Hỗ trợ âm thanh                                         |
| supportsToolCalling | BOOLEAN       | ❌       | ❌     | Hỗ trợ Tool Calling                                     |
| supportsStreaming   | BOOLEAN       | ❌       | ❌     | Hỗ trợ Streaming                                        |
| inputPricePer1M     | DECIMAL(10,4) | ✅       | ❌     | Giá / 1M input token                                    |
| outputPricePer1M    | DECIMAL(10,4) | ✅       | ❌     | Giá / 1M output token                                   |
| status              | ENUM          | ❌       | ❌     | ACTIVE / DEPRECATED / DISABLED                          |
| createdAt           | TIMESTAMP     | ❌       | ❌     | Thời điểm tạo                                           |
| updatedAt           | TIMESTAMP     | ❌       | ❌     | Thời điểm cập nhật                                      |
| deletedAt           | TIMESTAMP     | ✅       | ❌     | Soft Delete                                             |

---

# Index

- PK(id)
- UNIQUE(modelCode)
- INDEX(provider)
- INDEX(status)

---

# Quy tắc nghiệp vụ

- Mỗi `modelCode` là duy nhất.
- Chỉ Model có trạng thái `ACTIVE` mới được sử dụng.
- Không xóa cứng AIModel để đảm bảo khả năng truy vết lịch sử.
- Khi Provider thay đổi API, tạo bản ghi mới hoặc cập nhật `apiVersion` theo chính sách versioning của hệ thống.

---

# Ví dụ

| Provider  | Model            |
| --------- | ---------------- |
| OPENAI    | gpt-5            |
| OPENAI    | gpt-5-mini       |
| GOOGLE    | gemini-2.5-pro   |
| GOOGLE    | gemini-2.5-flash |
| ANTHROPIC | claude-sonnet-4  |
| META      | llama-4          |
| DEEPSEEK  | deepseek-chat    |

---

# Model Selection

Mỗi tính năng có thể sử dụng Model khác nhau.

```text
AI Tutor
        │
        ▼
GPT-5

AI Summary
        │
        ▼
GPT-5 Mini

AI Flashcard
        │
        ▼
Gemini Flash

AI Quiz
        │
        ▼
Claude Sonnet
```

Điều này giúp tối ưu chi phí và hiệu năng.

---

# Fallback Strategy

Nếu Model chính không khả dụng:

```text
GPT-5
    │
    ▼
GPT-5 Mini
    │
    ▼
Gemini Flash
```

Backend sẽ tự động chuyển sang Model dự phòng theo cấu hình.

---

# Vai trò trong hệ thống

AIModel được sử dụng bởi:

- AIConversation
- PromptTemplate
- AIUsage

AIModel không lưu lịch sử hội thoại hay token.

---

# Future Extension

Có thể mở rộng:

- Region
- Latency Statistics
- Availability Score
- Model Benchmark
- Safety Rating
- Capability Tags
- Supported Languages
- Rate Limit Configuration

# Entity: AIUsage

## Mục đích

AIUsage ghi nhận **mỗi lần hệ thống gọi AI Model**.

Đây là Entity trung tâm của AI Analytics.

AIUsage phục vụ:

- Theo dõi chi phí AI.
- Theo dõi Token Usage.
- Đo thời gian phản hồi.
- Phân tích hiệu năng.
- Debug lỗi.
- Billing.
- Monitoring.

Mỗi AI Response sẽ sinh ra một AIUsage.

---

# Quan hệ

```text
AIModel
    │
    └── 1:N AIUsage

PromptTemplate
    │
    └── 1:N AIUsage

AIConversation
    │
    └── 1:N AIUsage

AIUsage
    │
    ├── 1:1 TokenUsage
    └── 1:N AIMessage
```

---

# Thuộc tính

| Field               | Type          | Nullable | Unique | Mô tả                                               |
| ------------------- | ------------- | -------- | ------ | --------------------------------------------------- |
| id                  | UUID          | ❌       | ✅     | Khóa chính                                          |
| conversationId      | UUID          | ❌       | ❌     | FK → AIConversation                                 |
| aiModelId           | UUID          | ❌       | ❌     | FK → AIModel                                        |
| promptTemplateId    | UUID          | ✅       | ❌     | FK → PromptTemplate                                 |
| requestId           | VARCHAR(100)  | ❌       | ✅     | ID request từ Provider                              |
| feature             | ENUM          | ❌       | ❌     | TUTOR / QUIZ / SUMMARY / FLASHCARD / RECOMMENDATION |
| requestStartedAt    | TIMESTAMP     | ❌       | ❌     | Thời điểm bắt đầu                                   |
| responseCompletedAt | TIMESTAMP     | ✅       | ❌     | Thời điểm hoàn thành                                |
| latencyMs           | INT           | ✅       | ❌     | Thời gian xử lý                                     |
| status              | ENUM          | ❌       | ❌     | SUCCESS / FAILED / TIMEOUT / CANCELLED              |
| estimatedCost       | DECIMAL(12,6) | ✅       | ❌     | Chi phí ước tính (USD)                              |
| errorCode           | VARCHAR(100)  | ✅       | ❌     | Mã lỗi                                              |
| errorMessage        | TEXT          | ✅       | ❌     | Thông tin lỗi                                       |
| metadata            | JSONB         | ✅       | ❌     | Metadata mở rộng                                    |
| createdAt           | TIMESTAMP     | ❌       | ❌     | Thời điểm tạo                                       |
| updatedAt           | TIMESTAMP     | ❌       | ❌     | Thời điểm cập nhật                                  |

---

# Index

- PK(id)
- UNIQUE(requestId)
- INDEX(conversationId)
- INDEX(aiModelId)
- INDEX(promptTemplateId)
- INDEX(feature)
- INDEX(status)
- INDEX(requestStartedAt)

---

# Quy tắc nghiệp vụ

- Mỗi lần gọi AI phải tạo một AIUsage.
- requestId phải là duy nhất.
- estimatedCost luôn lớn hơn hoặc bằng 0.
- latencyMs được tính từ requestStartedAt và responseCompletedAt.
- Nếu status = FAILED thì phải có errorCode.

---

# Response Lifecycle

```text
User Request
        │
        ▼
Create AIUsage
        │
        ▼
Call AI Provider
        │
        ▼
Receive Response
        │
        ▼
Update

- latency
- status
- cost
- token
```

---

# Ví dụ

## Thành công

```text
Status

SUCCESS

Latency

1250 ms

Cost

$0.0018
```

---

## Thất bại

```text
Status

FAILED

Error

RATE_LIMIT
```

---

# Monitoring

AIUsage hỗ trợ Dashboard:

- Tổng số request.
- Success Rate.
- Error Rate.
- Average Latency.
- Tổng chi phí.
- Token sử dụng.
- Request theo Model.
- Request theo Feature.

---

# Analytics

Ví dụ:

```text
AI Tutor

45%

AI Quiz

20%

AI Summary

18%

Flashcard

10%

Recommendation

7%
```

Giúp xác định tính năng AI nào đang được sử dụng nhiều nhất.

---

# Cost Tracking

Ví dụ:

```text
GPT-5

$12.50

Gemini Flash

$1.80

Claude Sonnet

$3.25
```

Giúp tối ưu lựa chọn AI Model.

---

# Error Analytics

Các lỗi phổ biến:

- RATE_LIMIT
- TIMEOUT
- INVALID_REQUEST
- PROVIDER_ERROR
- AUTHENTICATION_ERROR

Các lỗi được thống kê để cải thiện hệ thống.

---

# Future Extension

Có thể mở rộng:

- Retry Count
- Cache Hit
- Queue Time
- Processing Region
- API Gateway
- Trace ID
- Distributed Tracing
- User Feedback Score

---

# Ghi chú thiết kế

AIUsage **không lưu**:

- Nội dung hội thoại.
- Prompt đầy đủ.
- Token chi tiết.

Các dữ liệu này được quản lý bởi:

- AIMessage
- PromptTemplate
- TokenUsage

# Entity: TokenUsage

## Mục đích

TokenUsage lưu chi tiết số lượng Token được tiêu thụ cho mỗi lần gọi AI.

Entity này phục vụ:

- Tính chi phí AI.
- Theo dõi Token Usage.
- Billing.
- Monitoring.
- Analytics.
- Tối ưu Prompt.
- So sánh hiệu quả giữa các AI Model.

TokenUsage tách biệt khỏi AIUsage để dễ mở rộng khi các AI Provider thay đổi cách tính Token.

---

# Quan hệ

```text id="3f8m2u"
AIUsage
    │
    └── 1:1 TokenUsage
```

---

# Thuộc tính

| Field            | Type          | Nullable | Unique | Mô tả                |
| ---------------- | ------------- | -------- | ------ | -------------------- |
| id               | UUID          | ❌       | ✅     | Khóa chính           |
| aiUsageId        | UUID          | ❌       | ✅     | FK → AIUsage         |
| promptTokens     | INT           | ❌       | ❌     | Input Tokens         |
| completionTokens | INT           | ❌       | ❌     | Output Tokens        |
| cachedTokens     | INT           | ❌       | ❌     | Cache Tokens         |
| reasoningTokens  | INT           | ❌       | ❌     | Reasoning Tokens     |
| totalTokens      | INT           | ❌       | ❌     | Tổng Tokens          |
| promptCost       | DECIMAL(12,6) | ❌       | ❌     | Chi phí Input        |
| completionCost   | DECIMAL(12,6) | ❌       | ❌     | Chi phí Output       |
| totalCost        | DECIMAL(12,6) | ❌       | ❌     | Tổng chi phí         |
| currency         | VARCHAR(10)   | ❌       | ❌     | Đơn vị tiền tệ (USD) |
| providerMetadata | JSONB         | ✅       | ❌     | Metadata từ Provider |
| createdAt        | TIMESTAMP     | ❌       | ❌     | Thời điểm tạo        |
| updatedAt        | TIMESTAMP     | ❌       | ❌     | Thời điểm cập nhật   |

---

# Index

- PK(id)
- UNIQUE(aiUsageId)
- INDEX(totalTokens)
- INDEX(totalCost)

---

# Quy tắc nghiệp vụ

- Mỗi AIUsage chỉ có một TokenUsage.
- totalTokens = promptTokens + completionTokens + cachedTokens + reasoningTokens.
- totalCost = promptCost + completionCost.
- Các giá trị Token không được âm.
- Currency phải thống nhất trong toàn hệ thống.

---

# Ví dụ

## GPT-5

```text id="c5wdry"
Prompt

800 Tokens

↓

Completion

350 Tokens

↓

Reasoning

120 Tokens

↓

Total

1270 Tokens
```

---

## Gemini

```text id="8pvwrd"
Prompt

500 Tokens

↓

Completion

420 Tokens

↓

Cache

200 Tokens

↓

Total

1120 Tokens
```

---

# Cost Calculation

```text id="mvll0g"
Prompt Tokens

×

Input Price

+

Completion Tokens

×

Output Price

=

Total Cost
```

Giá Token được lấy từ AIModel tại thời điểm xử lý.

---

# Monitoring

TokenUsage hỗ trợ thống kê:

- Tổng Input Token.
- Tổng Output Token.
- Token theo AI Model.
- Token theo User.
- Token theo Feature.
- Token theo ngày.
- Chi phí theo tháng.

---

# Dashboard

Ví dụ:

```text id="jlwmud"
Today

Input

1.2M

Output

840K

Total Cost

$24.31
```

---

# Future Extension

Có thể mở rộng:

- Audio Tokens
- Image Tokens
- Video Tokens
- Embedding Tokens
- Cache Read Tokens
- Cache Write Tokens
- Tool Call Tokens

---

# Ghi chú thiết kế

TokenUsage chỉ lưu thống kê Token.

Không lưu:

- Nội dung Prompt.
- Nội dung Chat.
- AI Response.
- AI Model Configuration.

Các dữ liệu này được quản lý bởi AIMessage, PromptTemplate và AIUsage.

# Business Rules

## BR-001: AI Conversation

- Một AIConversation chỉ thuộc một User.
- Một User có thể có nhiều AIConversation.
- AIConversation có thể gắn với Subject, Course, Lesson hoặc KnowledgeUnit.

---

## BR-002: AI Message

- Một AIConversation có nhiều AIMessage.
- sequenceNumber phải tăng liên tục.
- Không chỉnh sửa nội dung sau khi lưu.

---

## BR-003: Prompt Template

- Prompt phải có code duy nhất.
- Chỉ có một Prompt mặc định cho mỗi Feature.
- Prompt phải được version hóa.

---

## BR-004: AI Model

- Chỉ Model ACTIVE mới được sử dụng.
- Không xóa Model đã từng phục vụ Request.

---

## BR-005: AI Usage

- Mỗi Request AI tạo một AIUsage.
- AIUsage phải tham chiếu AIModel.
- AIUsage phải lưu trạng thái Request.

---

## BR-006: Token Usage

- Một AIUsage có đúng một TokenUsage.
- Token không được âm.
- Cost không được âm.

---

## BR-007: Conversation History

- Không xóa cứng Conversation.
- Không xóa cứng Message.
- Lưu lịch sử để AI duy trì ngữ cảnh.

---

## BR-008: AI Cost

- Mọi Request đều phải ghi nhận Token và Cost.
- Dashboard sử dụng AIUsage và TokenUsage để thống kê.

# Database Constraints

## Primary Key

Tất cả Entity sử dụng:

- UUID

---

## Foreign Key

| Parent         | Child          |
| -------------- | -------------- |
| User           | AIConversation |
| AIConversation | AIMessage      |
| AIConversation | AIUsage        |
| AIModel        | AIConversation |
| AIModel        | PromptTemplate |
| AIModel        | AIUsage        |
| PromptTemplate | AIUsage        |
| AIUsage        | TokenUsage     |

---

## Unique Constraints

| Entity         | Constraint                       |
| -------------- | -------------------------------- |
| AIModel        | modelCode                        |
| PromptTemplate | code                             |
| AIUsage        | requestId                        |
| TokenUsage     | aiUsageId                        |
| AIMessage      | (conversationId, sequenceNumber) |

---

## Check Constraints

### Token

```text
promptTokens >= 0

completionTokens >= 0

cachedTokens >= 0

reasoningTokens >= 0
```

---

### Cost

```text
promptCost >= 0

completionCost >= 0

totalCost >= 0
```

---

### Latency

```text
latencyMs >= 0
```

---

### Sequence

```text
sequenceNumber > 0
```

---

### Status

Mọi Enum phải nằm trong tập giá trị đã định nghĩa.

# Performance & Index Strategy

## Mục tiêu

AI Domain có tốc độ tăng dữ liệu rất nhanh.

Mục tiêu:

- Chat nhanh.
- Dashboard nhanh.
- Analytics nhanh.
- Cost Report nhanh.

---

# Truy vấn phổ biến

## Conversation của User

```sql
WHERE user_id = ?
ORDER BY updated_at DESC
```

Index

```text
INDEX(userId, updatedAt)
```

---

## Message của Conversation

```sql
WHERE conversation_id = ?
ORDER BY sequence_number
```

Composite Index

```text
INDEX(conversationId, sequenceNumber)
```

---

## AI Usage theo ngày

```sql
WHERE created_at BETWEEN ...
```

Index

```text
INDEX(createdAt)
```

---

## Cost theo User

Join

```text
User

↓

Conversation

↓

AIUsage

↓

TokenUsage
```

---

## Cost theo Model

```sql
GROUP BY ai_model_id
```

Index

```text
INDEX(aiModelId)
```

---

## Prompt Analytics

```sql
GROUP BY prompt_template_id
```

Index

```text
INDEX(promptTemplateId)
```

---

## Dashboard

Dashboard thường dùng:

- Conversation Count
- Message Count
- Token
- Cost
- Error Rate
- Latency

=> nên Cache bằng Redis.

---

## Partition

Khi dữ liệu lớn:

Partition theo:

- createdAt
- month

Ví dụ:

```text
ai_message_2026_01

ai_message_2026_02

...

ai_usage_2026_01
```

---

## Archive

Conversation cũ trên 2 năm có thể Archive sang Storage khác.

---

## Future Optimization

- Redis Cache
- Vector Database
- Conversation Summary Cache
- Async Analytics
- ClickHouse cho BI

# AI Domain ERD

## High-Level ERD

```text
                          User
                           │
                           ▼
                    AIConversation
                           │
          ┌────────────────┴───────────────┐
          ▼                                ▼
     AIMessage                        AIUsage
          │                                │
          │                                ▼
          │                          TokenUsage
          │
          ▼
    PromptTemplate
          ▲
          │
          ▼
        AIModel
```

---

# Relationship Matrix

| Parent         | Child          | Cardinality |
| -------------- | -------------- | ----------- |
| User           | AIConversation | 1:N         |
| AIConversation | AIMessage      | 1:N         |
| AIConversation | AIUsage        | 1:N         |
| AIModel        | AIConversation | 1:N         |
| AIModel        | PromptTemplate | 1:N         |
| AIModel        | AIUsage        | 1:N         |
| PromptTemplate | AIUsage        | 1:N         |
| AIUsage        | TokenUsage     | 1:1         |

---

# Aggregate Root

| Aggregate         | Root           |
| ----------------- | -------------- |
| Conversation      | AIConversation |
| Prompt Management | PromptTemplate |
| Model Management  | AIModel        |
| Usage Analytics   | AIUsage        |

---

# Lifecycle

## Conversation

```text
ACTIVE

↓

ARCHIVED

↓

DELETED (Soft Delete)
```

---

## AI Usage

```text
REQUESTED

↓

PROCESSING

↓

SUCCESS

↓

FAILED
```

---

## Prompt

```text
DRAFT

↓

ACTIVE

↓

DEPRECATED
```

---

## AI Model

```text
ACTIVE

↓

DEPRECATED

↓

DISABLED
```

---

# AI Architecture

```text
User

↓

Conversation

↓

Message

↓

Prompt Builder

↓

PromptTemplate

↓

AIModel

↓

Provider

↓

AIUsage

↓

TokenUsage
```

---

# AI First Design

AI Domain được thiết kế để:

- Hỗ trợ nhiều AI Provider.
- Thay đổi Model mà không sửa Backend.
- Theo dõi Cost.
- Theo dõi Token.
- Theo dõi Prompt.
- Theo dõi Quality.
- Chuẩn bị cho Agentic AI.

# Sprint Summary

## Hoàn thành

- Domain Overview
- AIConversation
- AIMessage
- PromptTemplate
- AIModel
- AIUsage
- TokenUsage
- Business Rules
- Database Constraints
- Performance Strategy
- AI Domain ERD

---

# Sprint Output

AI Domain đã sẵn sàng cho các bước tiếp theo:

- DB-005 – Quiz Domain
- DB-006 – Gamification Domain
- DB-007 – Payment Domain

Sau khi hoàn thành toàn bộ các Domain sẽ tiến hành:

1. Database Dictionary (`database.md`)
2. Prisma Schema (`schema.prisma`)
3. PostgreSQL Migration
4. Seed Data
5. Backend Implementation

```

```
