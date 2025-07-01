# Project Brief: Knowledge Workspace Platform

## Project Overview

A multi-tenant workspace platform that combines structured documentation (like Notion) with AI-powered development assistance (like Cline), specifically designed for knowledge workers and development teams.

## Core Vision

Create a platform where teams can maintain perfect documentation and context across development sessions, with AI agents that help automate and enhance knowledge work.

## Key Requirements

### Multi-Tenant Architecture
- **Organizations/Teams**: Top-level tenant isolation
- **Users**: Can belong to multiple teams with role-based permissions  
- **Projects**: Team-owned workspaces for specific initiatives
- **Shared Knowledge Base**: Team-level documents that apply across all projects

### Document Management
- Rich text editing with ProseMirror
- Structured templates based on Memory Bank specification
- Document types:
  - Project-specific documents (scoped to individual projects)
  - Team-wide documents (shared across all team projects)
  - Template documents (reusable structures)

### AI Agent Ecosystem
- Public AI Agent Library: Curated collection available to all users
- Custom Team Agents: Teams can create/configure specialized agents
- Integration Points: Agents can read/write documents, suggest content, automate workflows

### Workspace Features
- Project workspaces with isolated environments
- Cross-project search capabilities
- Document relationships and linking
- Version control and change tracking

## Technology Stack

- **Backend**: FastAPI + Self-hosted Supabase (PostgreSQL)
- **Frontend**: Next.js with TypeScript
- **Editor**: ProseMirror for rich text editing
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **State Management**: React Query + Zustand

## Success Criteria

1. Teams can create and manage multiple projects
2. Rich document editing with structured templates
3. AI agents can assist with content creation and project management
4. Seamless collaboration within teams
5. Scalable multi-tenant architecture

## Target Users

- Software development teams
- Product managers and designers
- Consultants and agencies
- Research teams
- Knowledge workers requiring structured documentation + AI assistance

## Project Scope

**MVP Phase**: Core multi-tenant document management with basic AI integration
**Future Phases**: Advanced AI agents, external integrations, advanced collaboration features
