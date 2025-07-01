import { CopilotRuntime, OpenAIAdapter } from '@copilotkit/runtime'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { handleRequest } = CopilotRuntime({
    actions: [
      {
        name: 'analyzeDocument',
        description: 'Analyze a document for insights and suggestions',
        parameters: [
          {
            name: 'documentId',
            type: 'string',
            description: 'The ID of the document to analyze',
            required: true,
          },
          {
            name: 'title',
            type: 'string', 
            description: 'The title of the document',
            required: true,
          },
          {
            name: 'content',
            type: 'string',
            description: 'The content of the document to analyze',
            required: true,
          },
          {
            name: 'analysisType',
            type: 'string',
            description: 'Type of analysis to perform (comprehensive, quick, structure)',
            required: false,
          },
        ],
        handler: async ({ documentId, title, content, analysisType = 'comprehensive' }) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai-agents/analyze-document`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                document_id: documentId,
                title,
                content,
                organization_id: 'default', // TODO: Get from user context
                analysis_type: analysisType,
              }),
            })

            if (!response.ok) {
              throw new Error(`Analysis failed: ${response.statusText}`)
            }

            const result = await response.json()
            return `Document Analysis Results:\n\n${result.analysis || result.error}`
          } catch (error) {
            return `Error analyzing document: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        },
      },
      {
        name: 'generateContent',
        description: 'Generate content based on a prompt and context',
        parameters: [
          {
            name: 'prompt',
            type: 'string',
            description: 'The prompt for content generation',
            required: true,
          },
          {
            name: 'templateType',
            type: 'string',
            description: 'Type of template to use (memory_bank, technical_doc, user_story, etc.)',
            required: false,
          },
          {
            name: 'context',
            type: 'string',
            description: 'Additional context for content generation',
            required: false,
          },
        ],
        handler: async ({ prompt, templateType, context }) => {
          try {
            const requestBody: any = { prompt }
            
            if (templateType) {
              requestBody.template_type = templateType
            }
            
            if (context) {
              requestBody.context = { additional_context: context }
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai-agents/generate-content`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
              throw new Error(`Content generation failed: ${response.statusText}`)
            }

            const result = await response.json()
            return result.content || result.error || 'No content generated'
          } catch (error) {
            return `Error generating content: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        },
      },
      {
        name: 'suggestMemoryBankUpdates',
        description: 'Get suggestions for updating Memory Bank documentation',
        parameters: [
          {
            name: 'currentContext',
            type: 'string',
            description: 'Current project context and state',
            required: true,
          },
          {
            name: 'requestedUpdates',
            type: 'string',
            description: 'Specific updates requested (comma-separated)',
            required: true,
          },
        ],
        handler: async ({ currentContext, requestedUpdates }) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai-agents/memory-bank/suggest-updates`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                current_context: { context: currentContext },
                requested_updates: requestedUpdates.split(',').map(s => s.trim()),
              }),
            })

            if (!response.ok) {
              throw new Error(`Memory Bank suggestions failed: ${response.statusText}`)
            }

            const result = await response.json()
            return `Memory Bank Update Suggestions:\n\n${result.suggestions || result.error}`
          } catch (error) {
            return `Error getting Memory Bank suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        },
      },
      {
        name: 'listAvailableAgents',
        description: 'List all available AI agents and their capabilities',
        parameters: [],
        handler: async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai-agents/available`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            if (!response.ok) {
              throw new Error(`Failed to list agents: ${response.statusText}`)
            }

            const result = await response.json()
            const agents = result.agents || []
            
            return `Available AI Agents:\n\n${agents.map((agent: any) => 
              `• ${agent.name} (ID: ${agent.id}) - ${agent.available ? 'Available' : 'Unavailable'}`
            ).join('\n')}`
          } catch (error) {
            return `Error listing agents: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        },
      },
    ],
  })

  return handleRequest(req)
}
