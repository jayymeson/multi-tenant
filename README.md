# Multi-Tenant Application

This is a basic multi-tenant application built with Node.js and TypeScript.


## Table of Contents

- Installation
- Usage
- Project Structure
- Scripts
- Contributing
- License

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/jayymeson/multi-tenant.git
cd multi-tenant
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

This will compile the TypeScript files and start the server.

## Project Structure

The project has the following structure:

```bash
multi-tenant/
├── .gitignore
├── app.ts
├── database.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── dist/
│   ├── app.js
│   ├── database.js
│   └── models/
│       └── User.js
├── models/
│   └── User.ts
```

- `.gitignore`: Specifies which files and directories to ignore in the repository.
- `app.ts`: The main entry point of the application.
- `database.ts`: Configuration and initialization of the database connection.
- `package-lock.json` & `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.
- `dist/`: Compiled JavaScript files.
- `models/`: Contains the TypeScript models used in the application.

## Scripts

The following scripts are available:

- `npm start`: Compile the TypeScript files and start the server.
- `npm run build`: Compile the TypeScript files.
- `npm run dev`: Start the server in development mode with automatic restarts on file changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

