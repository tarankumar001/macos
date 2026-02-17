## 🚀 macOS Portfolio – Web Desktop

A personal portfolio site that mimics the macOS desktop experience. It uses React + Vite and UnoCSS/Tailwind-style utilities, with multiple “apps” (Finder, Bear notes, Launchpad, browser, etc.) running inside draggable windows.

### 🧰 Tech Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: UnoCSS utility classes, custom CSS
- **State**: Zustand
- **Markdown**: `react-markdown`, Milkdown editor, KaTeX for math

### 📁 Main Features
- **macOS-style desktop UI** with dock, launchpad, top menu bar, and draggable/resizable app windows  
- **Bear app** that displays markdown content, including remote READMEs from GitHub (e.g. Todo app README at [`https://raw.githubusercontent.com/tarankumar001/Todo/main/README.md`](https://raw.githubusercontent.com/tarankumar001/Todo/main/README.md))  
- **Project shortcuts** to apps like Echohire, Todo, QuickNotes, résumé, and more  
- **Dark / light aware styling** and smooth animations using Framer Motion

### 🏃‍♂️ Getting Started
```bash
pnpm install
pnpm dev
```

Then open the printed local URL in your browser (e.g. `http://localhost:5173`).

### 🔧 Build & Preview
```bash
pnpm build
pnpm serve
```

This builds the production bundle and serves it locally.

### 📝 Notes
- Remote project READMEs must use **raw** GitHub URLs (`raw.githubusercontent.com/...`) so the Bear markdown viewer can render them correctly.  
- You can customize which projects show up in the Bear app by editing `src/configs/bear.tsx`.

