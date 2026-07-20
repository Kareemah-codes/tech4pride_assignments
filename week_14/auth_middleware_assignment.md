# Backend Engineering — Assignment
## Authentication, Middleware, Request Validation & Filtering with File-Based Persistence

---

| | |
|---|---|
| **Topics** | Authentication, Middleware, Request Body Validation, Query Filtering |
| **Language** | JavaScript (Node.js + Express) |
| **Persistence** | JSON file (`users.json`, `notes.json`) |
| **Estimated Duration** | 4 – 6 hours |
| **Assessment Type** | Individual |

---

## Overview

You will build a small Express API that allows users to **register**, **log in**, and manage a personal list of **notes**. User data and notes are stored in local JSON files. Authentication is enforced through middleware, request bodies are validated through a dedicated validation middleware, and notes can be filtered by query parameters.

There is no database. Everything is read from and written to JSON files.

---

## What You Are Building

```
auth-api/
  index.js              ← entry point, registers routes
  router.js             ← all route definitions
  authMiddleware.js     ← middleware that verifies JWTs
  validateBody.js       ← middleware factory that validates request bodies
  userStore.js          ← helper functions for reading/writing users.json
  noteStore.js          ← helper functions for reading/writing notes.json
  users.json            ← persisted user data (start with [])
  notes.json            ← persisted notes data (start with [])
  .env                  ← environment variables (JWT secret, port)
  .env.example          ← committed template showing required variables
```

---

## The Data Format

**`users.json`** stores an array of user objects:

```json
[
  {
    "id": "a1b2c3d4-...",
    "username": "ada",
    "password": "$2b$10$hashedpasswordhere",
    "createdAt": "2026-07-18T10:00:00.000Z"
  }
]
```

- `id` — a UUID generated with `uuid`
- `username` — a unique string
- `password` — hashed with `bcrypt` before storing; never stored or returned as plain text
- `createdAt` — an ISO timestamp set automatically at registration

> **Note:** Tokens are no longer stored in `users.json`. JWTs are stateless — the server verifies them by signature, not by lookup.

**`notes.json`** stores an array of note objects:

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "My first note",
    "body": "This is the content.",
    "tag": "personal",
    "createdAt": "2026-07-18T10:00:00.000Z"
  }
]
```

- `id` — a UUID generated with `uuid`
- `userId` — the UUID of the user who created the note
- `title` — a non-empty string
- `body` — a non-empty string
- `tag` — one of `"personal"`, `"work"`, or `"other"`
- `createdAt` — an ISO timestamp set automatically at creation

---

---

## Environment Variables

Create a `.env` file in the project root. It must **not** be committed to version control — add it to `.gitignore`. Provide a `.env.example` with placeholder values for teammates:

```
PORT=3000
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1h
```

Load these at the top of `index.js` using:

```javascript
import "dotenv/config";
```

All references to the JWT secret in your code must read from `process.env.JWT_SECRET` — never hardcode it.

---

## Requirements

### 1. `userStore.js` and `noteStore.js` — File Helpers

Write and export the following functions in each store file:

**`userStore.js`:**
- `readUsers()` — reads `users.json` and returns the parsed array
- `writeUsers(users)` — writes the updated array back to `users.json`

**`noteStore.js`:**
- `readNotes()` — reads `notes.json` and returns the parsed array
- `writeNotes(notes)` — writes the updated array back to `notes.json`

All functions must handle file errors gracefully with `try/catch`.

> **Tip:** Import `uuid` with `import { v4 as uuidv4 } from "uuid"` and call `uuidv4()` wherever a new `id` is needed instead of incrementing integers.

---

### 2. `validateBody.js` — Validation Middleware Factory

Write a middleware factory function `validateBody(requiredFields)` that accepts an array of required field names and returns a middleware function. The returned middleware must:

- Check that every field in `requiredFields` is present on `req.body` and is not an empty string
- Return `400 Bad Request` with a descriptive error if any field is missing or blank:

```json
{ "error": "Missing required fields: title, tag" }
```

- Call `next()` if all fields are present and valid

**Usage in `router.js`:**

```javascript
import { validateBody } from "./validateBody.js";

