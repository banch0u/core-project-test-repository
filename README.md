# 📦 @banch0u/core-project-test-repository – Development & Deployment Guide

## ✨ Live Development Setup

To develop and test changes in the core package **live** within another project (e.g., `docflow, hr, contract, account and etc.`), follow these steps:

---

### 📌 Before You Start

Ensure that **Yalc** is installed globally on your system:

```bash
npm install -g yalc
```

---

### 💠 Step 1: Start the Core Package in Watch Mode

This will watch your `src/` directory for changes, rebuild the `dist/` folder, and automatically push updates to `.yalc`:

```bash
npm run dev
```

---

### 💠 Step 2: In Your Main Project (Consumer App)

> **Important:** Before executing this step, make sure your main project's dev server is stopped.

#### ✅ a. Add the Core Package via Yalc

```bash
yalc add @banch0u/core-project-test-repository
```

This copies the current `dist/` folder into your project's `.yalc` directory and updates your `package.json`.

#### 🔗 b. Link the Core Package

```bash
yalc link @banch0u/core-project-test-repository
```

This creates a symlink to the core package. Now, all changes from the `npm run dev` watcher will reflect automatically when you start your project's dev server again (`npm start`).

---

### ⚠️ Important Notes

- Your `package.json` will temporarily contain:

  ```json
  "@banch0u/core-project-test-repository": "file:.yalc/@banch0u/core-project-test-repository"
  ```

- **This file path will break production builds or CI/CD pipelines.**

- **Before deploying or committing:**

  - Manually delete the line above from your `package.json`.
  - Replace it by installing the latest package from npm:

  ```bash
  npm install @banch0u/core-project-test-repository@latest
  ```

---

## 📦 Publishing to NPM

### 1. Build the Package

```bash
npm run build
```

This will transpile your `src/` folder into the `dist/` folder.

### 2. Bump Version

Use `npm version` to update the package version according to the type of change:

- **Patch** (small fix): `npm version patch` → `1.0.0 → 1.0.1`
- **Minor** (new feature, backward compatible): `npm version minor` → `1.0.0 → 1.1.0`
- **Major** (breaking changes): `npm version major` → `1.0.0 → 2.0.0`

### 3. Publish to NPM

```bash
npm publish
```

Your changes will now be available on the npm registry. Consumers can install the latest version via:

```bash
npm install @banch0u/core-project-test-repository@latest
```

---

Happy coding 💻🚀
