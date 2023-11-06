
# Use an official Node.js runtime as a parent image
FROM node:18.14.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install application dependencies
RUN npm install

# Copy the rest of your application source code to the container
COPY . .

# Build the Angular application
RUN ng build

# Expose the port your app will run on (adjust this if needed)
EXPOSE 80

# Define the command to start your application
CMD ["ng", "s", "--host", "0.0.0.0"]