router.post("/register", validateBody(["username", "password"]), handler);
router.post("/notes", authMiddleware, validateBody(["title", "body", "tag"]), handler);
```

This means the `400 Bad Request` check is no longer written inside each route handler — it is handled entirely by this middleware.

---

### 3. `POST /register` — Register a New User

Apply `validateBody(["username", "password"])` middleware to this route — the handler itself should not repeat the missing-field check.

**Request body:**
```json
{ "username": "ada", "password": "secret123" }
```

**Behaviour:**
- `validateBody` returns `400` if `username` or `password` is missing (handled by middleware)
- Return `409 Conflict` if the username already exists
- Hash the password with `bcrypt` (use a salt round of `10`) before storing
- Assign a UUID as `id` and set `createdAt` to `new Date().toISOString()`
- Save the new user to `users.json`
- Return `201 Created` with the new user object — `id`, `username`, and `createdAt` only (never return the hashed password)

---

### 4. `POST /login` — Log In

Apply `validateBody(["username", "password"])` to this route.

**Request body:**
```json
{ "username": "ada", "password": "secret123" }
```

**Behaviour:**
- `validateBody` returns `400` if either field is missing (handled by middleware)
- Return `401 Unauthorized` if the username does not exist
- Use `bcrypt.compare()` to verify the plain-text password against the stored hash — return `401` if it does not match
- Sign a JWT using `jsonwebtoken` with the user's `id` and `username` as the payload, signed with `process.env.JWT_SECRET`, expiring in `process.env.JWT_EXPIRES_IN`
- Do **not** update `users.json` — JWTs are stateless and require no server-side storage
- Return `200 OK` with the token:

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

---

### 5. `authMiddleware.js` — Protect Routes

Write middleware that:

- Reads the `Authorization` header from the request and extracts the Bearer token:
```javascript
const token = req.headers.authorization?.split(" ")[1];
```
- Returns `401 Unauthorized` with `{ "error": "No token provided" }` if no token is present
- Verifies the token using `jwt.verify(token, process.env.JWT_SECRET)`
- Returns `403 Forbidden` with `{ "error": "Invalid or expired token" }` if verification fails (wrap in `try/catch`)
- Attaches the decoded payload to `req.user` and calls `next()` if the token is valid

> There is no need to look up the user in `users.json` on every request — the JWT payload already carries the user's `id` and `username`.

---

### 6. `GET /profile` — Protected Route

Apply `authMiddleware` to this route.

**Behaviour:**
- Return `200 OK` with the logged-in user's details (excluding password):

```json
{ "id": 1, "username": "ada" }
```

---

### 7. `POST /notes` — Create a Note

Apply `authMiddleware` then `validateBody(["title", "body", "tag"])` to this route.

**Request body:**
```json
{ "title": "Meeting prep", "body": "Review the slides.", "tag": "work" }
```

**Behaviour:**
- `validateBody` returns `400` if any required field is missing (handled by middleware)
- Return `400` if `tag` is not one of `"personal"`, `"work"`, or `"other"` — this check belongs in the handler since it is a value rule, not a presence rule
- Assign a UUID as `id`, set `userId` from `req.user.id` (decoded from the JWT), and set `createdAt` to `new Date().toISOString()`
- Save the note to `notes.json`
- Return `201 Created` with the full note object

---

### 8. `GET /notes` — List Notes with Filtering

Apply `authMiddleware` to this route.

**Behaviour:**
- Return only the notes that belong to the logged-in user (`userId === req.user.id`)
- Support the following optional query parameters for filtering:

| Query Parameter | Behaviour |
|----------------|-----------|
| `?tag=work` | Return only notes where `tag` matches |
| `?search=slides` | Return only notes where `title` or `body` contains the search string (case-insensitive) |

Both filters may be applied at the same time. If no query parameters are provided, return all of the user's notes.

**Example request:**
```
GET /notes?tag=work&search=slides
```

**Example response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Meeting prep",
    "body": "Review the slides.",
    "tag": "work",
    "createdAt": "2026-07-18T10:00:00.000Z"
  }
]
```

---

### 9. `PATCH /notes/:id` — Update a Note

Apply `authMiddleware` to this route. Do **not** apply `validateBody` here — for a partial update, no fields are strictly required.

**Request body (any combination of updatable fields):**
```json
{ "title": "Updated title", "tag": "work" }
```

**Behaviour:**
- Return `404 Not Found` if no note with that `id` exists
- Return `403 Forbidden` if the note exists but does not belong to the logged-in user
- Return `400 Bad Request` if `tag` is provided but is not one of `"personal"`, `"work"`, or `"other"`
- Return `400 Bad Request` if the request body contains no recognised fields (`title`, `body`, `tag`) — an empty update should be rejected
- Merge only the provided fields into the existing note — fields not included in the body must remain unchanged
- Save the updated note to `notes.json`
- Return `200 OK` with the full updated note object

**Example — only updating the title:**
```json
// Request body
{ "title": "Revised meeting prep" }

// Response — body and tag unchanged
{
  "id": 1,
  "userId": 1,
  "title": "Revised meeting prep",
  "body": "Review the slides.",
  "tag": "work",
  "createdAt": "2026-07-18T10:00:00.000Z"
}
```

---

### 10. `DELETE /notes/:id` — Delete a Note (Bonus)

Apply `authMiddleware` to this route.

**Behaviour:**
- Return `404 Not Found` if no note with that `id` exists
- Return `403 Forbidden` if the note exists but does not belong to the logged-in user
- Remove the note from `notes.json` and return `200 OK` with `{ "message": "Note deleted" }`

---

### 11. `POST /logout` — Log Out (Bonus)

Apply `authMiddleware` to this route.

> **Note:** Because JWTs are stateless, true server-side logout requires a token blocklist. For this assignment, logout is simulated — the server simply confirms the request was authenticated. The client is responsible for discarding the token.

