# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and prisma schema
COPY package*.json ./
COPY tsconfig.json ./
COPY src/prisma ./src/prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/prisma ./src/prisma

# Expose port
EXPOSE 5001

# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy prisma schema
COPY src/prisma ./src/prisma/

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 5001

# Start development server
CMD ["npm", "run", "start:dev"]