# Production multi-stage Dockerfile for Next.js app
# Uses Node 20

FROM node:20 AS builder
WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json* ./
# Install dependencies. Use --legacy-peer-deps to avoid build-time peer dependency resolution failures
# Use npm ci when possible, but fall back to npm install with legacy peer deps if ci fails.
RUN if [ -f package-lock.json ]; then \
			npm ci --prefer-offline --no-audit --progress=false || npm install --legacy-peer-deps --no-audit --progress=false; \
		else \
			npm install --legacy-peer-deps --no-audit --progress=false; \
		fi

# Copy the rest of the sources
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built files and production deps from builder
COPY --from=builder /app/ .

# Expose default Next port
EXPOSE 3000

# Default start command
CMD ["npm", "start"]
