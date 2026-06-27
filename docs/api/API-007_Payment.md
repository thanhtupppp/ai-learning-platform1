# API-007 - Billing & Payment Service

## Mục đích

Cung cấp các API phục vụ quản lý gói cước (Plans), gói đăng ký hoạt động (Subscriptions), quyền hạn sử dụng tính năng nâng cao (Entitlements), hóa đơn thanh toán (Invoices) và các cổng thanh toán.

---

# Base URL

```text
/v1/billing
```

---

# Authentication

Mọi API ngoại trừ Webhook đều yêu cầu Access Token.

```http
Authorization: Bearer <access_token>
```

---

# 1. Lấy danh sách gói cước (Plans)

## Endpoint

```http
GET /v1/billing/plans
```

### Mô tả
Lấy danh sách các gói cước đang được cung cấp công khai trên hệ thống.

### Response

```json
{
  "plans": [
    {
      "id": "plan_monthly_pro",
      "code": "PRO_MONTHLY",
      "name": "PRO Thành Viên Tháng",
      "description": "Truy cập không giới hạn AI Tutor và các bài giảng nâng cao hàng tháng",
      "billingInterval": "MONTH",
      "priceAmount": 150000,
      "currency": "VND",
      "features": {
        "ai_tutor_limit": "unlimited",
        "advanced_lessons": true
      }
    },
    {
      "id": "plan_yearly_pro",
      "code": "PRO_YEARLY",
      "name": "PRO Thành Viên Năm",
      "description": "Truy cập không giới hạn AI Tutor và các bài giảng nâng cao trọn gói 1 năm",
      "billingInterval": "YEAR",
      "priceAmount": 1200000,
      "currency": "VND",
      "features": {
        "ai_tutor_limit": "unlimited",
        "advanced_lessons": true
      }
    }
  ]
}
```

---

# 2. Xem trạng thái gói đăng ký hiện tại (Subscription & Entitlements)

## Endpoint

```http
GET /v1/billing/subscription
```

### Mô tả
Lấy trạng thái gói cước đã đăng ký và các quyền hạn (Entitlements) đang có hiệu lực của người dùng hiện tại.

### Response

```json
{
  "subscription": {
    "id": "sub_abc123",
    "planId": "plan_monthly_pro",
    "planCode": "PRO_MONTHLY",
    "status": "ACTIVE",
    "currentPeriodStart": "2026-06-20T10:00:00Z",
    "currentPeriodEnd": "2026-07-20T10:00:00Z",
    "cancelAtPeriodEnd": false
  },
  "entitlements": [
    {
      "featureCode": "ai_tutor_limit",
      "status": "ACTIVE",
      "limitValue": -1,
      "validUntil": "2026-07-20T10:00:00Z"
    },
    {
      "featureCode": "advanced_lessons",
      "status": "ACTIVE",
      "limitValue": null,
      "validUntil": "2026-07-20T10:00:00Z"
    }
  ]
}
```

---

# 3. Tạo phiên thanh toán (Checkout Session)

## Endpoint

```http
POST /v1/billing/subscription/checkout
```

### Mô tả
Tạo phiên thanh toán mới thông qua cổng thanh toán đã chọn (Stripe, Momo, ZaloPay, v.v.). Trả về URL cổng thanh toán để client chuyển hướng người dùng.

### Request

```json
{
  "planId": "plan_monthly_pro",
  "provider": "MOMO",
  "returnUrl": "https://ailearning.com/payment/callback",
  "cancelUrl": "https://ailearning.com/payment/cancel"
}
```

### Response

```json
{
  "checkoutSessionId": "sess_xyz789",
  "paymentUrl": "https://test-payment.momo.vn/pay/checkout?id=sess_xyz789",
  "provider": "MOMO",
  "amount": 150000,
  "currency": "VND"
}
```

---

# 4. Hủy gia hạn gói cước

## Endpoint

```http
POST /v1/billing/subscription/cancel
```

