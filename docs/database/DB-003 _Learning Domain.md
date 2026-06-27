# DB-003 – Learning Domain

## Thông tin

- **Mã:** DB-003
- **Tên:** Learning Domain
- **Trạng thái:** Draft
- **Liên quan:** DB-001, DB-002, PRD-001, UJ-001, UC-002 → UC-008

---

# Mục tiêu

Thiết kế mô hình dữ liệu cho miền Learning.

Learning Domain chịu trách nhiệm:

- Quản lý môn học.
- Quản lý chương trình học.
- Quản lý nội dung học tập.
- Quản lý lộ trình học.
- Theo dõi tiến độ học.
- Cung cấp ngữ cảnh cho AI Tutor.
- Cung cấp dữ liệu cho Quiz Engine.
- Hỗ trợ Recommendation Engine.

---

# Phạm vi

Learning Domain bao gồm các Entity sau:

- Subject
- Curriculum
- Course
- Section
- Lesson
- KnowledgeUnit
- ContentBlock
- Enrollment
- LearningPath
- LearningPathItem
- LessonProgress
- KnowledgeProgress

---

# Kiến trúc nội dung

```text
Subject
    │
    ▼
Curriculum
    │
    ▼
Course
    │
    ▼
Section
    │
    ▼
Lesson
    │
    ▼
KnowledgeUnit
    │
    ▼
ContentBlock
```

Ý nghĩa:

- Subject là môn học.
- Curriculum là chương trình học.
- Course là khóa học hoặc lớp học.
- Section là chương/chủ đề.
- Lesson là bài học.
- KnowledgeUnit là đơn vị kiến thức nhỏ nhất.
- ContentBlock là thành phần hiển thị.

---

# Learning Path

Learning Path được AI sinh riêng cho từng người học.

```text
User
    │
    ▼
LearningPath
    │
    ▼
LearningPathItem
    │
    ▼
Lesson
```

---

# Theo dõi tiến độ

```text
User
│
├── Enrollment
├── LessonProgress
└── KnowledgeProgress
```

---

# Entity Overview

| Entity            | Vai trò                     |
| ----------------- | --------------------------- |
| Subject           | Môn học                     |
| Curriculum        | Chương trình học            |
| Course            | Khóa học                    |
| Section           | Chương                      |
| Lesson            | Bài học                     |
| KnowledgeUnit     | Đơn vị kiến thức            |
| ContentBlock      | Nội dung hiển thị           |
| Enrollment        | Người học tham gia khóa học |
| LearningPath      | Lộ trình học                |
| LearningPathItem  | Danh sách bài học           |
| LessonProgress    | Tiến độ bài học             |
| KnowledgeProgress | Tiến độ Knowledge Unit      |

---

# Relationship Summary

| Relationship                      | Cardinality |
| --------------------------------- | ----------- |
| Subject → Curriculum              | 1:N         |
| Curriculum → Course               | 1:N         |
| Course → Section                  | 1:N         |
| Section → Lesson                  | 1:N         |
| Lesson → KnowledgeUnit            | 1:N         |
| KnowledgeUnit → ContentBlock      | 1:N         |
| User → Enrollment                 | 1:N         |
| User → LearningPath               | 1:N         |
| LearningPath → LearningPathItem   | 1:N         |
| Lesson → LessonProgress           | 1:N         |
| KnowledgeUnit → KnowledgeProgress | 1:N         |

---

# Entity Details

Phần này mô tả chi tiết từng Entity của Learning Domain.

Mỗi Entity bao gồm:

- Mục đích
- Quan hệ
- Thuộc tính
- Index
- Quy tắc nghiệp vụ

---

# Entity: Subject

## Mục đích

Subject đại diện cho một môn học trong hệ thống.

Đây là cấp cao nhất của Learning Domain.

Ví dụ:

- Toán
- Ngữ văn
- Tiếng Anh
- Sinh học
- Vật lý

Một Subject có thể chứa nhiều Curriculum và Course.

---

## Quan hệ

```text
Subject
├── 1:N Curriculum
├── 1:N Course
└── 1:N LearningPath
```

---

## Thuộc tính

| Field        | Type         | Nullable | Unique | Mô tả                        |
| ------------ | ------------ | -------- | ------ | ---------------------------- |
| id           | UUID         | ❌       | ✅     | Khóa chính                   |
| code         | VARCHAR(50)  | ❌       | ✅     | Mã môn học                   |
| name         | VARCHAR(100) | ❌       | ❌     | Tên môn học                  |
| slug         | VARCHAR(100) | ❌       | ✅     | URL slug                     |
| description  | TEXT         | ✅       | ❌     | Mô tả                        |
| iconUrl      | TEXT         | ✅       | ❌     | Biểu tượng                   |
| color        | VARCHAR(20)  | ✅       | ❌     | Màu đại diện                 |
| displayOrder | INT          | ❌       | ❌     | Thứ tự hiển thị              |
| status       | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED |
| createdAt    | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                |
| updatedAt    | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật           |
| deletedAt    | TIMESTAMP    | ✅       | ❌     | Soft Delete                  |

---

## Index

- PK(id)
- UNIQUE(code)
- UNIQUE(slug)
- INDEX(status)
- INDEX(displayOrder)

---

## Quy tắc nghiệp vụ

- Code không được trùng.
- Slug không được trùng.
- Subject có thể được ẩn nhưng không xóa cứng.
- Subject phải tồn tại trước khi tạo Curriculum hoặc Course.

---

# Các Entity tiếp theo

Các Entity sau sẽ được thiết kế chi tiết trong các phần tiếp theo của DB-003:

- Curriculum
- Course
- Section
- Lesson
- KnowledgeUnit
- ContentBlock
- Enrollment
- LearningPath
- LearningPathItem
- LessonProgress
- KnowledgeProgress

---

# Design Rules

## Primary Key

- UUID

## Timestamp

- createdAt
- updatedAt

## Soft Delete

- deletedAt

## Audit Fields (khi cần)

- createdBy
- updatedBy

## Status

Sử dụng Enum phù hợp theo từng Entity.

---

# Naming Convention

## Table

- snake_case
- Số ít

Ví dụ:

- subject
- curriculum
- course
- lesson

## Column

- camelCase trong Prisma
- snake_case trong PostgreSQL

## Foreign Key

```
subjectId
courseId
lessonId
userId
```

