export interface GuestSession {
    id: string;
    installationId: string;
    createdAt: Date;
}
export interface LearningGoal {
    id: string;
    title: string;
    description: string;
}
export interface Subject {
    id: string;
    name: string;
    code: string;
}
export interface KnowledgeUnit {
    id: string;
    subjectId: string;
    title: string;
    content: string;
    version: number;
}
export interface QuizAttempt {
    id: string;
    userId: string;
    knowledgeUnitId: string;
    score: number;
    completedAt: Date;
}
