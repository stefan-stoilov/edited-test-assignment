# Mock authentication app using Vite + React + Hono. Hosted on Vercel.

**Technologies used**:

- **React**
- **TypeScript**
- **Vite**
- **Hono**
- **React Router**
- **React Hook Form**
- **Zod**
- **Vitest**
- **Vercel**

## Functionalities

### There are two routes on the frontend:

- **"/"** Homepage that contains user info. It's a protected route, not accessible unless user has signed in. Mocks fetching of user data from backend and displays it if a valid auth token is sent with the request.
- "/login" Login page with form so that user can log in. If a user has already signed in, they will be redirected to home.

### Credentials

Mock app is configured to allow only one "user" to login in. Their credentials are:

- Username `hello@edited.com`
- Password `hello123`

Any other credentials provided that pass form validation will result in `401` response `Invalid credentials` and will be reflected on the frontend.

### Remember Me behavior

Remember me checkbox determines if the user will get a JWT auth token with a day or session expiration. Similarly, local or session storage are used to pass the initial state for the `AuthProvider` component which is set up purely for a better UX. Even if the initial state is for a user to be authenticated, when they try to access data, the expired token will be checked on the server and the user will be redirected back to login page.

## Setup and Development

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

   You can install pnpm by running `npm install -g pnpm` or any other of the [listed ways](https://pnpm.io/installation).

2. **Start dev server**

   ```bash
   pnpm run dev
   ```

   This will start two servers:

   - **Client:** runs on `http://localhost:5173/` and serves the React application..
   - **API:**
     Runs on `http://localhost:3000/api` and serves the Hono API.