---

# Ngoài phạm vi

Các nội dung dưới đây thuộc các tài liệu khác:

- Authentication → DB-002
- AI Conversation → DB-004
- Quiz → DB-005
- Gamification → DB-006
- Payment → DB-007

---

# Sprint Output

Sau khi DB-003 hoàn thành:

- Thiết kế chi tiết toàn bộ Learning Domain.
- Hoàn thiện Database Dictionary.
- Sinh `schema.prisma`.
- Sinh Migration SQL.
- Làm nền tảng cho AI Domain, Quiz Domain và Backend.

# Entity: Curriculum

## Mục đích

Curriculum đại diện cho một chương trình học hoặc bộ giáo trình.

Entity này giúp hệ thống hỗ trợ nhiều chương trình học cho cùng một môn học.

Ví dụ:

- Chương trình GDPT 2018
- Cambridge IGCSE
- International Baccalaureate (IB)
- Advanced Placement (AP)

Một Curriculum thuộc về một Subject và có thể chứa nhiều Course.

---

## Quan hệ

```text
Subject
    │
    └── 1:N Curriculum
                │
                └── 1:N Course
```

---

## Thuộc tính

| Field        | Type         | Nullable | Unique | Mô tả                        |
| ------------ | ------------ | -------- | ------ | ---------------------------- |
| id           | UUID         | ❌       | ✅     | Khóa chính                   |
| subjectId    | UUID         | ❌       | ❌     | FK → Subject                 |
| code         | VARCHAR(50)  | ❌       | ✅     | Mã chương trình              |
| name         | VARCHAR(150) | ❌       | ❌     | Tên chương trình             |
| version      | VARCHAR(20)  | ✅       | ❌     | Phiên bản                    |
| country      | VARCHAR(100) | ✅       | ❌     | Quốc gia áp dụng             |
| language     | VARCHAR(20)  | ❌       | ❌     | Ngôn ngữ                     |
| description  | TEXT         | ✅       | ❌     | Mô tả                        |
| displayOrder | INT          | ❌       | ❌     | Thứ tự hiển thị              |
| status       | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED |
| createdAt    | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                |
| updatedAt    | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật           |
| deletedAt    | TIMESTAMP    | ✅       | ❌     | Soft Delete                  |

---

## Index

- PK(id)
- INDEX(subjectId)
- UNIQUE(subjectId, code)
- INDEX(status)
- INDEX(displayOrder)

---

## Quy tắc nghiệp vụ

- Một Curriculum phải thuộc một Subject.
- Trong cùng một Subject, code không được trùng.
- Không được xóa Curriculum nếu vẫn còn Course đang sử dụng.
- Một Subject có thể có nhiều Curriculum.

---

## Ví dụ

### Subject

Sinh học

↓

### Curriculum

- GDPT 2018
- Cambridge IGCSE
- AP Biology

↓

### Course

- Sinh học 10
- Sinh học 11
- Sinh học 12

# Entity: Course

## Mục đích

Course đại diện cho một khóa học hoặc cấp học thuộc một chương trình đào tạo.

Đây là Entity trung tâm của Learning Domain.

Tất cả nội dung học tập, tiến độ, lộ trình học và AI Recommendation đều xoay quanh Course.

Ví dụ:

**Subject:** Sinh học

↓

**Curriculum:** GDPT 2018

↓

**Course:**

- Sinh học 10
- Sinh học 11
- Sinh học 12

---

## Quan hệ

```text
Subject
    │
    └── 1:N Course

Curriculum
    │
    └── 1:N Course

Course
├── 1:N Section
├── 1:N Enrollment
├── 1:N LearningPath
├── 1:N LessonProgress
└── 1:N AIConversation (context)
```

---

## Thuộc tính

| Field          | Type         | Nullable | Unique | Mô tả                              |
| -------------- | ------------ | -------- | ------ | ---------------------------------- |
| id             | UUID         | ❌       | ✅     | Khóa chính                         |
| subjectId      | UUID         | ❌       | ❌     | FK → Subject                       |
| curriculumId   | UUID         | ❌       | ❌     | FK → Curriculum                    |
| code           | VARCHAR(50)  | ❌       | ❌     | Mã khóa học                        |
| name           | VARCHAR(150) | ❌       | ❌     | Tên khóa học                       |
| slug           | VARCHAR(150) | ❌       | ✅     | URL slug                           |
| description    | TEXT         | ✅       | ❌     | Mô tả                              |
| thumbnailUrl   | TEXT         | ✅       | ❌     | Ảnh đại diện                       |
| difficulty     | ENUM         | ❌       | ❌     | BEGINNER / INTERMEDIATE / ADVANCED |
| estimatedHours | INT          | ✅       | ❌     | Tổng thời lượng dự kiến            |
| displayOrder   | INT          | ❌       | ❌     | Thứ tự hiển thị                    |
| isPublished    | BOOLEAN      | ❌       | ❌     | Đã xuất bản hay chưa               |
| status         | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED       |
| createdAt      | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                      |
| updatedAt      | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                 |
| deletedAt      | TIMESTAMP    | ✅       | ❌     | Soft Delete                        |

---

## Index

- PK(id)
- INDEX(subjectId)
- INDEX(curriculumId)
- UNIQUE(curriculumId, slug)
- UNIQUE(curriculumId, code)
- INDEX(status)
- INDEX(displayOrder)
- INDEX(isPublished)

---

## Quy tắc nghiệp vụ

- Một Course phải thuộc đúng một Subject.
- Một Course phải thuộc đúng một Curriculum.
- Trong cùng một Curriculum, `code` không được trùng.
- Trong cùng một Curriculum, `slug` không được trùng.
- Chỉ Course có trạng thái `PUBLISHED` mới được hiển thị cho người học.
- Không được xóa Course nếu vẫn còn Section hoặc Enrollment liên kết.

---

## Ví dụ

```text
Sinh học
│
└── GDPT 2018
    │
    ├── Sinh học 10
    ├── Sinh học 11
    └── Sinh học 12
```

---

## Vai trò trong hệ thống

Course là điểm kết nối của nhiều Domain:

