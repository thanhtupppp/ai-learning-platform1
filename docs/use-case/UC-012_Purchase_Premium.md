# UC-012: Mua gói Premium

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-012
> - **Trạng thái:** Draft
> - **Người sở hữu:** Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [API-007](../api/API-007_Payment.md), [DB-007](../database/DB-007_Payment.md)

## Mô tả

Learner nâng cấp lên gói Premium để mở khóa tính năng AI không giới hạn và nội dung độc quyền.

---

## Actors

- **Primary**: Free Learner
- **Secondary**: Payment Gateway (VNPay / Stripe)

---

## Preconditions

- Người dùng đã đăng nhập (không áp dụng cho Guest).
- Người dùng đang ở plan Free hoặc Basic.

---

## Main Flow

1. Người dùng vào trang "Nâng cấp" hoặc gặp paywall khi dùng tính năng Premium.
2. Hệ thống hiển thị bảng so sánh các gói (Free / Basic / Premium).
3. Người dùng chọn gói và chu kỳ thanh toán (monthly / yearly).
4. Người dùng chọn phương thức thanh toán (VNPay, Momo, Visa/Mastercard).
5. Hệ thống tạo payment session và redirect đến payment gateway.
6. Người dùng hoàn tất thanh toán trên gateway.
7. Gateway gửi webhook về hệ thống.
8. Hệ thống verify webhook, cập nhật subscription.
9. Người dùng nhận thông báo và email xác nhận.
10. Plan của người dùng được cập nhật ngay lập tức.

---

## Alternative Flows

### A1: Thanh toán thất bại

1. Gateway trả về failure.
2. Hệ thống hiển thị thông báo lỗi cụ thể.
3. Người dùng có thể thử lại với phương thức khác.
4. Không charge tiền người dùng.

### A2: Hủy subscription

1. Người dùng vào cài đặt tài khoản → "Quản lý gói".
2. Chọn "Hủy gia hạn".
3. Hệ thống xác nhận: gói vẫn active đến hết chu kỳ hiện tại.
4. Sau ngày hết hạn, tự động xuống Free plan.

---

## Postconditions

- Subscription record được tạo trong database.
- User plan được cập nhật.
- Email xác nhận được gửi.
- AI call limits được reset theo plan mới.

---

## Security Requirements

- Không lưu thông tin thẻ tín dụng trực tiếp trong database.
- Verify webhook signature trước khi xử lý.
- Idempotency key cho mọi payment request.
