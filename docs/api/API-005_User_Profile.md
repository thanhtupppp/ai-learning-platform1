# API-005 - User Profile & Learning Progress

## Mục đích

Quản lý hồ sơ người học và toàn bộ tiến độ học tập.

Bao gồm:

- Hồ sơ người dùng.
- Mục tiêu học tập.
- Môn học.
- Mastery.
- Tiến độ học.
- Thành tích.

---

# Base URL

```text
/v1/profile
```

---

# Authentication

Tất cả API yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Lấy hồ sơ người học

## Endpoint

```http
GET /v1/profile
```

### Response

```json
{
  "id": "user_001",
  "fullName": "Nguyễn Văn A",
  "avatar": "...",
  "learningGoal": "high_school_exam",
  "subjects": ["biology", "mathematics"]
}
```

---

# 2. Cập nhật hồ sơ

## Endpoint

```http
PATCH /v1/profile
```

### Request

```json
{
  "fullName": "Nguyễn Văn B",
  "avatar": "..."
}
```

---

# 3. Lưu mục tiêu học

## Endpoint

```http
POST /v1/users/learning-goal
```

### Mô tả
Thiết lập mục tiêu học tập ban đầu (hoặc cập nhật mục tiêu học) cho người dùng.

### Request

```json
{
  "goal": "high_school_exam"
}
```

### Response

```json
{
  "success": true
}
```

---

# 4. Lưu danh sách môn học

## Endpoint

```http
POST /v1/users/subjects
```

### Mô tả
Thiết lập danh sách môn học đã chọn của người dùng trong bước onboarding.

### Request

```json
{
  "subjects": ["biology", "mathematics"]
}
```

### Response

```json
{
  "success": true
}
```

---

# 5. Tiến độ học

## Endpoint

```http
GET /v1/profile/progress
```

### Response

```json
{
  "completedLessons": 25,
  "completedKnowledgeUnits": 142,
  "mastery": 81,
  "studyDays": 18,
  "currentStreak": 7
}
```

---

# 6. Thống kê theo môn

## Endpoint

```http
GET /v1/profile/subjects
```

### Response

```json
{
  "subjects": [
    {
      "id": "biology",
      "mastery": 76,
      "completedLessons": 12
    }
  ]
}
```

---

# 7. Thành tích học tập

## Endpoint

```http
GET /v1/profile/achievements
```

### Response

```json
{
  "achievements": [
    {
      "id": "first_lesson",
      "title": "Hoàn thành bài học đầu tiên"
    }
  ]
}
```

---

# Quy tắc nghiệp vụ

- Mỗi người dùng có một Learning Profile.
- Mastery được tính theo từng môn học.
- Tiến độ học được cập nhật theo thời gian thực.
- Thành tích được sinh tự động dựa trên hoạt động học tập.

---

# Dữ liệu lưu trữ

- User
- Learning Profile
- Subject Progress
- Mastery
- Achievement
- Learning Statistics

---

# Hiệu năng

- Thời gian phản hồi dưới 500ms.
- Cache dữ liệu thống kê khi phù hợp.
- Đồng bộ dữ liệu khi có thay đổi.

---

# Bảo mật

- Người dùng chỉ được truy cập hồ sơ của chính mình.
- Không trả về thông tin nhạy cảm.
- Ghi log các thay đổi hồ sơ.

---

# Mã lỗi

| HTTP | Ý nghĩa                   |
| ---- | ------------------------- |
| 200  | Thành công                |
| 400  | Dữ liệu không hợp lệ      |
| 401  | Chưa xác thực             |
| 403  | Không có quyền            |
| 404  | Không tìm thấy người dùng |
| 500  | Lỗi hệ thống              |

---

# Liên quan

### Use Case

- UC-002 – Chọn mục tiêu học
- UC-008 – Liên kết tài khoản Guest

### API

- API-001 – Authentication
- API-002 – Learning
- API-004 – Quiz
