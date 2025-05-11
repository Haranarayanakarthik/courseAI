"use client";

import { useState } from "react";

export default function GenerateLessons() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("https://api.grok.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "grok-1",
          messages: [
            {
              role: "system",
              content:
                "You are an expert educator who creates comprehensive, engaging, and well-structured lesson content. Your responses should be clear, detailed, and easy to understand.",
            },
            {
              role: "user",
              content: `Generate a comprehensive lesson about ${topic}. Include:
1. A clear title
2. List of main subtopics to cover
3. Detailed content for each subtopic with examples and explanations
Format the response in a clear, structured way.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate content"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Generate Learning Content
          </h1>
          <p className="text-gray-600 text-lg">
            Create engaging educational content with AI assistance
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-lg border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                >
                  What topic would you like to learn about?
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 hover:border-blue-400"
                    placeholder="e.g., Photosynthesis, World War II, Algebra"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                    isGenerating ? "animate-pulse" : ""
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate Content"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {generatedContent && (
              <div className="mt-8 animate-fade-in">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Generated Content
                </h2>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-inner prose prose-blue max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">
                    {generatedContent}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Print
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedContent);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5 mr-2 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
