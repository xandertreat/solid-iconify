# @xtreat/solid-iconify

[![npm version](https://img.shields.io/npm/v/@xtreat/solid-iconify?color=blue&logo=npm)](https://www.npmjs.com/package/@xtreat/solid-iconify)
[![npm downloads](https://img.shields.io/npm/dm/@xtreat/solid-iconify?color=blueviolet)](https://www.npmjs.com/package/@xtreat/solid-iconify)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@xtreat/solid-iconify?label=bundlephobia)](https://bundlephobia.com/package/@xtreat/solid-iconify)
[![Types](https://img.shields.io/npm/types/@xtreat/solid-iconify?label=types)](https://www.npmjs.com/package/@xtreat/solid-iconify)

[![CI Checks](https://img.shields.io/github/actions/workflow/status/xandertreat/textual-theme-gen/ci.yml?branch=main)](https://github.com/xandertreat/textual-theme-gen/actions)
[![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)](https://img.shields.io/badge/maintained-yes-brightgreen)
[![Open Issues](https://img.shields.io/github/issues/xandertreat/textual-theme-gen)](https://github.com/xandertreat/textual-theme-gen/issues)
[![Open PRs](https://img.shields.io/github/issues-pr/xandertreat/textual-theme-gen?color=purple)](https://github.com/xandertreat/textual-theme-gen/pulls)

[![MIT License](https://img.shields.io/badge/license-MIT-success?logo=open-source-initiative&logoColor=white)](https://github.com/xandertreat/textual-theme-gen/blob/main/LICENSE)
[![Code Style: Biome](https://img.shields.io/badge/code%20style-biome-5ed9c7?logo=biome&logoColor=white)](https://biomejs.dev/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.9.0+-blue?logo=solid)](https://www.solidjs.com/)

[![Forks](https://img.shields.io/github/forks/xandertreat/textual-theme-gen?style=social)](https://github.com/xandertreat/textual-theme-gen/fork)
[![GitHub stars](https://img.shields.io/github/stars/xandertreat/textual-theme-gen?style=social)](https://github.com/xandertreat/textual-theme-gen)
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=xandertreat.textual-theme-gen)](https://visitor-badge.laobi.icu/badge?page_id=xandertreat.textual-theme-gen)

A blazing-fast, fully reactive, and type-safe [SolidJS](https://www.solidjs.com/) component for rendering [Iconify](https://iconify.design/) icons. Designed for both SSR and client-side rendering, with first-class TypeScript support, flexible configuration, and zero runtime dependencies (besides SolidJS).

---

## ✨ Features

- **Reactive**: Icons update automatically when props change.
- **Type-Safe**: Full TypeScript support, including strict icon specifier validation.
- **SSR-Ready**: Works seamlessly with SolidJS server-side rendering.
- **Configurable**: Customize API endpoints, caching, SVG defaults, and more.
- **Flexible**: Supports all Iconify icon sets and custom collections.
- **Lightweight**: Minimal runtime, no unnecessary dependencies.
- **Secure**: Optional sanitization with [xss](https://www.npmjs.com/package/xss).
- **Modern**: ESM-only, ships with `.jsx` and TypeScript types

---

## 🚀 Quick Start

### 1. Install

```sh
npm install @xtreat/solid-iconify
# or
yarn add @xtreat/solid-iconify
# or
bun add @xtreat/solid-iconify
```

### 2. Usage

```tsx
import Icon from "@xtreat/solid-iconify";

function App() {
  return (
    <>
      <Icon icon="mdi:account" width={32} height={32} />
      <Icon icon="fa:user" color="tomato" />
    </>
  );
}

export default App;
```

#### With Custom Configuration

```tsx
import { configureIconify } from "@xtreat/solid-iconify";

configureIconify({
  ICONIFY_API: ["api.iconify.design", "yourapihere.com"],
  SANITIZE: true,
});
```

---

## 🧩 API

### `<Icon />` Props

| Prop         | Type                    | Description                       |
|--------------|-------------------------|-----------------------------------|
| `icon`       | `string` (e.g. `mdi:account`) | **Required.** Iconify icon specifier |
| ...SVG props |                         | Any valid SVG attribute           |

### `configureIconify(config)`

Configure global defaults for all icons. Accepts a partial config object:

```ts
configureIconify({
  ICONIFY_API: string | URL | Array<string | URL>,
  REQUEST_OPTIONS: RequestInit,
  CACHE_SIZE: number | { strategy: "grow" | "static" | "unlimited" },
  COLLECTION_SIZE: number | { strategy: "grow" | "static" | "unlimited" },
  DEFAULT_SVG_ATTRIBUTES: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>,
  SANITIZE: boolean,
  SANITIZE_OPTIONS: Partial<IFilterXSSOptions>,
});
```

---

## 🏗️ How It Works

- **Reactive Fetching:** Uses Solid's `createResource` to fetch and cache SVGs from the Iconify API.
- **Caching:** LRU cache for icons and collections, configurable for memory efficiency.
- **Sanitization:** Optionally sanitizes SVGs for XSS protection.
- **SSR Support:** Works in both server and client environments.

---

## 🧪 Testing

This package uses [Vitest](https://vitest.dev/) for unit and e2e tests. To run tests:

```sh
npm test
```

---

## 📦 Build & Publish

- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Type-check: `npm run check`

---

## 🛡️ TypeScript Types

All types are exported:

```ts
import type {
  IconifyIconProps,
  IconifyConfig,
  // ...etc
} from "@xtreat/solid-iconify";
```

---

## 📚 Example

```tsx
import Icon from "@xtreat/solid-iconify";

<Icon icon="mdi:home" width={48} color="#0078d4" />
```

---

## 💬 Feedback & Contributions

Issues and PRs are welcome! [Open an issue](https://github.com/xandertreat/solid-iconify/issues) or [submit a pull request](https://github.com/xandertreat/solid-iconify/pulls).

---

## 🔗 Links

- [Iconify Icon Explorer](https://icon-sets.iconify.design/)
- [SolidJS Docs](https://www.solidjs.com/docs)
- [Project Repository](https://github.com/xandertreat/solid-iconify)

---

## 🐞 Known Bugs

- **Icon reactivity broken**: Changing the `icon` prop does not always update the rendered SVG as expected.

---

## 📝 License

MIT © 2025 Xander Treat
