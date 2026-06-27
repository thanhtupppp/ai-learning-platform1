# Architecture Decision Records (ADR)

Tài mục này chứa các quyết định kiến trúc quan trọng đã được phê duyệt trong dự án.

## Danh sách ADR

- **[ADR-001 – Kiến trúc nội dung đa môn](ADR-001%20%E2%80%93%20Ki%E1%BA%BFn%20tr%C3%BAc%20n%E1%BB%99i%20dung%20%C4%91a%20m%C3%B4n.md)**: Chuẩn hóa mô hình dữ liệu nội dung học để hỗ trợ không giới hạn số lượng môn học.
- **[ADR-002 – Modular Monolith](ADR-002_Modular_Monolith.md)**: Định hướng thiết kế backend theo cấu trúc Modular Monolith nhằm dễ phát triển và dễ chuyển đổi sang Microservices sau này.
- **[ADR-003 – AI Gateway](ADR-003_AI_Gateway.md)**: Tách ứng dụng khỏi model provider trực tiếp nhằm chuẩn hóa log, cost và dễ dàng đổi model.
- **[ADR-004 – Guest First Identity](ADR-004_Guest_First_Identity.md)**: Chiến lược Guest-first, đăng ký sau nhằm tối ưu hóa trải nghiệm onboarding của người học.
- **[ADR-005 – RAG Domain Isolation](ADR-005_RAG_Domain_Isolation.md)**: Cô lập dữ liệu Vector / Embedding ra khỏi các bảng nghiệp vụ chính để đảm bảo hiệu năng và tính modular.

