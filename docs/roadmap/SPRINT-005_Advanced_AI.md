# Sprint 5 (Milestone 5) – Advanced AI

> **Thông tin quản trị:**
> - **Mã tài liệu:** SPRINT-005
> - **Trạng thái:** 📋 Planned
> - **Người sở hữu:** AI Team / Tech Lead
> - **Cập nhật cuối:** 2026-06-28
> - **Prerequisite:** Sprint 4 + đủ dữ liệu học tập (≥ 1,000 active learners)
> - **Tài liệu liên quan:** [ROADMAP](ROADMAP.md), [AI Gateway](../ai/AI-001_AI_Gateway.md)

## Mục tiêu

Đưa AI lên mức production hardening, triển khai Adaptive Assessment, và AI Coach chủ động – tạo lợi thế cạnh tranh cốt lõi của nền tảng.

---

## Timeline

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| Sprint 5A | 3 tuần | RAG hardening + Evaluation framework |
| Sprint 5B | 3 tuần | Adaptive Assessment + AI Coach |
| Sprint 5 Review | Cuối tuần 6 | AI quality audit |

---

## Scope

### RAG Production Hardening

- [ ] **Advanced Chunking**: Semantic chunking thay vì fixed-size.
- [ ] **Re-ranking**: Cross-encoder model re-rank top-K results trước khi inject vào context.
- [ ] **Multi-vector search**: Dense + Sparse retrieval (Hybrid search).
- [ ] **Citation tracking**: AI Tutor trích dẫn source document cụ thể.
- [ ] **Context window optimization**: Giảm token waste bằng compression.

### Evaluation Framework

- [ ] **Automated evaluation pipeline**:
  - Đánh giá chất lượng AI response (faithfulness, relevance, coherence).
  - Golden test suite: 100+ câu hỏi chuẩn với expected answers.
- [ ] **Model/Prompt experimentation**:
  - A/B test prompts giữa các user segment.
  - Log và so sánh performance theo model.
- [ ] **Regression gate**: Block deploy nếu AI quality score giảm > 5%.

### Adaptive Assessment

- [ ] **IRT (Item Response Theory)**:
  - Thiết lập θ (ability) cho mỗi learner theo từng topic.
  - Chọn câu hỏi tiếp theo dựa trên b parameter của IRT.
- [ ] **Dynamic difficulty**: Quiz tự điều chỉnh câu hỏi theo thời gian thực.
- [ ] **Diagnostic test**: Kiểm tra đầu vào để xác định trình độ chính xác hơn.

### Proactive AI Coach

> Điều kiện: chỉ triển khai khi có Safety Policy và user consent rõ ràng.

- [ ] **AI Coach schedule**: Phân tích pattern học tập, đề xuất thời gian học tối ưu.
- [ ] **Proactive nudge**: Gửi gợi ý học khi AI phát hiện knowledge gap quan trọng.
- [ ] **Weekly insight report**: Tự động tóm tắt tiến độ và gợi ý cho tuần tới.
- [ ] **Opt-out mechanism**: Người dùng có thể tắt AI Coach bất kỳ lúc nào.

### Infrastructure

- [ ] Dedicated vector database (Qdrant production cluster).
- [ ] GPU inference endpoint cho embedding model (giảm latency).
- [ ] AI metrics dashboard: latency, cost per call, quality scores.

---

## Success Metrics

| Metric | Mục tiêu |
|--------|----------|
| AI Tutor satisfaction rating | ≥ 4.2/5.0 |
| RAG answer faithfulness | ≥ 90% |
| Adaptive quiz completion rate | ≥ 80% |
| AI Coach opt-in rate | ≥ 40% (Premium) |
| AI latency (P95) | < 3s |

---

## Evaluation Gate

Trước khi ship Proactive AI Coach:
1. Safety review bởi team (không đưa ra nội dung gây hại).
2. Privacy review (không lạm dụng dữ liệu học tập).
3. User consent được implement trước khi bật tính năng.

---

## Tài liệu liên quan

- [ROADMAP](ROADMAP.md)
- [AI-001 AI Gateway](../ai/AI-001_AI_Gateway.md)
- [AI-002 RAG Pipeline](../ai/AI-002_RAG.md)
- [AI-003 Evaluation & Safety](../ai/AI-003_Evaluation_and_Safety.md)
- [AI-004 Prompt Templates](../ai/AI-004_Prompt_Templates.md)
- [AI-005 Cost Management](../ai/AI-005_Cost_Management.md)
