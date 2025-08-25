# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript into dist/
RUN npm run build


# ---------- Stage 2: Run ----------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose app port
EXPOSE 8000

# Start the app (runs dist/index.js)
CMD ["node", "dist/index.js"]
