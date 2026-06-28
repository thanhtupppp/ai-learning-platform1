# UC-009: Đăng ký tài khoản

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-009
> - **Trạng thái:** Draft
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [UC-008](UC-008_Link_Guest_Account.md), [API-001](../api/API-001_Authentication.md)

## Mô tả

Người dùng đăng ký tài khoản mới bằng email/password hoặc OAuth (Google, Apple).

---

## Actors

- **Primary**: Guest User / New Learner

---

## Preconditions

- Người dùng chưa có tài khoản.
- Hệ thống sẵn sàng (API hoạt động, email service online).

---

## Main Flow

1. Người dùng chọn "Đăng ký" trên màn hình Auth.
2. Hệ thống hiển thị form: email, password, confirm password.
3. Người dùng nhập thông tin và submit.
4. Hệ thống validate:
   - Email hợp lệ, chưa tồn tại trong hệ thống.
   - Password ≥ 8 ký tự, có chữ hoa, chữ thường, số.
5. Hệ thống tạo tài khoản với trạng thái `UNVERIFIED`.
6. Hệ thống gửi email xác minh.
7. Người dùng kiểm tra email và click link xác minh.
8. Hệ thống cập nhật trạng thái tài khoản thành `ACTIVE`.
9. Người dùng được redirect về trang chính và đăng nhập.

---

## Alternative Flows

### A1: Đăng ký bằng Google OAuth

1. Người dùng chọn "Tiếp tục với Google".
2. Hệ thống redirect sang Google OAuth.
3. Người dùng xác nhận trên Google.
4. Hệ thống nhận access token, tạo tài khoản với trạng thái `ACTIVE` (không cần xác minh email).
5. Nếu email đã tồn tại → link OAuth provider vào tài khoản hiện có.

### A2: Email đã tồn tại

1. Ở bước 4, hệ thống phát hiện email đã tồn tại.
2. Hiển thị thông báo: "Email đã được sử dụng. Đăng nhập ngay?"
3. Cung cấp link dẫn đến trang đăng nhập.

---

## Postconditions

- Tài khoản người dùng được tạo trong hệ thống.
- Nếu trước đó là Guest → tiến độ học tập được giữ lại (xem UC-008).
- Email xác minh được gửi (với email/password flow).

---

## Exceptions

| Tình huống | Xử lý |
|-----------|-------|
| Email server offline | Tạo tài khoản thành công, retry gửi email sau 5 phút |
| Password không đủ mạnh | Hiển thị inline error, không submit |
| Rate limit vượt quá | Trả về HTTP 429, block 15 phút |
