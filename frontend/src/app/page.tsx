import { CopilotDemo } from '@/components/ai/CopilotDemo'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Co-Intel
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Multi-tenant document management with AI assistance powered by PydanticAI and CopilotKit
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Organizations</h3>
            <p className="mt-2 text-sm text-gray-500">
              Multi-tenant architecture with organization-based isolation and role management.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Projects</h3>
            <p className="mt-2 text-sm text-gray-500">
              Organize documents into projects with Memory Bank templates and structure.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <p className="mt-2 text-sm text-gray-500">
              Rich text editing with ProseMirror and real-time collaboration features.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">AI Agents</h3>
            <p className="mt-2 text-sm text-gray-500">
              Intelligent assistance powered by PydanticAI and CopilotKit integration.
            </p>
          </div>
        </div>
      </div>

      {/* CopilotKit Demo */}
      <CopilotDemo />
    </main>
  )
}
