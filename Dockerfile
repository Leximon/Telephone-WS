# stage build
FROM node:16-alpine
WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm audit fix
RUN pnpm build


# stage run
FROM node:16-alpine

ARG wallide
ENV WALLIDE=$wallide

WORKDIR /app
COPY --from=0 /app/package*.json ./
COPY --from=0 /app/pnpm*.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --production --ignore-scripts
RUN pnpm audit fix
COPY --from=0 /app/build ./

EXPOSE 3000
CMD ["node", "./index.js"]