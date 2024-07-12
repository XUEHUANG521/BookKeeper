FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm install -g dotenv-cli

RUN dotenv -e .env.${NODE_ENV} -- npx prisma generate
RUN dotenv -e .env.${NODE_ENV} -- npx prisma migrate deploy

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
