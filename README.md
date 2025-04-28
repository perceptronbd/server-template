# TypeScript Express Server Template

A modern server template built with Express.js, TypeScript, PostgreSQL, and Prisma, featuring hot-reloading for development.

## Prerequisites

- Docker ([Install](https://docs.docker.com/get-docker/))
- Docker Compose ([Install](https://docs.docker.com/compose/install/))
- Node.js (optional, for local development)
- Git

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/server-template.git
   cd server-template
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env  # Update values as needed
   ```

3. **Build and start the services**:
   ```bash
   docker-compose up --build
   ```
   - This starts:
     - Express app on `http://localhost:5001`
     - PostgreSQL on port 5432

---

## Development Workflow

### Start the app

```bash
docker-compose up  # Use `-d` to run in background
```

### Stop the app

```bash
docker-compose down
```

### Hot-reloading

- Edit files locally → changes auto-refresh in the container
- TypeScript compilation happens automatically

### Database Management with Prisma

1. **Generate Prisma Client**:

   ```bash
   docker-compose exec app npx prisma generate
   ```

2. **Run Migrations**:

   ```bash
   docker-compose exec app npx prisma migrate dev
   ```

3. **View Database with Prisma Studio**:
   ```bash
   docker-compose exec app npx prisma studio
   ```

### Add a new dependency

1. Install inside the container (updates `package.json`):
   ```bash
   docker-compose exec app npm install <package-name>
   ```
2. Commit the updated `package.json` and `package-lock.json`

---

## Access Services

| Service       | URL/Port                |
| ------------- | ----------------------- |
| Express App   | `http://localhost:5001` |
| PostgreSQL    | Port: 5432              |
| Prisma Studio | `http://localhost:5555` |

---

## TypeScript Configuration

- Strict type checking enabled
- Path aliases configured
- ESLint and Prettier integration
- No `any` type allowed

## Collaboration Guide

1. **Pull the latest changes**:

   ```bash
   git pull origin main
   ```

2. **Rebuild containers (if dependencies change)**:

   ```bash
   docker-compose down && docker-compose up --build
   ```

3. **Branching workflow**:
   - Create a feature branch:
     ```bash
     git checkout -b feat/your-feature
     ```
   - Commit changes:
     ```bash
     git add .
     git commit -m "Description"
     git push origin feat/your-feature
     ```
   - Create a Pull Request (PR) on GitHub

---

## Troubleshooting

- **"Module not found" error**:

  ```bash
  docker-compose down && docker-compose up --build
  ```

- **Database connection issues**:

  - Check if PostgreSQL container is running
  - Verify database credentials in `.env`
  - Use `db` as the hostname in your connection string

- **Hot-reload not working**:

  - Ensure `ts-node-dev` is in `devDependencies`
  - Check volume mounts in `docker-compose.yml`

- **Port conflicts**:
  - Stop local PostgreSQL service if running
  - Modify port mappings in `docker-compose.yml`

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

**Happy Coding!**
