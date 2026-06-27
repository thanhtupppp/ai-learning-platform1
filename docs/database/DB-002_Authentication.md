# DB-002 – Authentication Domain

## Thông tin

- **Mã:** DB-002
- **Tên:** Authentication Domain
- **Trạng thái:** Draft
- **Liên quan:** DB-001, PRD-001, UC-001, UC-008

---

# Mục tiêu

Thiết kế mô hình dữ liệu cho miền Authentication.

Authentication Domain chịu trách nhiệm:

- Quản lý người dùng.
- Xác thực.
- Phân quyền.
- Phiên đăng nhập.
- Guest Mode.
- OAuth.
- Refresh Token.

---

# Phạm vi

Bao gồm các Entity:

- User
- Role
- Permission
- UserRole
- Session
- RefreshToken
- OAuthAccount

---

# Entity Overview

```text
User
 ├── UserRole
 │      ├── Role
 │      └── Permission
 │
 ├── Session
 ├── RefreshToken
 └── OAuthAccount
```

---

# Entity: User

## Mô tả

Đại diện cho một người dùng trong hệ thống.

Bao gồm:

- Guest User
- Registered User
- Admin

## Quan hệ

```text
User
 ├── 1:N Session
 ├── 1:N RefreshToken
 ├── 1:N OAuthAccount
 └── N:N Role
```

---

# Entity: Role

## Mô tả

Nhóm quyền của người dùng.

Ví dụ:

- ADMIN
- USER
- MODERATOR

Quan hệ:

```text
Role

N:N User

N:N Permission
```

---

# Entity: Permission

## Mô tả

Một quyền cụ thể trong hệ thống.

Ví dụ:

- lesson.read
- lesson.write
- quiz.manage
- admin.access

Permission được gán thông qua Role.

---

# Entity: UserRole

## Mô tả

Bảng trung gian giữa User và Role.

Quan hệ:

```text
User
   ▲
   │
UserRole
   │
   ▼
Role
```

---

# Entity: Session

## Mô tả

Lưu phiên đăng nhập của người dùng.

Mỗi thiết bị sẽ tạo một Session riêng.

Ví dụ:

- Android
- iPhone
- Web
- Tablet

---

# Entity: RefreshToken

## Mô tả

Quản lý Refresh Token phục vụ JWT Authentication.

Một Session có thể phát sinh nhiều Refresh Token theo chính sách xoay vòng (rotation).

---

# Entity: OAuthAccount

## Mô tả

Liên kết tài khoản với nhà cung cấp đăng nhập.

Ví dụ:

- Google
- Apple
- GitHub

Một User có thể liên kết nhiều OAuth Provider.

---

# Guest Mode

Authentication hỗ trợ Guest Mode.

Luồng:

```text
Mở ứng dụng
        ↓
Tạo Guest User
        ↓
Học tập
        ↓
Đăng nhập
        ↓
Liên kết dữ liệu
        ↓
Guest → Registered User
```

Guest User sẽ được nâng cấp thành Registered User khi người dùng đăng nhập hoặc đăng ký, giúp giữ nguyên Learning Path, tiến độ học, lịch sử AI và kết quả Quiz.

---

# Authentication Flow

```text
Đăng nhập

↓

Kiểm tra thông tin

↓

Tạo Session

↓

Sinh Access Token

↓

Sinh Refresh Token

↓

Trả về Client
```

---

# Relationship Summary

| Entity | Relationship     |
| ------ | ---------------- |
| User   | 1:N Session      |
| User   | 1:N RefreshToken |
| User   | 1:N OAuthAccount |
| User   | N:N Role         |
| Role   | N:N Permission   |

---

# Design Rules

## Primary Key

- UUID

## Timestamp

- createdAt
- updatedAt

## Soft Delete

- deletedAt

## Audit

- createdBy
- updatedBy

## Status

- ACTIVE
- INACTIVE
- SUSPENDED

---

# Ngoài phạm vi

Các nội dung sau sẽ được thiết kế ở tài liệu khác:

- User Profile → DB-003
- Learning Progress → DB-003
- AI Conversation → DB-004
- Quiz History → DB-005

---

# Sprint Output

Sau khi DB-002 được phê duyệt:

- Thiết kế chi tiết các bảng Authentication.
- Định nghĩa cột, kiểu dữ liệu, khóa chính/khóa ngoại.
- Thiết kế Index và Constraint.
- Sinh Prisma Schema.
- Sinh Migration SQL.
