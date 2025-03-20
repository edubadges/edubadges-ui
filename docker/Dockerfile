# Use the official Node.js image with the specified version
FROM node:16.13.2 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of the application code
COPY . .

# Copy a docker-specific config.js over the generic one.
# NOTE: in docker-compose we mount over this file again, so there the version on the 
# host machine in ./docker/config.js is used at /app/src/util/config.js
COPY ./docker/config.js /app/src/util/config.js

RUN yarn build:prod

RUN yarn cache clean 


FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 8080

# Command to run the server
CMD ["/bin/sh", "-c", "sed -i 's/listen .*/listen 8080;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
