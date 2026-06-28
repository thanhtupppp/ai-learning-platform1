# Sprint 4 (Milestone 4) – Monetization

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-004
> - **Trạng théi:** 📋 Planned
> - **Người sở hữu:** Product Lead / Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Prerequisite:** Sprint 3 + giá trị sản phẩm được xác thực (validated by metrics)
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md), [UC-012](../use-case/UC-012_Purchase_Premium.md)

## Mục tiêu

Triển khai hệ thống Subscription và Entitlement cho phép tạo doanh thu, có paywall rõ ràng, tích hợp payment gateway VNPay + Stripe.

> ⚠️ **Chỉ bắt đầu sau khi pricing và value proposition được xác thực bằng dữ liệu thực tế từ Sprint 2–3.**

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 4A | 2 tuần | Subscription backend + Entitlement |
| Sprint 4B | 2 tuần | Payment integration + UI + Testing |
| Sprint 4 Review | Cuối tuần 4 | End-to-end payment test |

---

## Scope

### Backend (`services/api`)

- [ ] **Plan & Entitlement System**:
  - Định nghĩa các plan: Free / Basic / Premium.
  - Entitlement check middleware: kiểm tra feature access theo plan.
  - Paywall API: trả về `403 + upgrade_url` khi vượt limit.
- [ ] **Subscription Management**:
  - Tạo/gia hạn/hủy subscription.
  - Auto-renewal logic.
  - Grace period (3 ngày) khi payment fail.
- [ ] **Payment Integration**:
  - VNPay (thanh toán nội địa – priority).
  - Stripe (quốc tế).
  - Webhook handler với idempotency key.
  - Refund flow (manual via admin).
- [ ] **Invoice & Receipt**:
  - Tạo PDF invoice.
  - Gửi email xác nhận sau thanh toán thành công.
- [ ] **Trial Period**: 7 ngày Premium miễn phí khi đăng ký mới.

### Web App (`apps/web`)

- [ ] Trang Pricing: so sánh các gói.
- [ ] Paywall component (modal + full-page).
- [ ] Checkout flow: chọn gói → thanh toán → xác nhận.
- [ ] Trang quản lý subscription (renew, cancel, billing history).

### Mobile App (`apps/mobile`)

- [ ] In-app purchase flow (Apple IAP + Google Play Billing).
- [ ] Paywall screen theo context.

### Admin Console (`apps/admin`)

- [ ] Revenue dashboard: MRR, ARR, churn rate.
- [ ] Manual refund tool.
- [ ] User subscription management.

---

## Plan Feature Matrix

| Feature | Free | Basic | Premium |
|---------|------|-------|--------|
| Subjects | 1 | 3 | Unlimited |
| AI Tutor calls/day | 5 | 30 | Unlimited |
| Learning Path | Basic | Standard | Personalized AI |
| Streak Freeze | ✘ | ✘ | 1/week |
| Offline Mode | ✘ | ✘ | ✔ |
| Priority Support | ✘ | ✘ | ✔ |

---

## Success Metrics

| Metric | Mục tiêu (Tháng 1) |
|--------|-------------------|
| Conversion Free → Paid | ≥ 3% |
| MRR | ≥ $500 |
| Payment success rate | ≥ 95% |
| Churn rate (monthly) | ≤ 10% |

---

## Security Requirements

- PCI DSS compliance: không lưu thông tin thẻ.
- Webhook signature verification bắt buộc.
- Audit log cho mọi giao dịch.

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [UC-012 Purchase Premium](../use-case/UC-012_Purchase_Premium.md)
- [API-007 Payment](../api/API-007_Payment.md)
- [DB-007 Payment](../database/DB-007_Payment.md)
