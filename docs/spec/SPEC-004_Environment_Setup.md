# SPEC-004: Environment Setup & Configuration

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPEC-004
> - **Trạng thái:** Draft
> - **Người sở hữu:** DevOps / Backend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [Architecture](../Architecture.md), [Development Process](../Development_Process.md)

## Mục đích

Hướng dẫn cài đặt môi trường dev local đầy đủ cho tất cả thành viên team.

---

## Yêu cầu hệ thống

| Tool | Version tối thiểu | Mục đích |
|------|------------------|----------|
| Node.js | v20 LTS | Backend API, shared packages |
| pnpm | v9+ | Package manager (monorepo) |
| Docker Desktop | v4.25+ | PostgreSQL, Redis, MinIO local |
| Flutter SDK | v3.19+ | Mobile app |
| Git | v2.40+ | Version control |
| VS Code | Latest | IDE khuyến nghị |

---

## Cài đặt lần đầu

### Bước 1: Clone & install

```bash
git clone https://github.com/thanhtupppp/ai-learning-platform1.git
cd ai-learning-platform1

# Cài đặt pnpm (nếu chưa có)
npm install -g pnpm@latest

# Install tất cả dependencies (monorepo)
pnpm install
```

### Bước 2: Cấu hình biến môi trường

```bash
# Copy env template
cp infrastructure/.env.example infrastructure/.env.local

# Chỉnh sửa các giá trị trong .env.local
```

**Biến môi trường bắt buộc (`.env.local`):**

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_learning_dev
DB_USER=postgres
DB_PASS=postgres123

# Redis
REDIS_URL=redis://localhost:6379

# MinIO (File Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# JWT
JWT_SECRET=dev-secret-change-in-production
JWT_EXPIRES_IN=7d

# AI Gateway
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
AI_GATEWAY_URL=http://localhost:3002

# App
NODE_ENV=development
API_PORT=3001
AI_GATEWAY_PORT=3002
```

### Bước 3: Khởi động infrastructure

```bash
# Khởi động PostgreSQL, Redis, MinIO
docker compose -f infrastructure/docker-compose.local.yml up -d

# Kiểm tra trạng thái
docker compose -f infrastructure/docker-compose.local.yml ps
```

### Bước 4: Migrate database

```bash
# Chạy migrations
pnpm run db:migrate

# Seed dữ liệu mẫu (tùy chọn)
pnpm run db:seed
```

### Bước 5: Chạy development server

```bash
# Chạy tất cả services cùng lúc
pnpm run dev

# Hoặc chạy từng service
pnpm run dev:api         # Backend API    → http://localhost:3001
pnpm run dev:ai-gateway  # AI Gateway     → http://localhost:3002
pnpm run dev:web         # Web App        → http://localhost:5173
pnpm run dev:admin       # Admin Console  → http://localhost:5174
```

---

## Cấu trúc Monorepo & Package Manager

Dự án dùng **pnpm workspaces**. File `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'services/*'
  - 'packages/*'
```

Chạy script của một package cụ thể:

```bash
# Chạy script trong services/api
pnpm --filter @ai-learning/api dev

# Cài package vào services/api
pnpm --filter @ai-learning/api add express

# Cài shared package
pnpm --filter @ai-learning/api add @ai-learning/shared
```

---

## VS Code Extensions khuyến nghị

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "ms-azuretools.vscode-docker",
    "dart-code.flutter",
    "dart-code.dart-code",
    "eamodio.gitlens",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## Troubleshooting thường gặp

### Port bị conflict

```bash
# Kiểm tra port đang được dùng
lsof -i :3001
lsof -i :5432

# Kill process nếu cần
kill -9 <PID>
```

### Docker container không khởi động

```bash
# Xem logs
docker compose -f infrastructure/docker-compose.local.yml logs postgres

# Reset toàn bộ (cẩn thận: xóa data)
docker compose -f infrastructure/docker-compose.local.yml down -v
docker compose -f infrastructure/docker-compose.local.yml up -d
```

### pnpm install lỗi

```bash
# Xóa lockfile và node_modules, install lại
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Tài liệu liên quan

- [Architecture](../Architecture.md)
- [Development Process](../Development_Process.md)
- [README gốc](../../README.md)
