/**
 * OmniLearn India - In-memory data store (free, zero-config backend)
 *
 * For today's launch this runs as a seeded in-memory store inside Next.js
 * API routes (serverless, free on Vercel). For production persistence, swap
 * this layer for Supabase / Firebase / MongoDB Atlas free tier — the API
 * route shapes stay identical.
 */

export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  school?: string;
  grade?: string;
  streak?: number;
  totalXp?: number;
  level?: number;
  createdAt: string;
};

// ---------- Seed users ----------
const SEED_USERS: User[] = [
  {
    id: 'u_1',
    name: 'Shivani Sharma',
    email: 'admin@omnilearn.in',
    role: 'admin',
    school: 'OmniLearn India',
    totalXp: 12500,
    level: 15,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'u_2',
    name: 'Aarav Mehta',
    email: 'student@omnilearn.in',
    role: 'student',
    school: 'Delhi Public School',
    grade: '10',
    streak: 12,
    totalXp: 3420,
    level: 8,
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'u_3',
    name: 'Ishita Reddy',
    email: 'ishita@omnilearn.in',
    role: 'student',
    school: 'The International School Bangalore',
    grade: '9',
    streak: 7,
    totalXp: 2100,
    level: 6,
    createdAt: '2026-03-10T00:00:00Z',
  },
];

// ---------- CBSE Subjects ----------
export type Subject = {
  id: string;
  name: string;
  code: string; // CBSE subject code
  grade: string;
  chapters: number;
  color: string;
  description: string;
};

const SEED_SUBJECTS: Subject[] = [
  { id: 's_1', name: 'Mathematics', code: '041', grade: '10', chapters: 15, color: 'bg-blue-500', description: 'Algebra, Geometry, Trigonometry, Statistics' },
  { id: 's_2', name: 'Science', code: '086', grade: '10', chapters: 16, color: 'bg-green-500', description: 'Physics, Chemistry, Biology' },
  { id: 's_3', name: 'Social Science', code: '087', grade: '10', chapters: 20, color: 'bg-amber-500', description: 'History, Geography, Civics, Economics' },
  { id: 's_4', name: 'English Language & Literature', code: '184', grade: '10', chapters: 12, color: 'bg-indigo-500', description: 'Reading, Writing, Grammar, Literature' },
  { id: 's_5', name: 'Hindi Course A', code: '002', grade: '10', chapters: 14, color: 'bg-rose-500', description: 'Hindi Grammar, Literature' },
  { id: 's_6', name: 'Computer Applications', code: '165', grade: '10', chapters: 10, color: 'bg-purple-500', description: 'HTML, Python, Cyber Ethics' },
  { id: 's_7', name: 'Mathematics', code: '041', grade: '9', chapters: 15, color: 'bg-blue-500', description: 'Number Systems, Polynomials, Geometry' },
  { id: 's_8', name: 'Science', code: '086', grade: '9', chapters: 15, color: 'bg-green-500', description: 'Matter, Atoms, Tissues, Motion' },
  { id: 's_9', name: 'Social Science', code: '087', grade: '9', chapters: 18, color: 'bg-amber-500', description: 'India & Contemporary World' },
  { id: 's_10', name: 'English', code: '184', grade: '9', chapters: 11, color: 'bg-indigo-500', description: 'Beehive & Moments' },
];

// ---------- Homework ----------
export type Homework = {
  id: string;
  title: string;
  subject: string;
  subjectId: string;
  grade: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  assignedBy: string;
  marks?: number;
  totalMarks?: number;
  studentId: string;
};

const SEED_HOMEWORK: Homework[] = [
  {
    id: 'hw_1', title: 'Quadratic Equations Practice Set', subject: 'Mathematics', subjectId: 's_1',
    grade: '10', description: 'Solve exercises 4.1 to 4.4 from NCERT Chapter 4.', dueDate: '2026-11-15',
    status: 'pending', assignedBy: 'Shivani Sharma', studentId: 'u_2', totalMarks: 20,
  },
  {
    id: 'hw_2', title: 'Chemical Reactions Lab Report', subject: 'Science', subjectId: 's_2',
    grade: '10', description: 'Write up the combustion and displacement experiment observations.', dueDate: '2026-11-17',
    status: 'pending', assignedBy: 'Shivani Sharma', studentId: 'u_2', totalMarks: 25,
  },
  {
    id: 'hw_3', title: 'French Revolution Essay', subject: 'Social Science', subjectId: 's_3',
    grade: '9', description: '1000-word essay on causes and impact of the French Revolution.', dueDate: '2026-11-20',
    status: 'submitted', assignedBy: 'Shivani Sharma', studentId: 'u_3', marks: 18, totalMarks: 20,
  },
  {
    id: 'hw_4', title: 'Python Loop Programs', subject: 'Computer Applications', subjectId: 's_6',
    grade: '10', description: 'Write 5 Python programs using for/while loops.', dueDate: '2026-11-18',
    status: 'pending', assignedBy: 'Shivani Sharma', studentId: 'u_2', totalMarks: 15,
  },
];

