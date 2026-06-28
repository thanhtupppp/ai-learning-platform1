# UC-010: Đăng nhập

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-010
> - **Trạng thái:** Draft
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [UC-009](UC-009_Register_Account.md), [API-001](../api/API-001_Authentication.md)

## Mô tả

Người dùng có tài khoản đăng nhập vào hệ thống để tiếp tục học.

---

## Actors

- **Primary**: Registered Learner

---

## Preconditions

- Người dùng đã có tài khoản đã được xác minh.

---

## Main Flow

1. Người dùng mở app/web.
2. Chọn "Đăng nhập".
3. Nhập email và password.
4. Hệ thống xác thực thông tin đăng nhập.
5. Hệ thống tạo JWT access token (7 ngày) và refresh token (30 ngày).
6. Người dùng được chuyển về màn hình Dashboard.
7. Hệ thống tải lại tiến độ học tập của người dùng.

---

## Alternative Flows

### A1: Đăng nhập bằng Google

1. Chọn "Tiếp tục với Google".
2. OAuth flow tương tự UC-009 A1.

### A2: Quên mật khẩu

1. Chọn "Quên mật khẩu".
2. Nhập email.
3. Hệ thống gửi link reset password (hết hạn sau 1 giờ).
4. Người dùng click link → đặt mật khẩu mới.

---

## Exceptions

| Tình huống | Xử lý |
|-----------|-------|
| Sai mật khẩu | Hiển thị lỗi chung, không tiết lộ email có tồn tại hay không |
| Tài khoản bị khóa | Hiển thị thông báo, hướng dẫn liên hệ support |
| Đăng nhập sai 5 lần | Lock 15 phút, gửi email cảnh báo |
