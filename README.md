# Bubble Shooter — Phaser 3 + TypeScript + Webpack

A polished **bubble shooter** built with **Phaser 3**, **TypeScript**, and **Webpack**. Features a predictive aim line with wall bounces, smooth arcade physics, combo scoring, and power‑ups.

---

## 🎮 Play / Demo

- **Local build:** see _Getting Started_ below.
- **(Optional) Live demo:** add a link here if you deploy to GitHub Pages or Netlify.

---

## 🎬 Gameplay Video

https://github.com/user-attachments/assets/f7a7a0f0-a5ba-47f2-9554-b75ff1fa0487

---

## 📸 Screenshots

![Screenshot 2025-10-13 142429](https://github.com/user-attachments/assets/c886595a-4ed0-413c-9a7e-07b624422e57)
![Screenshot 2025-10-13 142413](https://github.com/user-attachments/assets/74200434-4ef6-4a76-b4a6-6465c4fd8b0a)
![Screenshot 2025-10-13 142359](https://github.com/user-attachments/assets/7d9b1c54-1f82-4f25-897b-e377ce633d61)
![Screenshot 2025-10-13 142204](https://github.com/user-attachments/assets/3176d0c8-fa3e-4c9d-8e26-c2c9393c9418)


---

## ✨ Features

- Predictive **aim line** with **multi‑bounce** reflections
- Cluster detection and bubble popping with juicy VFX
- Score, combo/multiplier, and progress bar
- Smooth mobile/desktop input
- Responsive canvas; fixed **iPhone‑SE** logical ratio (375×667) with auto‑scaling
- Modular scenes: Boot → Game → (optional) UI overlays
- TypeScript codebase, Webpack bundle

---

## 🧩 How to Play

1. **Aim**: Move the mouse (or drag on touch) to see the dotted **aim line** with wall bounces.
2. **Shoot**: **Left click** (or **tap**) to fire the current bubble.
3. **Swap bubble**: **Right click**, **or left click the circle/launcher** to swap the current bubble with the next one.
4. **Score**: Match and pop clusters to earn points; chain pops build multipliers.
5. **Goal**: Clear all bubbles before the ceiling drops too far.

---

## 🕹 Controls

- **Left Click / Tap**: Shoot bubble
- **Right Click** _or_ **Left Click on the launcher circle**: Swap bubble
- **Mouse / Touch Move**: Aim (shows ricochet path)
- **P**: Pause/Resume (if enabled)

---

## 🧰 Tech Stack

- **Phaser 3** (Arcade Physics)
- **TypeScript**
- **Webpack** + dev server
- NPM/Yarn scripts

---

## 🚀 Getting Started

> The original template uses **Yarn**. Commands for **npm** are shown as well.

### 1) Install dependencies
```bash
# using yarn
yarn

# using npm
npm install
```

### 2) Start the dev server (with HMR)
```bash
# yarn
yarn dev

# npm
npm run dev
```

Open the printed local URL (e.g., `http://localhost:8080/`).

### 3) Build for production
```bash
# yarn
yarn build

# npm
npm run build
```
The production bundle will be emitted into your configured `public/` (or `dist/`) folder and is ready to deploy.

---

## 🛠 Scripts

Add (or verify) these in your `package.json`:

```jsonc
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

---

## 🙌 Credits

- Base tutorial/template by [Shakuro](https://shakuro.com) — expanded with new mechanics and UI
- Built with [Phaser 3](https://phaser.io/)

---

## 📜 License

MIT
