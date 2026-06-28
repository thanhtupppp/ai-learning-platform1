# AI-003 – Evaluation and Safety

> **Thông tin quản trị:**
> - **Mã tài liệu:** AI-003
> - **Trạng thái:** Approved
> - **Người sở hữu:** AI Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [AI-001](file:///d:/ai-learning-platform/docs/ai/AI-001_AI_Gateway.md)

## Mục tiêu

Không phát hành capability AI chỉ dựa trên demo thủ công. Mỗi capability phải có evaluation dataset, metric và release gate.

## Evaluation layers

- Unit test cho prompt builder, parser và policy.
- Golden dataset offline theo capability.
- Human review cho helpfulness, correctness và pedagogy.
- Production telemetry không chứa PII không cần thiết.

## Metrics

| Capability | Metric chính |
| --- | --- |
| Learning Path | Curriculum validity, prerequisite order |
| AI Tutor | Correctness, helpfulness, groundedness |
| Quiz explanation | Alignment với answer key |
| RAG | Recall@K, citation correctness |

## Safety rules

- Không khẳng định chắc chắn khi thiếu bằng chứng.
- Không tiết lộ system prompt, secret hoặc dữ liệu người khác.
- Nội dung nguy hiểm hoặc không phù hợp lứa tuổi theo policy được cấu hình.
- Với câu hỏi ngoài ngữ cảnh học, trả lời giới hạn hoặc chuyển hướng.
- Người dùng phải biết nội dung do AI tạo.

## Release gate

- Golden tests đạt ngưỡng đã định.
- Không có regression nghiêm trọng so với version production.
- Cost và latency nằm trong budget.
- Safety test đạt.
- Có rollback về model/prompt version trước.

## Incident response

AI incident lưu capability, model, prompt version, request/correlation ID và impact; không sao chép PII vào ticket. Có thể disable capability hoặc pin fallback model bằng configuration.