| Domain         | Vai trò                        |
| -------------- | ------------------------------ |
| Learning       | Chứa toàn bộ nội dung học      |
| AI             | Cung cấp ngữ cảnh cho AI Tutor |
| Quiz           | Tổ chức Quiz theo khóa học     |
| Recommendation | Đề xuất khóa học phù hợp       |
| Analytics      | Thống kê tiến độ và kết quả    |
| Gamification   | Tính XP, Badge theo Course     |

---

## Ghi chú thiết kế

Course **không lưu trực tiếp**:

- Nội dung bài học
- Tiến độ học
- Quiz
- Hội thoại AI

Các dữ liệu này sẽ được quản lý bởi các Entity chuyên biệt:

- Section
- Lesson
- Enrollment
- LessonProgress
- AIConversation
- Quiz

# Entity: Section

## Mục đích

Section đại diện cho một chương, chủ đề hoặc nhóm bài học trong một Course.

Section giúp tổ chức nội dung theo cấu trúc logic, giúp người học dễ theo dõi và AI dễ xác định ngữ cảnh.

Ví dụ:

**Course:** Sinh học 10

↓

**Section:**

- Chương 1. Giới thiệu về thế giới sống
- Chương 2. Tế bào
- Chương 3. Chuyển hóa vật chất và năng lượng

Mỗi Section có thể chứa nhiều Lesson.

---

## Quan hệ

```text
Course
    │
    └── 1:N Section
                │
                └── 1:N Lesson
```

---

## Thuộc tính

| Field          | Type         | Nullable | Unique | Mô tả                        |
| -------------- | ------------ | -------- | ------ | ---------------------------- |
| id             | UUID         | ❌       | ✅     | Khóa chính                   |
| courseId       | UUID         | ❌       | ❌     | FK → Course                  |
| code           | VARCHAR(50)  | ❌       | ❌     | Mã chương                    |
| name           | VARCHAR(150) | ❌       | ❌     | Tên chương                   |
| slug           | VARCHAR(150) | ❌       | ❌     | URL slug                     |
| description    | TEXT         | ✅       | ❌     | Mô tả                        |
| displayOrder   | INT          | ❌       | ❌     | Thứ tự hiển thị              |
| estimatedHours | INT          | ✅       | ❌     | Thời lượng dự kiến           |
| isPublished    | BOOLEAN      | ❌       | ❌     | Đã xuất bản                  |
| status         | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED |
| createdAt      | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                |
| updatedAt      | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật           |
| deletedAt      | TIMESTAMP    | ✅       | ❌     | Soft Delete                  |

---

## Index

- PK(id)
- INDEX(courseId)
- UNIQUE(courseId, code)
- UNIQUE(courseId, slug)
- INDEX(displayOrder)
- INDEX(status)
- INDEX(isPublished)

---

## Quy tắc nghiệp vụ

- Một Section chỉ thuộc một Course.
- Trong cùng một Course, `code` không được trùng.
- Trong cùng một Course, `slug` không được trùng.
- Chỉ Section có trạng thái `PUBLISHED` mới hiển thị cho người học.
- Không được xóa Section nếu vẫn còn Lesson thuộc Section đó.

---

## Ví dụ

```text
Sinh học 10
│
├── Chương 1. Giới thiệu về thế giới sống
├── Chương 2. Tế bào
├── Chương 3. Chuyển hóa vật chất và năng lượng
└── Chương 4. Phân bào
```

---

## Vai trò trong hệ thống

Section giúp:

- Nhóm các Lesson theo chủ đề.
- Hiển thị mục lục khóa học.
- Tính tiến độ theo chương.
- Hỗ trợ AI xác định ngữ cảnh khi người học đặt câu hỏi.
- Thống kê tỷ lệ hoàn thành theo từng chương.

---

## Ghi chú thiết kế

Section không lưu trực tiếp:

- Nội dung bài học.
- Knowledge Unit.
- Quiz.
- Tiến độ học.

Các dữ liệu này sẽ được quản lý bởi:

- Lesson
- KnowledgeUnit
- LessonProgress
- Quiz

# Entity: Lesson

## Mục đích

Lesson đại diện cho một bài học trong một Section.

Lesson là đơn vị học tập mà người dùng nhìn thấy trên giao diện và có thể bắt đầu học.

Một Lesson bao gồm nhiều Knowledge Unit được sắp xếp theo trình tự logic.

Ví dụ:

**Section:** Chương 2 - Tế bào

↓

**Lesson:**

- Bài 1. Tế bào là gì?
- Bài 2. Màng sinh chất
- Bài 3. Nhân tế bào
- Bài 4. Ti thể
- Bài 5. Lục lạp

---

## Quan hệ

```text
Section
    │
    └── 1:N Lesson
                │
                ├── 1:N KnowledgeUnit
                ├── 1:N LessonProgress
                ├── 1:N LearningPathItem
                ├── 1:N AIConversation
                └── 1:N Quiz
```

---

## Thuộc tính

| Field            | Type         | Nullable | Unique | Mô tả                              |
| ---------------- | ------------ | -------- | ------ | ---------------------------------- |
| id               | UUID         | ❌       | ✅     | Khóa chính                         |
| sectionId        | UUID         | ❌       | ❌     | FK → Section                       |
| code             | VARCHAR(50)  | ❌       | ❌     | Mã bài học                         |
| name             | VARCHAR(200) | ❌       | ❌     | Tên bài học                        |
| slug             | VARCHAR(200) | ❌       | ❌     | URL slug                           |
| summary          | TEXT         | ✅       | ❌     | Mô tả ngắn                         |
| objective        | TEXT         | ✅       | ❌     | Mục tiêu học tập                   |
| estimatedMinutes | INT          | ✅       | ❌     | Thời gian dự kiến                  |
| difficulty       | ENUM         | ❌       | ❌     | BEGINNER / INTERMEDIATE / ADVANCED |
| thumbnailUrl     | TEXT         | ✅       | ❌     | Ảnh đại diện                       |
| displayOrder     | INT          | ❌       | ❌     | Thứ tự hiển thị                    |
| isPublished      | BOOLEAN      | ❌       | ❌     | Đã xuất bản                        |
| status           | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED       |
| createdAt        | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                      |
| updatedAt        | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                 |
| deletedAt        | TIMESTAMP    | ✅       | ❌     | Soft Delete                        |

---

## Index

- PK(id)
- INDEX(sectionId)
- UNIQUE(sectionId, code)
- UNIQUE(sectionId, slug)
- INDEX(displayOrder)
- INDEX(status)
- INDEX(isPublished)

