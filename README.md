
# Soul AI

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Soul AI is a clean and modular AI-powered chat interface built with **Next.js**, **Tailwind CSS**, and **TypeScript**. It serves as a modern front-end for conversational AI models.

---

## Features

- Clean UI built with Tailwind CSS and Shadcn components
- Modular and reusable React components
- API route for chat handling (`/api/chat`)
- Dark/light theme support
- Type-safe with TypeScript

---

## Project Structure

```
soul-ai/
â”œâ”€â”€ app/                  # Next.js App Router structure
â”‚   â”œâ”€â”€ api/chat/         # Chat API route
â”‚   â”œâ”€â”€ layout.tsx        # Global layout
â”‚   â””â”€â”€ page.tsx          # Main chat page
â”œâ”€â”€ components/           # Reusable UI components
â”œâ”€â”€ public/               # Public assets (if any)
â”œâ”€â”€ styles/               # Global styles
â”œâ”€â”€ tailwind.config.ts    # Tailwind CSS configuration
â”œâ”€â”€ tsconfig.json         # TypeScript configuration
â””â”€â”€ package.json
```

---

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/your-username/soul-ai.git
cd soul-ai
```

2. **Install dependencies**
```bash
pnpm install
# or npm install
```

3. **Run the development server**
```bash
pnpm dev
# or npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Shadcn
- **Package Manager**: pnpm

---

## License

This project is licensed under the MIT License.
