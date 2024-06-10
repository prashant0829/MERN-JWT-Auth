# JWT Authentication Backend

This project is a Node.js backend application that implements JWT-based authentication. Below are the environment variables you need to configure in your `.env` file for the application to work properly.

## Environment Variables

Create a `.env` file in the root directory of your project and add the following keys with their corresponding values:

```ini
# The port number on which the server will run
PORT=5001

# The connection string for your MongoDB database
MONGO_URI=your_mongo_connection_string

# The secret key for signing JWT access tokens
JWT_SECRET=your_jwt_secret_key

# The expiration time for JWT access tokens (e.g., '1h' for 1 hour)
JWT_EXPIRES_IN=1h

# The secret key for signing JWT refresh tokens
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# The expiration time for JWT refresh tokens (e.g., '7h' for 7 hours)
JWT_REFRESH_EXPIRES_IN=7h
