FROM node:20-bookworm as builder
WORKDIR /usr/user-service
COPY . .
RUN npm install && npm run build:rest && npm ci

FROM node:20-alpine
WORKDIR /root/usersvc-rest
COPY --from=builder /usr/user-service/node_modules ./node_modules
COPY --from=builder /usr/user-service/dist/rest.js* ./
RUN ls -la
ENV NODE_ENV="production"
ENV PORT 3000
EXPOSE 3000
CMD node -r dotenv/config  --enable-source-maps ./rest.js