// ---------- Quizzes ----------
export type Quiz = {
  id: string;
  title: string;
  subject: string;
  subjectId: string;
  grade: string;
  description: string;
  questionCount: number;
  timeLimit: number; // minutes
  xpReward: number;
  status: 'live' | 'upcoming' | 'completed';
  scheduledAt?: string;
};

const SEED_QUIZZES: Quiz[] = [
  { id: 'q_1', title: 'Daily Math Warm-up', subject: 'Mathematics', subjectId: 's_1', grade: '10', description: '10 quick questions on quadratic equations.', questionCount: 10, timeLimit: 15, xpReward: 50, status: 'live' },
  { id: 'q_2', title: 'Science: Chemical Reactions', subject: 'Science', subjectId: 's_2', grade: '10', description: 'Test your knowledge of reaction types.', questionCount: 12, timeLimit: 20, xpReward: 60, status: 'live' },
  { id: 'q_3', title: 'Weekly Current Affairs', subject: 'Social Science', subjectId: 's_3', grade: '9', description: 'October 2026 national & international events.', questionCount: 15, timeLimit: 20, xpReward: 75, status: 'upcoming', scheduledAt: '2026-11-10T09:00:00Z' },
  { id: 'q_4', title: 'English Grammar Challenge', subject: 'English Language & Literature', subjectId: 's_4', grade: '10', description: 'Tenses, voice, and narration.', questionCount: 20, timeLimit: 25, xpReward: 80, status: 'live' },
  { id: 'q_5', title: 'Python Basics Quiz', subject: 'Computer Applications', subjectId: 's_6', grade: '10', description: 'Variables, data types, loops.', questionCount: 10, timeLimit: 15, xpReward: 55, status: 'live' },
];

// ---------- Competitions ----------
export type Competition = {
  id: string;
  title: string;
  type: 'olympiad' | 'quiz-bowl' | 'coding' | 'essay';
  subject: string;
  grade: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: string;
  registeredCount: number;
};

const SEED_COMPETITIONS: Competition[] = [
  {
    id: 'c_1', title: 'CBSE Math Olympiad 2026', type: 'olympiad', subject: 'Mathematics', grade: '9-10',
    description: 'National-level mathematics olympiad aligned with CBSE syllabus.', startDate: '2026-12-01', endDate: '2026-12-05', prize: 'Gold Medal + Certificate', registeredCount: 1240,
  },
  {
    id: 'c_2', title: 'National Science Quiz Bowl', type: 'quiz-bowl', subject: 'Science', grade: '9-10',
    description: 'Inter-school science quiz competition.', startDate: '2026-11-25', endDate: '2026-11-27', prize: 'Laptop + Trophy', registeredCount: 890,
  },
  {
    id: 'c_3', title: 'OmniLearn Hackathon Junior', type: 'coding', subject: 'Computer Applications', grade: '8-10',
    description: 'Build a learning app in 48 hours.', startDate: '2026-11-20', endDate: '2026-11-22', prize: '₹50,000 + Internship', registeredCount: 340,
  },
];

// ---------- Hackathons ----------
export type Hackathon = {
  id: string;
  title: string;
  theme: string;
  description: string;
  startDate: string;
  endDate: string;
  mode: 'online' | 'offline' | 'hybrid';
  prize: string;
  registeredCount: number;
  status: 'upcoming' | 'live' | 'completed';
};

const SEED_HACKATHONS: Hackathon[] = [
  {
    id: 'h_1', title: 'OmniLearn Hackathon Junior 2026', theme: 'EdTech for India',
    description: 'Build an app that helps K-12 students learn better. Open to grades 8-10.',
    startDate: '2026-11-20T09:00:00Z', endDate: '2026-11-22T18:00:00Z', mode: 'online', prize: '₹50,000 + Internship at OmniLearn',
    registeredCount: 340, status: 'live',
  },
  {
    id: 'h_2', title: 'CBSE AI for Students Hackathon', theme: 'Artificial Intelligence',
    description: 'Create AI-powered solutions for school problems.',
    startDate: '2026-12-05T09:00:00Z', endDate: '2026-12-07T18:00:00Z', mode: 'hybrid', prize: '₹1,00,000 + CBSE Certificate',
    registeredCount: 560, status: 'upcoming',
  },
];

// ---------- Live Courses ----------
export type LiveCourse = {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  grade: string;
  description: string;
  schedule: string; // e.g. "Mon, Wed, Fri 6:00 PM"
  duration: string;
  price: string;
  status: 'upcoming' | 'live' | 'completed';
  studentsEnrolled: number;
  thumbnail?: string;
};

