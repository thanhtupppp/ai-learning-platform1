# API-008: Notification API

> **Thông tin quản trị:**
> - **Mã tài liệu:** API-008
> - **Trạng thái:** Draft
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [API Conventions](API_CONVENTIONS.md), [SPEC-003](../spec/SPEC-003_Integration_Events.md)

## Mục đích

Quản lý notifications cho learner: streak reminder, quiz reminder, achievement, system alerts.

---

## Base URL

```
/api/v1/notifications
```

---

## Endpoints

### GET /api/v1/notifications

Lấy danh sách notifications của user hiện tại.

**Query Parameters:**

| Param | Type | Required | Default | Mô tả |
|-------|------|----------|---------|-------|
| `page` | number | No | 1 | Trang hiện tại |
| `limit` | number | No | 20 | Số items/trang (max 50) |
| `unread_only` | boolean | No | false | Chỉ lấy chưa đọc |

**Response 200:**

```json
{
  "data": [
    {
      "id": "notif_01",
      "type": "streak_reminder",
      "title": "Đừng để streak bị mất!",
      "body": "Bạn chưa học hôm nay. Chỉ cần 5 phút thôi!",
      "is_read": false,
      "deep_link": "/learn/continue",
      "created_at": "2026-06-28T07:00:00Z"
    }
  ],
  "unread_count": 3,
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

### PATCH /api/v1/notifications/:id/read

Đánh dấu một notification là đã đọc.

**Response 200:**

```json
{
  "success": true
}
```

---

### PATCH /api/v1/notifications/read-all

Đánh dấu tất cả notifications là đã đọc.

**Response 200:**

```json
{
  "success": true,
  "updated_count": 5
}
```

---

### GET /api/v1/notifications/settings

Lấy cài đặt notification của user.

**Response 200:**

```json
{
  "push_enabled": true,
  "email_enabled": true,
  "channels": {
    "streak_reminder": { "push": true, "email": false, "time": "19:00" },
    "quiz_reminder": { "push": true, "email": false },
    "achievement": { "push": true, "email": true },
    "weekly_report": { "push": false, "email": true }
  }
}
```

---

### PUT /api/v1/notifications/settings

Cập nhật cài đặt notification.

**Request Body:**

```json
{
  "push_enabled": true,
  "email_enabled": false,
  "channels": {
    "streak_reminder": { "push": true, "time": "20:00" }
  }
}
```

**Response 200:** Trả về settings đã cập nhật.

---

## Notification Types

| Type | Trigger | Priority |
|------|---------|----------|
| `streak_reminder` | User chưa học sau 18:00 | High |
| `quiz_reminder` | Topic cần ôn tập (Spaced Repetition) | Medium |
| `achievement` | User unlock badge/level mới | Low |
| `path_complete` | Hoàn thành learning path | Low |
| `weekly_report` | Mỗi Chủ nhật | Low |
| `system` | Maintenance, updates | High |

---

## Push Notification (FCM)

### Register Device Token

**POST /api/v1/notifications/devices**

```json
{
  "token": "FCM_DEVICE_TOKEN",
  "platform": "android",
  "app_version": "1.0.0"
}
```

### Unregister

**DELETE /api/v1/notifications/devices/:token**

---

## Tài liệu liên quan

- [API Conventions](API_CONVENTIONS.md)
- [SPEC-003 Integration Events](../spec/SPEC-003_Integration_Events.md)
- [Architecture](../Architecture.md)
