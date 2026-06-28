# AI Learning Platform (AI-first Personalized Learning OS)

Chào mừng bạn đến với **AI Learning Platform** – Hệ điều hành học tập cá nhân hóa ứng dụng AI. Nền tảng được thiết kế nhằm giúp người học hiểu sâu hơn, nhớ lâu hơn và đạt mục tiêu học tập thông qua lộ trình học thích ứng và sự trợ giúp trực tiếp của AI Tutor.

---

## 🚀 Tầm nhìn dự án

Xây dựng một **AI Learning OS** đóng vai trò như người bạn đồng hành thông minh của người học. Hệ thống không chỉ cung cấp nội dung học chính thống mà còn chủ động đánh giá mức độ thành thạo (Mastery), phát hiện lỗ hổng kiến thức và đề xuất lộ trình ôn tập cá nhân hóa theo thời gian thực.

---

## 🏗️ Cấu trúc Monorepo

Dự án áp dụng mô hình Monorepo chứa toàn bộ ứng dụng khách, dịch vụ backend và thư viện dùng chung:

```text
ai-learning-platform/
├── apps/
│   ├── mobile/         # Ứng dụng di động dành cho người học (Flutter)
│   ├── web/            # Ứng dụng web dành cho học sinh/giáo viên (React/Vite)
│   └── admin/          # Bảng quản trị hệ thống và CMS nội dung (React/Vite)
├── services/
│   ├── api/            # Backend API chính (Modular Monolith - NestJS/Go)
│   ├── ai-gateway/     # AI Gateway điều phối LLM, RAG và Prompts
│   └── worker/         # Xử lý hàng đợi tác vụ nền và Sự kiện tích hợp
├── packages/
│   └── shared/         # Các gói tiện ích, schema validation và contract chung
├── docs/               # Toàn bộ tài liệu nghiệp vụ, API, Database và Kiến trúc
└── infrastructure/     # Cấu hình Docker, CI/CD, Deployment và Telemetry
```

### Trạng thái phát triển (Development Status)

| Thành phần | Đường dẫn | Trạng thái | Ghi chú |
| --- | --- | --- | --- |
| **Documentation** | `docs/` | 🚧 Sprint 0 Baseline | Hoàn thiện khung đặc tả trước khi code |
| **Mobile Client** | `apps/mobile/` | ⏳ Chưa bắt đầu | Flutter App (Target: Sprint 1) |
| **Web Client** | `apps/web/` | ⏳ Chưa bắt đầu | React App |
| **Admin Console** | `apps/admin/` | ⏳ Chưa bắt đầu | CMS & Quản trị hệ thống |
| **Backend API** | `services/api/` | ⏳ Chưa bắt đầu | Modular Monolith (PostgreSQL/Redis) |
| **AI Gateway** | `services/ai-gateway/` | ⏳ Chưa bắt đầu | Python/TypeScript Service |
| **Background Worker**| `services/worker/` | ⏳ Chưa bắt đầu | Async task processing |

---

## 📖 Bản đồ tài liệu (Documentation Map)

Toàn bộ tài liệu đặc tả dự án nằm trong thư mục `docs/` và được tổ chức theo quy trình phát triển **Documentation-First**:

> **Đường dẫn chính**: [Cổng tài liệu dự án (Docs Portal)](docs/README.md)

### Phân loại theo vai trò (Role-based Navigation):
- **Product Owner / Business**: [Tầm nhìn & PRD](docs/README.md#product-owner)
- **Backend Engineer**: [Kiến trúc, API Contracts & Thiết kế Database](docs/README.md#backend-engineer)
- **Frontend / Mobile Engineer**: [User Journey, Use Cases & UI Designs](docs/README.md#frontend-engineer)
- **AI Engineer**: [Thiết kế AI, Prompting & RAG](docs/README.md#ai-engineer)

---

## ⚡ Hướng dẫn cài đặt nhanh (Quick Start)

### Yêu cầu hệ thống (Prerequisites)
- **Node.js**: v18+ và **npm** / **pnpm**
- **Docker & Docker Compose** (để chạy database local)
- **Flutter SDK**: v3.19+ (cho mobile dev)

### Các bước thiết lập Local

1. **Clone dự án & Cài đặt thư viện**:
   ```bash
   git clone https://github.com/thanhtupppp/ai-learning-platform.git
   cd ai-learning-platform
   npm install
   ```

2. **Khởi động Database & Cache**:
   ```bash
   # Chạy PostgreSQL và Redis container
   docker compose -f infrastructure/docker-compose.local.yml up -d
   ```

3. **Chạy Migration & Seed Dữ liệu mẫu**:
   ```bash
   # Chạy migration database nghiệp vụ
   npm run db:migrate
   # Nạp dữ liệu cấu hình và bài học mẫu
   npm run db:seed
   ```

4. **Khởi động chế độ Development**:
   ```bash
   # Khởi chạy đồng thời api, ai-gateway và các apps client
   npm run dev
   ```

---

## 🤝 Quy trình phát triển cho Contributor

Mọi thành viên tham gia phát triển dự án cần tuân thủ các nguyên tắc sau:

1. **Documentation First**: Không viết code cho tính năng mới nếu tính năng đó chưa có PRD, Use Case, API Contract và Database Design được phê duyệt.
2. **Git Flow**:
   - Nhánh chính: `main` (Production) và `develop` (Staging).
   - Nhánh tính năng: `feat/sprint1/<feature-name>` hoặc `fix/sprint1/<bug-name>`.
3. **Commit Message Standard**: Tuân thủ quy định Commits thông thường (Conventional Commits):
   - `docs: ...` (cập nhật tài liệu)
   - `feat: ...` (thêm tính năng mới)
   - `fix: ...` (sửa lỗi)
   - `refactor: ...` (tối ưu cấu trúc code)
4. **Quy chuẩn tài liệu**: Tham khảo hướng dẫn chi tiết tại [Quy chuẩn quản trị tài liệu](docs/Documentation_Standards.md).

---

## 📄 Bản quyền
Dự án được phân phối dưới giấy phép MIT. Xem chi tiết tại tệp [LICENSE](LICENSE).
