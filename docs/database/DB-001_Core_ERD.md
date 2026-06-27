# DB-001 – Core ERD

## Thông tin

- **Mã:** DB-001
- **Tên:** Core Entity Relationship Diagram
- **Trạng thái:** Draft
- **Liên quan:** PRD-001, UJ-001, UC-001 → UC-008

---

# Mục tiêu

Thiết kế mô hình dữ liệu tổng thể cho AI Learning Platform.

Tài liệu này xác định:

- Các Domain chính.
- Các Entity.
- Quan hệ giữa các Entity.
- Quy tắc thiết kế chung.

DB-001 là nền tảng để xây dựng các tài liệu Database tiếp theo.

---

# Database Domains

- Authentication
- Learning
- AI
- Quiz
- Gamification
- Payment
- System

---

# High-Level ERD

(ERD tổng thể sẽ được bổ sung)

---

# Entity List

## Authentication

- User
- Role
- Permission
- UserRole
- Session
- RefreshToken
- OAuthAccount

## Learning

- Subject
- Course
- Section
- Lesson
- LessonContent
- Enrollment
- LearningPath
- LearningPathCourse
- LessonProgress

## AI

- AIConversation
- AIMessage
- PromptTemplate
- AIUsage
- TokenUsage
- AIModel

## Quiz

- Quiz
- Question
- AnswerOption
- QuizAttempt
- QuizAnswer
- QuizResult

## Gamification

- Badge
- UserBadge
- Achievement
- XPHistory
- DailyStreak

## Payment

- Plan
- Subscription
- Invoice
- Payment
- Coupon

## System

- Notification
- File
- AuditLog
- ActivityLog
- Setting

---

# Design Rules

## Primary Key

UUID.

## Timestamp

- createdAt
- updatedAt

## Soft Delete

deletedAt

## Audit

- createdBy
- updatedBy

## Status

Enum.

---

# Sprint Output

Sau khi DB-001 được phê duyệt sẽ triển khai:

- DB-002 Authentication
- DB-003 Learning
- DB-004 AI
- DB-005 Quiz
- DB-006 Gamification
- DB-007 Payment

Sau đó mới sinh:

- database.md
- schema.prisma
- migration SQL
