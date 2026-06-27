# UI-001 – First Learning Experience

## Nguồn

PRD-001, UJ-001 và UC-001→UC-008.

## Screen map

```text
Splash
  → Welcome
  → Learning Goal
  → Subject Selection
  → Learning Path Generation
  → Dashboard
  → Knowledge Unit
       ├── AI Tutor
       └── Mini Quiz → Result
  → Account Link
```

## Global states

Mọi screen có dữ liệu phải định nghĩa:

- Initial/loading.
- Content.
- Empty khi hợp lệ.
- Recoverable error với retry.
- Offline/network unavailable.
- Unauthorized/session expired.

Không hiển thị blank screen hoặc raw exception.

## 1. Welcome

### Mục tiêu

Cho người dùng hiểu giá trị và bắt đầu mà không bị ép đăng ký.

### Thành phần

- Product name và value proposition ngắn.
- Primary action: **Bắt đầu học**.
- Secondary action: **Đã có tài khoản**.
- Privacy/Terms entry point.

## 2. Learning Goal

- Single-select trong Sprint 1.
- Có mô tả ngắn cho từng goal.
- Continue chỉ enabled khi lựa chọn hợp lệ.
- Submit có loading và chống double tap.

## 3. Subject Selection

- Hiển thị danh sách môn khả dụng từ API.
- Sprint 1 có thể giới hạn một môn dù domain hỗ trợ nhiều môn.
- Empty/error có retry.

## 4. Learning Path Generation

- Hiển thị tiến trình, không dùng spinner vô hạn.
- Nếu quá thời gian, cho phép rời screen và nhận trạng thái sau.
- Failure có retry và curriculum fallback nếu server cung cấp.

## 5. Dashboard

Ưu tiên một primary task: **Tiếp tục học**.

Hiển thị:

- Current goal/subject.
- Current Knowledge Unit.
- Progress và Mastery có giải thích.
- Review queue nếu có.
- AI Tutor entry point.

Không đưa leaderboard/gamification vào Sprint 1.

## 6. Knowledge Unit

- Title, learning objective và content blocks theo thứ tự.
- Progress indicator không gây áp lực sai lệch.
- Action hỏi AI gắn context hiện tại.
- Quiz chỉ mở khi rule Learning cho phép.
- Resume đúng vị trí sau app restart.

## 7. AI Tutor

- Conversation phân biệt rõ user/AI.
- Hiển thị loading/streaming state.
- Cho retry message thất bại mà không duplicate.
- Citation mở được nguồn tương ứng khi có RAG.
- Có thông báo AI có thể sai.

## 8. Mini Quiz

- Một câu mỗi bước trên mobile, trừ khi usability test chứng minh khác.
- Hiển thị progress câu hỏi.
- Không gửi answer key xuống client trước submit.
- Confirm trước khi submit câu bỏ trống.
- Double submit bị vô hiệu hóa.

## 9. Result

Hiển thị score, câu đúng/sai, explanation, Mastery change và next action. Không dùng màu đỏ/xanh là tín hiệu duy nhất.

## 10. Account Link

Chỉ xuất hiện sau khi người dùng nhận giá trị. Nêu rõ dữ liệu nào được lưu và đồng bộ. Merge conflict phải có thông báo an toàn, không làm mất tiến độ.

## Accessibility

- Semantic label cho control và progress.
- Touch target tối thiểu 44×44 logical pixels.
- Hỗ trợ text scaling.
- Focus order đúng luồng.
- Contrast theo WCAG AA.
- Motion có thể giảm theo system preference.

## Analytics

Track screen viewed và outcome event; không gửi free-text AI conversation hoặc answer content vào analytics mặc định.

## Acceptance checklist

- [ ] Tất cả global states có thiết kế.
- [ ] Luồng dùng được bằng screen reader.
- [ ] Resume sau restart đúng bước.
- [ ] Không double navigation/submit.
- [ ] AI và network failure không chặn phần học đã tải.
- [ ] UI map khớp UJ-001 và API contracts.

