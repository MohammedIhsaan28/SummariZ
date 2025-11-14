📘 AI PDF Summarizer

AI PDF Summarizer is an advanced AI-powered PDF summarization platform built with Next.js, LangChain, GPT-4, and Gemini. It allows users to securely upload PDF files, automatically extract their contents, and generate concise, high-quality summaries. The platform features a modern, responsive, and user-friendly interface.

---

🚀 Core Technologies

Next.js 15 (App Router) - Framework for server-side rendering and full-stack React development  
React 19 - Building interactive and component-driven user interfaces  
TypeScript - Provides static typing for better scalability and maintainability  
Tailwind CSS - Enables rapid, responsive styling and consistent design  
shadcn/ui - Prebuilt UI components integrated with Tailwind for elegant design  
Clerk - Secure authentication and user management  
UploadThing - Seamless file uploads with server callbacks  
LangChain - Chaining and managing large language model operations  
OpenAI GPT-4 / Gemini API - Generating natural summaries and insights from documents  
NeonDB (PostgreSQL) - Serverless database for structured summary and user data  
Stripe - Subscription management and payment integration  

---

✨ Application Features

🔐 Authentication and Access Control  
- Secure sign-in and user management powered by Clerk  
- Role-based protected routes for upload, dashboard, and summaries  

📤 Smart File Uploads  
- Users can upload PDF files seamlessly using UploadThing  
- Automatic extraction of text and metadata  
- Efficient handling of large files  

🧠 AI Summarization Engine  
- Uses LangChain to orchestrate GPT-4 and Gemini models  
- Extracts and summarizes complex PDF documents  
- Generates concise summaries and key insights quickly  

💾 Database and History  
- Stores user summaries and metadata in NeonDB (PostgreSQL)  
- Allows users to view and revisit previous summaries at any time  

💳 Premium Features  
- Integrated Stripe billing system for premium summarization plans  
- Secure checkout and subscription management  

💎 User Interface  
- Responsive UI built with Tailwind CSS and shadcn/ui  
- Optimized for mobile, tablet, and desktop devices  
- Smooth animations powered by Framer Motion  

---

⚡ Getting Started

Prerequisites:  
- Node.js version 20 or higher  
- npm or yarn  
- Accounts and API keys for Clerk, OpenAI, Gemini, NeonDB, UploadThing, and Stripe  

Installation:  
1. Clone the repository:  
   git clone https://github.com/yourusername/ai-pdf-summarizer.git  
   cd ai-pdf-summarizer  

2. Install dependencies:  
   npm install  

3. Set up environment variables in `.env.local`:  
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  
   CLERK_SECRET_KEY=  
   OPENAI_API_KEY=  
   GEMINI_API_KEY=  
   UPLOADTHING_SECRET=  
   UPLOADTHING_APP_ID=  
   DATABASE_URL=  
   STRIPE_SECRET_KEY=  
   STRIPE_WEBHOOK_SECRET=  
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  

4. Run the development server:  
   npm run dev  

5. Open the application in your browser:  
   http://localhost:3000  

---

🙏 Acknowledgments

Next.js - https://nextjs.org  
Clerk - https://clerk.com  
LangChain - https://www.langchain.com  
OpenAI - https://openai.com  
Google Gemini - https://deepmind.google/technologies/gemini  
NeonDB - https://neon.tech  
Stripe - https://stripe.com  
UploadThing - https://uploadthing.com  
shadcn/ui - https://ui.shadcn.com  
Tailwind CSS - https://tailwindcss.com  

---

