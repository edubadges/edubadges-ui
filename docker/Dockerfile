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

FROM nginxinc/nginx-unprivileged

COPY --from=builder /app/public /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --chown=101 docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["sh", "/entrypoint.sh"]

USER 101  # Run as non-root user
CMD ["nginx", "-g", "daemon off;"]
