# API-002 - Learning Service

## Mục đích

Cung cấp các API phục vụ toàn bộ quá trình học tập của người dùng.

Bao gồm:

- Dashboard
- Learning Path
- Lesson
- Knowledge Unit
- Learning Progress

---

# Thông tin chung

## Base URL

```text
/v1
```

## Authentication

Tất cả API yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Dashboard

## Lấy Dashboard

### Endpoint

```http
GET /v1/dashboard
```

### Response

```json
{
  "currentLesson": {},
  "todayReview": [],
  "learningProgress": {},
  "recommendations": []
}
```

---

# 2. Learning Path

## Lấy Learning Path

### Endpoint

```http
GET /v1/learning-path
```

### Response

```json
{
  "id": "lp_001",
  "subject": "biology",
  "progress": 25,
  "currentLessonId": "lesson_001",
  "items": []
}
```

---

## Tạo Learning Path ban đầu

### Endpoint

```http
POST /v1/learning-path/generate
```

### Mô tả
Tạo lộ trình học tập lần đầu tiên sau khi người học hoàn thành bước chọn mục tiêu và môn học.

### Response

```json
{
  "learningPathId": "lp_001",
  "firstLessonId": "lesson_001",
  "status": "READY"
}
```

---

## Tạo lại Learning Path

### Endpoint

```http
POST /v1/learning-path/regenerate
```

### Mô tả

Sử dụng khi:

- Đổi mục tiêu học.
- Đổi môn học.
- AI đề xuất tạo lại lộ trình.

---

# 3. Lesson

## Danh sách bài học

```http
GET /v1/subjects/{subjectId}/lessons
```

---

## Chi tiết bài học

```http
GET /v1/lessons/{lessonId}
```

### Response

```json
{
  "id": "lesson_001",
  "title": "DNA và cấu trúc phân tử",
  "description": "...",
  "estimatedTime": 20,
  "knowledgeUnits": []
}
```

---

## Bắt đầu bài học

```http
POST /v1/lessons/{lessonId}/start
```

---

## Hoàn thành bài học

```http
POST /v1/lessons/{lessonId}/complete
```

---

# 4. Knowledge Unit

## Danh sách Knowledge Unit

```http
GET /v1/lessons/{lessonId}/knowledge-units
```

---

## Chi tiết Knowledge Unit

```http
GET /v1/knowledge-units/{knowledgeUnitId}
```

### Response

```json
{
  "id": "ku_001",
  "title": "Khái niệm DNA",
  "contentBlocks": []
}
```

---

## Hoàn thành Knowledge Unit

```http
POST /v1/knowledge-units/{knowledgeUnitId}/complete
```

---

# 5. Learning Progress

## Tiến độ học

```http
GET /v1/progress
```

### Response

```json
{
  "completedLessons": 12,
  "completedKnowledgeUnits": 85,
  "mastery": 72
}
```

---

## Đồng bộ tiến độ

```http
POST /v1/progress/sync
```

---

# Quy tắc nghiệp vụ

- Một người dùng chỉ có một Learning Path đang hoạt động.
- Mỗi Lesson thuộc một Subject.
- Mỗi Lesson gồm nhiều Knowledge Unit.
- Mỗi Knowledge Unit gồm nhiều Content Block.
- Tiến độ được cập nhật ngay sau khi hoàn thành Knowledge Unit.

---

# Mã lỗi

| HTTP | Ý nghĩa              |
| ---- | -------------------- |
| 200  | Thành công           |
| 201  | Tạo thành công       |
| 400  | Dữ liệu không hợp lệ |
| 401  | Chưa xác thực        |
| 403  | Không có quyền       |
| 404  | Không tìm thấy       |
| 500  | Lỗi hệ thống         |

---

# Liên quan

### Use Case

- UC-003 – Chọn môn học
- UC-004 – AI tạo Learning Path
- UC-005 – Bắt đầu bài học
- UC-007 – Hoàn thành Mini Quiz

### API

- API-001 – Authentication
- API-003 – AI Tutor
- API-004 – Quiz
