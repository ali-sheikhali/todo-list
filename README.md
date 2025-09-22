# 📝 To-Do List Manager

A **task and list management web app** built with **Next.js + TypeScript**.  
Users can create multiple lists, add cards to them, drag & drop cards across lists, and manage detailed To-Dos for each card.  

## 🚀 Live Demo  
👉 [View on Vercel](https://todo-list-omega-pink.vercel.app/)  

## 💻 Repository  
👉 [GitHub Source Code](https://github.com/ali-sheikhali/todo-list)  

---

## ⚡ Features  

### Main Page  
- ➕ Create new lists  
- 📋 View all lists  
- ➕ Add new cards inside lists  
- 🔄 Display cards based on their list  
- 🎯 Drag & drop cards between lists  
- 👁️ Click on cards to view details  
- ✏️ Edit and 🗑️ delete cards  
- 🗑️ Delete entire lists  
- 🔍 Search in the navbar and filter cards by title  

### Card Details Page  
- ➕ Add new To-Do items  
- 📋 View To-Dos for each card  
- ✏️ Edit and 🗑️ delete To-Dos  
- ✅ Mark To-Dos as completed  

---

## 🛠️ Tech Stack  
- [Next.js](https://nextjs.org/) – React framework  
- [TypeScript](https://www.typescriptlang.org/) – Static typing  
- [Zustand](https://zustand-demo.pmnd.rs/) – Lightweight state management  
- [Tailwind CSS](https://tailwindcss.com/) – Responsive styling  
- [React Hook Form](https://react-hook-form.com/) – Form handling  
- [Zod](https://zod.dev/) – Schema validation  

---

## 🏃 Getting Started  

Clone the repo and install dependencies:  

```bash
git clone https://github.com/ali-sheikhali/todo-list.git
cd todo-list
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## 📂 Project Structure  

```
/app
  page.tsx      → Main application page
  detail/{id}  → Detail cart  
/components   → Reusable UI components
/store        → Zustand state management
/hooks        → Custom hooks
/public        → Pictures and Icons
/schemas        → Zod Schema
/styles        → Fonts
```

---

---

## 👨‍💻 Author  
Developed by [Ali Sheikhali](https://github.com/ali-sheikhali).  
