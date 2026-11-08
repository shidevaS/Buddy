/**
 * Types for OmniLearn India Application
 * Enhanced with AI, Coding, Curriculum, and Career Development types
 */

// User authentication types
export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  streak?: number;
  totalXp?: number;
  level?: number;
};

// Curriculum types
export type GradeLevel = 
  | '1' 
  | '2' 
  | '3' 
  | '4' 
  | '5' 
  | '6' 
  | '7' 
  | '8' 
  | '9' 
  | '10';

export type Subject = 
  | 'mathematics' 
  | 'science' 
  | 'social_science' 
  | 'english' 
  | 'hindi' 
  | 'computer_science';

export type Chapter = {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  exercises?: Exercise[];
};

export type Exercise = {
  id: string;
  question: string;
  type: 'multiple_choice' | 'fill_blanks' | 'numeric' | 'descriptive';
  options?: string[];
  answer: string;
  explanation: string;
};

export type CurriculumSection = {
  grade: GradeLevel;
  subject: Subject;
  chapters: Chapter[];
};

// Coding types
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type CodeChallenge = {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  language: 'python' | 'javascript' | 'typescript' | 'html_css';
  starterCode?: string;
  testCases?: TestCase[];
  hint?: string;
  solution?: string;
};

export type TestCase = {
  input: string;
  expectedOutput: string;
  description?: string;
};

export type CodeSandboxState = {
  code: string;
  language: 'python' | 'javascript' | 'typescript' | 'html_css';
  theme: 'light' | 'dark';
};

// AI Tutoring types
export type AITutoringSession = {
  id: string;
  subject: Subject;
  grade: GradeLevel;
  conversation: AITurn[];
  createdAt: string;
  status: 'active' | 'completed';
};

export type AITurn = {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  isGenerated: boolean;
  feedback?: string;
};

export type PersonalizedRecommendation = {
  id: string;
  title: string;
  description: string;
  type: 'curriculum' | 'code_challenge' | 'quiz' | 'career';
  relevanceScore: number;
  actionUrl?: string;
};

// Career Development types
export type CareerInterest = 
  | 'technology' 
  | 'healthcare' 
  | 'arts' 
  | 'business' 
  | 'science' 
  | 'engineering' 
  | 'design' 
  | 'data_science' 
  | 'other';

export type Skill = {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number; // 0-100
};

export type CareerPath = {
  id: string;
  title: string;
  description: string;
  requiredSkills: Skill[];
  relatedCertifications: string[];
  salaryRange?: string;
};

export type UserProgress = {
  id: string;
  userId: string;
  careerPathId: string;
  skills: Skill[];
  completedMilestones: string[];
  certifications: Certification[];
};

export type Certification = {
  id: string;
  name: string;
  issuingOrganization: string;
  dateEarned: string;
  credentialId?: string;
};

// UI Interaction types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

// Live Tuition types
export type LiveClass = {
  id: string;
  title: string;
  subject: Subject;
  grade: GradeLevel;
  instructor: string;
  duration: string;
  schedule: string;
  price: string;
  status: 'upcoming' | 'live' | 'completed';
  studentsEnrolled: number;
};

// Homework types
export type HomeworkStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export type Homework = {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: GradeLevel;
  dueDate: string;
  status: HomeworkStatus;
  assignedBy: 'teacher' | 'admin';
  maxScore: number;
  submittedBy?: string;
  submissionDate?: string;
  attachmentUrl?: string;
};

// Competition types
export type CompetitionType = 'hackathon' | 'coding_challenge' | 'quiz_bowl' | 'science_fair' | 'other';

export type Competition = {
  id: string;
  title: string;
  description: string;
  type: CompetitionType;
  prize?: string;
  startDate: string;
  endDate: string;
  eligibility: 'grade_9_10' | 'grade_7_8' | 'grade_5_6' | 'all_grades';
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  link?: string;
};

// Quiz/Alert types
export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuizAlert = {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: GradeLevel;
  deadline: string;
  points: number;
  isSolved: boolean;
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  studentId: string;
  answers: Record<string, number | string>;
  score: number;
  completedAt: string;
  timeTaken: number; // in seconds
};

// Live Course types
export type LiveClassStatus = 'upcoming' | 'live' | 'completed' | 'recorded';

export type LiveCourse = {
  id: string;
  title: string;
  subject: Subject;
  grade: GradeLevel;
  instructor: string;
  duration: string;
  schedule: string;
  price: string;
  status: LiveClassStatus;
  studentsEnrolled: number;
  maxStudents: number;
  thumbnail?: string;
  recordingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
};

// Coding Question types
export type CodingQuestion = {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  language: 'python' | 'javascript' | 'typescript' | 'html_css';
  starterCode?: string;
  testCases?: TestCase[];
  hint?: string;
  solution?: string;
  topic: string; // specific topic within subject
};

// Student Progress/Workspace types
export type StudentProgress = {
  userId: string;
  totalXp: number;
  level: number;
  streak: number;
  completedChapters: string[];
  completedQuizzes: string[];
  completedHomeworks: string[];
  completedChallenges: string[];
  badges: Badge[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  criteria: string;
};

// Subject Mastery
export type SubjectMastery = {
  subject: Subject;
  grade: GradeLevel;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progressPercentage: number;
  lastStudied: string;
};