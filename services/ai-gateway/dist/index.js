"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.AI_GATEWAY_PORT || 3002;
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'ai-gateway' });
});
// AI Capability Routing endpoint
app.post('/api/v1/capability', (req, res) => {
    const { capability, input, context } = req.body;
    console.log(`Received request for AI capability: ${capability}`);
    if (capability === 'tutor.answer') {
        const userMessage = input?.message || '';
        return res.json({
            requestId: 'mock-request-id',
            capability,
            response: {
                answer: `Đây là phản hồi tự động của AI Tutor cho câu hỏi của bạn: "${userMessage}". Trong Sprint 1, tôi hoạt động ở chế độ mô phỏng (mock mode).`,
                sources: ['Tài liệu Giáo khoa cơ bản', 'Đặc tả AI Tutor v1.0'],
            },
            usage: {
                promptTokens: 20,
                completionTokens: 60,
                estimatedCostUsd: 0.00016,
            },
        });
    }
    if (capability === 'learning_path.generate') {
        const subjectCode = context?.subjectCode || 'MATH101';
        return res.json({
            requestId: 'mock-request-id',
            capability,
            response: {
                status: 'READY',
                path: [
                    { order: 1, title: 'Bài 1: Giới hạn và Đạo hàm nâng cao', type: 'CORE' },
                    { order: 2, title: 'Bài 2: Tính đơn điệu của hàm số', type: 'CORE' },
                    { order: 3, title: 'Bài 3: Cực trị hàm số và Quy tắc L’Hôpital nâng cao', type: 'ADVANCED' },
                ],
            },
            usage: {
                promptTokens: 50,
                completionTokens: 120,
                estimatedCostUsd: 0.00034,
            },
        });
    }
    return res.status(400).json({
        error: `Unsupported capability: ${capability}`,
    });
});
app.listen(port, () => {
    console.log(`AI Gateway listening at http://localhost:${port}`);
});