---

## Quy tắc nghiệp vụ

- Một Lesson chỉ thuộc một Section.
- Một Lesson phải có ít nhất một KnowledgeUnit trước khi được xuất bản.
- Trong cùng một Section, `code` không được trùng.
- Trong cùng một Section, `slug` không được trùng.
- Chỉ Lesson có trạng thái `PUBLISHED` mới hiển thị cho người học.
- Không được xóa Lesson nếu vẫn còn KnowledgeUnit hoặc LessonProgress liên kết.

---

## Ví dụ

```text
Chương 2 - Tế bào
│
├── Bài 1. Tế bào là gì?
├── Bài 2. Màng sinh chất
├── Bài 3. Nhân tế bào
├── Bài 4. Ti thể
└── Bài 5. Lục lạp
```

---

## Vai trò trong hệ thống

Lesson là trung tâm của trải nghiệm học tập.

Các chức năng chính:

- Hiển thị trong Dashboard.
- Điểm bắt đầu của Learning Path.
- Cung cấp ngữ cảnh cho AI Tutor.
- Chứa Knowledge Unit.
- Chứa Quiz.
- Theo dõi Lesson Progress.

---

## Dữ liệu liên quan

Lesson **không lưu trực tiếp**:

- Nội dung văn bản.
- Hình ảnh.
- Video.
- Flashcard.
- Quiz Question.

Các dữ liệu này được quản lý bởi:

- KnowledgeUnit
- ContentBlock
- Quiz
- Question

---

## AI Context

Khi người học hỏi AI trong Lesson, Backend sẽ gửi:

- User
- Subject
- Curriculum
- Course
- Section
- Lesson
- KnowledgeUnit hiện tại
- Learning Goal
- Mastery Score

Điều này giúp AI trả lời đúng ngữ cảnh mà không yêu cầu người dùng nhập lại thông tin.

---

## Future Extension

Trong tương lai, Lesson có thể hỗ trợ:

- Video Lesson
- Live Lesson
- Coding Playground
- Lab Simulation
- Assignment
- Downloadable Resources
- Discussion Thread

````

---

### 📌 Góp ý trước khi sang `KnowledgeUnit`

Đến đây mình muốn đề xuất một thay đổi kiến trúc rất đáng giá.

Hiện tại chúng ta có:

```text
Lesson
    ↓
KnowledgeUnit
````

Mình đề xuất **không lưu toàn bộ nội dung trong `Lesson`**.

Thay vào đó:

- `Lesson` chỉ chứa **metadata** (tên, mô tả, mục tiêu, thời lượng...).
- Toàn bộ nội dung học sẽ nằm trong `KnowledgeUnit` và `ContentBlock`.

Như vậy:

```text
Lesson
│
├── Metadata
├── AI Context
├── Progress
└── KnowledgeUnit (1:N)
        │
        ├── Khái niệm
        ├── Ví dụ
        ├── Flashcard
        ├── Mini Quiz
        └── ContentBlock
```

Đây là kiến trúc phù hợp với **Glossary** của dự án, nơi **Knowledge Unit** được xác định là đơn vị kiến thức nhỏ nhất. Điều này cũng tạo nền tảng rất tốt cho AI Tutor, Mastery Score, Adaptive Learning và Spaced Repetition trong các giai đoạn sau. Entity tiếp theo sẽ là **KnowledgeUnit**, cũng là entity quan trọng nhất của toàn bộ Learning Domain.

# Entity: KnowledgeUnit

## Mục đích

KnowledgeUnit là **đơn vị kiến thức nhỏ nhất** trong toàn bộ AI Learning Platform.

Đây là Entity quan trọng nhất của Learning Domain.

Mọi hoạt động của hệ thống đều xoay quanh KnowledgeUnit:

- AI Tutor
- Learning Progress
- Mastery Score
- Quiz
- Recommendation
- Spaced Repetition
- Adaptive Learning

Một Lesson bao gồm nhiều KnowledgeUnit được sắp xếp theo trình tự học tập.

---

## Quan hệ

```text
Lesson
    │
    └── 1:N KnowledgeUnit
                │
                ├── 1:N ContentBlock
                ├── 1:N Quiz
                ├── 1:N KnowledgeProgress
                ├── 1:N AIConversation
                ├── 1:N Flashcard (Future)
                ├── 1:N Note (Future)
                └── 1:N Recommendation (Future)
```

---

## Thuộc tính

| Field             | Type         | Nullable | Unique | Mô tả                        |
| ----------------- | ------------ | -------- | ------ | ---------------------------- |
| id                | UUID         | ❌       | ✅     | Khóa chính                   |
| lessonId          | UUID         | ❌       | ❌     | FK → Lesson                  |
| code              | VARCHAR(50)  | ❌       | ❌     | Mã Knowledge Unit            |
| title             | VARCHAR(200) | ❌       | ❌     | Tiêu đề                      |
| slug              | VARCHAR(200) | ❌       | ❌     | URL slug                     |
| summary           | TEXT         | ✅       | ❌     | Tóm tắt                      |
| learningObjective | TEXT         | ✅       | ❌     | Mục tiêu học                 |
| estimatedMinutes  | INT          | ✅       | ❌     | Thời gian học dự kiến        |
| difficulty        | ENUM         | ❌       | ❌     | EASY / MEDIUM / HARD         |
| displayOrder      | INT          | ❌       | ❌     | Thứ tự trong Lesson          |
| masteryWeight     | DECIMAL(5,2) | ❌       | ❌     | Trọng số khi tính Mastery    |
| isPublished       | BOOLEAN      | ❌       | ❌     | Đã xuất bản                  |
| status            | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED |
| createdAt         | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                |
| updatedAt         | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật           |
| deletedAt         | TIMESTAMP    | ✅       | ❌     | Soft Delete                  |

---

## Index

- PK(id)
- INDEX(lessonId)
- UNIQUE(lessonId, code)
- UNIQUE(lessonId, slug)
- INDEX(displayOrder)
- INDEX(status)
- INDEX(isPublished)

---

## Quy tắc nghiệp vụ

- Một KnowledgeUnit chỉ thuộc một Lesson.
- Trong cùng một Lesson, `code` không được trùng.
- Trong cùng một Lesson, `slug` không được trùng.
- Một KnowledgeUnit phải có ít nhất một ContentBlock trước khi xuất bản.
- Chỉ KnowledgeUnit có trạng thái `PUBLISHED` mới hiển thị cho người học.
- Không được xóa KnowledgeUnit nếu đã có Progress hoặc Quiz liên kết.

---

## Ví dụ

```text
Lesson
│
├── Knowledge Unit 1
│     ├── Khái niệm ADN
│     ├── Ví dụ
│     └── Mini Quiz
│
├── Knowledge Unit 2
│     ├── Cấu trúc ADN
│     ├── Hình minh họa
│     └── Flashcard
│
└── Knowledge Unit 3
      ├── Chức năng ADN
      └── Mini Quiz
