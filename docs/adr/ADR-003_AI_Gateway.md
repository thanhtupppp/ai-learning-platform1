# ADR-003 – AI Gateway và Provider Abstraction

## Trạng thái

**Đã chốt**

## Bối cảnh

Ứng dụng cần dùng nhiều model cho tutor, tạo lộ trình, giải thích và tác vụ nền. Gọi provider trực tiếp từ client hoặc business module gây coupling, khó kiểm soát chi phí và khó thay model.

## Quyết định

Mọi yêu cầu AI đi qua AI Gateway. Gateway chịu trách nhiệm:

- Chuẩn hóa request/response.
- Chọn model theo capability và policy.
- Quản lý prompt version.
- Timeout, retry và fallback có giới hạn.
- Usage, latency, error và cost telemetry.
- Safety filter và redaction.

Client không giữ provider key và không gọi LLM trực tiếp.

## Hệ quả

- Provider có thể thay đổi mà không phá API nghiệp vụ.
- Quan sát và giới hạn chi phí tập trung.
- Gateway trở thành thành phần quan trọng cần resilience và test contract.

## Không bao gồm

AI Gateway không sở hữu Learning Progress, Quiz Result hoặc Knowledge content.

