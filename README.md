# Credvora – AI Finance Manager 💰🤖

Credvora is your **personal AI-powered finance manager**, designed to help individuals and businesses track, analyze, and optimize their financial activities.  
It provides smart insights, automated categorization, and easy-to-use dashboards to make money management effortless.

---

## 🚀 Features

- 📊 **Interactive Dashboard** – Get a clear overview of your income, expenses, and savings.  
- 🧠 **AI-Powered Insights** – Personalized recommendations to optimize your finances.  
- 🔍 **Transaction Management** – Add, edit, and track your transactions seamlessly.  
- 📅 **Smart Categorization** – Automatically classify transactions into categories (Food, Travel, Bills, etc.).  
- 🔒 **Secure Authentication** – Powered by [Clerk](https://clerk.com) for login & user management.  
- 🌐 **Responsive UI** – Clean and modern design with Next.js, TailwindCSS, and shadcn components.  
- ⚡ **Fast Navigation** – Client-side routing with Next.js `<Link>` for smooth experience.  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14 (App Router)](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)  
- **Authentication**: [Clerk](https://clerk.com/)  
- **Data Fetching**: [React Query](https://tanstack.com/query) + [ts-rest](https://ts-rest.com/)  

---

## 📂 Project Structure

credvora/
┣ 📂 app/ # Next.js App Router pages
┣ 📂 components/ # Reusable UI components
┣ 📂 lib/ # Helper functions & utils
┣ 📂 public/ # Static assets (logo, images, etc.)
┣ 📄 package.json
┣ 📄 README.md


---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/credvora.git
   cd credvora

2. **Install dependencies**
   npm install

3. **Set environment variables**
   Create a .env.local file in the root and add:
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   DATABASE_URL=your_database_url

4. **Run the development server**
  npm run dev

5. **Run the inngest server**
   npx inngest-cli@latest dev to open ingest dev server

5. **Run the email dev server**
   npm run email:dev to run react email server