# Kiến trúc hệ thống

## Giới thiệu

AI Learning Platform được thiết kế theo kiến trúc **Modular Monolith** trong giai đoạn đầu để tối ưu tốc độ phát triển, dễ bảo trì và có khả năng mở rộng thành Microservices trong tương lai.

---

# Triết lý kiến trúc

Dự án tuân theo các nguyên tắc:

- Learner First
- AI First
- Knowledge Centric
- Documentation First
- API First

---

# Kiến trúc tổng thể

App

↓

API

↓

Modules

↓

Database

↓

AI Gateway

↓

LLM

---

# Các module chính

- Identity
- Subject
- Content
- Knowledge
- Assessment
- Learning
- AI
- Recommendation
- Analytics
- Notification
- Search
- Media
- System

---

# AI

Ứng dụng không giao tiếp trực tiếp với LLM.

Mọi yêu cầu đều đi qua:

AI Gateway

↓

Model Selector

↓

9Router

↓

LLM

---

# Dữ liệu

Hệ thống sử dụng PostgreSQL làm cơ sở dữ liệu chính.

Vector Search sử dụng pgvector.

Redis được dùng cho Cache.

Object Storage dùng MinIO hoặc S3.

---

# Ứng dụng

apps/

- mobile
- admin
- web

---

# Backend

services/

- api
- ai-gateway
- worker

---

# Documentation

Mọi quyết định kỹ thuật phải được ghi nhận bằng ADR.

Mọi yêu cầu sản phẩm phải được ghi nhận bằng PRD.

Mọi đặc tả triển khai phải được ghi nhận bằng SPEC.

---

# Nguyên tắc

Không viết code nếu chưa có:

- PRD
- User Journey
- API Contract
