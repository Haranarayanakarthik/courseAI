export interface LearningOutcome {
  id: string;
  description: string;
}

export interface KeyConcept {
  id: string;
  term: string;
  definition: string;
}

export interface LearningActivity {
  id: string;
  title: string;
  description: string;
  type: "discussion" | "exercise" | "quiz" | "project";
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  learningOutcomes: LearningOutcome[];
  keyConcepts: KeyConcept[];
  activities: LearningActivity[];
  estimatedDuration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
}
