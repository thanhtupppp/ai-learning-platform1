# ADR-006: Lựa chọn Tech Stack Backend – NestJS

> **Thông tin quản trị:**
> - **Mã tài liệu:** ADR-006
> - **Trạng thái:** Accepted
> - **Người quyết định:** Tech Lead
> - **Ngày quyết định:** 2026-06-28
> - **Tài liệu liên quan:** [Architecture](../Architecture.md), [ADR-002](ADR-002_Modular_Monolith.md)

## Bối cảnh

Cần chọn framework cho Backend API. Hai lựa chọn chính được cân nhắc: **NestJS (TypeScript)** và **Go (Gin/Fiber)**.

## Quyết định

**Chọn NestJS (TypeScript)**.

## Lý do

1. **TypeScript end-to-end**: Dùng chung types với frontend qua `packages/shared` → giảm lỗi interface mismatch.
2. **Modular architecture built-in**: NestJS có module system phù hợp với Modular Monolith.
3. **Ecosystem**: Thư viện phong phú (Prisma, Passport, Bull, WebSocket).
4. **Onboarding nhanh**: Team có background TypeScript, không cần học Go.
5. **Testing support**: @nestjs/testing, Jest tích hợp tốt.

## Đánh đổi (Trade-offs)

- **Performance**: Go nhanh hơn NestJS về raw throughput, nhưng với học platform không có yêu cầu high-frequency trading.
- **Memory**: NestJS consume nhiều RAM hơn Go.
- **Revisit**: Nếu system cần xử lý > 10,000 req/s sustained, xem xét migrate hot modules sang Go microservice.

## ORM

**Chọn Prisma** thay vì TypeORM vì:
- Schema-first approach, type-safe queries.
- Migration system tốt hơn.
- Query builder trực quan hơn.

## Tài liệu liên quan

- [Architecture](../Architecture.md)
- [ADR-002 Modular Monolith](ADR-002_Modular_Monolith.md)
