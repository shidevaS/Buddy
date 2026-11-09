# OmniLearn India - World-Class Tuition Application

## 📚 Overview

**OmniLearn India** is a comprehensive learning platform for K-12 students, aspiring coders, and AI enthusiasts across India. Built with modern web technologies, this tuition app provides a world-class educational experience with features for students, parents, tutors, and administrators.

## ✨ Features

### **Student Workspace**
- **Homework Management**: Track assignments, due dates, and submission status
- **Competitions & Hackathons**: Browse and register for hackathons, coding challenges, science fairs
- **Daily Quizzes & Alerts**: Adaptive quizzes with streak tracking and points system
- **Live Courses**: Upcoming and live classes with instructors, schedules, and pricing
- **Coding Questions**: Interactive coding challenges with Monaco editor sandbox
- **Subjects & Curriculum**: CBSE/NCERT aligned subjects (Mathematics, Science, English, Hindi, Computer Science) for Grades 1-10

### **Admin Workspace**
- **Student Management**: View and manage all student profiles, progress, and badges
- **Homework Oversight**: Monitor assigned homeworks and submission status
- **Competition Tracking**: Track competition registrations and participation
- **Quiz Alerts Management**: Manage daily quizzes and student progress

### **Core Features**
- 🤖 **AI-Powered Learning**: Personalized recommendations and AI tutoring
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- 🎨 **Modern UI**: TailwindCSS with beautiful, effective design
- 🔐 **Authentication**: Role-based access (student, parent, tutor, admin)
- 📊 **Progress Tracking**: XP, levels, streaks, and badges system
- 🌐 **CBSE Alignment**: All curriculum aligned with Indian education standards

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone https://github.com/shidevaS/Buddy.git

# Navigate to project
cd Tuition-APP

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### **Build for Production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
Tuition-APP/
├── app/                    # Existing Next.js app (kept as-is)
├── src/                    # Existing shared lib (kept as-is)
├── components/             # Existing UI components (kept as-is)
├── packages/               # Tuiton Phase 1 monorepo (npm workspaces)
│   ├── web/                # Next.js App Router, TS, Tailwind, shadcn/ui
│   │   ├── app/            # App Router pages (/, /login, /dashboard/*)
│   │   ├── components/     # shadcn/ui primitives + Navbar
│   │   ├── lib/auth.ts     # Auth: seeded admins Shivani & Devendra, role-gated
│   │   └── prisma/         # Prisma schema (PostgreSQL)
│   ├── mobile/             # React Native (Expo) companion scaffold
│   └── shared/             # Shared TS types & API client (@tuiton/shared)
├── docker/                 # docker-compose.yml (Postgres + Redis)
├── .env.example            # Environment variable template
└── .env.development        # Local development env
```

## 🛠️ Technology Stack

- **Framework**: Next.js 16.x (App Router)
- **Language**: TypeScript
- **UI**: React + TailwindCSS
- **Editor**: Monaco Editor (for coding challenges)
- **Styling**: TailwindCSS v3.4
- **Authentication**: Client-side mock auth (localStorage) - upgrade to NextAuth.js for production

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 👥 User Roles

- **student**: Access to homework, competitions, quizzes, live courses, coding questions, subjects
- **parent**: Monitor child's progress (future enhancement)
- **tutor**: Create assignments, track student progress (future enhancement)
- **admin**: Full access to admin workspace, student management, content oversight

## 🌟 Roadmap & Future Enhancements

- [ ] **Real Authentication**: Integrate NextAuth.js or Supabase Auth
- [ ] **Backend Database**: Connect to PostgreSQL/MongoDB for persistent data
- [ ] **Payment Integration**: Stripe for course purchases
- [ ] **Video Streaming**: Integrated live class streaming
- [ ] **Parent Dashboard**: Parent monitoring and progress reports
- [ ] **Tutor Portal**: Create and manage assignments and courses
- [ ] **Mobile App**: React Native companion application
- [ ] **AI Tutoring**: Real AI-powered subject assistance
- [ ] **Offline Mode**: PWA support for offline content access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Owner

**SHivani Sharma** - Maintains and updates all features for this tuition app. All developments can be pushed to the GitHub repository for version control and collaboration.

---

*Built with ❤️ for India's students using free, maintainable open-source software*