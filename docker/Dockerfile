# Use the official Node.js image with the specified version
FROM node:16.13.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Copy a docker-specific config.js over the generic one.
COPY ./docker/config.js /app/src/utils/config.js

# Expose the port the app runs on
EXPOSE 8080

# Command to run the development server
CMD ["yarn", "run", "webpack-dev-server", "--no-open", "--host", "0.0.0.0", "--port", "8080"]
