# Authentication Guide

This document explains how authentication works in the Anti Gravity project.

## Overview

The backend uses JWT authentication with cookies and the frontend uses a React auth context to manage logged-in state.

## Login Flow

1. The user submits the login form on `frontend/src/pages/Login.jsx`.
2. The frontend calls `login(email, password)` from `frontend/src/context/AuthContext.jsx`.
3. The `login()` function sends a POST request to `/api/auth/login`.
4. The backend verifies the email and password using the `User` model and bcrypt.
5. If authentication succeeds, the backend returns a JWT token and sets an `httpOnly` cookie named `token`.
6. The frontend stores the returned user object in the auth context and redirects the user to `/dashboard`.

## Backend Endpoints

- `POST /api/auth/login`
  - Request body: `{ email, password }`
  - Response: `{ success: true, token, user }`
  - Sets an `httpOnly` JWT cookie.

- `POST /api/auth/register`
  - Used for creating new users.
  - Also returns a JWT cookie and user data on success.

- `GET /api/auth/logout`
  - Clears the cookie by setting `token` to `none`.

- `GET /api/auth/me`
  - Protected route.
  - Uses the stored cookie to identify the current user.
  - Returns the authenticated user details.

## Backend Implementation

### Auth controller

- `backend/controllers/authController.js`
  - `login()`:
    - Finds the user by email.
    - Uses `user.matchPassword(password)` to validate the password.
    - Calls `sendTokenResponse(user, statusCode, res)`.
  - `sendTokenResponse()`:
    - Generates a JWT with `jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })`.
    - Sets the cookie with `httpOnly: true` and 30-day expiration.

### Middleware

- `backend/middleware/auth.js`
  - Protects routes by validating the JWT cookie.
  - Adds `req.user` if the token is valid.

## Frontend Implementation

### Auth context

- `frontend/src/context/AuthContext.jsx`
  - Uses `axios.defaults.withCredentials = true` so cookies are sent automatically.
  - `login(email, password)` sends the credentials to `/api/auth/login`.
  - `checkUserLoggedIn()` calls `/api/auth/me` on app startup.
  - State:
    - `user`: current authenticated user
    - `loading`: whether auth state is being resolved

### Protected Route

- `frontend/src/App.jsx`
  - `ProtectedRoute` checks `user` and `loading`.
  - Redirects to `/login` if no user is authenticated.

## Environment Variables

The backend requires at least the following environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional)

## Notes

- The JWT is stored in an `httpOnly` cookie for better security.
- The frontend stays logged in by calling `/api/auth/me` on load and using the cookie to authenticate.
- This authentication flow supports both login and registration, with a consistent session cookie approach.
