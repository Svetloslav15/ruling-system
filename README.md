# Ethereum Transaction Monitoring System

## Project Overview

This project is designed to monitor Ethereum transactions in real-time based on a set of dynamic configuration rules. The application allows you to define rules for filtering Ethereum transactions (e.g., by sender, recipient, gas limits), store matching transactions in a database, and manage these configurations through an API.

### Features
- Monitor Ethereum blockchain transactions in real-time using Infura.
- Dynamic configuration management with CRUD operations via API.
- Filter transactions based on various fields (sender, recipient, value, gas limit, etc.).
- Log and store matching transactions in a database.
- Periodic transaction processing with rate limiting to avoid exceeding API limits.
- Configurable logging for easier debugging and tracing.

---

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)

---

## Installation

To get started with the Ethereum Transaction Monitoring System, follow the steps below:

### Prerequisites
- **Node.js** (v12 or higher)
- **npm**
- **PostgreSQL** or any supported SQL database
- **Infura** account for accessing Ethereum node services

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Svetloslav15/ruling-system.git
    cd ruling-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    Create a `.env` file at the root of your project with the following content:
    ```bash
    INFURA_PROJECT_ID=your-infura-project-id
    DATABASE_STORAGE=./database.sqlite
    DATABASE_DIALECT=sqlite
    PORT=3005
    ```
    Replace `your-infura-project-id` with your Infura project ID and configure your database connection accordingly.

---

## Configuration

### Database Configuration

By default, the app uses Sequelize ORM to manage the database. You can configure the type of database (SQLite, Postgres, MySQL) through the `DATABASE_STORAGE` environment variable.

---

## Usage

The application provides a set of APIs to manage configurations and monitor Ethereum transactions.

### Start the Application

To start monitoring Ethereum transactions:

```bash
npm run start
```

### Start the Application in Dev Mode

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```
