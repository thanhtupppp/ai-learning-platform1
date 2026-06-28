# UI-002 – Design Foundations

> **Thông tin quản trị:**
> - **Mã tài liệu:** UI-002
> - **Trạng thái:** Approved
> - **Người sở hữu:** Frontend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [UI-001](file:///d:/ai-learning-platform/docs/ui/UI-001_First_Learning_Experience.md)

## Mục tiêu

Định nghĩa baseline đủ để Flutter bootstrap nhất quán mà chưa khóa visual brand quá sớm.

## Token bắt buộc

- Color: semantic roles (`primary`, `surface`, `success`, `warning`, `error`, `on*`).
- Typography: display, title, body, label.
- Spacing: thang 4-point.
- Radius, elevation và motion duration.
- Breakpoints cho mobile/tablet/web khi cần.

Không hard-code màu/khoảng cách trong feature widget nếu đã có token.

## Component baseline

- App scaffold và navigation shell.
- Primary/secondary/text button.
- Text field, password field và validation message.
- Card/list tile.
- Loading, empty, error và offline state.
- Progress và mastery indicator.
- Modal/dialog/snackbar.
- Content block renderer.
- Quiz option và result feedback.

## Theme

- Light theme bắt buộc Sprint 1.
- Dark theme có thể hoãn nhưng token phải không cản trở.
- Semantic color không gắn trực tiếp với một shade cụ thể trong feature code.

## Responsive

Mobile là target chính. Nội dung có max width trên màn hình lớn; không kéo dài text toàn viewport. Navigation pattern có thể đổi theo breakpoint nhưng route semantics giữ nguyên.

## Localization

User-facing string nằm trong localization resources. Baseline ngôn ngữ: tiếng Việt; cấu trúc phải cho phép thêm tiếng Anh.

