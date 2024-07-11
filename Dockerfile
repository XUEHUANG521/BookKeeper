FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