```

---

## Vai trò trong hệ thống

KnowledgeUnit là trung tâm của nhiều Domain:

| Domain         | Vai trò                     |
| -------------- | --------------------------- |
| Learning       | Đơn vị học nhỏ nhất         |
| AI             | Ngữ cảnh chính cho AI Tutor |
| Quiz           | Đơn vị tạo Mini Quiz        |
| Progress       | Theo dõi tiến độ học        |
| Analytics      | Đánh giá Mastery            |
| Recommendation | Đề xuất nội dung tiếp theo  |

---

## AI Context

Khi người học đặt câu hỏi, AI Gateway sẽ sử dụng:

- Subject
- Curriculum
- Course
- Section
- Lesson
- **KnowledgeUnit**
- Learning Goal
- Mastery Score
- Chat History

KnowledgeUnit là ngữ cảnh quan trọng nhất để AI tạo câu trả lời chính xác.

---

## Mastery

Mastery Score được tính theo từng KnowledgeUnit.

Ví dụ:

```text
Knowledge Unit
        │
        ▼
Mini Quiz

        │
        ▼
Mastery Score

        │
        ▼
Recommendation
```

Điều này cho phép hệ thống biết chính xác người học đang yếu ở khái niệm nào thay vì chỉ đánh giá ở mức Lesson.

---

## Future Extension

KnowledgeUnit có thể mở rộng để hỗ trợ:

- Flashcard
- Spaced Repetition
- AI Generated Summary
- AI Generated Question
- Mindmap
- Interactive Simulation
- Coding Exercise
- Video Timestamp
- Voice Explanation

---

## Ghi chú thiết kế

KnowledgeUnit **không lưu trực tiếp nội dung hiển thị**.

Entity này chỉ lưu metadata của đơn vị kiến thức.

Toàn bộ nội dung sẽ được quản lý bởi **ContentBlock**.

Điều này giúp:

- Tái sử dụng nội dung.
- Hỗ trợ nhiều loại nội dung khác nhau.
- Dễ mở rộng trong tương lai.
- AI dễ phân tích từng khối nội dung.

# Entity: ContentBlock

## Mục đích

ContentBlock là đơn vị hiển thị nhỏ nhất của nội dung học tập.

Một KnowledgeUnit bao gồm một hoặc nhiều ContentBlock được sắp xếp theo thứ tự.

ContentBlock giúp hệ thống:

- Hiển thị nhiều loại nội dung.
- Hỗ trợ AI phân tích theo từng khối.
- Hỗ trợ CMS kéo thả.
- Dễ dàng mở rộng loại nội dung mới.

---

# Quan hệ

```text
KnowledgeUnit
    │
    └── 1:N ContentBlock
```

---

# Thuộc tính

| Field           | Type         | Nullable | Unique | Mô tả                        |
| --------------- | ------------ | -------- | ------ | ---------------------------- |
| id              | UUID         | ❌       | ✅     | Khóa chính                   |
| knowledgeUnitId | UUID         | ❌       | ❌     | FK → KnowledgeUnit           |
| blockType       | ENUM         | ❌       | ❌     | Loại nội dung                |
| title           | VARCHAR(200) | ✅       | ❌     | Tiêu đề block                |
| content         | JSONB        | ❌       | ❌     | Nội dung của block           |
| displayOrder    | INT          | ❌       | ❌     | Thứ tự hiển thị              |
| metadata        | JSONB        | ✅       | ❌     | Metadata mở rộng             |
| isRequired      | BOOLEAN      | ❌       | ❌     | Bắt buộc học                 |
| status          | ENUM         | ❌       | ❌     | DRAFT / PUBLISHED / ARCHIVED |
| createdAt       | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                |
| updatedAt       | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật           |
| deletedAt       | TIMESTAMP    | ✅       | ❌     | Soft Delete                  |

---

# Block Type

Hệ thống hỗ trợ nhiều loại ContentBlock.

| Block Type  | Mô tả             |
| ----------- | ----------------- |
| TEXT        | Văn bản           |
| IMAGE       | Hình ảnh          |
| VIDEO       | Video             |
| AUDIO       | Âm thanh          |
| FORMULA     | Công thức         |
| CODE        | Đoạn mã           |
| TABLE       | Bảng              |
| CALLOUT     | Ghi chú           |
| QUOTE       | Trích dẫn         |
| EXAMPLE     | Ví dụ             |
| DIAGRAM     | Sơ đồ             |
| INFOGRAPHIC | Infographic       |
| EMBED       | Nội dung nhúng    |
| ATTACHMENT  | Tài liệu đính kèm |

> **Lưu ý:** Quiz sẽ được quản lý trong Quiz Domain (DB-005), không lưu dưới dạng ContentBlock để tránh trùng lặp mô hình dữ liệu.

---

# Ví dụ dữ liệu

## TEXT

```json
{
  "text": "ADN là vật chất di truyền..."
}
```

---

## IMAGE

```json
{
  "url": "...",
  "caption": "Cấu trúc ADN"
}
```

---

## VIDEO

```json
{
  "url": "...",
  "duration": 360
}
```

---

## CODE

```json
{
  "language": "python",
  "code": "print('Hello World')"
}
```

---

## FORMULA

```json
{
  "latex": "E = mc^2"
}
```

---

# Index

- PK(id)
- INDEX(knowledgeUnitId)
- INDEX(blockType)
- INDEX(displayOrder)
- INDEX(status)

---

# Quy tắc nghiệp vụ

- Một ContentBlock chỉ thuộc một KnowledgeUnit.
- Thứ tự hiển thị (`displayOrder`) phải duy nhất trong cùng một KnowledgeUnit.
- Chỉ ContentBlock có trạng thái `PUBLISHED` mới hiển thị cho người học.
- Không được xóa cứng ContentBlock, chỉ sử dụng Soft Delete.
- `content` phải tuân theo cấu trúc tương ứng với `blockType`.

---

# Rendering Flow

Flutter chỉ cần render theo `blockType`.

```text
KnowledgeUnit
        │
        ▼
