# Use the official Node.js image with the specified version
FROM node:16.13.2 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of the application code
COPY . .

RUN find public/ -maxdepth 1 -type f -delete

RUN yarn build:prod

RUN yarn cache clean 

FROM joseluisq/static-web-server:2-alpine

COPY --from=builder /app/public /public

EXPOSE 80

CMD ["static-web-server", "--health", "-g", "info", "--log-remote-address=true"]
