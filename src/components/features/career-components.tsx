import { cn } from '@/lib/utils';
import { UserProgress, CareerPath, Skill, Certification } from '@/lib/types';

interface CareerInterestSelectorProps {
  selectedInterest: CareerInterest;
  onInterestSelect: (interest: CareerInterest) => void;
}

export function CareerInterestSelector({
  selectedInterest,
  onInterestSelect,
}: CareerInterestSelectorProps) {
  const interests = ['technology', 'healthcare', 'arts', 'business', 'science', 'engineering', 'design', 'data_science'];
  const elements = [];
  for (const interest of interests) {
    const onClick = () => onInterestSelect(interest as CareerInterest);
    const label = interest.replace(/_/g, ' ').split(' ').map((word, i) =>
      i === 0 ? word.charAt(0).toUpperCase() + word.slice() : word
    ).join(' ');
    elements.push(
      <Button
        key={interest}
        variant={selectedInterest === interest ? 'primary' : 'outline'}
        size="sm"
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {elements}
    </div>
  );
}

interface SkillProgressBarProps {
  skill: Skill;
  onUpdate: (level: Skill['level']) => void;
}

export function SkillProgressBar({ skill, onUpdate }: SkillProgressBarProps) {
  const levelMap: Record<Skill['level'], string> = {
    beginner: 'bg-green-500',
    intermediate: 'bg-amber-500',
    advanced: 'bg-red-500',
  };
  const progressWidth = skill.progress;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn('h-full rounded-full', levelMap[skill.level])}
          style={{ width: progressWidth + '%' }}
        />
      </div>
      <p className="text-xs text-gray-500">{skill.progress}% complete</p>
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 rounded-md"
        onClick={() => onUpdate(skill.level === 'advanced' ? 'beginner' : 'intermediate')}
      >
        +
      </Button>
    </div>
  );
}

interface CareerPathCardProps {
  path: CareerPath;
  isSelected: boolean;
  onSelect: () => void;
}

export function CareerPathCard({ path, isSelected, onSelect }: CareerPathCardProps) {
  return (
    <div className={cn(
      'p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300',
      isSelected ? 'border-primary bg-primary-50' : ''
    )}>
      <h3 className="font-medium text-gray-900 mb-2">{path.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{path.description}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {path.requiredSkills.map((skill) => (
          <span key={skill.name} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            {skill.name}
          </span>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onSelect}
        className="mt-3 w-full"
      >
        Explore Path
      </Button>
    </div>
  );
}

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{certification.name}</h4>
        <span className="text-xs text-gray-500">{certification.issuingOrganization}</span>
      </div>
      <p className="text-xs text-gray-500 mb-1">{certification.dateEarned}</p>
      <Button variant="outline" size="sm" style={{ width: '100%' }}>
        Download Certificate
      </Button>
    </div>
  );
}

interface UserProgressTrackerProps {
  progress: UserProgress;
  onSkillUpdate: (skillName: string, progress: number) => void;
}

export function UserProgressTracker({ progress, onSkillUpdate }: UserProgressTrackerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">My Progress</h2>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
        <div className="grid grid-cols-2 gap-3">
          {progress.skills.map((skill) => (
            <SkillProgressBar
              key={skill.name}
              skill={skill}
              onUpdate={(level) => onSkillUpdate(skill.name, skill.progress)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
        <div className="grid grid-cols-2 gap-3">
          {progress.certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Milestones</h3>
        <ul className="list-disc pl-5 text-gray-600">
          {progress.completedMilestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
