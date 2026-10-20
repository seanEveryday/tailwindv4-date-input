import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// `vite` (dev) serves the interactive demo in /demo.
// `vite build` emits the library (ESM + CJS) for both entry points.
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: resolve(__dirname, "demo"),
      plugins: [react(), tailwindcss()],
    };
  }

  const external = [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-hook-form",
    "@headlessui/react",
    "@heroicons/react/20/solid",
    "clsx",
    "react-text-mask",
    /^dayjs($|\/)/,
  ];

  return {
    plugins: [react()],
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, "src/index.js"),
          rhf: resolve(__dirname, "src/rhf.jsx"),
        },
        formats: ["es", "cjs"],
        fileName: (format, name) => `${name}.${format === "es" ? "js" : "cjs"}`,
      },
      rollupOptions: {
        external,
        output: {
          preserveModules: false,
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});
