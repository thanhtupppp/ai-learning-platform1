# UC-007 – Hoàn thành Mini Quiz

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-007
> - **Trạng thái:** Approved
> - **Người sở hữu:** Frontend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [PRD-001](file:///d:/ai-learning-platform/docs/prd/PRD-001_First_Learning_Experience.md), [UJ-001](file:///d:/ai-learning-platform/docs/user-journey/UJ-001_First_Learning_Experience.md), [API-004](file:///d:/ai-learning-platform/docs/api/API-004_Quiz.md)

---

# Mục tiêu

Đánh giá nhanh mức độ hiểu của người học sau khi hoàn thành một Knowledge Unit.

Kết quả Mini Quiz được sử dụng để:

- Cập nhật Mastery Score.
- Điều chỉnh Learning Path.
- Đề xuất nội dung ôn tập.
- Cá nhân hóa AI Tutor.

Mini Quiz không nhằm mục đích kiểm tra cuối kỳ mà để giúp AI hiểu người học.

---

# Điều kiện trước

- Người học đã hoàn thành một Knowledge Unit.
- Nội dung Quiz đã được tải.
- Tiến độ học đang được theo dõi.

---

# Điều kiện sau

- Kết quả Quiz được lưu.
- Mastery được cập nhật.
- AI có dữ liệu để cá nhân hóa.

---

# Luồng chính

1. Người học hoàn thành Knowledge Unit.
2. Hệ thống hiển thị Mini Quiz.
3. Người học trả lời câu hỏi.
4. Hệ thống chấm điểm.
5. Backend cập nhật Mastery.
6. AI đánh giá mức độ hiểu.
7. Hiển thị phản hồi.
8. Chuyển sang Knowledge Unit tiếp theo.

---

# Luồng thay thế

## A1 - Người học bỏ qua Quiz

- Hệ thống cho phép tiếp tục.
- Mastery không được cập nhật.
- AI có thể nhắc làm lại sau.

---

## A2 - Mất kết nối

- Lưu tạm câu trả lời.
- Đồng bộ khi có mạng.

---

# Quy tắc nghiệp vụ

- Mini Quiz diễn ra sau mỗi Knowledge Unit.
- Mỗi Quiz từ 3–5 câu hỏi.
- Có thể trộn câu hỏi.
- Không giới hạn số lần làm lại.
- Kết quả lần gần nhất được ưu tiên khi tính Mastery.

---

# Loại câu hỏi

Hệ thống hỗ trợ:

- Trắc nghiệm một đáp án.
- Trắc nghiệm nhiều đáp án.
- Đúng / Sai.
- Ghép cặp.
- Điền khuyết.
- Trả lời ngắn (giai đoạn sau).

---

# Đánh giá

Hệ thống ghi nhận:

- Điểm số.
- Thời gian làm bài.
- Số lần làm.
- Câu trả lời.
- Tỷ lệ đúng.
- Độ tự tin (tương lai).

---

# Mastery Score

Mastery không chỉ dựa trên điểm.

Hệ thống xem xét:

- Điểm Quiz.
- Số lần làm lại.
- Thời gian trả lời.
- Lịch sử ôn tập.
- Hiệu suất các lần học trước.

---

# AI Impact

AI sử dụng kết quả để:

- Điều chỉnh Learning Path.
- Đề xuất ôn tập.
- Thay đổi độ khó.
- Cá nhân hóa AI Tutor.

---

# UI liên quan

## Mini Quiz Screen

Hiển thị:

- Tiến trình.
- Câu hỏi.
- Đáp án.
- Nút Tiếp tục.

---

## Result Screen

Hiển thị:

- Điểm số.
- Mastery hiện tại.
- Điểm mạnh.
- Kiến thức cần ôn tập.
- Nút tiếp tục học.

---

# Dữ liệu lưu trữ

Lưu:

- Quiz ID.
- Question ID.
- User Answer.
- Correct Answer.
- Score.
- Mastery Before.
- Mastery After.
- Completed At.

---

# Tiêu chí hoàn thành

- Người học hoàn thành Quiz.
- Kết quả được lưu.
- Mastery được cập nhật.
- AI nhận được dữ liệu đánh giá.
- Chuyển sang Knowledge Unit tiếp theo.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UJ-001 – Trải nghiệm học đầu tiên
- UC-006 – Hỏi AI Tutor
- UC-008 – Liên kết tài khoản Guest
