import { Lesson } from "@/types/lesson";

interface GeneratedLessonProps {
  lesson: Lesson;
}

export default function GeneratedLesson({ lesson }: GeneratedLessonProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
        <p className="mt-2 text-gray-600">{lesson.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Learning Outcomes
        </h3>
        <ul className="list-disc list-inside space-y-2">
          {lesson.learningOutcomes.map((outcome) => (
            <li key={outcome.id} className="text-gray-600">
              {outcome.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Key Concepts
        </h3>
        <div className="space-y-4">
          {lesson.keyConcepts.map((concept) => (
            <div key={concept.id} className="bg-gray-50 p-4 rounded-lg">
              <dt className="font-medium text-gray-900">{concept.term}</dt>
              <dd className="mt-1 text-gray-600">{concept.definition}</dd>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Learning Activities
        </h3>
        <div className="space-y-4">
          {lesson.activities.map((activity) => (
            <div
              key={activity.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {activity.type}
                </span>
              </div>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Difficulty: {lesson.difficulty}</span>
        <span>Duration: {lesson.estimatedDuration} minutes</span>
      </div>
    </div>
  );
}
