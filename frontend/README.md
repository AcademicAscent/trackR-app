# Frontend – Vite + React + Tailwind CSS (v4)

This project is built using Vite, React, and Tailwind CSS v4. It provides a fast development environment with hot module replacement (HMR) and utility-first styling.

## Stack
- [Vite](https://vitejs.dev/) – build tool and development server
- [React](https://react.dev/) – JavaScript UI library
- [Tailwind CSS v4](https://tailwindcss.com/) – utility-first CSS framework
- [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) – official Tailwind plugin for Vite

## Installation
From the `frontend/` directory:
```bash
npm install
Development
To start the development server:

bash
Copy
Edit
npm run dev
The application will open in the browser with HMR enabled.

Tailwind Setup
Tailwind CSS is imported in src/index.css:

css
Copy
Edit
@import "tailwindcss";
Brand Colors
Defined in src/index.css as CSS variables:

css
Copy
Edit
--color-blue: #0F172A;          /* rgb(15, 23, 42) - Dark Navy */
--color-red: #E11D48;           /* rgb(225, 29, 72) - Crimson Red */
--color-red-highlight: #FBE2E8; /* rgb(251, 226, 232) - Misty Rose Pink */
--color-green: #10B981;         /* rgb(16, 185, 129) - Emerald Green */
--color-green-highlight: #E1F6EF; /* rgb(225, 246, 239) - Mint Cream */
Project Structure
lua
Copy
Edit
frontend/
 ├─ index.html
 ├─ vite.config.js / vite.config.ts
 ├─ src/
 │   ├─ App.jsx
 │   ├─ main.jsx
 │   └─ index.css
 ├─ package.json
 └─ README.md
Scripts
npm run dev – start development server

npm run build – build for production

npm run preview – preview the production build locally

Notes
Tailwind is configured with @tailwindcss/vite and does not require a separate Tailwind configuration file for basic use.

Brand colors are stored in src/index.css for quick reference.

This setup uses Tailwind CSS v4 syntax.