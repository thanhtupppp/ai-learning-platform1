# ADR-004 – Guest-first Identity

> **Thông tin quản trị:**
> - **Mã tài liệu:** ADR-004
> - **Trạng thái:** Approved
> - **Người sở hữu:** Product Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UC-001](file:///d:/ai-learning-platform/docs/use-case/UC-001_Start_Learning_As_Guest.md)

## Bối cảnh

Yêu cầu đăng ký trước khi người dùng nhận giá trị làm tăng ma sát onboarding. Sprint 1 cần cho phép học ngay và liên kết tài khoản sau.

## Quyết định

Hệ thống tạo Anonymous User/session trước khi đăng nhập. Dữ liệu học được gắn với identity này và được chuyển quyền sở hữu khi account linking thành công.

Account linking phải:

- Idempotent.
- Không làm mất Learning Path, Progress, AI Conversation hoặc Quiz Attempt.
- Phát hiện xung đột khi tài khoản đích đã có dữ liệu.
- Có audit trail.

## Hệ quả

- Time to First Value thấp hơn.
- Identity merge phức tạp hơn và cần transaction rõ ràng.
- Thiết bị mất local credential trước khi liên kết có thể làm mất khả năng truy cập guest data.

