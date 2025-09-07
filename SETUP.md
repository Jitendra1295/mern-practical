# Environment Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/course_enrollment_db

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Database Setup

### PostgreSQL Installation

#### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the postgres user

#### macOS
```bash
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create Database
```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE course_enrollment_db;

-- Create user (optional)
CREATE USER course_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE course_enrollment_db TO course_user;

-- Exit psql
\q
```

### Update .env file
Replace the DATABASE_URL with your actual credentials:
```env
DATABASE_URL=postgresql://course_user:your_password@localhost:5432/course_enrollment_db
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run migrations
npm run migration:run

# Start development server
npm run dev

# Run tests
npm test
```

## Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check your DATABASE_URL in .env file
3. Verify database exists
4. Check user permissions

### Migration Issues
```bash
# Check migration status
npm run migration:show

# Revert last migration if needed
npm run migration:revert

# Run migrations again
npm run migration:run
```