ContentBlock
        │
        ▼
blockType
        │
        ├── TEXT
        ├── IMAGE
        ├── VIDEO
        ├── CODE
        ├── FORMULA
        └── ...
        │
        ▼
Flutter Widget
```

Ví dụ:

- TEXT → Text Widget
- IMAGE → Image Widget
- VIDEO → Video Player
- CODE → Code Viewer
- FORMULA → Math Renderer

---

# AI Context

AI không cần đọc toàn bộ Lesson.

AI chỉ cần:

```text
KnowledgeUnit

↓

ContentBlock 1

↓

ContentBlock 2

↓

ContentBlock 3
```

Điều này giúp:

- Giảm Token Usage.
- Tăng độ chính xác.
- Dễ trích dẫn đúng đoạn kiến thức.
- Hỗ trợ RAG (Retrieval-Augmented Generation) trong tương lai.

---

# Future Extension

ContentBlock có thể mở rộng thêm:

- Interactive Quiz
- Flashcard
- Timeline
- Mindmap
- 3D Model
- AR/VR Content
- Simulation
- Canvas Drawing
- Poll
- Chat Widget

---

# Ghi chú thiết kế

ContentBlock là Entity chịu trách nhiệm hiển thị nội dung.

Nó **không quản lý**:

- Tiến độ học
- Điểm Quiz
- Hội thoại AI
- Mastery Score

Các chức năng này sẽ được quản lý bởi các Domain tương ứng để đảm bảo mỗi Entity chỉ có một trách nhiệm (Single Responsibility Principle).

# Entity: Enrollment

## Mục đích

Enrollment đại diện cho việc một người dùng tham gia một Course.

Entity này là điểm bắt đầu của toàn bộ hành trình học tập.

Một User có thể tham gia nhiều Course.

Một Course có nhiều User.

---

# Quan hệ

```text
User
    │
    └── 1:N Enrollment
                │
                └── N:1 Course
```

---

# Thuộc tính

| Field                | Type         | Nullable | Unique | Mô tả                                 |
| -------------------- | ------------ | -------- | ------ | ------------------------------------- |
| id                   | UUID         | ❌       | ✅     | Khóa chính                            |
| userId               | UUID         | ❌       | ❌     | FK → User                             |
| courseId             | UUID         | ❌       | ❌     | FK → Course                           |
| enrolledAt           | TIMESTAMP    | ❌       | ❌     | Thời điểm tham gia                    |
| completedAt          | TIMESTAMP    | ✅       | ❌     | Thời điểm hoàn thành                  |
| completionPercentage | DECIMAL(5,2) | ❌       | ❌     | % hoàn thành                          |
| lastAccessedLessonId | UUID         | ✅       | ❌     | Lesson gần nhất                       |
| status               | ENUM         | ❌       | ❌     | ACTIVE / COMPLETED / DROPPED / PAUSED |
| createdAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                         |
| updatedAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                    |
| deletedAt            | TIMESTAMP    | ✅       | ❌     | Soft Delete                           |

---

# Index

- PK(id)
- INDEX(userId)
- INDEX(courseId)
- UNIQUE(userId, courseId)
- INDEX(status)
- INDEX(lastAccessedLessonId)

---

# Quy tắc nghiệp vụ

- Một User chỉ được Enrollment một lần trong cùng một Course.
- CompletionPercentage luôn nằm trong khoảng 0 → 100.
- Khi CompletionPercentage = 100 thì trạng thái có thể chuyển sang COMPLETED.
- Không xóa Enrollment để giữ lịch sử học tập.

---

# Ví dụ

```text
User
│
├── Sinh học 10
├── Toán 10
└── Tiếng Anh 10
```

---

# Vai trò trong hệ thống

Enrollment là điểm kết nối của nhiều Domain:

- Learning Progress
- AI Recommendation
- Gamification
- Analytics
- Dashboard

---

# Ghi chú thiết kế

Enrollment chỉ lưu trạng thái tham gia khóa học.

Không lưu:

- Tiến độ từng Lesson
- Tiến độ từng KnowledgeUnit
- Điểm Quiz
- AI Conversation

Các dữ liệu này sẽ được quản lý bởi các Entity chuyên biệt.

# Entity: LearningPath

## Mục đích

LearningPath đại diện cho một lộ trình học tập được xây dựng cho một người dùng.

Learning Path có thể được:

- Tạo tự động bởi AI.
- Tạo từ template.
- Tạo thủ công bởi người dùng.
- Tạo bởi giáo viên hoặc quản trị viên.

LearningPath không chứa trực tiếp nội dung học mà chỉ quản lý lộ trình.

---

# Quan hệ

```text
User
    │
    └── 1:N LearningPath
                │
                └── 1:N LearningPathItem