const SEED_LIVE_COURSES: LiveCourse[] = [
  {
    id: 'lc_1', title: 'CBSE Class 10 Math - Board Crash Course', instructor: 'Shivani Sharma', subject: 'Mathematics', grade: '10',
    description: 'Complete Class 10 Mathematics syllabus with board exam focus.', schedule: 'Mon, Wed, Fri 6:00 PM - 7:30 PM', duration: '8 weeks', price: '₹2,999',
    status: 'live', studentsEnrolled: 1240,
  },
  {
    id: 'lc_2', title: 'Python Programming for Beginners', instructor: 'Rahul Verma', subject: 'Computer Applications', grade: '9-10',
    description: 'Learn Python from scratch and build mini projects.', schedule: 'Tue, Thu 5:00 PM - 6:30 PM', duration: '6 weeks', price: '₹1,999',
    status: 'live', studentsEnrolled: 680,
  },
  {
    id: 'lc_3', title: 'Science Board Exam Revision', instructor: 'Priya Nair', subject: 'Science', grade: '10',
    description: 'Quick revision of Physics, Chemistry & Biology for boards.', schedule: 'Sat, Sun 11:00 AM - 12:30 PM', duration: '4 weeks', price: '₹2,499',
    status: 'upcoming', studentsEnrolled: 410,
  },
];

// ---------- Coding Questions ----------
export type CodingQuestion = {
  id: string;
  title: string;
  language: 'python' | 'javascript' | 'cpp' | 'java';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: { input: string; expectedOutput: string }[];
  xpReward: number;
};

const SEED_CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: 'cq_1', title: 'Hello OmniLearn', language: 'python', difficulty: 'Easy',
    description: 'Print "Hello, OmniLearn!" to the console.', starterCode: '# Write your code here\nprint("Hello, OmniLearn!")',
    testCases: [{ input: '', expectedOutput: 'Hello, OmniLearn!' }], xpReward: 20,
  },
  {
    id: 'cq_2', title: 'Sum of Two Numbers', language: 'python', difficulty: 'Easy',
    description: 'Read two integers and print their sum.', starterCode: 'a = int(input())\nb = int(input())\n# Write your code here',
    testCases: [{ input: '3\n5', expectedOutput: '8' }, { input: '10\n20', expectedOutput: '30' }], xpReward: 25,
  },
  {
    id: 'cq_3', title: 'Check Even or Odd', language: 'python', difficulty: 'Easy',
    description: 'Read an integer and print "Even" if it is even, else "Odd".', starterCode: 'n = int(input())\n# Write your code here',
    testCases: [{ input: '4', expectedOutput: 'Even' }, { input: '7', expectedOutput: 'Odd' }], xpReward: 30,
  },
  {
    id: 'cq_4', title: 'Factorial', language: 'python', difficulty: 'Medium',
    description: 'Compute the factorial of a given number.', starterCode: 'n = int(input())\n# Write your code here',
    testCases: [{ input: '5', expectedOutput: '120' }, { input: '3', expectedOutput: '6' }], xpReward: 50,
  },
];

// ---------- In-memory store ----------
let users = [...SEED_USERS];
let homework = [...SEED_HOMEWORK];
let quizzes = [...SEED_QUIZZES];
let competitions = [...SEED_COMPETITIONS];
let hackathons = [...SEED_HACKATHONS];
let liveCourses = [...SEED_LIVE_COURSES];
let codingQuestions = [...SEED_CODING_QUESTIONS];
let subjects = [...SEED_SUBJECTS];

export const db = {
  // users
  getUsers: () => users,
  getUserById: (id: string) => users.find((u) => u.id === id),
  getUserByEmail: (email: string) => users.find((u) => u.email === email),
  createUser: (u: User) => { users.push(u); return u; },
  updateUser: (id: string, patch: Partial<User>) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    return users[idx];
  },
  getStudents: () => users.filter((u) => u.role === 'student'),
  getAdmins: () => users.filter((u) => u.role === 'admin'),

  // homework
  getHomework: () => homework,
  getHomeworkByStudent: (studentId: string) => homework.filter((h) => h.studentId === studentId),
  createHomework: (h: Homework) => { homework.push(h); return h; },
  updateHomework: (id: string, patch: Partial<Homework>) => {
    const idx = homework.findIndex((h) => h.id === id);
    if (idx === -1) return null;
    homework[idx] = { ...homework[idx], ...patch };
    return homework[idx];
  },

  // quizzes
  getQuizzes: () => quizzes,
  getQuizById: (id: string) => quizzes.find((q) => q.id === id),

  // competitions
  getCompetitions: () => competitions,

  // hackathons
  getHackathons: () => hackathons,

  // live courses
  getLiveCourses: () => liveCourses,

  // coding questions
  getCodingQuestions: () => codingQuestions,
  getCodingQuestionById: (id: string) => codingQuestions.find((c) => c.id === id),

  // subjects
  getSubjects: () => subjects,
  getSubjectsByGrade: (grade: string) => subjects.filter((s) => s.grade === grade),
};

