# ADR-007: Lựa chọn Tech Stack Frontend – React + Vite + TailwindCSS

> **Thông tin quản trị:**
> - **Mã tài liệu:** ADR-007
> - **Trạng thái:** Accepted
> - **Người quyết định:** Tech Lead
> - **Ngày quyết định:** 2026-06-28
> - **Tài liệu liên quan:** [Architecture](../Architecture.md)

## Bối cảnh

Cần chọn tech stack cho Web App (`apps/web`) và Admin Console (`apps/admin`).

## Quyết định

**React 19 + Vite + TailwindCSS v4 + React Query + Zustand**.

## Lý do

### React (không dùng Next.js)
- Hệ thống này là **SPA** (Single Page App) – không yêu cầu SSR hay SEO-heavy.
- Next.js thêm độ phức tạp không cần thiết cho dashboard app.
- Vite build nhanh hơn nhiều so với Next.js cho development.

### Vite
- Hot Module Replacement (HMR) nhanh nhất hiện tại.
- Build output tối ưu với Rollup.

### TailwindCSS v4
- Utility-first, không cần viết custom CSS nhiều.
- Design system consistency qua theme tokens.

### React Query (TanStack Query)
- Server state management tối ưu: caching, background refetch, optimistic updates.
- Giảm boilerplate so với Redux Toolkit Query.

### Zustand
- Client state management nhẹ (UI state, auth token).
- Đơn giản hơn Redux, đủ cho quy mô dự án.

## Đánh đổi

- Không có SSR → SEO kém hơn Next.js (chấp nhận được vì đây là app, không phải marketing site).
- Bundle size lớn hơn nếu không code-split kỹ → cần lazy loading aggressive.

## Tài liệu liên quan

- [Architecture](../Architecture.md)
- [ADR-006 Backend Stack](ADR-006_Tech_Stack_Backend.md)
