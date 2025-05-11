"use client";

import { useState } from "react";
import { Lesson } from "@/types/lesson";
import LessonForm from "@/components/LessonForm";
import GeneratedLesson from "@/components/GeneratedLesson";

export default function LessonGenerator() {
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLesson = async (formData: {
    topic: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: number;
  }) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate lesson");
      }

      const lesson = await response.json();
      setGeneratedLesson(lesson);
    } catch (error) {
      console.error("Error generating lesson:", error);
      // TODO: Add proper error handling
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Lesson Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <LessonForm
              onSubmit={handleGenerateLesson}
              isGenerating={isGenerating}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : generatedLesson ? (
              <GeneratedLesson lesson={generatedLesson} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Fill out the form to generate a lesson</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
