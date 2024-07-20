# Kakushin Notes


## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/) (depending on your preference)

## Setup

### 1. Server

1. **Navigate to the `server` folder:**

    ```bash
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create a `.env` file** in the `server` folder and add the necessary environment variables. Example:

    ```env
    PORT=5000
    DATABASE_URL=mongodb://localhost:27017/mydatabase
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the server:**

    ```bash
    npm start
    # or
    yarn start
    ```

    The server will start on `http://localhost:5000` by default.

### 2. Client

1. **Navigate to the `client` folder:**

    ```bash
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the client application:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The client application will start on `http://localhost:8080` by default.

## Running the Project

1. **Ensure the server is running** on `http://localhost:5000`.

2. **Start the client application** by running `npm run dev` or `yarn dev` in the `client` folder.

3. **Open your browser** and navigate to `http://localhost:8080` to see the client application in action.

## Troubleshooting

- **Ensure all environment variables** are correctly set in the `.env` file in the `server` folder.
- **Check the console** for any errors if the server or client does not start as expected.
- **Verify port availability**: Ensure ports `3000` (client) and `5000` (server) are not used by other applications.


