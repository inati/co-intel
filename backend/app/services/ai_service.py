"""
AI service using PydanticAI for agent management and execution.
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel
from pydantic_ai import Agent, RunContext
from pydantic_ai.models import OpenAIModel, AnthropicModel

from app.core.config import settings


class DocumentContext(BaseModel):
    """Context for document-related AI operations."""
    document_id: str
    title: str
    content: str
    project_id: Optional[str] = None
    organization_id: str


class AgentCapability(BaseModel):
    """AI agent capability definition."""
    name: str
    description: str
    parameters: Dict[str, Any] = {}


class AIAgentConfig(BaseModel):
    """Configuration for AI agents."""
    name: str
    description: str
    model_provider: str = "openai"  # openai, anthropic
    model_name: str = "gpt-4"
    capabilities: List[str] = []
    system_prompt: str = ""
    max_tokens: int = 1000
    temperature: float = 0.7


class AIService:
    """Service for managing AI agents and operations."""
    
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self._initialize_default_agents()
    
    def _get_model(self, provider: str, model_name: str):
        """Get AI model based on provider."""
        if provider == "openai":
            return OpenAIModel(
                model_name=model_name,
                api_key=settings.OPENAI_API_KEY
            )
        elif provider == "anthropic":
            return AnthropicModel(
                model_name=model_name,
                api_key=settings.ANTHROPIC_API_KEY
            )
        else:
            raise ValueError(f"Unsupported model provider: {provider}")
    
    def _initialize_default_agents(self):
        """Initialize default system agents."""
        
        # Document Analysis Agent
        doc_analyzer_config = AIAgentConfig(
            name="document_analyzer",
            description="Analyzes document content and provides insights",
            model_provider="openai",
            model_name="gpt-4",
            capabilities=["analyze_content", "extract_insights"],
            system_prompt="""You are a document analysis expert. Analyze the provided document content and provide:
1. Key themes and topics
2. Content structure analysis
3. Suggestions for improvement
4. Missing information that could be added
5. Readability assessment

Provide your analysis in a structured format.""",
            max_tokens=1500,
            temperature=0.3
        )
        
        self.create_agent("document_analyzer", doc_analyzer_config)
        
        # Content Generator Agent
        content_generator_config = AIAgentConfig(
            name="content_generator",
            description="Generates content based on templates and context",
            model_provider="openai",
            model_name="gpt-4",
            capabilities=["generate_content", "template_expansion"],
            system_prompt="""You are a content generation expert. Generate high-quality content based on:
1. The provided context and requirements
2. The target audience and purpose
3. The desired tone and style
4. Any specific templates or structures requested

Ensure the content is well-structured, engaging, and fits the specified requirements.""",
            max_tokens=2000,
            temperature=0.7
        )
        
        self.create_agent("content_generator", content_generator_config)
        
        # Memory Bank Assistant
        memory_bank_config = AIAgentConfig(
            name="memory_bank_assistant",
            description="Helps maintain and update Memory Bank documentation",
            model_provider="openai",
            model_name="gpt-4",
            capabilities=["update_memory_bank", "suggest_improvements"],
            system_prompt="""You are a Memory Bank documentation expert. Help maintain comprehensive project documentation by:
1. Analyzing current project state and context
2. Suggesting updates to Memory Bank files
3. Identifying missing information or outdated content
4. Ensuring consistency across documentation
5. Recommending best practices for knowledge management

Focus on maintaining clear, actionable, and up-to-date project documentation.""",
            max_tokens=1500,
            temperature=0.4
        )
        
        self.create_agent("memory_bank_assistant", memory_bank_config)
    
    def create_agent(self, agent_id: str, config: AIAgentConfig) -> Agent:
        """Create a new AI agent with the given configuration."""
        model = self._get_model(config.model_provider, config.model_name)
        
        agent = Agent(
            model=model,
            system_prompt=config.system_prompt,
            retries=2
        )
        
        self.agents[agent_id] = agent
        return agent
    
    async def analyze_document(
        self, 
        document_context: DocumentContext,
        analysis_type: str = "comprehensive"
    ) -> Dict[str, Any]:
        """Analyze a document using the document analyzer agent."""
        agent = self.agents.get("document_analyzer")
        if not agent:
            raise ValueError("Document analyzer agent not found")
        
        prompt = f"""
        Analyze the following document:
        
        Title: {document_context.title}
        Content: {document_context.content}
        
        Analysis Type: {analysis_type}
        
        Provide a {analysis_type} analysis of this document.
        """
        
        try:
            result = await agent.run(prompt)
            return {
                "analysis": result.data,
                "document_id": document_context.document_id,
                "analysis_type": analysis_type
            }
        except Exception as e:
            return {
                "error": str(e),
                "document_id": document_context.document_id
            }
    
    async def generate_content(
        self,
        prompt: str,
        context: Optional[Dict[str, Any]] = None,
        template_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """Generate content using the content generator agent."""
        agent = self.agents.get("content_generator")
        if not agent:
            raise ValueError("Content generator agent not found")
        
        full_prompt = f"""
        Generate content based on the following requirements:
        
        Prompt: {prompt}
        """
        
        if context:
            full_prompt += f"\nContext: {context}"
        
        if template_type:
            full_prompt += f"\nTemplate Type: {template_type}"
        
        try:
            result = await agent.run(full_prompt)
            return {
                "content": result.data,
                "template_type": template_type,
                "success": True
            }
        except Exception as e:
            return {
                "error": str(e),
                "success": False
            }
    
    async def update_memory_bank(
        self,
        current_context: Dict[str, Any],
        requested_updates: List[str]
    ) -> Dict[str, Any]:
        """Get suggestions for updating Memory Bank documentation."""
        agent = self.agents.get("memory_bank_assistant")
        if not agent:
            raise ValueError("Memory Bank assistant agent not found")
        
        prompt = f"""
        Current Project Context: {current_context}
        
        Requested Updates: {requested_updates}
        
        Provide specific suggestions for updating the Memory Bank documentation based on the current project state and requested updates.
        """
        
        try:
            result = await agent.run(prompt)
            return {
                "suggestions": result.data,
                "success": True
            }
        except Exception as e:
            return {
                "error": str(e),
                "success": False
            }
    
    def list_agents(self) -> List[Dict[str, Any]]:
        """List all available agents."""
        return [
            {
                "id": agent_id,
                "name": agent_id.replace("_", " ").title(),
                "available": True
            }
            for agent_id in self.agents.keys()
        ]
    
    def get_agent_capabilities(self, agent_id: str) -> List[str]:
        """Get capabilities for a specific agent."""
        capabilities_map = {
            "document_analyzer": ["analyze_content", "extract_insights", "readability_assessment"],
            "content_generator": ["generate_content", "template_expansion", "creative_writing"],
            "memory_bank_assistant": ["update_memory_bank", "suggest_improvements", "documentation_review"]
        }
        
        return capabilities_map.get(agent_id, [])


# Global AI service instance
ai_service = AIService()
