# Start with a Node.js base image
FROM node:16

# Create and set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the microservice listens on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]