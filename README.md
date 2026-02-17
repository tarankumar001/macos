# 🍎 MacOS Playground

> A fully interactive macOS-inspired desktop experience built with
> React + Vite --- running entirely in your browser.

MacOS Playground recreates the feeling of using macOS inside a web
application. This is not just a UI clone --- it's a dynamic, animated
desktop system with window management, real app behavior, and smooth
system transitions.

------------------------------------------------------------------------

## ✨ Experience

-   Boot the system\
-   Login into your account\
-   Open apps from Dock or Launchpad\
-   Drag, focus, and manage windows\
-   Use Spotlight to search instantly

It behaves like a lightweight operating system --- inside the browser.

------------------------------------------------------------------------

# 🚀 Core Features

## 🖥️ Desktop Environment

-   macOS-style layout
-   System top menu bar
-   Real-time clock
-   Dynamic background
-   Context-aware UI states

## 🚀 Boot Animation

-   Animated startup sequence
-   Smooth fade & scale transitions
-   System initialization feel
-   Powered by Framer Motion

## 🔐 Login Screen

-   macOS-inspired authentication interface
-   Animated transition to desktop
-   Stateful login handling

## 🔍 Spotlight Search

-   Command palette experience
-   Keyboard-driven interactions
-   Instant app search & launch

## 📂 Launchpad

-   Grid-based animated app launcher
-   Smooth zoom transitions
-   Interactive hover effects

## ⚓ Dock

-   Icon magnification animation
-   App open indicators
-   Click-to-launch behavior
-   Persistent app state

## 🪟 Window Management System

-   Draggable windows
-   Focus detection
-   Z-index stacking
-   Smooth open/close animations
-   Application lifecycle handling

## ✍️ Markdown Editor

-   Built with Milkdown
-   KaTeX math equation support
-   Clean writing environment
-   Modern markdown rendering

## 🎞️ Animations & Micro-Interactions

-   Spring-based motion effects
-   Layout transitions
-   Blur + scale interactions
-   Hardware-accelerated transforms
-   60fps smooth performance

------------------------------------------------------------------------

# 🧠 Tech Stack

-   React 18\
-   Vite\
-   TypeScript\
-   Framer Motion\
-   Milkdown\
-   KaTeX\
-   UnoCSS\
-   Date-fns

------------------------------------------------------------------------

# 📁 Project Structure

src/ ├── pages/ \# Boot, Login, Desktop ├── components/ │ ├── apps/ \#
Application modules │ ├── dock/ \# Dock system │ ├── menus/ \# System
menus │ ├── window/ \# Window manager │ └── ... ├── configs/ \# Config
files ├── hooks/ \# Custom React hooks ├── stores/ \# State management
├── styles/ \# Global styles ├── types/ \# Type definitions ├── utils/
\# Utility functions └── Context.tsx \# Global context setup

------------------------------------------------------------------------

# 🛠 Installation

## Prerequisites

-   Node.js 16+
-   pnpm (recommended)

## Setup

pnpm install pnpm dev

Development server runs at: http://localhost:5173

## Production Build

pnpm build pnpm serve

------------------------------------------------------------------------

# 🧹 Code Quality

-   ESLint
-   Prettier
-   Husky
-   Lint-staged
-   Auto-import setup

------------------------------------------------------------------------

# 🌐 Browser Support

Supports all modern browsers with ES2020+ support.

------------------------------------------------------------------------

# 📄 License

See LICENSE file for details.

------------------------------------------------------------------------

> Built as a showcase playground for modern frontend architecture and
> interactive system design.