```

---

# Thuộc tính

| Field                | Type         | Nullable | Unique | Mô tả                                  |
| -------------------- | ------------ | -------- | ------ | -------------------------------------- |
| id                   | UUID         | ❌       | ✅     | Khóa chính                             |
| userId               | UUID         | ❌       | ❌     | FK → User                              |
| subjectId            | UUID         | ❌       | ❌     | FK → Subject                           |
| courseId             | UUID         | ✅       | ❌     | FK → Course                            |
| name                 | VARCHAR(200) | ❌       | ❌     | Tên lộ trình                           |
| description          | TEXT         | ✅       | ❌     | Mô tả                                  |
| pathType             | ENUM         | ❌       | ❌     | AI / TEMPLATE / CUSTOM                 |
| targetCompletionDate | DATE         | ✅       | ❌     | Mục tiêu hoàn thành                    |
| estimatedHours       | INT          | ✅       | ❌     | Tổng thời lượng dự kiến                |
| progressPercentage   | DECIMAL(5,2) | ❌       | ❌     | % hoàn thành                           |
| status               | ENUM         | ❌       | ❌     | ACTIVE / COMPLETED / PAUSED / ARCHIVED |
| createdAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                          |
| updatedAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                     |
| deletedAt            | TIMESTAMP    | ✅       | ❌     | Soft Delete                            |

---

# Index

- PK(id)
- INDEX(userId)
- INDEX(subjectId)
- INDEX(courseId)
- INDEX(status)
- INDEX(pathType)

---

# Quy tắc nghiệp vụ

- Một LearningPath chỉ thuộc một User.
- Một User có thể có nhiều LearningPath.
- LearningPath có thể áp dụng cho toàn bộ Subject hoặc một Course cụ thể.
- ProgressPercentage được tính từ các LearningPathItem.
- Không xóa LearningPath để giữ lịch sử học tập.

---

# Ví dụ

```text
User
│
├── Lộ trình Sinh học THPT
├── Ôn thi Đại học
└── Học tiếng Anh giao tiếp
```

---

# Vai trò trong hệ thống

LearningPath chịu trách nhiệm:

- Điều hướng quá trình học.
- Đề xuất nội dung tiếp theo.
- Theo dõi tiến độ tổng thể.
- Đồng bộ với AI Recommendation Engine.

---

# Ghi chú thiết kế

LearningPath không lưu:

- Lesson
- KnowledgeUnit
- Progress chi tiết

Các dữ liệu này được quản lý bởi LearningPathItem và Progress.# Entity: KnowledgeProgress

## Mục đích

KnowledgeProgress theo dõi quá trình học của User trên từng KnowledgeUnit.

Đây là Entity quan trọng nhất để đánh giá năng lực học tập.

AI Recommendation, Mastery Score và Adaptive Learning đều sử dụng dữ liệu từ bảng này.

---

# Quan hệ

```text
User
    │
    └── 1:N KnowledgeProgress
                │
                └── N:1 KnowledgeUnit
```

---

# Thuộc tính

| Field                | Type         | Nullable | Unique | Mô tả                                |
| -------------------- | ------------ | -------- | ------ | ------------------------------------ |
| id                   | UUID         | ❌       | ✅     | Khóa chính                           |
| userId               | UUID         | ❌       | ❌     | FK → User                            |
| knowledgeUnitId      | UUID         | ❌       | ❌     | FK → KnowledgeUnit                   |
| status               | ENUM         | ❌       | ❌     | NOT_STARTED / IN_PROGRESS / MASTERED |
| masteryScore         | DECIMAL(5,2) | ❌       | ❌     | Điểm thành thạo (0–100)              |
| confidenceLevel      | ENUM         | ❌       | ❌     | LOW / MEDIUM / HIGH                  |
| reviewCount          | INT          | ❌       | ❌     | Số lần ôn tập                        |
| correctAnswerCount   | INT          | ❌       | ❌     | Số câu đúng                          |
| incorrectAnswerCount | INT          | ❌       | ❌     | Số câu sai                           |
| totalStudyMinutes    | INT          | ❌       | ❌     | Tổng thời gian học                   |
| lastStudiedAt        | TIMESTAMP    | ✅       | ❌     | Lần học gần nhất                     |
| nextReviewAt         | TIMESTAMP    | ✅       | ❌     | Lịch ôn tập tiếp theo                |
| createdAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm tạo                        |
| updatedAt            | TIMESTAMP    | ❌       | ❌     | Thời điểm cập nhật                   |

---

# Index

- PK(id)
- INDEX(userId)
- INDEX(knowledgeUnitId)
- UNIQUE(userId, knowledgeUnitId)
- INDEX(status)
- INDEX(masteryScore)
- INDEX(nextReviewAt)

---

# Quy tắc nghiệp vụ

- Một User chỉ có một KnowledgeProgress cho mỗi KnowledgeUnit.
- MasteryScore luôn nằm trong khoảng 0–100.
- Status = MASTERED khi MasteryScore đạt ngưỡng hệ thống (ví dụ ≥ 80).
- nextReviewAt được AI hoặc thuật toán Spaced Repetition cập nhật.
- Không xóa lịch sử học tập.

---

# Mastery Score

Mastery Score được tính từ nhiều yếu tố:

- Kết quả Quiz.
- Thời gian học.
- Tần suất ôn tập.
- AI Assessment.
- Flashcard.
- Bài tập thực hành.

Ví dụ:

```text
Quiz

40%

+

Review

20%

+

AI Assessment

20%

+

Study Time

20%

=

Mastery Score
```

> Công thức cụ thể sẽ do Recommendation Engine quyết định và có thể thay đổi mà không cần thay đổi cấu trúc database.

---

# Adaptive Learning

KnowledgeProgress là đầu vào của AI.

```text
KnowledgeProgress

↓

Mastery Score

↓

Recommendation Engine

↓

Learning Path

↓

KnowledgeUnit tiếp theo
```

---

# Spaced Repetition

Ví dụ:

```text
Mastery = 95

↓

Ôn lại sau 30 ngày

------------------------

Mastery = 60

↓

