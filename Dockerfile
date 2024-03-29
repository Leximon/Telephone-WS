# stage build
FROM node:16-alpine
WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm audit fix
RUN pnpm build


# stage run
FROM node:16-alpine

WORKDIR /app
COPY --from=0 /app/package*.json ./
COPY --from=0 /app/pnpm*.yaml ./
RUN npm install -g pnpm
RUN pnpm install --production --ignore-scripts
RUN pnpm audit fix
ENV DB_CONN_STRING=$DB_CONN_STRING
COPY --from=0 /app/build ./

EXPOSE 3000
CMD node ./index.js