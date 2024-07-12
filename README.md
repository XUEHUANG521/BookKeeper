# Bookkeeper

Bookkeeper is a financial management application built with Next.js and Tailwind CSS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Bookkeeper is an easy-to-use financial management tool that allows users to manage and track their income and expenses.

## Features

- Frontend application built with Next.js
- Styling with Tailwind CSS
- User authentication and authorization
- Database operations using Prisma

## Installation

First, clone the repository:

git clone https://github.com/XUEHUANG521/bookkeeper.git
cd bookkeeper

Then, install the dependencies:

npm install

## Configuration

Create a `.env.local` file and add the following environment variables:

JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url

Ensure the `tailwind.config.ts` and `postcss.config.js` file are correctly configured.

## Running the Application

Run the application in development mode:

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Building the Application

Build the application for production:

npm run build
npm start

## Deployment

### Prerequisites

- AWS Account
- Docker installed on your local machine
- EC2 instance with Docker installed
- GitHub repository with secrets configured

### GitHub Actions Workflow

This project uses GitHub Actions for CI/CD to automatically build and deploy the Docker image to an EC2 instance.

#### Workflow Configuration

Create a `.github/workflows/deploy.yml` file and configure the following secrets in your GitHub repository settings:

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_PASSWORD`: Your Docker Hub password
- `DATABASE_URL`: Your database connection URL
- `JWT_SECRET`: Your JWT secret
- `EC2_USER`: The SSH username for your EC2 instance
- `EC2_HOST`: The public IP address or hostname of your EC2 instance
- `EC2_KEY`: The private SSH key for accessing your EC2 instance (ensure this key is properly formatted)

## Environment Variables

Ensure the following environment variables are configured in the `.env.local` file before you run the project:

JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url

## Project Structure

The main files and directory structure of the project are as follows:

```
project-root/
├── pages/
│   ├── auth/
│   │   ├── login.tsx
│   ├── ...
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── hoc/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── utils/
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.js
├── ...
```

## Contributing

Contributions are welcome! Please ensure that you run `npm run lint` to check the code style and run all tests before submitting your code.

## License

This project is licensed under the MIT License.
