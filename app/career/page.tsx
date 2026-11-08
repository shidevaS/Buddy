'use client';

import { cn } from '@/lib/utils';
import { CareerInterestSelector, SkillProgressBar, CareerPathCard, CertificationCard, UserProgressTracker } from '@/components/features/career-components';
import { UserProgress, CareerInterest, Skill } from '@/lib/types';
import * as React from 'react';

interface CareerDevelopmentPageProps {
  user: import('@/lib/types').UserProfile | null;
  progress: import('@/lib/types').UserProgress | null;
}

export default function CareerDevelopmentPage({ user, progress }: CareerDevelopmentPageProps) {
  const [selectedInterest, setSelectedInterest] = React.useState<CareerInterest>('technology');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Development
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Career guidance based on interests, skill tracking, and certification paths
          </p>
        </div>

        {/* Career Interest Selector */}
        <CareerInterestSelector
          selectedInterest={selectedInterest}
          onInterestSelect={setSelectedInterest}
        />

        {/* Career Paths Based on Interest */}
        <div className="mt-8 space-y-6">
          {[1, 2, 3].map((index) => (
            <CareerPathCard
              key={index}
              path={
                selectedInterest === 'technology'
                  ? {
                      id: '1',
                      title: 'Software Development',
                      description: 'Build applications and systems using modern programming languages',
                      requiredSkills: [
                        { name: 'Programming', level: 'intermediate' as const, progress: 75 },
                        { name: 'Problem Solving', level: 'intermediate' as const, progress: 80 },
                        { name: 'Version Control', level: 'beginner' as const, progress: 60 },
                      ],
                      relatedCertifications: ['AWS Certified Developer', 'Google Professional Cloud Developer'],
                    }
                  : selectedInterest === 'healthcare'
                    ? {
                      id: '2',
                      title: 'Healthcare Administration',
                      description: 'Manage healthcare facilities and services',
                      requiredSkills: [
                        { name: 'Leadership', level: 'intermediate' as const, progress: 70 },
                        { name: 'Communication', level: 'advanced' as const, progress: 85 },
                        { name: 'Organization', level: 'beginner' as const, progress: 65 },
                      ],
                      relatedCertifications: ['Certified Healthcare Manager', 'PMP'],
                    }
                  : {
                      id: '3',
                      title: 'Creative Design',
                      description: 'Pursue careers in visual design, UI/UX, and digital arts',
                      requiredSkills: [
                        { name: 'Design Thinking', level: 'intermediate' as const, progress: 70 },
                        { name: 'Adobe Creative Suite', level: 'advanced' as const, progress: 80 },
                        { name: 'Color Theory', level: 'beginner' as const, progress: 65 },
                      ],
                      relatedCertifications: ['Adobe Certified Professional', 'Figma Certified'],
                    }
              }
              isSelected={index === 0}
              onSelect={() => console.log('Explore career path')}
            />
          ))}
        </div>

        {/* Skill Tracking */}
        {progress && (
          <SkillProgressBar
            skill={{
              name: 'Leadership',
              level: 'intermediate' as const,
              progress: 70,
            }}
            onUpdate={() => {}}
          />
        )}

        {/* Progress Tracker */}
        {progress && (
          <UserProgressTracker
            progress={progress}
            onSkillUpdate={() => console.log('Skill updated')}
          />
        )}

        {/* Recommended Certifications */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Certifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3].map((id) => (
              <CertificationCard
                key={id}
                certification={{
                  id: `${id}`,
                  name: `Certification ${id}`,
                  issuingOrganization: 'OmniLearn',
                  dateEarned: '2024-01-15',
                  credentialId: `CL-2024-${id}`,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}