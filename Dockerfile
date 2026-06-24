# Stage 1: Build
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@9

WORKDIR /app

# Copy package files first for better caching
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .

RUN pnpm build

# Stage 2: Production
FROM node:20-slim AS runner

RUN npm install -g pnpm@9

WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed for production
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/messages ./messages

EXPOSE 3000

CMD ["pnpm", "start"]
