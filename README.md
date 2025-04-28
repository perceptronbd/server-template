# TypeScript Express Server Template

A modern server template built with Express.js, TypeScript, and MongoDB, featuring hot-reloading for development.

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
     - MongoDB on port 27017

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

### Database Management with MongoDB

1. **Connect to MongoDB Shell**:

   ```bash
   docker-compose exec mongodb mongosh
   ```

2. **Seed Database** (if available):

   ```bash
   npm run seed
   ```

3. **View Database with MongoDB Compass**:
   - Connect using the MongoDB connection string from your `.env` file
   - Default URL: `mongodb://localhost:27017`

### Add a new dependency

1. Install inside the container (updates `package.json`):
   ```bash
   docker-compose exec app npm install <package-name>
   ```
2. Commit the updated `package.json` and `package-lock.json`

---

## Access Services

| Service     | URL/Port                |
| ----------- | ----------------------- |
| Express App | `http://localhost:5001` |
| MongoDB     | Port: 27017             |

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

  - Check if MongoDB container is running
  - Verify database credentials in `.env`
  - Use `mongodb` as the hostname in your connection string
  - Default connection string format: `mongodb://username:password@mongodb:27017/database`

- **Hot-reload not working**:

  - Ensure `ts-node-dev` is in `devDependencies`
  - Check volume mounts in `docker-compose.yml`

- **Port conflicts**:
  - Stop local MongoDB service if running
  - Modify port mappings in `docker-compose.yml`

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

**Happy Coding!**
