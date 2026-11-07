import { cn } from '@/lib/utils';
import { GradeLevel, Subject, Chapter, CurriculumSection } from '@/lib/types';

interface GradeSelectorProps {
  activeGrade: GradeLevel;
  onGradeSelect: (grade: GradeLevel) => void;
}

export function GradeSelector({ activeGrade, onGradeSelect }: GradeSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
        <Button
          key={grade}
          variant={activeGrade === grade ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onGradeSelect(grade as GradeLevel)}
        >
          {grade}st
          {grade === 1 ? '' : grade === 2 ? 'nd' : grade === 3 ? 'rd' : 'th'}
        </Button>
      ))}
    </div>
  );
}

interface SubjectTabsProps {
  activeSubject: Subject;
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectTabs({ activeSubject, onSubjectSelect }: SubjectTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <Button variant="outline" size="sm" onClick={() => onSubjectSelect('mathematics')}>
        Mathematics
      </Button>
      <Button variant="outline" size="sm" onClick={() => onSubjectSelect('science')}>
        Science
      </Button>
      <Button variant="outline" size="sm" onClick={() => onSubjectSelect('social_science')}>
        Social Science
      </Button>
      <Button variant="outline" size="sm" onClick={() => onSubjectSelect('english')}>
        English
      </Button>
    </div>
  );
}

interface ChapterListProps {
  chapters: Chapter[];
  onChapterSelect: (chapter: Chapter) => void;
  loading?: boolean;
}

export function ChapterList({ chapters, onChapterSelect, loading = false }: ChapterListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
        {[1, 2, 3, 4, 5].map(() => (
          <div key={Math.random()} className="animate-pulse h-6 rounded-md bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {chapters.map((chapter) => (
        <Button
          key={chapter.id}
          variant="outline"
          size="sm"
          onClick={() => onChapterSelect(chapter)}
        >
          {chapter.title}
        </Button>
      ))}
    </div>
  );
}

interface CurriculumGridProps {
  sections: CurriculumSection[];
  onSectionSelect: (section: CurriculumSection) => void;
}

export function CurriculumGrid({ sections, onSectionSelect }: CurriculumGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((section) => (
        <Card
          key={section.chapters[0]?.id}
          className="p-5 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSectionSelect(section)}
        >
          <h3 className="font-medium text-gray-900 mb-2">
            {`Grade ${section.chapters[0]?.title || ''}`}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {section.subject} - {section.chapters.length} chapters
          </p>
        </Card>
      ))}
    </div>
  );
}

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
}

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const handleAnswer = (answer: string) => {
    onAnswer(answer);
    // Could show feedback here
  };

  if (exercise.type === 'multiple_choice') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">{exercise.question}</h4>
        {exercise.options?.map((option, index) => (
          <div key={index} className="mb-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          </div>
        ))}
      </div>
    );
  }

  if (exercise.type === 'fill_blanks') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="font-medium text-gray-900 mb-3">
          {exercise.question}
        </p>
        <input
          type="text"
          placeholder="Your answer here"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => handleAnswer(e.target.value)}
        />
      </div>
    );
  }

  // Default descriptive answer
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h4 className="font-medium text-gray-900 mb-3">{exercise.question}</h4>
      <textarea
        placeholder="Your answer here"
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-y"
        onChange={(e) => handleAnswer(e.target.value)}
      />
    </div>
  );
}