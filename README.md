# NeuraTalk.ai

NeuraTalk.ai is an AI-powered chat application built with **Next.js**, **Redux Toolkit**, and **Google's Generative AI** and **EchoGPT**. It enables seamless interactions with AI models, offering real-time conversations and responses.

## Live Demo

[NeuraTalk.ai Live Demo](https://neura-talk-ai.vercel.app)

## 🚀 Features

- AI-powered chat system
- User authentication with **NextAuth.js**
- State management using **Redux Toolkit**
- **DaisyUI & TailwindCSS** for a modern UI
- **MongoDB** for database storage
- Toast notifications with **react-hot-toast**
- **Lucide-react** icons for a better user experience
- **Speech Recognition** for voice input (using Web Speech API)

## 🛠️ Tech Stack

- **Frontend:** Next.js (React 19), DaisyUI, TailwindCSS
- **State Management:** Redux Toolkit
- **Authentication:** NextAuth.js
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **AI Integration:** Google Generative AI API

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sushanto171/neuraTalk.ai
   cd neuratalk.ai
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file and add the following:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## 📂 Project Structure

```
├── src
│   ├── app         # Next.js App Router
│   ├── components  # UI components
│   ├── lib         # Store & API handlers
│   ├── pages       # Auth & dynamic routes
│   ├── public      # Static assets
│   ├── styles      # Global styles
└── .env.local      # Environment variables
```

## 🎯 Usage

- **Chat with AI**: Enter a prompt and receive AI-generated responses.
- **Authentication**: Secure login system using NextAuth.
- **Manage state**: Redux handles global state management efficiently.

## 🔗 Dependencies

```json
{
  "@google/generative-ai": "^0.24.0",
  "@reduxjs/toolkit": "^2.6.1",
  "axios": "^1.8.2",
  "daisyui": "^5.0.0",
  "lucide-react": "^0.479.0",
  "mongodb": "^6.14.2",
  "next": "15.2.1",
  "next-auth": "^5.0.0-beta.25",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-redux": "^9.2.0"
}
```

## ✨ Contribution

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Create a Pull Request

## 📜 License

This project is open-source and available under the **MIT License**.

---

Developed with ❤️ by **Sushanto kumar** 🚀
