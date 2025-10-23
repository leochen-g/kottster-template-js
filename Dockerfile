FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git tini

COPY package.json ./

RUN npm install --no-optional

COPY . .

RUN npm run build


ENV VITE_DOCKER_MODE=true
ENV PORT=5480
ENV DEV_API_SERVER_PORT=5481

EXPOSE 5480 5481

ENTRYPOINT ["/sbin/tini", "--"]

# This is a dummy command to keep the container running
CMD ["npm", "run", "start"]
