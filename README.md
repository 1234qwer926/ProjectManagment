# Project Management Tool

A modern, developer-focused project management application built with a FastAPI backend and a React (Vite) frontend. This tool allows for granular control over projects, modules, and nested todos with a focus on speed and rich aesthetics.

## 🚀 Key Features

- **Granular Hierarchy**: Manage Projects, Modules within projects, and Todos within modules.
- **JWT Authentication**: Secure access with single-user login powered by JSON Web Tokens.
- **Drag-and-Drop**: Intuitive todo reordering using `@dnd-kit`.
- **Global Dark Mode**: Seamless dark/light mode switching with system-wide persistence.
- **Data Portability**: Full support for exporting and importing project data via JSON.
- **Rate Limiting**: API protection against abuse using `slowapi`.
- **Premium UI**: Modern design system built with TailwindCSS, Shadcn UI, and Framer Motion.
- **Real-time Synchronization**: Powered by TanStack React Query for smooth data fetching and mutations.

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Async via `SQLAlchemy` and `asyncpg`)
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/)
- **Security**: `python-jose` (JWT), `passlib` (bcrypt), `slowapi` (Rate Limiting)
- **Environment**: `python-dotenv`

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Project Structure

```text
ProjectManagementTool/
├── Backend/              # FastAPI application
│   ├── app/              # Core application logic
│   │   ├── api/          # API endpoints and dependencies
│   │   ├── models/       # SQLAlchemy database models
│   │   ├── schemas/      # Pydantic data schemas
│   │   └── services/     # Business logic layers
│   └── requirements.txt  # Python dependencies
├── Frontend/             # React application
│   ├── src/
│   │   ├── components/   # UI components (dashboard, landing, layout, auth)
│   │   ├── hooks/        # Custom React hooks (API integration)
│   │   ├── pages/        # Main application views
│   │   └── store/        # Zustand state stores
│   └── package.json      # Node.js dependencies
└── .gitignore            # Shared project-level ignore rules
```

## 🛠️ Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📝 License

This project is for demonstration and development purposes.