Ôn lại sau 3 ngày
```

---

# Ghi chú thiết kế

KnowledgeProgress là **nguồn dữ liệu chính** để:

- AI Tutor
- Recommendation Engine
- Dashboard
- Learning Analytics
- Gamification
- Spaced Repetition

Mọi đánh giá năng lực của người học đều nên dựa trên KnowledgeProgress thay vì LessonProgress.

# Business Rules

## BR-001: Subject

- Subject là cấp cao nhất của Learning Domain.
- Subject phải tồn tại trước khi tạo Curriculum hoặc Course.
- Không được xóa Subject nếu vẫn còn Curriculum hoặc Course.

---

## BR-002: Curriculum

- Curriculum phải thuộc đúng một Subject.
- Một Subject có thể có nhiều Curriculum.
- Curriculum không được trùng `code` trong cùng Subject.

---

## BR-003: Course

- Course phải thuộc một Subject và một Curriculum.
- Một Curriculum có thể có nhiều Course.
- Chỉ Course có trạng thái `PUBLISHED` mới hiển thị cho người học.

---

## BR-004: Section

- Một Course có nhiều Section.
- displayOrder phải duy nhất trong cùng Course.

---

## BR-005: Lesson

- Một Section có nhiều Lesson.
- Lesson phải có ít nhất một KnowledgeUnit trước khi Publish.

---

## BR-006: KnowledgeUnit

- KnowledgeUnit là đơn vị kiến thức nhỏ nhất.
- Một Lesson có nhiều KnowledgeUnit.
- KnowledgeUnit phải có ít nhất một ContentBlock trước khi Publish.

---

## BR-007: ContentBlock

- ContentBlock chỉ thuộc một KnowledgeUnit.
- displayOrder phải duy nhất trong cùng KnowledgeUnit.
- Content phải đúng định dạng của blockType.

---

## BR-008: Enrollment

- Một User chỉ Enrollment một lần trong một Course.
- Không xóa Enrollment để bảo toàn lịch sử.

---

## BR-009: LearningPath

- Một User có thể có nhiều LearningPath.
- AI có quyền tạo hoặc cập nhật LearningPath.

---

## BR-010: LessonProgress

- Progress được tính tự động.
- Không cập nhật bằng tay.

---

## BR-011: KnowledgeProgress

- MasteryScore nằm trong khoảng 0–100.
- Recommendation Engine sử dụng KnowledgeProgress làm nguồn dữ liệu chính.

---

## BR-012: Soft Delete

Learning Domain không xóa cứng dữ liệu.

Tất cả Entity đều sử dụng:

- deletedAt

để đảm bảo khả năng khôi phục dữ liệu và lưu lịch sử.

# Learning Domain ERD

## High-Level ERD

```text
                                            User
                                              │
                ┌─────────────────────────────┼─────────────────────────────┐
                │                             │                             │
                ▼                             ▼                             ▼
         Enrollment                   LearningPath                 LessonProgress
                │                             │                             │
                │                             ▼                             │
                │                     LearningPathItem                      │
                │                             │                             │
                │                             ▼                             │
                │                     KnowledgeUnit                         │
                │                             ▲                             │
                │                             │                             ▼
                │                      KnowledgeProgress               Lesson
                │                                                     ▲
                │                                                     │
                ▼                                                     │
            Course ─────────────► Section ─────────────► Lesson ──────┘
                ▲
                │
          Curriculum
                ▲
                │
             Subject

KnowledgeUnit
      │
      ▼
ContentBlock
```

---

# Relationship Matrix

| Parent        | Child             | Cardinality |
| ------------- | ----------------- | ----------- |
| Subject       | Curriculum        | 1:N         |
| Subject       | Course            | 1:N         |
| Curriculum    | Course            | 1:N         |
| Course        | Section           | 1:N         |
| Course        | Enrollment        | 1:N         |
| Section       | Lesson            | 1:N         |
| Lesson        | KnowledgeUnit     | 1:N         |
| KnowledgeUnit | ContentBlock      | 1:N         |
| User          | Enrollment        | 1:N         |
| User          | LearningPath      | 1:N         |
| LearningPath  | LearningPathItem  | 1:N         |
| KnowledgeUnit | LearningPathItem  | 1:N         |
| User          | LessonProgress    | 1:N         |
| Lesson        | LessonProgress    | 1:N         |
| User          | KnowledgeProgress | 1:N         |
| KnowledgeUnit | KnowledgeProgress | 1:N         |

---

# Aggregate Root

Để áp dụng Domain-Driven Design (DDD), mỗi Aggregate Root chịu trách nhiệm quản lý vòng đời của các Entity liên quan.

| Aggregate             | Root Entity   |
| --------------------- | ------------- |
| Subject Management    | Subject       |
| Curriculum Management | Curriculum    |
| Course Management     | Course        |
| Learning Content      | Lesson        |
| Knowledge Management  | KnowledgeUnit |
| Learning Progress     | Enrollment    |
| Learning Path         | LearningPath  |

---

# Lifecycle

## Course Lifecycle

```text
Draft
   │
   ▼
Published
   │
   ▼
Archived
```

---

## Lesson Lifecycle

```text
Draft
   │
   ▼
Published
   │
   ▼
Archived
```

---

## Enrollment Lifecycle

```text
Active
   │
   ├────────► Paused
   │
   ▼
Completed
```

---

## Knowledge Progress Lifecycle

```text
Not Started
       │
       ▼
In Progress
       │
       ▼
Mastered
       │
       ▼
Review Required
```

---

# Naming Convention

## Table

- snake_case
- Singular

Ví dụ:

```text
subject
course
lesson
knowledge_unit
content_block
```

---

## Foreign Key

```text
subject_id
course_id
lesson_id
knowledge_unit_id
user_id
```

---

## Prisma Model

```text
Subject
Course
Lesson
KnowledgeUnit
ContentBlock
```

---

# Design Principles

Learning Domain được thiết kế dựa trên các nguyên tắc:

- Single Responsibility Principle (SRP)
- Domain-Driven Design (DDD)
- Soft Delete
- UUID Primary Key
- Audit Trail
- Extensibility First
- AI-First Architecture

---

# AI-First Design

Learning Domain được tối ưu để AI có thể:

- Hiểu ngữ cảnh học tập.
- Theo dõi tiến độ.
- Đánh giá Mastery.
- Sinh Learning Path.
- Đề xuất nội dung tiếp theo.
- Sinh Quiz.
- Sinh Flashcard.
- Sinh Summary.

KnowledgeUnit là đơn vị ngữ cảnh chính cho AI thay vì Lesson.

---

# Future Extension

Learning Domain có thể mở rộng thêm:

- Flashcard
- Assignment
- Coding Playground
- Virtual Lab
- Peer Discussion
- Certificate
- Learning Group
- Offline Package
- AI Generated Lesson
- AI Generated Course

Các tính năng này có thể bổ sung mà không cần thay đổi cấu trúc cốt lõi của Domain.

---

# Sprint Summary

## Hoàn thành

- Domain Overview
- Entity Relationship
- Subject
- Curriculum
- Course
- Section
- Lesson
- KnowledgeUnit
- ContentBlock
- Enrollment
- LearningPath
- LearningPathItem
- LessonProgress
- KnowledgeProgress
- Business Rules
- Database Constraints
- Performance Strategy
- Learning Domain ERD

---

# Sprint Output

Learning Domain đã sẵn sàng cho các bước tiếp theo:

1. Thiết kế AI Domain (DB-004).
2. Thiết kế Quiz Domain (DB-005).
3. Thiết kế Gamification Domain (DB-006).
4. Thiết kế Payment Domain (DB-007).
5. Sinh `database.md`.
6. Sinh `schema.prisma`.
7. Sinh Migration SQL.

```

```
