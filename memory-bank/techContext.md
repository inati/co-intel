# Tech Context: Knowledge Workspace Platform

## Technology Stack

### Backend Technologies

#### FastAPI Framework
- **Version**: Latest stable (0.104+)
- **Purpose**: High-performance async API framework
- **Key Features**: 
  - Automatic OpenAPI documentation
  - Type hints and validation with Pydantic
  - Async/await support
  - Built-in security features

#### Database & Storage
- **Primary Database**: Supabase (PostgreSQL 15+)
  - Self-hosted for full control
  - Built-in Row Level Security (RLS)
  - Real-time subscriptions
  - Automatic API generation
- **File Storage**: Supabase Storage
  - S3-compatible interface
  - Built-in CDN
  - Image transformations
- **Caching**: Redis (for session management and API caching)

#### Authentication
- **Provider**: Supabase Auth
- **Methods**: Email/password (MVP), OAuth providers (future)
- **Security**: JWT tokens with automatic refresh
- **Authorization**: Role-based access control (RBAC)

### Frontend Technologies

#### Next.js Framework
- **Version**: 14+ (App Router)
- **Purpose**: Full-stack React framework
- **Key Features**:
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes for BFF pattern
  - Built-in optimization

#### UI & Styling
- **Styling**: Tailwind CSS 3+
  - Utility-first CSS framework
  - Custom design system
  - Dark/light mode support
- **Components**: Custom component library
  - Built on Radix UI primitives
  - Consistent design tokens
  - Accessibility-first approach

#### AI-Powered User Experience
- **CopilotKit**: AI assistant integration framework
  - Seamless AI chat interface
  - Context-aware AI actions
  - Smart text suggestions and autocompletion
  - Custom action registration for backend integration
- **AI Components**: 
  - CopilotTextarea for AI-enhanced text editing
  - CopilotSidebar for persistent AI assistance
  - Custom actions connecting to PydanticAI backend

#### Rich Text Editor
- **Core**: ProseMirror
  - Extensible document model
  - Real-time collaboration support
  - Custom schema for structured content
- **Collaboration**: Y.js for operational transformation
  - Conflict-free replicated data types (CRDTs)
  - WebSocket-based synchronization
  - Offline support with sync

#### State Management
- **Client State**: Zustand
  - Lightweight state management
  - TypeScript-first
  - Minimal boilerplate
- **Server State**: TanStack Query (React Query)
  - Caching and synchronization
  - Background updates
  - Optimistic updates

### Development Tools

#### Language & Runtime
- **Backend**: Python 3.11+
  - Type hints with mypy
  - Async/await patterns
  - Modern Python features
- **Frontend**: TypeScript 5+
  - Strict type checking
  - Latest ECMAScript features
  - Node.js 18+ runtime

#### Package Management
- **Backend**: uv
  - Ultra-fast Python package installer
  - Drop-in replacement for pip
  - Excellent dependency resolution
  - Built in Rust for performance
- **Frontend**: pnpm
  - Fast, disk space efficient
  - Strict dependency resolution
  - Monorepo support

#### Code Quality
- **Backend**:
  - Black (code formatting)
  - isort (import sorting)
  - flake8 (linting)
  - mypy (type checking)
  - pytest (testing)
- **Frontend**:
  - Prettier (code formatting)
  - ESLint (linting)
  - TypeScript compiler (type checking)
  - Jest + Testing Library (testing)

## Development Environment

### Local Development Setup

#### Prerequisites
```bash
# Required software
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose
- Git
```

#### Environment Configuration
```bash
# Backend environment variables
DATABASE_URL=postgresql://...
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
REDIS_URL=redis://localhost:6379
JWT_SECRET=...

# Frontend environment variables
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Docker Compose Services
```yaml
services:
  # Supabase stack (PostgreSQL, Auth, Storage, etc.)
  # Redis for caching
  # Backend API service
  # Frontend development server
