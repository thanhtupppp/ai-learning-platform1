# API-003 - AI Tutor Service

## Mục đích

Cung cấp dịch vụ AI Tutor hỗ trợ người học trong suốt quá trình học tập.

AI Tutor có khả năng:

- Giải thích kiến thức.
- Trả lời câu hỏi.
- Đưa ví dụ minh họa.
- Gợi ý cách học.
- Phân tích lỗi sai.
- Hỗ trợ ôn tập.

AI luôn trả lời dựa trên ngữ cảnh học tập hiện tại.

---

# Base URL

```text
/v1/ai
```

---

# Authentication

Tất cả API yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Gửi câu hỏi tới AI Tutor

## Endpoint

```http
POST /v1/ai/chat
```

### Mô tả

Gửi câu hỏi tới AI Tutor cùng với ngữ cảnh học tập hiện tại.

---

### Request

```json
{
  "message": "Tại sao DNA có cấu trúc xoắn kép?",
  "lessonId": "lesson_001",
  "knowledgeUnitId": "ku_001",
  "conversationId": "conv_001"
}
```

---

### Response

```json
{
  "conversationId": "conv_001",
  "message": "DNA có cấu trúc xoắn kép vì...",
  "references": [
    {
      "knowledgeUnitId": "ku_001",
      "title": "DNA và cấu trúc phân tử"
    }
  ]
}
```

---

# 2. Lấy lịch sử hội thoại

## Endpoint

```http
GET /v1/ai/conversations/{conversationId}
```

### Response

```json
{
  "conversationId": "conv_001",
  "messages": []
}
```

---

# 3. Xóa hội thoại

## Endpoint

```http
DELETE /v1/ai/conversations/{conversationId}
```

---

# AI Context

Backend tự động gửi các thông tin sau đến AI Gateway:

- User ID
- Learning Goal
- Subject
- Chapter
- Lesson
- Knowledge Unit
- Mastery Score
- Learning Path
- Nội dung bài học
- Lịch sử hội thoại

Người dùng **không cần nhập lại ngữ cảnh**.

---

# Luồng xử lý

```text
Flutter
      ↓
Backend API
      ↓
AI Gateway
      ↓
Context Builder
      ↓
Knowledge Retrieval (RAG)
      ↓
Prompt Builder
      ↓
Model Router
      ↓
LLM
      ↓
AI Gateway
      ↓
Backend
      ↓
Flutter
```

---

# Quy tắc nghiệp vụ

- AI chỉ trả lời trong phạm vi kiến thức được hệ thống hỗ trợ.
- Ưu tiên giải thích hơn là đưa đáp án.
- Luôn sử dụng Knowledge Graph và nội dung bài học để tăng độ chính xác.
- Hội thoại được lưu để người học xem lại.

---

# Hiệu năng

- Thời gian phản hồi mong muốn: dưới 5 giây.
- Streaming sẽ được hỗ trợ ở giai đoạn sau.
- Nếu AI không phản hồi, Backend trả về thông báo lỗi thân thiện.

---

# Bảo mật

- Không gửi API Key xuống ứng dụng.
- Chỉ Backend được phép gọi AI Gateway.
- Ghi log tất cả yêu cầu AI để phục vụ giám sát và tối ưu.

---

# Mã lỗi

| HTTP | Ý nghĩa                   |
| ---- | ------------------------- |
| 200  | Thành công                |
| 400  | Yêu cầu không hợp lệ      |
| 401  | Chưa xác thực             |
| 403  | Không có quyền            |
| 429  | Vượt quá giới hạn         |
| 500  | Lỗi hệ thống              |
| 503  | AI Gateway không khả dụng |

---

# Liên quan

### Use Case

- UC-006 – Hỏi AI Tutor

### API

- API-001 – Authentication
- API-002 – Learning
- API-004 – Quiz
