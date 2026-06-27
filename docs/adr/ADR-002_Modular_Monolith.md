# ADR-002 – Modular Monolith cho Backend

## Trạng thái

**Đã chốt**

## Bối cảnh

Dự án có nhiều domain nhưng đội ngũ và lưu lượng ban đầu chưa đủ để biện minh cho chi phí vận hành microservices.

## Quyết định

Backend giai đoạn đầu được triển khai dưới dạng Modular Monolith. Mỗi module có:

- Public application interface.
- Domain model và invariant riêng.
- Repository abstraction riêng.
- Migration và ownership dữ liệu rõ ràng.
- Không truy cập repository nội bộ của module khác.

Giao tiếp đồng bộ qua application interface; side effect liên module dùng domain/integration event khi cần tách transaction.

## Hệ quả tích cực

- Deploy, debug và transaction đơn giản hơn.
- Giữ ranh giới domain để có thể tách service sau này.
- Không phải vận hành distributed system quá sớm.

## Đánh đổi

- Cần enforcement trong code review để tránh coupling.
- Scale độc lập từng module chưa có ngay.
- Một deployment lỗi có thể ảnh hưởng toàn backend.

## Điều kiện xem xét tách service

Chỉ tách khi có bằng chứng về nhu cầu scale độc lập, ownership đội ngũ, isolation bảo mật hoặc release cadence khác biệt.

