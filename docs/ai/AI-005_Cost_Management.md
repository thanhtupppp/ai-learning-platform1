# AI-005: Quản lý Chi phí AI

> **Thông tin quản trị:**
> - **Mã tài liệu:** AI-005
> - **Trạng thái:** Draft
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [AI Gateway](AI-001_AI_Gateway.md)

## Mục đích

Định nghĩa chiến lược kiểm soát chi phí khi gọi LLM, tránh overspend và đảm bảo trải nghiệm tốt cho người dùng.

---

## Token Budget theo Feature

| Feature | Max Input Tokens | Max Output Tokens | Model Tier |
|---------|-----------------|-------------------|------------|
| AI Tutor chat | 4,000 | 1,000 | Standard |
| Learning Path | 2,000 | 2,000 | Standard |
| Quiz Generator | 3,000 | 2,000 | Standard |
| Feedback Analyzer | 2,000 | 800 | Standard |
| Content Summary | 8,000 | 1,500 | Large |

---

## Chiến lược tối ưu chi phí

### 1. Caching
- Cache response của Learning Path trong Redis (TTL: 24h) nếu input không thay đổi.
- Cache Quiz generated (TTL: 7 ngày) theo `topic_id + difficulty + count`.
- Sử dụng SHA256 hash của prompt làm cache key.

### 2. Model Routing
- Ưu tiên model nhỏ hơn (gpt-4o-mini, gemini-flash) cho câu hỏi ngắn.
- Model lớn (gpt-4o, gemini-pro) chỉ khi câu hỏi phức tạp hoặc cần reasoning.
- Phân loại tự động dựa trên độ dài và complexity của question.

### 3. RAG Compression
- Chỉ inject top 3 document chunks vào context (không phải toàn bộ kết quả).
- Mỗi chunk tối đa 500 tokens.
- Xếp hạng chunks theo relevance score trước khi inject.

### 4. Rate Limiting theo Plan

| Plan | AI Calls/day | Max Tokens/call |
|------|-------------|----------------|
| Free | 20 | 2,000 |
| Basic | 100 | 4,000 |
| Premium | Unlimited | 8,000 |

---

## Monitoring & Alert

- Alert khi chi phí vượt threshold hàng ngày: $50/day.
- Dashboard theo dõi: token usage per user, per feature, per model.
- Log toàn bộ AI calls vào bảng `ai_call_logs` với metadata chi phí.

---

## Tài liệu liên quan

- [AI Gateway](AI-001_AI_Gateway.md)
- [DB-004 AI Schema](../database/DB-004_AI.md)
