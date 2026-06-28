# API-001 - Xác thực và Guest Mode

> **Thông tin quản trị:**
> - **Mã tài liệu:** API-001
> - **Trạng thái:** Approved
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [UC-001](file:///d:/ai-learning-platform/docs/use-case/UC-001_Start_Learning_As_Guest.md), [UC-008](file:///d:/ai-learning-platform/docs/use-case/UC-008_Link_Guest_Account.md), [DB-002](file:///d:/ai-learning-platform/docs/database/DB-002_Authentication.md)

## Mục đích

Cung cấp các API phục vụ:

- Guest Mode
- Đăng ký
- Đăng nhập
- Liên kết Guest với tài khoản
- Làm mới Access Token

---

# Nguyên tắc

- RESTful API.
- JSON Request/Response.
- JWT Authentication.
- HTTPS bắt buộc.

---

# 1. Tạo Guest Session

## Endpoint

```http
POST /v1/auth/guest
```

### Mô tả

Tạo một Anonymous User để người dùng có thể học mà không cần đăng nhập.

### Request

```json
{}
```

### Response

```json
{
  "guestId": "guest_123456",
  "accessToken": "...",
  "expiresIn": 86400
}
```

---

# 2. Đăng ký

## Endpoint

```http
POST /v1/auth/register
```

### Request

```json
{
  "email": "user@example.com",
  "password": "********",
  "fullName": "Nguyễn Văn A"
}
```

### Response

```json
{
  "userId": "user_001",
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

# 3. Đăng nhập

## Endpoint

```http
POST /v1/auth/login
```

### Request

```json
{
  "email": "user@example.com",
  "password": "********"
}
```

### Response

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600
}
```

---

# 4. Liên kết Guest

## Endpoint

```http
POST /v1/auth/link-guest
```

### Request

```json
{
  "guestId": "guest_123456"
}
```

### Response

```json
{
  "success": true
}
```

---

# 5. Refresh Token

## Endpoint

```http
POST /v1/auth/refresh
```

### Request

```json
{
  "refreshToken": "..."
}
```

### Response

```json
{
  "accessToken": "...",
  "expiresIn": 3600
}
```

---

# Mã lỗi

| HTTP | Ý nghĩa              |
| ---- | -------------------- |
| 200  | Thành công           |
| 400  | Dữ liệu không hợp lệ |
| 401  | Chưa xác thực        |
| 403  | Không có quyền       |
| 404  | Không tìm thấy       |
| 500  | Lỗi hệ thống         |

---

# Tài liệu liên quan

- UC-001 – Bắt đầu học với Guest Mode
- UC-008 – Liên kết tài khoản Guest
