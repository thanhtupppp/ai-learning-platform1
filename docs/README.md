# AI Learning Platform Documentation

Thư mục `docs/` là nguồn sự thật chính thức cho yêu cầu sản phẩm, kiến trúc, API, dữ liệu, AI và trải nghiệm người dùng.

## Thứ tự đọc

1. [Project Bible](PROJECT_BIBLE.md)
2. [Vision](vision/VISION-001_AI_Learning_OS.md)
3. [Architecture](Architecture.md)
4. [Glossary](Glossary.md)
5. [PRD-001](prd/PRD-001_First_Learning_Experience.md)
6. [UJ-001](user-journey/UJ-001_First_Learning_Experience.md)
7. [Use Cases](use-case/README.md)
8. [Technical Specifications](spec/README.md)
9. [API Contracts](api/README.md)
10. [Database Designs](database/README.md)
11. [AI Designs](ai/README.md)
12. [UI Designs](ui/README.md)
13. [Roadmap](roadmap/ROADMAP.md)

## Cấu trúc

```text
docs/
├── vision/         # Tầm nhìn và chiến lược sản phẩm
├── adr/            # Architecture Decision Records
├── prd/            # Product Requirement Documents
├── user-journey/   # Hành trình người dùng
├── use-case/       # Luồng nghiệp vụ và acceptance criteria
├── spec/           # Đặc tả kỹ thuật triển khai
├── api/            # API conventions và contracts
├── database/       # Thiết kế dữ liệu theo domain
├── ai/             # AI Gateway, RAG và evaluation
├── ui/             # Screen flow và trạng thái giao diện
├── roadmap/        # Milestone và phạm vi sprint
├── templates/      # Mẫu tài liệu
└── meeting/        # Biên bản quyết định theo phiên làm việc
```

## Traceability

Mọi tính năng phải truy vết được theo chuỗi:

```text
Vision → PRD → User Journey → Use Case → SPEC → API/UI → Database → Code → Test
```

Thay đổi kiến trúc phải có ADR. Thay đổi contract phải cập nhật tài liệu liên quan trong cùng pull request.

## Trạng thái

- Sprint 0: Documentation and repository bootstrap.
- Sprint 1: First Learning Experience.
- Code chưa bắt đầu; tài liệu Sprint 1 là baseline để triển khai.
