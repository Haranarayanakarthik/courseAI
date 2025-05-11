import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">CourseGPT</h1>
            <div className="space-x-4">
              <Link
                href="/lesson-generator"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lesson Generator
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Course Authoring Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create engaging educational content with the power of AI
          </p>
          <Link
            href="/lesson-generator"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
