# ADR-008: Lựa chọn Mobile Framework – Flutter

> **Thông tin quản trị:**
> - **Mã tài liệu:** ADR-008
> - **Trạng thái:** Accepted
> - **Người quyết định:** Tech Lead
> - **Ngày quyết định:** 2026-06-28
> - **Tài liệu liên quan:** [Architecture](../Architecture.md)

## Bối cảnh

Cần chọn framework mobile để build app học tập cho iOS và Android.

## Quyết định

**Flutter (Dart)** với state management **Bloc/Cubit**.

## Lý do

1. **Cross-platform**: Một codebase cho cả iOS và Android.
2. **Performance**: Compile sang native ARM code, không dùng JS bridge → animation 60fps mượt.
3. **Custom UI**: Flutter có full control pixel-perfect UI, phù hợp với learning app cần UX tinh tế.
4. **Hot reload**: Development cycle nhanh.
5. **Dart**: Strongly typed, dễ onboard với background TypeScript/Java.

## Đánh đổi

- **Team phải học Dart**: Ngôn ngữ mới với backend/web dev. Mitigation: Flutter docs rất tốt, Dart tương tự C#/TypeScript.
- **Bundle size lớn hơn**: Flutter app ~10-20MB. Chấp nhận được.
- **Web support còn hạn chế**: Không dùng Flutter web – dùng React web riêng.

## State Management: Bloc/Cubit

- **Cubit** cho simple states (auth, user prefs).
- **Bloc** cho complex flows (learning session, quiz flow).
- Tránh Provider-only pattern ở scale lớn.

## Cấu trúc thư mục Flutter

```
apps/mobile/
├── lib/
│   ├── core/          # DI, routing, theme
│   ├── features/      # Feature-first structure
│   │   ├── auth/
│   │   ├── learning/
│   │   ├── quiz/
│   │   └── ai_tutor/
│   └── shared/        # Widgets, utils, models
├── test/
└── pubspec.yaml
```

## Tài liệu liên quan

- [Architecture](../Architecture.md)
- [ADR-007 Frontend Stack](ADR-007_Frontend_Stack.md)