```

### Project Structure

#### Backend Structure
```
backend/
├── app/
│   ├── api/                 # API route handlers
│   │   ├── v1/             # API version 1
│   │   │   ├── auth.py     # Authentication endpoints
│   │   │   ├── organizations.py
│   │   │   ├── projects.py
│   │   │   ├── documents.py
│   │   │   └── ai_agents.py
│   │   └── deps.py         # Dependency injection
│   ├── core/               # Core configuration
│   │   ├── config.py       # Settings management
│   │   ├── security.py     # Auth utilities
│   │   └── database.py     # DB connection
│   ├── models/             # Database models
│   │   ├── user.py
│   │   ├── organization.py
│   │   ├── project.py
│   │   ├── document.py
│   │   └── ai_agent.py
│   ├── services/           # Business logic
│   │   ├── auth_service.py
│   │   ├── document_service.py
│   │   └── ai_service.py
│   ├── schemas/            # Pydantic schemas
│   └── main.py            # FastAPI app
├── tests/                 # Test suite
├── migrations/            # Database migrations
├── requirements.txt       # Dependencies
└── Dockerfile            # Container config
```

#### Frontend Structure
```
frontend/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/        # Auth route group
│   │   ├── (dashboard)/   # Main app routes
│   │   ├── api/           # API routes (BFF)
│   │   ├── globals.css    # Global styles
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ui/           # Base UI components
│   │   ├── editor/       # ProseMirror editor
│   │   ├── auth/         # Auth components
│   │   └── dashboard/    # Dashboard components
│   ├── lib/              # Utilities
│   │   ├── supabase.ts   # Supabase client
│   │   ├── api.ts        # API client
│   │   ├── auth.ts       # Auth utilities
│   │   └── utils.ts      # General utilities
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript types
│   └── styles/           # Additional styles
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js config
├── tailwind.config.js    # Tailwind config
└── tsconfig.json         # TypeScript config
```

## Database Schema

### Core Tables

#### Organizations (Multi-tenancy root)
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Users & Memberships
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organization_members (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, organization_id)
);
```

#### Projects & Documents
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL, -- ProseMirror document
  type TEXT NOT NULL CHECK (type IN ('memory_bank', 'custom', 'template')),
  template_id UUID REFERENCES documents(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

#### Organization-based isolation
```sql
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Example RLS policy
CREATE POLICY "Users can only access their organization's data"
ON documents FOR ALL
USING (
  organization_id IN (
    SELECT organization_id 
    FROM organization_members 
    WHERE user_id = auth.uid()
  )
);
```

## AI Integration Architecture

### AI Agent Framework with PydanticAI

#### PydanticAI Integration
- **Framework**: PydanticAI for type-safe AI agent development
- **Model Support**: OpenAI GPT-4, Anthropic Claude, and other LLM providers
- **Type Safety**: Full Pydantic validation for agent inputs/outputs
- **Async Support**: Native async/await for high-performance operations

#### Agent Types
- **Public Agents**: Available to all users
- **Team Agents**: Custom agents per organization  
- **System Agents**: Built-in platform agents

#### Default System Agents
```python
# Document Analysis Agent
- Analyzes document content and structure
- Provides insights and improvement suggestions
- Assesses readability and completeness

# Content Generator Agent  
- Generates content based on templates and context
- Supports various content types and styles
- Template expansion and creative writing

# Memory Bank Assistant
- Maintains and updates Memory Bank documentation
- Suggests improvements and identifies gaps
- Ensures documentation consistency
```

#### Agent Capabilities
```python
class AgentCapability(Enum):
    READ_DOCUMENTS = "read_documents"
    WRITE_DOCUMENTS = "write_documents"
    ANALYZE_CONTENT = "analyze_content"
    GENERATE_CONTENT = "generate_content"
    SEARCH_KNOWLEDGE = "search_knowledge"
    EXTERNAL_API = "external_api"
    UPDATE_MEMORY_BANK = "update_memory_bank"
    TEMPLATE_EXPANSION = "template_expansion"
```

#### Integration Points
- **Document Analysis**: Content understanding and suggestions
- **Content Generation**: AI-assisted writing and templates
- **Knowledge Search**: Semantic search across documents
- **Workflow Automation**: Automated document updates
- **Memory Bank Maintenance**: Automated documentation updates
- **Template Processing**: Dynamic template expansion

## Performance Considerations

### Caching Strategy
- **Database**: Connection pooling and query optimization
- **API**: Redis caching for frequently accessed data
- **Frontend**: React Query for client-side caching
- **CDN**: Static asset delivery optimization

### Scalability Patterns
- **Horizontal Scaling**: Stateless API design
- **Database Optimization**: Proper indexing and query optimization
- **Real-time Features**: WebSocket connection management
- **Background Processing**: Async task queues for heavy operations

## Security Implementation

### Authentication Flow
1. User login via Supabase Auth
2. JWT token issued with organization claims
3. Token validated on each API request
4. RLS policies enforce data isolation

### Data Protection
- **Encryption**: At-rest and in-transit encryption
- **Input Validation**: Pydantic schemas for all inputs
- **SQL Injection**: Parameterized queries only
- **XSS Protection**: Content sanitization

## Deployment Strategy

### Development Environment
- Local Docker Compose setup
- Hot reloading for both frontend and backend
- Integrated debugging tools

### Production Environment
- Container orchestration (Docker Swarm or Kubernetes)
- Load balancing and auto-scaling
- Monitoring and logging
- Automated backups and disaster recovery

This technical foundation provides a robust, scalable platform for building the knowledge workspace application.
