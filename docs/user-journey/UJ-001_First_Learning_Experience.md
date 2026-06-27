# UJ-001 – Trải nghiệm học đầu tiên

## Trạng thái

- **Mã:** UJ-001
- **Tên:** Trải nghiệm học đầu tiên
- **Sprint:** Sprint 1
- **Trạng thái:** Đã chốt

---

# Mục tiêu

Giúp người dùng lần đầu sử dụng AI Learning Platform:

- Hiểu giá trị của ứng dụng trong vòng 10 phút.
- Hoàn thành bài học đầu tiên.
- Trải nghiệm AI Tutor.
- Hoàn thành Mini Quiz.
- Muốn quay lại học vào ngày hôm sau.

---

# Persona

### Persona chính

- Học sinh THPT
- Ôn thi THPT Quốc gia
- Học bằng điện thoại
- Có khoảng 30–60 phút học mỗi ngày

---

# Điều kiện ban đầu

- Đã cài đặt ứng dụng.
- Có kết nối Internet.
- Chưa có tài khoản hoặc chưa đăng nhập.
- Bắt đầu ở chế độ Guest.

---

# User Journey

```text
Mở ứng dụng
      ↓
Màn hình chào mừng
      ↓
Bắt đầu học
      ↓
Chọn mục tiêu học
      ↓
Chọn môn học
      ↓
AI tạo lộ trình học
      ↓
Dashboard
      ↓
Học Knowledge Unit đầu tiên
      ↓
Hỏi AI Tutor
      ↓
Mini Quiz
      ↓
Kết quả học tập
      ↓
Đăng nhập để lưu tiến độ
```

---

# Chi tiết từng bước

## 1. Mở ứng dụng

### Người dùng

Mở ứng dụng lần đầu.

### Hệ thống

- Hiển thị Splash.
- Kiểm tra phiên bản.
- Khởi tạo Anonymous User.
- Tải cấu hình.

---

## 2. Chào mừng

Hiển thị:

- Logo.
- Tên ứng dụng.
- Nút **Bắt đầu học**.
- Nút **Đã có tài khoản**.

Không yêu cầu đăng nhập.

---

## 3. Chọn mục tiêu

Ví dụ:

- Ôn thi THPT
- Ôn thi Đại học
- Học trên lớp
- Tự học
- Khác

Mục tiêu này sẽ được AI sử dụng để cá nhân hóa lộ trình học.

---

## 4. Chọn môn học

Người dùng chọn một hoặc nhiều môn.

Ví dụ:

- Sinh học
- Toán
- Vật lý
- Hóa học
- Tiếng Anh

---

## 5. AI tạo lộ trình

Hiển thị màn hình:

> AI đang xây dựng lộ trình học dành riêng cho bạn...

Backend gửi yêu cầu tới AI Gateway để tạo Learning Path ban đầu.

---

## 6. Dashboard

Hiển thị:

- Tiếp tục học.
- Ôn tập hôm nay.
- Tiến độ học.
- Mục tiêu.
- Hỏi AI.

---

## 7. Học bài

Người dùng bắt đầu Knowledge Unit đầu tiên.

Một Knowledge Unit bao gồm:

- Nội dung.
- Ví dụ.
- Flashcard.
- Mini Quiz.

---

## 8. AI Tutor

Người dùng có thể hỏi bất kỳ câu hỏi nào.

AI luôn biết:

- Môn học.
- Bài học.
- Knowledge Unit hiện tại.
- Mục tiêu học.

---

## 9. Mini Quiz

Sau mỗi Knowledge Unit sẽ có một Mini Quiz để đánh giá mức độ hiểu bài.

---

## 10. Kết quả

Hiển thị:

- Knowledge Unit đã hoàn thành.
- Mastery tăng.
- Đề xuất bài học tiếp theo.

---

## 11. Đăng nhập

Sau khi người dùng đã trải nghiệm đầy đủ.

Hiển thị:

> Đăng nhập để lưu tiến độ học tập và đồng bộ trên nhiều thiết bị.

---

# Emotion Map

| Bước            | Cảm xúc mong muốn |
| --------------- | ----------------- |
| Chào mừng       | Thân thiện        |
| Chọn mục tiêu   | Được thấu hiểu    |
| AI tạo lộ trình | Mong đợi          |
| Dashboard       | Rõ ràng           |
| Học bài         | Tập trung         |
| AI Tutor        | Được hỗ trợ       |
| Mini Quiz       | Thử thách         |
| Hoàn thành      | Thành tựu         |
| Đăng nhập       | Yên tâm           |

---

# Service Blueprint

| Người dùng      | Flutter            | Backend          | AI                 | Database          |
| --------------- | ------------------ | ---------------- | ------------------ | ----------------- |
| Chọn mục tiêu   | Hiển thị danh sách | Lưu Goal         | -                  | Goal              |
| Chọn môn        | Chọn môn học       | Lưu Subject      | -                  | Subject           |
| AI tạo lộ trình | Loading            | Gọi AI Gateway   | Sinh Learning Path | Learning Path     |
| Học bài         | Hiển thị Lesson    | Lấy nội dung     | RAG                | Progress          |
| Hỏi AI          | Chat               | Gửi Prompt       | AI Tutor           | Chat History      |
| Mini Quiz       | Hiển thị Quiz      | Chấm điểm        | Giải thích         | Assessment        |
| Hoàn thành      | Kết quả            | Cập nhật Mastery | Recommendation     | Learning Progress |

---

# Edge Cases

- Không có Internet.
- AI phản hồi chậm.
- Không tìm thấy nội dung bài học.
- Người dùng thoát ứng dụng giữa chừng.
- Người dùng từ chối đăng nhập.

---

# Tiêu chí thành công

- Người dùng hoàn thành bài học đầu tiên.
- Người dùng sử dụng AI Tutor ít nhất một lần.
- Người dùng hoàn thành Mini Quiz.
- Người dùng nhìn thấy Mastery tăng.
- Người dùng được mời đăng nhập sau khi đã nhận được giá trị từ ứng dụng.

---

# Tài liệu liên quan

- PRD-001 – Trải nghiệm học đầu tiên
- UC-001 → UC-00x
- API-001
- UI-001
