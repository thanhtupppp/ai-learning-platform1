# AI Learning Platform Documentation Portal

Chào mừng bạn đến với Cổng thông tin tài liệu chính thức của **AI Learning Platform**. Thư mục này là "nguồn sự thật duy nhất" (Single Source of Truth) định nghĩa toàn bộ yêu cầu sản phẩm, hành trình trải nghiệm, đặc tả kỹ thuật, API và cơ sở dữ liệu của dự án.

---

## 🧭 Bắt đầu từ đây (Start Here)

Nếu bạn là thành viên mới gia nhập dự án, hãy bắt đầu đọc 5 tài liệu nền tảng sau:

1. **[Project Bible](PROJECT_BIBLE.md)**: Tổng quan mục tiêu, sứ mệnh, nguyên tắc sản phẩm và cấu trúc sprint.
2. **[Vision - AI Learning OS](vision/VISION-001_AI_Learning_OS.md)**: Chiến lược sản phẩm dài hạn và mô hình trợ lý học tập AI.
3. **[Kiến trúc hệ thống](Architecture.md)**: Tổng quan kiến trúc Modular Monolith, AI Gateway và cấu trúc mã nguồn.
4. **[Quy chuẩn soạn thảo tài liệu](Documentation_Standards.md)**: Hướng dẫn quản trị tài liệu, quy ước đặt tên và metadata.
5. **[Thuật ngữ dự án (Glossary)](Glossary.md)**: Định nghĩa các thuật ngữ nghiệp vụ cốt lõi như Knowledge Unit, Mastery, AI Tutor.

---

## 👥 Định hướng theo vai trò (Role-based Navigation)

Tìm kiếm và tập trung vào các tài liệu quan trọng nhất đối với vai trò của bạn:

### Product Owner / Business Analyst
- [PRD-001 – Trải nghiệm học đầu tiên](prd/PRD-001_First_Learning_Experience.md)
- [Product & Engineering Roadmap](roadmap/ROADMAP.md)
- [User Journey - Trải nghiệm học đầu tiên](user-journey/UJ-001_First_Learning_Experience.md)

### Backend Engineer
- [Kiến trúc hệ thống](Architecture.md)
- [Quyết định kiến trúc (ADRs)](adr/README.md)
- [Đặc tả kỹ thuật (Specs)](spec/README.md)
- [Tài liệu API Contracts](api/README.md)
- [Thiết kế Cơ sở dữ liệu (Database Designs)](database/README.md)

### Frontend / Mobile Engineer
- [User Journey - Trải nghiệm học đầu tiên](user-journey/UJ-001_First_Learning_Experience.md)
- [Luồng nghiệp vụ chi tiết (Use Cases)](use-case/README.md)
- [Đặc tả kỹ thuật (Specs)](spec/README.md)
- [Tài liệu API Contracts](api/README.md)
- [Thiết kế Giao diện & Screen Flows (UI Designs)](ui/README.md)

### AI Engineer
- [Thiết kế AI - AI Gateway & RAG](ai/README.md)
- [Đặc tả kỹ thuật (Specs)](spec/README.md)
- [Đặc tả API AI Tutor](api/API-003_AI_Tutor.md)
- [Thiết kế dữ liệu vector RAG](database/DB-010_RAG.md)

---

## 📂 Phân loại theo Domain (Domain Directories)

- **[vision/](vision/README.md)**: Tầm nhìn, định vị và chiến lược phát triển sản phẩm.
- **[prd/](prd/README.md)**: Product Requirement Documents (Yêu cầu nghiệp vụ chi tiết).
- **[user-journey/](user-journey/README.md)**: Hành trình trải nghiệm đầu cuối của người học.
- **[use-case/](use-case/README.md)**: Luồng nghiệp vụ chi tiết, kịch bản lỗi và tiêu chí hoàn thành.
- **[spec/](spec/README.md)**: Đặc tả kỹ thuật, state machine của client và sự kiện tích hợp.
- **[api/](api/README.md)**: API Conventions và API Contracts chuẩn RESTful.
- **[database/](database/README.md)**: Mô hình dữ liệu quan hệ (ERD) và thiết kế chi tiết theo domain.
- **[ai/](ai/README.md)**: Thiết kế AI Gateway, Prompt templates, RAG và an toàn dữ liệu.
- **[ui/](ui/README.md)**: Sơ đồ luồng giao diện, thiết kế màn hình và Design Foundations.
- **[roadmap/](roadmap/README.md)**: Lộ trình sản phẩm, phạm vi Sprint và tiêu chuẩn nghiệm thu.
- **[adr/](adr/README.md)**: Architecture Decision Records (Quyết định kiến trúc hệ thống).

