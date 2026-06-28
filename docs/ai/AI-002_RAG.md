# AI-002 – RAG and Retrieval

> **Thông tin quản trị:**
> - **Mã tài liệu:** AI-002
> - **Trạng thái:** Approved
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [ADR-005](file:///d:/ai-learning-platform/docs/adr/ADR-005_RAG_Domain_Isolation.md), [DB-010](file:///d:/ai-learning-platform/docs/database/DB-010_RAG.md)

## Mục tiêu

Cung cấp context có nguồn cho AI Tutor và các capability cần kiến thức, đồng thời tách công nghệ vector khỏi schema nghiệp vụ.

## Nguồn dữ liệu

- Published ContentBlock.
- Knowledge Unit metadata và learning objectives.
- Tài liệu tham chiếu đã được phê duyệt.

Không index private conversation vào knowledge corpus mặc định.

## Ingestion

```text
Source published/updated
  → Extract normalized text
  → Chunk with source boundaries
  → Hash and version
  → Generate embedding
  → Upsert vector index
  → Mark index state READY
```

Update và delete dùng event; stale index phải quan sát được.

## Retrieval

1. Xác định tenant/visibility và learning context.
2. Chuẩn hóa query.
3. Semantic retrieval, có thể kết hợp keyword.
4. Filter theo subject/course/version/status.
5. Rerank nếu được bật.
6. Áp dụng token budget và diversity.
7. Snapshot retrieved context cùng score/provenance.

## Citation

Mỗi context chunk có `sourceType`, `sourceId`, `sourceVersion` và vị trí. Response contract phải cho phép hiển thị citation. Model không được tạo citation không tồn tại trong retrieved context.

## Provider abstraction

Interface tối thiểu:

```text
upsert(chunks)
delete(source/version)
search(queryEmbedding, filters, topK)
health()
```

Adapter có thể dùng pgvector, Qdrant, Pinecone hoặc Milvus. Provider ID không rò rỉ sang Learning/AI Conversation domain.

## Quality metrics

- Recall@K trên golden dataset.
- Context precision.
- Citation correctness.
- Answer groundedness.
- No-answer correctness.
- Retrieval latency và stale-index rate.

## Failure behavior

- Không có context phù hợp: AI phải nói rõ giới hạn hoặc dùng nội dung curriculum trực tiếp nếu được phép.
- Vector Store lỗi: không bịa nguồn; capability quyết định fallback hoặc trả temporary failure.
- Source bị unpublish: xóa/ẩn index và không dùng cho request mới.

## Security

- Filter authorization trước và trong retrieval.
- Không cho query vượt tenant/visibility boundary.
- Chống prompt injection từ source bằng content policy và instruction isolation.
- Retrieved context snapshot tuân thủ retention.

