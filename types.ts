
export enum SentenceRole {
  SUBJECT = 'Subject',       // Бастауыш
  PREDICATE = 'Predicate',   // Баяндауыш
  ATTRIBUTE = 'Attribute',   // Анықтауыш
  OBJECT = 'Object',         // Толықтауыш
  ADVERBIAL = 'Adverbial',   // Пысықтауыш
  PARTICLE = 'Particle',     // Шылау (Not a member)
  NONE = 'None'
}

export interface WordAnalysis {
  word: string;
  role: SentenceRole;
  question: string;
  kazakhRoleName: string;
  explanation: string;
}

export interface AnalysisResult {
  fullSentence: string;
  analysis: WordAnalysis[];
  summary: string;
}

export interface UserProgress {
  totalAnalyzed: number;
  trainerSessions: number;
  correctAnswers: number;
  totalQuestions: number;
  level: number;
  experience: number;
}

export type ViewType = 'analyze' | 'trainer' | 'dashboard';
