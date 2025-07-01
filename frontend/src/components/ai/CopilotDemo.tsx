'use client'

import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'
import { CopilotTextarea } from '@copilotkit/react-textarea'
import { useState } from 'react'

export function CopilotDemo() {
  const [documentContent, setDocumentContent] = useState('')
  const [analysisResult, setAnalysisResult] = useState('')

  // Make document content readable by Copilot
  useCopilotReadable({
    description: 'Current document content being edited',
    value: documentContent,
  })

  // Register custom action for document analysis
  useCopilotAction({
    name: 'analyzeCurrentDocument',
    description: 'Analyze the current document content',
    parameters: [
      {
        name: 'analysisType',
        type: 'string',
        description: 'Type of analysis to perform',
        enum: ['comprehensive', 'quick', 'structure'],
      },
    ],
    handler: async ({ analysisType }) => {
      if (!documentContent.trim()) {
        return 'No document content to analyze. Please add some content first.'
      }

      try {
        const response = await fetch('/api/copilotkit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'analyzeDocument',
            parameters: {
              documentId: 'demo-doc-1',
              title: 'Demo Document',
              content: documentContent,
              analysisType: analysisType || 'comprehensive',
            },
          }),
        })

        const result = await response.text()
        setAnalysisResult(result)
        return result
      } catch (error) {
        const errorMsg = `Failed to analyze document: ${error}`
        setAnalysisResult(errorMsg)
        return errorMsg
      }
    },
  })

  // Register action for content generation
  useCopilotAction({
    name: 'generateMemoryBankTemplate',
    description: 'Generate a Memory Bank template document',
    parameters: [
      {
        name: 'templateType',
        type: 'string',
        description: 'Type of Memory Bank template',
        enum: ['projectbrief', 'productContext', 'systemPatterns', 'techContext', 'activeContext', 'progress'],
      },
      {
        name: 'projectName',
        type: 'string',
        description: 'Name of the project',
      },
    ],
    handler: async ({ templateType, projectName }) => {
      try {
        const prompt = `Generate a ${templateType} template for a project called "${projectName}". Follow the Memory Bank documentation structure and include relevant sections and placeholder content.`
        
        const response = await fetch('/api/copilotkit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'generateContent',
            parameters: {
              prompt,
              templateType: 'memory_bank',
              context: `Project: ${projectName}, Template: ${templateType}`,
            },
          }),
        })

        const result = await response.text()
        setDocumentContent(result)
        return `Generated ${templateType} template for ${projectName}`
      } catch (error) {
        return `Failed to generate template: ${error}`
      }
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Document Editor</h2>
        <p className="text-gray-600 mb-6">
          This demo shows CopilotKit integration with our PydanticAI backend. 
          Try asking the AI assistant to analyze your document or generate Memory Bank templates.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Content
            </label>
            <CopilotTextarea
              className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={documentContent}
              onValueChange={setDocumentContent}
              placeholder="Start typing your document content here... You can ask the AI assistant to help analyze or generate content."
              autosuggestionsConfig={{
                textareaPurpose: 'Document content for a knowledge workspace platform',
                chatApiConfigs: {
                  suggestionsApiConfig: {
                    forwardedParams: {
                      max_tokens: 20,
                      stop: ['\n\n'],
                    },
                  },
                },
              }}
            />
          </div>

          {analysisResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Analysis Result</h3>
              <pre className="text-sm text-blue-800 whitespace-pre-wrap">{analysisResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Available AI Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900">Document Analysis</h4>
            <p className="text-sm text-gray-600 mt-1">
              Ask: "Analyze this document" or "Give me a comprehensive analysis"
            </p>
          </div>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900">Content Generation</h4>
            <p className="text-sm text-gray-600 mt-1">
              Ask: "Generate a project brief template" or "Create a technical document"
            </p>
          </div>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900">Memory Bank Templates</h4>
            <p className="text-sm text-gray-600 mt-1">
              Ask: "Generate a Memory Bank template for my project"
            </p>
          </div>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900">Agent Information</h4>
            <p className="text-sm text-gray-600 mt-1">
              Ask: "What AI agents are available?" or "List agent capabilities"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Use the sidebar chat to interact with AI assistants</li>
          <li>• The AI can read and understand your document content</li>
          <li>• Try natural language commands like "analyze this" or "help me improve this"</li>
          <li>• Generated content will automatically appear in the editor</li>
        </ul>
      </div>
    </div>
  )
}
