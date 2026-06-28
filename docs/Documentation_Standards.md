# Quy chuẩn Quản trị và Soạn thảo Tài liệu (Documentation Standards)

Tài liệu này định nghĩa các quy chuẩn bắt buộc đối với việc soạn thảo, tổ chức và quản lý vòng đời tài liệu của dự án AI Learning Platform, nhằm duy trì tính nhất quán, dễ tra cứu và giảm thiểu khoảng cách giữa tài liệu và mã nguồn (Code-Docs Mapping).

---

## 1. Siêu dữ liệu chuẩn (Metadata Header)

Mọi tệp tài liệu (ngoại trừ các file `README.md` mục lục) bắt buộc phải chèn một khối siêu dữ liệu tiêu chuẩn (Metadata Block) ở ngay dưới tiêu đề chính (H1) theo định dạng sau:

```markdown
# [Tên Tài Liệu]

> **Thông tin quản trị:**
> - **Mã tài liệu:** [Ví dụ: PRD-001, API-002, DB-003]
> - **Trạng thái:** [Draft | In Review | Approved | Deprecated]
> - **Người sở hữu:** [Product Team | Backend Team | Frontend Team | AI Team]
> - **Cập nhật cuối:** [YYYY-MM-DD]
> - **Tài liệu liên quan:** [Tên tài liệu](đường-dẫn-tuyệt-đối-hoặc-tương-đối)
```

### Chi tiết các trạng thái (Status Lifecycle)
- **Draft (Bản nháp)**: Tài liệu đang trong quá trình soạn thảo bởi người sở hữu, chưa được mang ra review chéo.
- **In Review (Đang rà soát)**: Tài liệu đã hoàn thành cơ bản và đang được gửi cho các nhóm liên quan review chéo (ví dụ: Backend Dev review API contract của Frontend Dev).
- **Approved (Đã phê duyệt)**: Tài liệu đã được thống nhất, chốt phương án và đóng vai trò làm baseline chính thức cho quá trình code/test.
- **Deprecated (Ngừng sử dụng)**: Tài liệu mô tả các chức năng hoặc thiết kế cũ đã bị loại bỏ hoặc thay thế bằng phiên bản mới.

---

## 2. Quy ước đặt tên (Naming Conventions)

Tất cả các tệp tài liệu phải được đặt tên theo định dạng viết hoa, phân tách bằng dấu gạch dưới và có mã số định danh 3 chữ số để dễ dàng sắp xếp và truy vết chéo:

| Phân loại | Quy tắc đặt tên | Thư mục | Ví dụ |
| --- | --- | --- | --- |
| **Architectural Decision** | `ADR-XXX_Brief_Name.md` | `docs/adr/` | `ADR-002_Modular_Monolith.md` |
| **Product Requirements** | `PRD-XXX_Brief_Name.md` | `docs/prd/` | `PRD-001_First_Learning_Experience.md` |
| **User Journey** | `UJ-XXX_Brief_Name.md` | `docs/user-journey/` | `UJ-001_First_Learning_Experience.md` |
| **Use Case** | `UC-XXX_Brief_Name.md` | `docs/use-case/` | `UC-001_Start_Learning_As_Guest.md` |
| **Technical Spec** | `SPEC-XXX_Brief_Name.md` | `docs/spec/` | `SPEC-001_First_Learning_Experience.md` |
| **API Contract** | `API-XXX_Brief_Name.md` | `docs/api/` | `API-002_Learning.md` |
| **Database Design** | `DB-XXX_Brief_Name.md` | `docs/database/` | `DB-003 _Learning Domain.md` |
| **AI Specification** | `AI-XXX_Brief_Name.md` | `docs/ai/` | `AI-001_AI_Gateway.md` |
| **UI Design & Flows** | `UI-XXX_Brief_Name.md` | `docs/ui/` | `UI-001_First_Learning_Experience.md` |

---

## 3. Bản đồ ánh xạ Code - Docs (Code-Docs Mapping)

Để đảm bảo việc triển khai code tuân thủ đúng tài liệu và ngược lại, các thư mục mã nguồn được ánh xạ cụ thể với các phân mục tài liệu như sau:

| Thư mục mã nguồn | Phân mục tài liệu liên quan | Trách nhiệm chính |
| --- | --- | --- |
| `apps/mobile/` | `docs/ui/`, `docs/user-journey/`, `docs/use-case/` | Frontend Team |
| `apps/web/` & `apps/admin/` | `docs/ui/`, `docs/use-case/` | Frontend Team |
| `services/api/` | `docs/api/`, `docs/use-case/`, `docs/database/`, `docs/spec/` | Backend Team |
| `services/ai-gateway/` | `docs/ai/`, `docs/spec/`, `docs/api/API-003_AI_Tutor.md` | AI Team |
| `services/worker/` | `docs/spec/SPEC-003_Integration_Events.md`, `docs/database/` | Backend Team |
| `packages/shared/` | `docs/api/API_CONVENTIONS.md`, `docs/spec/` | Backend / Frontend |

---

## 4. Chuỗi truy vết (Traceability Rules)

Mọi tính năng mới hoặc thay đổi lớn trong dự án phải tuân thủ nghiêm ngặt chuỗi truy vết sau:

```text
Vision → PRD → User Journey → Use Case → SPEC → API/UI → Database → Code → Test
```

### Quy tắc cập nhật khi có thay đổi:
1. **Thay đổi API hoặc Database**: Bắt buộc phải cập nhật tệp tin `API-XXX` hoặc `DB-XXX` tương ứng trước khi tiến hành sửa code trong cùng một Pull Request.
2. **Thay đổi Kiến trúc**: Phải tạo mới một bản ghi quyết định kiến trúc (`ADR-XXX`) dưới dạng `Draft`, sau khi được Lead phê duyệt mới chuyển sang `Approved` và tiến hành refactor code.
3. **Quy tắc liên kết**: Tất cả các tệp tài liệu thuộc cùng một chuỗi tính năng phải chứa liên kết chéo (`Related Docs`) trỏ đến nhau bằng markdown links.
