import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial subjects and learning units...');

  // Create Math Subject
  const mathSubject = await prisma.subject.upsert({
    where: { code: 'MATH101' },
    update: {},
    create: {
      name: 'Toán học Cơ bản',
      code: 'MATH101',
      description: 'Lộ trình Toán học dành cho học sinh THPT',
    },
  });

  // Create Physics Subject
  const physicsSubject = await prisma.subject.upsert({
    where: { code: 'PHYS101' },
    update: {},
    create: {
      name: 'Vật lý Đại cương',
      code: 'PHYS101',
      description: 'Khái niệm vật lý nền tảng và cơ học cổ điển',
    },
  });

  // Create a Course in Math
  const algebraCourse = await prisma.course.create({
    data: {
      subjectId: mathSubject.id,
      title: 'Đại số tuyến tính & Giải tích',
      description: 'Các bài học cơ bản về hàm số, đồ thị và đạo hàm',
    },
  });

  // Create a Lesson
  const firstLesson = await prisma.lesson.create({
    data: {
      courseId: algebraCourse.id,
      title: 'Bài 1: Giới hạn và Đạo hàm nâng cao',
      orderIndex: 1,
    },
  });

  // Create a KnowledgeUnit
  const ku1 = await prisma.knowledgeUnit.create({
    data: {
      lessonId: firstLesson.id,
      title: 'Quy tắc L’Hôpital và ứng dụng tìm giới hạn vô định',
      content: `Quy tắc L’Hôpital (còn gọi là quy tắc Bernoulli-L'Hôpital) là một phương pháp toán học sử dụng đạo hàm để tính toán giới hạn của các hàm số ở dạng vô định (như 0/0 hoặc vô cùng / vô cùng).

Công thức cơ bản:
Nếu giới hạn lim f(x)/g(x) khi x tiến tới c có dạng vô định 0/0 hoặc vô cùng/vô cùng, và g'(x) khác 0 trên một khoảng lân cận c (ngoại trừ tại c), thì:
lim f(x)/g(x) = lim f'(x)/g'(x)

Ví dụ thực tế:
Tính giới hạn lim(sin x / x) khi x tiến tới 0.
Vì sin 0 = 0 và x = 0 nên giới hạn có dạng 0/0.
Áp dụng quy tắc L’Hôpital:
Đạo hàm của sin x là cos x.
Đạo hàm của x là 1.
lim (cos x / 1) khi x -> 0 = cos 0 = 1.`,
      version: 1,
      orderIndex: 1,
    },
  });

  // Create a Quiz for this KnowledgeUnit
  const quiz = await prisma.quiz.create({
    data: {
      knowledgeUnitId: ku1.id,
      title: 'Quiz ngắn: Áp dụng Quy tắc L’Hôpital',
    },
  });

  // Create questions
  const q1 = await prisma.question.create({
    data: {
      quizId: quiz.id,
      stem: 'Tính giới hạn của lim (x^2 - 1) / (x - 1) khi x tiến tới 1 bằng cách dùng quy tắc L’Hôpital.',
      orderIndex: 1,
    },
  });

  await prisma.answerOption.createMany({
    data: [
      { questionId: q1.id, content: '1', isCorrect: false },
      { questionId: q1.id, content: '2', isCorrect: true },
      { questionId: q1.id, content: '0', isCorrect: false },
      { questionId: q1.id, content: 'Không tồn tại', isCorrect: false },
    ],
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
