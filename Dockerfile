FROM node:22

LABEL org.opencontainers.image.source="https://github.com/fluxer-directory/fluxer.directory"

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN npx nuxt build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
