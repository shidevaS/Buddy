"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import * as React from "react";
import { Card, Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function AdminWorkspace() {
  const router = useRouter();
  const user = auth.getUser();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (!user || user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  // Sample student data - in production this would come from API
  const [students, setStudents] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: `student-${i + 1}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      role: "student",
      grade: `Grade ${9 + (i % 2)}`,
      totalXp: 1000 + i * 50,
      level: 1 + Math.floor(i / 5),
      streak: Math.floor(Math.random() * 30),
      completedChapters: ["Algebra", "Physics", "History"][i % 3]
        .split(",")
        .map((s) => s.trim()),
      completedQuizzes: Math.floor(Math.random() * 50),
      completedHomeworks: Math.floor(Math.random() * 20),
      badges: Math.random() > 0.5 ? ["Early Bird"] : [],
    })
  );

  const [homeworks, setHomeworks] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: `admin-hw-${i + 1}`,
      title: `Homework #${i + 1}`,
      description: `Assignment ${i + 1} for students`,
      subject: ["mathematics", "science", "english"][i % 3],
      grade: `Grade ${9 + (i % 2)}`,
      dueDate: new Date(Date.now() + 86400000 * (i + 1)).toISOString().split("T")[0],
      status: i % 4 === 0 ? "overdue" : i % 2 === 0 ? "pending" : "in_progress",
      assignedBy: "admin",
      maxScore: 20,
    })
  );

  const [competitions, setCompetitions] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: `admin-comp-${i + 1}`,
      title: `Competition #${i + 1}`,
      description: `Competition description ${i + 1}`,
      type: ["hackathon", "coding_challenge", "science_fair"][i % 3],
      prize: i === 0 ? "?50,000" : i === 1 ? "Certification" : "Mentorship",
      startDate: new Date(Date.now() + 86400000 * (i + 2)).toISOString().split("T")[0],
      endDate: new Date(Date.now() + 86400000 * (i + 10)).toISOString().split("T")[0],
      eligibility: i % 2 === 0 ? "grade_9_10" : "all_grades",
      maxParticipants: 100 + i * 10,
      registeredCount: 50 + i * 5,
      status: ["upcoming", "ongoing", "completed"][i],
      link: i === 0 ? "https://hackathon.omnilearn.in" : undefined,
    })
  );

  const [quizAlerts, setQuizAlerts] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: `admin-qz-${i + 1}`,
      title: `Daily Quiz #${i + 1}`,
      description: `Quiz ${i + 1} on various subjects`,
      subject: ["mathematics", "science", "english"][i % 3],
      grade: `Grade ${9 + (i % 2)}`,
      deadline: new Date(Date.now() + 3600000 * (i + 2)).toISOString(),
      points: 10,
      isSolved: i % 3 !== 0,
    })
  );

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from the API
    setStudents(
      Array.from({ length: 20 }, (_, i) => ({
        id: `student-${i + 1}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@example.com`,
        role: "student",
        grade: `Grade ${9 + (i % 2)}`,
        totalXp: 1000 + i * 50,
        level: 1 + Math.floor(i / 5),
        streak: Math.floor(Math.random() * 30),
        completedChapters: ["Algebra", "Physics", "History"][i % 3]
          .split(",")
          .map((s) => s.trim()),
        completedQuizzes: Math.floor(Math.random() * 50),
        completedHomeworks: Math.floor(Math.random() * 20),
        badges: Math.random() > 0.5 ? ["Early Bird"] : [],
      }))
    );
    setHomeworks(
      Array.from({ length: 10 }, (_, i) => ({
        id: `admin-hw-${i + 1}`,
        title: `Homework #${i + 1}`,
        description: `Assignment ${i + 1} for students`,
        subject: ["mathematics", "science", "english"][i % 3],
        grade: `Grade ${9 + (i % 2)}`,
        dueDate: new Date(Date.now() + 86400000 * (i + 1)).toISOString().split("T")[0],
        status: i % 4 === 0 ? "overdue" : i % 2 === 0 ? "pending" : "in_progress",
        assignedBy: "admin",
        maxScore: 20,
      }))
    );
    setCompetitions(
      Array.from({ length: 5 }, (_, i) => ({
        id: `admin-comp-${i + 1}`,
        title: `Competition #${i + 1}`,
        description: `Competition description ${i + 1}`,
        type: ["hackathon", "coding_challenge", "science_fair"][i % 3],
        prize: i === 0 ? "50,000" : i === 1 ? "Certification" : "Mentorship",
        startDate: new Date(Date.now() + 86400000 * (i + 2)).toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000 * (i + 10)).toISOString().split("T")[0],
        eligibility: i % 2 === 0 ? "grade_9_10" : "all_grades",
        maxParticipants: 100 + i * 10,
        registeredCount: 50 + i * 5,
        status: ["upcoming", "ongoing", "completed"][i],
        link: i === 0 ? "https://hackathon.omnilearn.in" : undefined,
      }))
    );
    setQuizAlerts(
      Array.from({ length: 8 }, (_, i) => ({
        id: `admin-qz-${i + 1}`,
        title: `Daily Quiz #${i + 1}`,
        description: `Quiz ${i + 1} on various subjects`,
        subject: ["mathematics", "science", "english"][i % 3],
        grade: `Grade ${9 + (i % 2)}`,
        deadline: new Date(Date.now() + 3600000 * (i + 2)).toISOString(),
        points: 10,
        isSolved: i % 3 !== 0,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-lg">
              AD
            </div>
            <span className="font-bold text-lg text-gray-900">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Logged in as: {user.name}</span>
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
        </div>
      </header>

      <main className="p-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-rose-600">{students.length}</p>
            <p className="text-gray-500">Total Students</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-rose-600">{homeworks.length}</p>
            <p className="text-gray-500">Active Homeworks</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-rose-600">{competitions.length}</p>
            <p className="text-gray-500">Active Competitions</p>
          </Card>
        </div>

        {/* Tabs for different views */}
        <div className="mb-6">
          <Tabs defaultValue="students" onValueChange={() => {}} className="w-full">
            <TabList className="justify-between">
              <Tab>Students</Tab>
              <Tab>Homeworks</Tab>
              <Tab>Competitions</Tab>
              <Tab>Quiz Alerts</Tab>
            </TabList>
            <TabPanel value="students">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Student Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        XP
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Streak
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Badges
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4">
                          {student.grade}
                        </td>
                        <td className="px-6 py-4">
                          {student.totalXp}
                        </td>
                        <td className="px-6 py-4">
                          {student.level}
                        </td>
                        <td className="px-6 py-4">
                          {student.streak} days
                        </td>
                        <td className="px-6 py-4">
                          {student.badges.length > 0 ? (
                            <span className="text-green-600">
                              {student.badges.join(", ")}
                            </span>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 text-sm"
                            onClick={() => {
                              // View student details
                              alert("Viewing details for " + student.name);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
              </div>
            </TabPanel>
            <TabPanel value="homeworks">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Homework Management</h2>
              <div className="space-y-4">
                {homeworks.map((homework) => (
                  <Card key={homework.id} className="p-4 border-l-4 {homework.status === "overdue" ? "border-red-500" : homework.status === "pending" ? "border-yellow-500" : "border-green-500"}">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{homework.title}</h3>
                        <p className="text-sm text-gray-500">{homework.description}</p>
                        <p className="text-xs text-gray-400">
                          {homework.subject} • {homework.grade} • Due: {new Date(
                            homework.dueDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
        variant={homework.status === "overdue" ? "destructive" : homework.status === "pending" ? "warning" : "default"}
      >
        {homework.status}
      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="competitions">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Competition Management</h2>
              <div className="space-y-4">
                {competitions.map((competition) => (
                  <Card key={competition.id} className="p-4 border-l-4 {competition.status === "ongoing" ? "border-green-500" : "border-blue-500"}">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{competition.title}</h3>
                        <p className="text-sm text-gray-500">{competition.description}</p>
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
                  </Card>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="quiz-alerts">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz Alerts Management</h2>
              <div className="space-y-4">
                {quizAlerts.map((quiz) => (
                  <Card key={quiz.id} className="p-4 border-l-4 {quiz.isSolved ? "border-green-500" : "border-indigo-500"}">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                        <p className="text-sm text-gray-500">{quiz.description}</p>
                        <p className="text-xs text-gray-400">
                          {quiz.subject} • {quiz.grade} • Points: {quiz.points}
                        </p>
                      </div>
                      <Badge
        variant={quiz.isSolved ? "default" : "outline"}
      >
        {quiz.isSolved ? "Solved" : "Unsolved"}
      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