**Behaviour:**
- Confirm the token is valid (enforced by `authMiddleware`)
- Return `200 OK` with `{ "message": "Logged out successfully" }`
- (Optional extension) Maintain a `blocklist.json` file of invalidated token JTIs if you want to implement true revocation

---

## Middleware Chain Summary

Middleware must be applied per-route in `router.js` — not globally. Multiple middleware functions can be chained in order:

```javascript
// Validation only
router.post("/register", validateBody(["username", "password"]), handler);

// Auth only
router.get("/profile", authMiddleware, handler);

// Auth first, then validation
router.post("/notes", authMiddleware, validateBody(["title", "body", "tag"]), handler);
```

The order matters — `authMiddleware` must come before `validateBody` on protected routes so that unauthenticated requests are rejected before any body parsing is done.

---

## Testing Your API

Test all routes manually using Postman or a similar tool. You must verify the following scenarios:

**Authentication & Registration**

| Scenario | Expected Status |
|----------|----------------|
| Register with valid data | `201 Created` |
| Register with a duplicate username | `409 Conflict` |
| Register with missing `username` or `password` | `400 Bad Request` |
| Login with correct credentials | `200 OK` + token |
| Login with wrong password | `401 Unauthorized` |
| Login with missing fields | `400 Bad Request` |
| Access `/profile` with a valid token | `200 OK` |
| Access `/profile` with no token | `401 Unauthorized` |
| Access `/profile` with an invalid token | `403 Forbidden` |

**Notes & Filtering**

| Scenario | Expected Status |
|----------|----------------|
| Create a note with valid data | `201 Created` |
| Create a note with missing fields | `400 Bad Request` |
| Create a note with an invalid tag | `400 Bad Request` |
| Create a note without a token | `401 Unauthorized` |
| `GET /notes` — returns only the logged-in user's notes | `200 OK` |
| `GET /notes?tag=work` — returns only notes tagged `work` | `200 OK` |
| `GET /notes?search=slides` — returns notes matching the search | `200 OK` |
| `GET /notes?tag=work&search=slides` — both filters applied | `200 OK` |
| Update a note with a valid partial body | `200 OK` |
| Update a note with an invalid `tag` value | `400 Bad Request` |
| Update a note with an empty body | `400 Bad Request` |
| Update a note that doesn't exist | `404 Not Found` |
| Update another user's note | `403 Forbidden` |
| Update a note without a token | `401 Unauthorized` |
| Delete own note (bonus) | `200 OK` |
| Delete another user's note (bonus) | `403 Forbidden` |
| Logout (bonus) | `200 OK` (client discards token) |

---

## Submission Checklist

- [ ] All files are present and the server starts with `node index.js`
- [ ] `users.json` is updated correctly after register (login does not modify it)
- [ ] `notes.json` is updated correctly after creating, updating, and deleting notes
- [ ] Passwords are hashed with `bcrypt` — plain-text passwords never appear in `users.json`
- [ ] JWTs are signed with `process.env.JWT_SECRET` and verified in `authMiddleware`
- [ ] All IDs are UUIDs, not integers
- [ ] `.env` is in `.gitignore`; `.env.example` is committed
- [ ] `validateBody` is a reusable middleware factory — not copy-pasted per route
- [ ] `validateBody` returns `400` with a message listing the missing fields by name
- [ ] `authMiddleware` correctly blocks requests with no or invalid tokens
- [ ] `req.user` is available inside all protected route handlers
- [ ] `PATCH /notes/:id` merges only the provided fields, leaving others unchanged
- [ ] `PATCH /notes/:id` rejects empty bodies and invalid tag values with `400`
- [ ] `GET /notes` returns only the logged-in user's notes
- [ ] `GET /notes?tag=` and `GET /notes?search=` filters work correctly
- [ ] Both filters work together when combined in one request
- [ ] All error responses include a descriptive `error` field
- [ ] All scenarios in both testing tables have been verified

---

## Allowed Libraries

| Package | Purpose |
|---------|---------|
| `uuid` | Generating unique IDs for users and notes |
| `jsonwebtoken` | Signing and verifying JWTs on login and in middleware |
| `bcrypt` | Hashing passwords on register; comparing on login |
| `dotenv` | Loading environment variables from `.env` into `process.env` |

Install all four with:
```bash
npm install uuid jsonwebtoken bcrypt dotenv
```

## Constraints

- Do **not** use a validation library (no `joi`, no `zod`, no `express-validator`) — write `validateBody` by hand
- Do **not** use a database — JSON files are your only storage
- Do **not** hardcode secrets — all sensitive values must live in `.env`
- Do **not** commit `.env` — add it to `.gitignore` and provide `.env.example` instead
- The `400` missing-field check must live in `validateBody`, not repeated in each handler
- Keep each file focused on one responsibility

---

*The goal is understanding the full flow — environment config loaded, request in, JWT verified, body validated, handler filters and responds, file updated.*