### Mô tả
Hủy tự động gia hạn gói cước vào cuối chu kỳ. Người dùng vẫn giữ quyền truy cập (Entitlements) cho tới hết chu kỳ thanh toán hiện tại.

### Request

```json
{}
```

### Response

```json
{
  "subscriptionId": "sub_abc123",
  "status": "ACTIVE",
  "cancelAtPeriodEnd": true,
  "message": "Gói cước sẽ không tự động gia hạn và sẽ hết hạn vào ngày 2026-07-20."
}
```

---

# 5. Lịch sử hóa đơn (Invoices)

## Endpoint

```http
GET /v1/billing/invoices
```

### Mô tả
Lấy danh sách các hóa đơn đã phát hành cho người dùng hiện tại.

### Response

```json
{
  "invoices": [
    {
      "id": "inv_002",
      "number": "INV-2026-00045",
      "status": "PAID",
      "totalAmount": 150000,
      "currency": "VND",
      "paidAt": "2026-06-20T10:05:00Z",
      "createdAt": "2026-06-20T10:00:00Z"
    },
    {
      "id": "inv_001",
      "number": "INV-2026-00012",
      "status": "PAID",
      "totalAmount": 150000,
      "currency": "VND",
      "paidAt": "2026-05-20T10:05:00Z",
      "createdAt": "2026-05-20T10:00:00Z"
    }
  ]
}
```

---

# 6. Webhooks từ Cổng thanh toán (Provider Webhooks)

## Endpoint

```http
POST /v1/billing/webhooks/{provider}
```

### Mô tả
Endpoint công khai nhận callback/webhook từ cổng thanh toán đối tác (MOMO, STRIPE, v.v.). API này **không** yêu cầu JWT Access Token của user, thay vào đó xác thực dựa trên chữ ký (Signature) trong HTTP Header.

### Path Parameter
- `provider`: Tên provider viết thường (ví dụ: `stripe`, `momo`).

### HTTP Headers (Ví dụ Momo)
- `X-Momo-Signature`: Chữ ký hash SHA256 bảo mật.

### Request Body
Phụ thuộc hoàn toàn vào schema của từng Provider.

### Response
Trả về HTTP Status Code tương ứng (thường là 200 OK) kèm theo phản hồi cấu trúc của provider để xác nhận xử lý thành công.

---

# Quy tắc nghiệp vụ

- **Minor Unit**: Tiền tệ trong API được hiển thị theo Minor Unit đầy đủ (ở Việt Nam là giá trị tuyệt đối, đối với USD là cent, ví dụ $15.00 sẽ gửi 1500).
- **Entitlement Separation**: Client kiểm tra quyền truy cập của người dùng đối với các tính năng (như chat với AI, bài học VIP) qua mảng `entitlements` trong profile, tuyệt đối không kiểm tra trực tiếp trạng thái transaction hay check chu kỳ thanh toán từ client.
- **Idempotency**: Mọi API xử lý webhook hoặc nạp tiền đều được đảm bảo idempotent dựa trên mã giao dịch gốc của nhà cung cấp (`providerTransactionId`).

---

# Mã lỗi

| HTTP | Ý nghĩa |
| ---- | ------- |
| 200  | Thành công |
| 400  | Dữ liệu yêu cầu không hợp lệ hoặc sai cấu trúc |
| 401  | Chưa xác thực (thiếu JWT hoặc token hết hạn) |
| 403  | Không có quyền truy cập |
| 409  | Trạng thái xung đột (ví dụ: Đang có subscription ACTIVE khác nên không được mua gói mới) |
| 500  | Lỗi xử lý cổng thanh toán |

---

# Tài liệu liên quan

### Use Case
- UC-001 – Bắt đầu học với tư cách Guest
- UC-008 – Liên kết tài khoản Guest

### Database Design
- [DB-007 – Payment Domain](file:///d:/ai-learning-platform/docs/database/DB-007_Payment.md)
