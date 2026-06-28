# API-006 - Gamification Service

> **Thông tin quản trị:**
> - **Mã tài liệu:** API-006
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [DB-006](file:///d:/ai-learning-platform/docs/database/DB-006_Gamification.md)

## Mục đích

Cung cấp các API phục vụ các tính năng Gamification để giữ chân người học (Retention) bao gồm:
- Tra cứu hồ sơ Gamification (XP, Level, Streak hiện tại).
- Xem lịch sử giao dịch XP (Ledger).
- Tra cứu danh sách thành tích (Achievements) và tiến độ mở khóa.
- Quản lý Streak và sử dụng lượt bảo vệ streak (Streak Freeze).

---

# Base URL

```text
/v1/gamification
```

---

# Authentication

Tất cả API yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Lấy hồ sơ Gamification

## Endpoint

```http
GET /v1/gamification/profile
```

### Mô tả
Trả về tổng số XP, level hiện tại, thông tin chi tiết về streak của người dùng hiện tại.

### Response

```json
{
  "userId": "user_001",
  "totalXp": 1250,
  "currentLevel": 4,
  "nextLevelXpThreshold": 2000,
  "currentStreak": 7,
  "longestStreak": 14,
  "freezeBalance": 2,
  "lastActivityDate": "2026-06-28"
}
```

---

# 2. Xem lịch sử XP (XP History)

## Endpoint

```http
GET /v1/gamification/xp-history
```

### Mô tả
Lấy danh sách các giao dịch cộng/trừ XP của người dùng, phân trang.

### Request Query Parameters
- `page` (optional): Số trang (mặc định: 1)
- `limit` (optional): Số bản ghi trên mỗi trang (mặc định: 20, tối đa: 100)

### Response

```json
{
  "transactions": [
    {
      "id": "tx_001",
      "amount": 50,
      "balanceAfter": 1250,
      "reason": "QUIZ_COMPLETED",
      "sourceType": "QUIZ_ATTEMPT",
      "sourceId": "attempt_999",
      "occurredAt": "2026-06-28T03:30:00Z"
    },
    {
      "id": "tx_002",
      "amount": 100,
      "balanceAfter": 1200,
      "reason": "STREAK_MILESTONE_3_DAYS",
      "sourceType": "STREAK",
      "sourceId": "streak_888",
      "occurredAt": "2026-06-27T04:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 98
  }
}
```

---

# 3. Danh sách Thành tích (Achievements)

## Endpoint

```http
GET /v1/gamification/achievements
```

### Mô tả
Lấy danh sách toàn bộ các thành tích trong hệ thống kèm theo tiến độ hoàn thành của người dùng hiện tại.

### Response

```json
{
  "achievements": [
    {
      "id": "ach_first_lesson",
      "code": "FIRST_LESSON",
      "name": "Bước chân đầu tiên",
      "description": "Hoàn thành bài học đầu tiên của bạn",
      "category": "LEARNING",
      "xpReward": 100,
      "progress": 1.0,
      "status": "UNLOCKED",
      "unlockedAt": "2026-06-20T10:15:00Z"
    },
    {
      "id": "ach_quiz_master",
      "code": "QUIZ_MASTER",
      "name": "Vua Trắc Nghiệm",
      "description": "Đạt điểm tối đa trong 5 bài Mini Quiz liên tiếp",
      "category": "QUIZ",
      "xpReward": 500,
      "progress": 0.6,
      "status": "IN_PROGRESS",
      "unlockedAt": null
    }
  ]
}
```

---

# 4. Kích hoạt bảo vệ Streak (Streak Freeze)

## Endpoint

```http
POST /v1/gamification/streak/freeze
```

### Mô tả
Sử dụng một lượt bảo vệ streak (được mua bằng XP hoặc hệ thống tặng) để giữ nguyên chuỗi ngày học nếu người dùng không hoạt động trong ngày hôm nay.

### Request

```json
{}
```

### Response

```json
{
  "success": true,
  "freezeBalance": 1,
  "streakDays": 7,
  "freezeAppliedForDate": "2026-06-28"
}
```

---

# Quy tắc nghiệp vụ

- **Idempotency**: Các sự kiện cộng XP được xử lý idempotent thông qua trigger sự kiện nghiệp vụ phía Backend, đảm bảo mỗi hoạt động học tập chỉ được cộng XP một lần.
- **Timezone**: Việc tính toán Streak và ngày hoạt động cuối cùng (`lastActivityDate`) được căn cứ theo Timezone của thiết bị người dùng gửi lên.
- **Leveling**: Việc thăng cấp (Level Up) diễn ra bất đồng bộ sau khi giao dịch XP được lưu vào ledger. Client sẽ lắng nghe sự kiện hoặc kiểm tra lại profile khi nhận thông báo.

---

# Mã lỗi

| HTTP | Ý nghĩa |
| ---- | ------- |
| 200  | Thành công |
| 400  | Yêu cầu không hợp lệ hoặc không đủ điều kiện (ví dụ: freezeBalance = 0 khi kích hoạt freeze) |
| 401  | Chưa xác thực |
| 403  | Không có quyền |
| 500  | Lỗi hệ thống |

---

# Tài liệu liên quan

### Use Case
- UC-005 – Bắt đầu bài học
- UC-007 – Hoàn thành Mini Quiz

### Database Design
- [DB-006 – Gamification Domain](file:///d:/ai-learning-platform/docs/database/DB-006_Gamification.md)