---

## 🔗 Ánh xạ mã nguồn và Tài liệu (Code-Docs Mapping)

Bảng giúp liên kết trực tiếp giữa các thư mục mã nguồn và tài liệu đặc tả tương ứng:

| Thư mục code | Tài liệu liên quan | Trách nhiệm chính |
| --- | --- | --- |
| `apps/mobile/` | [UI-001](ui/UI-001_First_Learning_Experience.md), [UJ-001](user-journey/UJ-001_First_Learning_Experience.md), [Use Cases](use-case/README.md) | Frontend / Mobile Team |
| `apps/web/` & `apps/admin/` | [Design Foundations](ui/UI-002_Design_Foundations.md), [Use Cases](use-case/README.md) | Frontend Team |
| `services/api/` | [Architecture](Architecture.md), [Specs](spec/README.md), [API Contracts](api/README.md), [Database](database/README.md) | Backend Team |
| `services/ai-gateway/` | [AI Gateway Spec](ai/AI-001_AI_Gateway.md), [AI Tutor API](api/API-003_AI_Tutor.md) | AI Team |
| `services/worker/` | [Integration Events](spec/SPEC-003_Integration_Events.md), [Database Standard](database/DB-008_database.md) | Backend Team |

---

## 📊 Trạng thái quản trị tài liệu (Document Maturity Matrix)

Bảng tổng hợp trạng thái thực tế và chủ sở hữu của các tài liệu cốt lõi:

| Mã | Tên tài liệu | Chủ sở hữu | Trạng thái | Cập nhật cuối |
| --- | --- | --- | --- | --- |
| **BIBLE** | [Project Bible](PROJECT_BIBLE.md) | Product Team | Approved | 2026-06-28 |
| **ARCH** | [Kiến trúc hệ thống](Architecture.md) | Backend Team | Approved | 2026-06-28 |
| **STND** | [Quy chuẩn soạn thảo tài liệu](Documentation_Standards.md) | Quality Team | Approved | 2026-06-28 |
| **ROAD** | [Product & Engineering Roadmap](roadmap/ROADMAP.md) | Product Team | Approved | 2026-06-28 |
| **PRD-001**| [Trải nghiệm học đầu tiên](prd/PRD-001_First_Learning_Experience.md) | Product Team | Approved | 2026-06-28 |
| **UJ-001** | [Hành trình học đầu tiên](user-journey/UJ-001_First_Learning_Experience.md)| Product Team | Approved | 2026-06-28 |
| **SPEC-001**| [Đặc tả kỹ thuật Sprint 1](spec/SPEC-001_First_Learning_Experience.md) | Backend Team | Approved | 2026-06-28 |
| **DB-001** | [Core ERD](database/DB-001_Core_ERD.md) | Backend Team | Approved | 2026-06-28 |
| **DB-011** | [System Domain](database/DB-011_System.md) | Backend Team | Approved | 2026-06-28 |
| **API-006**| [Gamification API](api/API-006_Gamification.md) | Backend Team | Approved | 2026-06-28 |
| **API-007**| [Payment API](api/API-007_Payment.md) | Backend Team | Approved | 2026-06-28 |

---

## 📈 Quy trình truy vết (Traceability)

Hệ thống tài liệu tuân thủ quy tắc truy vết chặt chẽ từ trên xuống dưới:

```text
Vision (Tầm nhìn)
   │
   ▼
PRD (Yêu cầu sản phẩm)
   │
   ▼
User Journey (Hành trình trải nghiệm)
   │
   ▼
Use Case (Luồng nghiệp vụ)
   │
   ▼
SPEC (Đặc tả kỹ thuật) ─── API & UI (Contracts & Giao diện)
   │
   ▼
Database (Mô hình dữ liệu)
   │
   ▼
Code (Mã nguồn triển khai)
   │
   ▼
Test (Kịch bản kiểm thử)
```
Mọi thay đổi đối với code/database ở dưới phải truy vết được lý do thay đổi từ PRD/Use Case ở trên.
