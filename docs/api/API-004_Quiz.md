# API-004 - Quiz Service

## Mục đích

Cung cấp các API phục vụ việc đánh giá quá trình học tập của người học.

Bao gồm:

- Lấy Mini Quiz.
- Nộp bài.
- Chấm điểm.
- Cập nhật Mastery.
- Lưu lịch sử làm bài.

---

# Base URL

```text
/v1/quiz
```

---

# Authentication

Tất cả API yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Lấy Mini Quiz

## Endpoint

```http
GET /v1/quiz/knowledge-units/{knowledgeUnitId}
```

### Mô tả

Lấy bộ câu hỏi tương ứng với Knowledge Unit.

### Response

```json
{
  "quizId": "quiz_001",
  "knowledgeUnitId": "ku_001",
  "timeLimit": 300,
  "questions": [
    {
      "id": "q001",
      "type": "single_choice",
      "content": "DNA gồm bao nhiêu mạch?",
      "options": ["1", "2", "3", "4"]
    }
  ]
}
```

---

# 2. Nộp bài

## Endpoint

```http
POST /v1/quiz/{quizId}/submit
```

### Request

```json
{
  "answers": [
    {
      "questionId": "q001",
      "answer": "2"
    }
  ]
}
```

### Response

```json
{
  "resultId": "result_001",
  "score": 9.5,
  "masteryBefore": 62,
  "masteryAfter": 74,
  "nextKnowledgeUnit": "ku_002"
}
```

---

# 3. Xem kết quả

## Endpoint

```http
GET /v1/quiz/results/{resultId}
```

### Response

```json
{
  "score": 9.5,
  "correct": 9,
  "incorrect": 1,
  "mastery": 74,
  "feedback": [
    {
      "questionId": "q005",
      "explanation": "..."
    }
  ]
}
```

---

# 4. Làm lại Quiz

## Endpoint

```http
POST /v1/quiz/{quizId}/retry
```

### Mô tả

Cho phép người học làm lại Mini Quiz để cải thiện Mastery.

---

# Quy tắc nghiệp vụ

- Mỗi Knowledge Unit có ít nhất một Mini Quiz.
- Mỗi Quiz gồm từ 3–5 câu hỏi.
- Có thể trộn thứ tự câu hỏi và đáp án.
- Người học được phép làm lại.
- Mastery được cập nhật sau mỗi lần nộp bài.

---

# Loại câu hỏi

Hệ thống hỗ trợ:

- Single Choice
- Multiple Choice
- True / False
- Matching
- Fill in the Blank
- Short Answer (giai đoạn sau)

---

# Dữ liệu lưu trữ

Lưu:

- Quiz ID.
- Question ID.
- Đáp án người dùng.
- Đáp án đúng.
- Điểm.
- Mastery trước và sau.
- Thời gian làm bài.
- Số lần làm.

---

# Hiệu năng

- Thời gian chấm bài dưới 2 giây.
- Hỗ trợ đồng bộ khi mất kết nối.
- Cho phép lưu tạm bài làm (giai đoạn sau).

---

# Bảo mật

- Không cho phép sửa kết quả sau khi nộp.
- Kiểm tra quyền truy cập trước khi lấy kết quả.
- Ghi log mọi lần nộp bài.

---

# Mã lỗi

| HTTP | Ý nghĩa              |
| ---- | -------------------- |
| 200  | Thành công           |
| 400  | Dữ liệu không hợp lệ |
| 401  | Chưa xác thực        |
| 403  | Không có quyền       |
| 404  | Không tìm thấy Quiz  |
| 500  | Lỗi hệ thống         |

---

# Liên quan

### Use Case

- UC-007 – Hoàn thành Mini Quiz

### API

- API-002 – Learning
- API-003 – AI Tutor
- API-005 – User Profile
