# UC-011: Xem Dashboard tiến độ học tập

> **Thông tin quản trị:**
> - **Mã tài liệu:** UC-011
> - **Trạng thái:** Draft
> - **Người sở hữu:** Frontend Team
> - **Cập nhật cuối:** 2026-06-28
> - **Tài liệu liên quan:** [API-002](../api/API-002_Learning.md), [API-005](../api/API-005_User_Profile.md)

## Mô tả

Learner xem tổng quan tiến độ học tập, streak, điểm số và các môn đang học.

---

## Actors

- **Primary**: Registered Learner

---

## Preconditions

- Người dùng đã đăng nhập.
- Có ít nhất 1 môn học đang tiến hành.

---

## Main Flow

1. Người dùng vào trang Dashboard (mặc định sau đăng nhập).
2. Hệ thống tải và hiển thị:
   - **Streak**: Số ngày học liên tiếp.
   - **Daily Goal**: Tiến độ hôm nay (XP earned / XP target).
   - **Subjects in Progress**: Danh sách môn đang học, % hoàn thành.
   - **Recent Activity**: 5 bài học gần nhất.
   - **Upcoming Review**: Các topic cần ôn tập theo Spaced Repetition.
3. Người dùng có thể click vào môn học để tiếp tục.
4. Người dùng có thể click "Tiếp tục học" để vào bài học tiếp theo được gợi ý.

---

## UI Components

- Streak counter với animation flame.
- Progress ring cho Daily Goal.
- Subject cards với progress bar.
- Calendar heatmap cho learning history.

---

## Postconditions

- Không có side effects (read-only view).

---

## Performance Requirements

- Dashboard load time < 1.5s (data được cache trong Redis).
- Streak tính toán offline, sync khi có internet.
