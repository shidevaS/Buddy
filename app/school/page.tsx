'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { GradeSelector, SubjectTabs, ChapterList, CurriculumGrid, ExerciseCard } from '@/components/features/curriculum-components';
import { GradeLevel, Subject, Chapter } from '@/lib/types';

interface SchoolCurriculumProps {
  user: import('@/lib/types').UserProfile | null;
}

export default function SchoolCurriculumPage({ user }: SchoolCurriculumProps) {
  const [activeGrade, setActiveGrade] = React.useState<GradeLevel>('6');
  const [activeSubject, setActiveSubject] = React.useState<Subject>('mathematics');
  const [activeChapter, setActiveChapter] = React.useState<Chapter | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Sample curriculum data - in a real app, this would come from an API
  const curriculumSections: import('@/lib/types').CurriculumSection[] = [
    {
      grade: '1',
      subject: 'mathematics',
      chapters: [
        { id: '1-1', title: 'Numbers 1-9', content: 'Learn numbers from 1 to 9 with counting exercises.' },
        { id: '1-2', title: 'Shapes', content: 'Identify basic shapes like circles, squares, and triangles.' },
        { id: '1-3', title: 'Addition', content: 'Introduction to addition with pictures.' },
      ],
    },
    {
      grade: '2',
      subject: 'mathematics',
      chapters: [
        { id: '2-1', title: 'Numbers 10-99', content: 'Learn numbers from 10 to 99.' },
        { id: '2-2', title: 'Subtraction', content: 'Basic subtraction concepts.' },
        { id: '2-3', title: 'Measurement', content: 'Introduction to length and weight.' },
      ],
    },
    {
      grade: '3',
      subject: 'mathematics',
      chapters: [
        { id: '3-1', title: 'Multiplication', content: 'Introduction to multiplication tables.' },
        { id: '3-2', title: 'Division', content: 'Basic division concepts.' },
        { id: '3-3', title: 'Fractions', content: 'Understanding halves and quarters.' },
      ],
    },
    {
      grade: '4',
      subject: 'mathematics',
      chapters: [
        { id: '4-1', title: 'Factors and Multiples', content: 'Understanding factors and multiples.' },
        { id: '4-2', title: 'Decimals', content: 'Introduction to decimal numbers.' },
        { id: '4-3', title: 'Geometry', content: 'Lines, angles, and triangles.' },
      ],
    },
    {
      grade: '5',
      subject: 'mathematics',
      chapters: [
        { id: '5-1', title: 'Algebraic Expressions', content: 'Introduction to variables and expressions.' },
        { id: '5-2', title: 'Ratio and Proportion', content: 'Understanding ratios.' },
        { id: '5-3', title: 'Symmetry', content: 'Lines of symmetry in shapes.' },
      ],
    },
    {
      grade: '6',
      subject: 'mathematics',
      chapters: [
        { id: '6-1', title: 'Integers', content: 'Understanding positive and negative numbers.' },
        { id: '6-2', title: 'Fractions and Decimals', content: 'Operations with fractions.' },
        { id: '6-3', title: 'Data Handling', content: 'Charts and graphs.' },
      ],
    },
    {
      grade: '7',
      subject: 'mathematics',
      chapters: [
        { id: '7-1', title: 'Integers', content: 'Operations with integers.' },
        { id: '7-2', title: 'Simple Equations', content: 'Solving one-variable equations.' },
        { id: '7-3', title: 'Lines and Angles', content: 'Types of angles and lines.' },
      ],
    },
    {
      grade: '8',
      subject: 'mathematics',
      chapters: [
        { id: '8-1', title: 'Rational Numbers', content: 'Operations with fractions.' },
        { id: '8-2', title: 'Linear Equations', content: 'Solving linear equations.' },
        { id: '8-3', title: 'Understanding Quadrilaterals', content: 'Properties of quadrilaterals.' },
      ],
    },
    {
      grade: '9',
      subject: 'mathematics',
      chapters: [
        { id: '9-1', title: 'Number Systems', content: 'Real numbers and their properties.' },
        { id: '9-2', title: 'Polynomials', content: 'Algebraic expressions and identities.' },
        { id: '9-3', title: 'Coordinate Geometry', content: 'Plotting points and lines.' },
      ],
    },
    {
      grade: '10',
      subject: 'mathematics',
      chapters: [
        { id: '10-1', title: 'Real Numbers', content: 'Euclid\'s division lemma and Fundamental Theorem of Arithmetic.' },
        { id: '10-2', title: 'Polynomials', content: 'Zeros of a polynomial and relationship between zeros and coefficients.' },
        { id: '10-3', title: 'Pair of Linear Equations', content: 'Graphical and algebraic methods.' },
      ],
    },
  ];

  const sectionsByGrade = curriculumSections.filter(
    (s) => s.grade === activeGrade
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            NCERT-Aligned School Curriculum
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete curriculum for Classes 1-10 with chapter-wise notes, videos, and practice worksheets
          </p>
        </div>

        {/* Grade Selector */}
        <GradeSelector
          activeGrade={activeGrade}
          onGradeSelect={setActiveGrade}
        />

        {/* Subject Tabs */}
        <SubjectTabs
          activeSubject={activeSubject}
          onSubjectSelect={setActiveSubject}
        />

        {/* Curriculum Grid */}
        <CurriculumGrid
          sections={sectionsByGrade}
          onSectionSelect={(section) => {
            // In a real app, this would load the section's chapters
            setActiveChapter(section.chapters[0] || null);
          }}
        />

        {/* Chapter Content Area */}
        {activeChapter && (
          <div className="mt-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {activeChapter.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{activeChapter.content}</p>
              
              {/* Exercises */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Practice Exercises</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((id) => (
                    <ExerciseCard
                      key={id}
                      exercise={{
                        id: `${activeChapter.id}-${id}`,
                        type: 'multiple_choice' as const,
                        question: `Exercise ${id}: Practice question related to ${activeChapter.title}`,
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        answer: 'Option A',
                        explanation: 'This is the explanation for the exercise.',
                      }}
                      onAnswer={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm">
              Previous Chapter
            </Button>
            <Button variant="primary" size="sm">
              Next Chapter
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}