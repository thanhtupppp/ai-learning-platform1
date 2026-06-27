# API Conventions

## Base URL và version

```text
/v1
```

Breaking contract change tạo API version mới. Thêm optional field không được xem là breaking nếu client tuân thủ tolerant reader.

## Format

- JSON UTF-8.
- Field dùng `camelCase`.
- Timestamp dùng ISO 8601 UTC.
- ID là opaque string; client không suy luận cấu trúc.
- Money gồm `amount` minor unit và `currency` ISO 4217.

## Authentication

```http
Authorization: Bearer <access_token>
```

Guest endpoint dùng guest credential do server cấp; credential không truyền qua query string.

## Correlation và idempotency

```http
X-Correlation-Id: <uuid>
Idempotency-Key: <opaque-unique-key>
```

`Idempotency-Key` bắt buộc cho submit, account linking, payment và các POST tạo side effect có thể retry.

## Error contract

```json
{
  "error": {
    "code": "QUIZ_ATTEMPT_ALREADY_SUBMITTED",
    "message": "The quiz attempt has already been submitted.",
    "details": [],
    "correlationId": "uuid"
  }
}
```

- `code` ổn định để client xử lý.
- `message` an toàn cho người dùng, không chứa stack trace.
- Validation error dùng `details` với `field` và `reason`.

## HTTP status

| Status | Sử dụng |
| --- | --- |
| 200 | Read/update thành công |
| 201 | Resource được tạo |
| 202 | Tác vụ bất đồng bộ đã nhận |
| 204 | Thành công không có body |
| 400 | Request sai định dạng |
| 401 | Thiếu hoặc sai credential |
| 403 | Không đủ quyền |
| 404 | Resource không tồn tại/không được phép biết |
| 409 | Conflict hoặc invariant violation |
| 422 | Validation nghiệp vụ |
| 429 | Rate limit |
| 500 | Lỗi không dự kiến |
| 503 | Dependency tạm thời không khả dụng |

## Pagination

Ưu tiên cursor pagination:

```json
{
  "items": [],
  "nextCursor": "opaque-or-null"
}
```

Server giới hạn page size; client không dựa vào tổng số bản ghi nếu endpoint không cung cấp.

## Asynchronous operation

Tác vụ dài trả `202` cùng operation resource:

```json
{
  "operationId": "uuid",
  "status": "PENDING"
}
```

Status chuẩn: `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELED`.

## Security

- Không trả password hash, provider secret, raw prompt nội bộ hoặc answer key trước submit.
- Rate limit theo identity/IP/risk.
- Log request phải redact token và PII.
- CORS chỉ cho origin được cấu hình.

## Contract evolution

- OpenAPI là machine-readable contract khi backend bootstrap.
- Contract test xác minh implementation với tài liệu.
- Deprecation phải có thời hạn và telemetry usage trước khi xóa.

