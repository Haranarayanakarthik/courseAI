"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: "Introduction to Python Programming",
          description:
            "A beginner-friendly introduction to Python programming language",
          difficulty: "Beginner",
          duration: 60,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate lesson");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Lesson Generator</h1>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Test Lesson"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated Lesson:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
