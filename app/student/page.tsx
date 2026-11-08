"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import * as React from "react";
import { Card, Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function StudentWorkspace() {
  const router = useRouter();
  const user = auth.getUser();
  const [mounted, setMounted] = useState(false);
  const [selectedTab] = useState("homework");

  React.useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  // Sample data - in production this would come from API
  const [homeworks, setHomeworks] = useState<Homework[]>([
    {
      id: "hw1",
      title: "Mathematics Assignment - Algebra",
      description: "Solve quadratic equations Chapter 4",
      subject: "mathematics",
      grade: "9",
      dueDate: "2024-12-15",
      status: "pending",
      assignedBy: "teacher",
      maxScore: 20,
    },
    {
      id: "hw2",
      title: "Science Project - Physics",
      description: "Build a simple circuit model",
      subject: "science",
      grade: "9",
      dueDate: "2024-12-20",
      status: "in_progress",
      assignedBy: "teacher",
      maxScore: 30,
    },
  ]);

  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: "comp1",
      title: "National Hackathon 2024",
      description: "Build an AI-powered solution for real-world problems",
      type: "hackathon",
      prize: "50,000 + Internship",
      startDate: '2024-11-20',
      endDate: "2024-12-10",
      eligibility: "grade_9_10",
      maxParticipants: 100,
      registeredCount: 45,
      status: "ongoing",
      link: "https://hackathon.omnilearn.in",
    },
    {
      id: "comp2",
      title: "Science Fair 2024",
      description: "Innovative science projects and experiments",
      type: "science_fair",
      prize: "Certification + Mentorship",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      eligibility: "all_grades",
      maxParticipants: 50,
      registeredCount: 30,
      status: "upcoming",
    },
  ]);

  const [quizAlerts, setQuizAlerts] = useState<QuizAlert[]>([
    {
      id: "qz1",
      title: "Daily Quiz - Mathematics",
      description: "Solve 10 questions on quadratic equations",
      subject: "mathematics",
      grade: "9",
      deadline: "2024-12-10T17:00:00",
      points: 10,
      isSolved: false,
    },
    {
      id: "qz2",
      title: "Daily Quiz - Science",
      description: "Physics: Laws of Motion",
      subject: "science",
      grade: "9",
      deadline: "2024-12-11T17:00:00",
      points: 10,
      isSolved: false,
    },
  ]);

  const [liveCourses, setLiveCourses] = useState<LiveCourse[]>([
    {
      id: "lc1",
      title: "CBSE Class 9 Mathematics",
      subject: "mathematics",
      grade: "9",
      instructor: "Dr. Sharma",
      duration: "2 hours",
      schedule: "Mon-Fri, 4:00 PM - 5:00 PM",
      price: "Free",
      status: "upcoming",
      studentsEnrolled: 1247,
      maxStudents: 5000,
    },
    {
      id: "lc2",
      title: "Python Coding Bootcamp",
      subject: "computer_science",
      grade: "10",
      instructor: "Prof. Patel",
      duration: "6 weeks",
      schedule: "Tue & Thu, 5:00 PM - 7:00 PM",
      price: "2,999",
      status: "upcoming",
      studentsEnrolled: 892,
      maxStudents: 1000,
    },
  ]);

  const [codingQuestions, setCodingQuestions] = useState<CodingQuestion[]>([
    {
      id: "cq1",
      title: "Reverse a Linked List",
      description: "Implement a function to reverse a singly linked list",
      difficulty: "Medium",
      language: "python",
      topic: "Data Structures",
      starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef reverse(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev",
      testCases: [
        { input: "1->2->3->None", expectedOutput: "3->2->1->None", description: "Basic reversal" },
      ],
      hint: "Use three pointers: previous, current, and next",
    },
    {
      id: "cq2",
      title: "HTML Form Validation",
      description: "Create a form with validation for email and password",
      difficulty: "Easy",
      language: "html_css",
      topic: "Web Development",
      starterCode: "<form>\n  <div>\n    <label>Email:</label>\n    <input type="email" required>\n  </div>\n  <div>\n    <label>Password:</label>\n    <input type="password" required>\n  </div>\n  <button type="submit">Submit</button>\n</form>",
      testCases: [],
      hint: "Use HTML5 validation attributes and CSS for visual feedback",
    },
  ]);

  // Tab handler
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and logout */}
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <span className="font-bold text-lg text-gray-900">Welcome, {user.name}</span>
            <span className="text-sm text-gray-500">Grade {user.grade || ""}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              auth.logout();
              router.push("/auth/login");
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="p-4">
        {/* Tab Navigation */}
        <div className="mb-6">
          <Tabs defaultValue="homework" onValueChange={handleTabChange} className="w-full">
            <TabList className="justify-between">
              <Tab>Homework</Tab>
              <Tab>Competitions</Tab>
              <Tab>Quizzes</Tab>
              <Tab>Live Courses</Tab>
              <Tab>Coding Questions</Tab>
              <Tab>Subjects</Tab>
            </TabList>
            <TabPanel value="homework">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Homework</h2>
              {homeworks.length === 0 ? (
                <p className="text-gray-500">No homework assigned. Keep checking for new assignments!</p>
              ) : (
                <div className="space-y-4">
                  {homeworks.map((homework) => (
                    <Card key={homework.id} className="p-4 border-l-4 {homework.status === "overdue" ? "border-red-500" : "border-indigo-500"}">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{homework.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">{homework.description}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-indigo-600">{homework.subject} • Grade {homework.grade}</span>
                            <span className="text-gray-400">• Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge
                          variant={homework.status === "overdue" ? "destructive" : "default"}
                        >
                          {homework.status}
                        </Badge>
                      </div>
                      {homework.status !== "completed" && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">Max Score: {homework.maxScore}</p>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel value="competitions">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Competitions & Hackathons</h2>
              {competitions.length === 0 ? (
                <p className="text-gray-500">No competitions found. Check back later for new opportunities!</p>
              ) : (
                <div className="space-y-4">
                  {competitions.map((competition) => (
                    <Card key={competition.id} className="p-4 border-l-4 {competition.status === "ongoing" ? "border-green-500" : "border-blue-500"}">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{competition.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">{competition.description}</p>
                          <p className="text-xs text-gray-400">
                            {competition.type} • {competition.startDate} to {competition.endDate}
                          </p>
                        </div>
                        <Badge
                          variant={competition.status === "ongoing" ? "default" : "outline"}
                        >
                          {competition.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {competition.registeredCount}/{competition.maxParticipants} registered
                        </p>
                        {competition.link && (
                          <a
                            href={competition.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-sm hover underline mt-1 block"
                          >
                            {competition.link}
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel value="quizzes">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Quizzes & Alerts</h2>
              {quizAlerts.length === 0 ? (
                <p className="text-gray-500">No active quizzes. Complete your daily quiz to earn points!</p>
              ) : (
                <div className="space-y-4">
                  {quizAlerts.map((quiz) => (
                    <Card key={quiz.id} className="p-4 border-l-4 {quiz.isSolved ? "border-green-500" : "border-indigo-500"}">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">{quiz.description}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-indigo-600">{quiz.subject} • Grade {quiz.grade}</span>
                            <span className="text-gray-400">• Deadline: {new Date(quiz.deadline).toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge
                          variant={quiz.isSolved ? "default" : "outline"}
                        >
                          {quiz.isSolved ? "Solved" : "Attempt"}
                        </Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Points: {quiz.points}</p>
                        {!quiz.isSolved && (
                          <Button
                            variant="link"
                            size="sm"
                            className="text-indigo-600 text-sm hover underline mt-1 block"
                            onClick={() => {
                              setQuizAlerts(quizAlerts.map((q) => (q.id === quiz.id ? { ...q, isSolved: true } : q)));
                            }}
                          >
                            Take Quiz
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel value="live-courses">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Live Courses</h2>
              {liveCourses.length === 0 ? (
                <p className="text-gray-500">No live courses available. Check the schedule for upcoming sessions!</p>
              ) : (
                <div className="space-y-4">
                  {liveCourses.map((course) => (
                    <Card key={course.id} className="p-4 border-l-4 {course.status === "live" ? "border-green-500" : "border-blue-500"}">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">{course.subject} • Grade {course.grade}</p>
                          <p className="text-xs text-gray-400">
                            {course.instructor} • {course.schedule}
                          </p>
                        </div>
                        <Badge
                          variant={course.status === "live" ? "default" : "outline"}
                        >
                          {course.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {course.studentsEnrolled}/{course.maxStudents} enrolled • {course.price}
                        </p>
                        {course.status === "upcoming" && (
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-sm hover underline mt-1 block"
                          >
                            Join Course
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel value="coding-questions">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Coding Questions & Challenges</h2>
              {codingQuestions.length === 0 ? (
                <p className="text-gray-500">No coding questions available. Keep practicing!</p>
              ) : (
                <div className="space-y-4">
                  {codingQuestions.map((question) => (
                    <Card key={question.id} className="p-4 border-l-4 border-indigo-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{question.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">{question.description}</p>
                          <p className="text-xs text-gray-400">{question.topic} • {question.difficulty}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-indigo-600">{question.language}</span>
                          <span className="text-gray-400">{question.testCases?.length || 0} test cases</span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-indigo-600 text-sm hover underline mt-1 block"
                        onClick={() => {
                          alert("Opening coding question: " + question.title);
                        }}
                      >
                        Solve
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel value="subjects">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Subjects & Curriculum</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("Mathematics curriculum loaded")}
                >
                  Mathematics (1-10)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("Science curriculum loaded")}
                >
                  Science (1-10)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("Social Science curriculum loaded")}
                >
                  Social Science (1-10)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("English curriculum loaded")}
                >
                  English (1-10)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("Hindi curriculum loaded")}
                >
                  Hindi (1-10)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => alert("Computer Science curriculum loaded")}
                >
                  Computer Science (1-10)
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Aligned with CBSE/NCERT curriculum. Select a subject to view chapters and exercises.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
