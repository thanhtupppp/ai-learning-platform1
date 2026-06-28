# ADR-005 – Tách RAG khỏi Learning và AI Conversation

> **Thông tin quản trị:**
> - **Mã tài liệu:** ADR-005
> - **Trạng thái:** Approved
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [AI-002](file:///d:/ai-learning-platform/docs/ai/AI-002_RAG.md), [DB-010](file:///d:/ai-learning-platform/docs/database/DB-010_RAG.md)

## Bối cảnh

Embedding model và Vector Store có vòng đời, cách version và công nghệ thay đổi nhanh hơn dữ liệu nghiệp vụ.

## Quyết định

Embedding, chunk, vector index và retrieved context thuộc RAG domain riêng. `KnowledgeUnit` và `AIMessage` chỉ giữ reference cần thiết, không chứa vector trực tiếp.

RAG domain cung cấp interface truy xuất độc lập provider. Retrieved context của phản hồi AI được snapshot để audit và tái hiện.

## Hệ quả

- Có thể đổi pgvector, Qdrant, Pinecone hoặc Milvus mà không migration bảng nghiệp vụ.
- Re-embedding và multi-model index dễ quản lý.
- Cần đồng bộ index bất đồng bộ và theo dõi freshness.

## Tài liệu liên quan

- DB-004 – AI Domain.
- DB-010 – RAG / Vector Retrieval Domain.
- AI-002 – RAG Design.

