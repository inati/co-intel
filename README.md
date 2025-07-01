# Co-Intel

A multi-tenant workspace platform that combines structured documentation (like Notion) with AI-powered development assistance (like Cline), specifically designed for knowledge workers and development teams.

## 🏗️ Project Structure

```
co-intel/
├── memory-bank/                 # Memory Bank documentation system
│   ├── projectbrief.md         # Core project vision and requirements
│   ├── productContext.md       # User experience goals and market positioning
│   ├── systemPatterns.md       # Technical architecture and design patterns
│   ├── techContext.md          # Technology stack and development environment
│   ├── activeContext.md        # Current work state and decision tracking
│   └── progress.md             # Status tracking and milestone management
├── backend/                     # FastAPI backend application
│   ├── app/
│   │   ├── api/v1/             # API endpoints
│   │   │   ├── endpoints/      # Route handlers
│   │   │   └── api.py          # Router configuration
│   │   ├── core/               # Core configuration
│   │   │   ├── config.py       # Settings management
│   │   │   └── database.py     # Database connection
│   │   └── main.py             # FastAPI app entry point
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile              # Backend container config
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   └── app/                # Next.js App Router
│   │       ├── globals.css     # Global styles with Tailwind
│   │       ├── layout.tsx      # Root layout
│   │       ├── page.tsx        # Home page
│   │       └── providers.tsx   # React providers
│   ├── package.json            # Node.js dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── Dockerfile              # Frontend container config
├── docker-compose.yml          # Local development environment
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🚀 Technology Stack

### Backend
- **FastAPI** - High-performance async API framework
- **Supabase** - PostgreSQL database with built-in auth and real-time features
- **SQLAlchemy** - Database ORM with async support
- **Redis** - Caching and session management
- **Pydantic** - Data validation and settings management
- **PydanticAI** - Type-safe AI agent framework for LLM integration

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **CopilotKit** - AI assistant integration framework
- **ProseMirror** - Rich text editor (planned)

### Development & Deployment
- **Docker** - Containerization
- **uv** - Ultra-fast Python package installer and dependency management
- **pnpm** - Fast Node.js package manager
- **ESLint & Prettier** - Code formatting and linting

## 🏃‍♂️ Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd co-intel

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration
```

### 2. Start with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 🛠️ Development Setup

### Backend Development
```bash
cd backend

# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install dependencies with uv
uv pip install -r requirements.txt

# Or install from pyproject.toml
uv pip install -e .

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📋 Current Status

### ✅ Completed
- [x] Memory Bank documentation system
- [x] Project structure and scaffolding
- [x] Backend API framework with FastAPI
- [x] Frontend setup with Next.js 14
- [x] Docker Compose development environment
- [x] Basic API endpoints (stub implementations)
- [x] Configuration management
- [x] Tailwind CSS styling setup

### 🚧 In Progress
- [ ] Database schema implementation
- [ ] Authentication system integration
- [ ] Multi-tenant data isolation
- [ ] Basic UI components

### 📅 Planned
- [ ] ProseMirror rich text editor
- [ ] Real-time collaboration with Y.js
- [ ] AI agent integration
- [ ] Document templates system
- [ ] User management interface
- [ ] Organization and project management

## 🏛️ Architecture Overview

### Multi-Tenant Design
- **Organizations** - Top-level tenant isolation
- **Users** - Can belong to multiple organizations with roles
- **Projects** - Organization-owned workspaces
- **Documents** - Project-specific or team-wide documents

### Security Model
- **Row Level Security (RLS)** - Database-level tenant isolation
- **JWT Authentication** - Supabase Auth integration
- **Role-Based Access Control** - Granular permissions

### AI Integration
- **Agent Registry** - Public and private AI agents
- **Capability System** - Granular permissions for AI actions
- **Context-Aware** - AI agents understand document and project context

## 📚 Memory Bank System

This project implements a comprehensive Memory Bank system for maintaining context across development sessions:

- **projectbrief.md** - Foundation document with core requirements
- **productContext.md** - Product vision and user experience goals
- **systemPatterns.md** - Technical architecture and design patterns
- **techContext.md** - Technology stack and development setup
- **activeContext.md** - Current work focus and decisions
- **progress.md** - Status tracking and milestone management

## 🤝 Contributing

1. Read the Memory Bank documentation to understand the project context
2. Follow the development setup instructions
3. Create feature branches for new work
4. Update relevant Memory Bank files when making architectural decisions
5. Ensure tests pass and code follows style guidelines

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ProseMirror Documentation](https://prosemirror.net/docs/)

---

**Note**: This is an early-stage project. Many features are planned but not yet implemented. Check the Memory Bank documentation for the most current project status and roadmap.
