/// <reference types="vitest" />
import { defineConfig, } from 'vite'
import { coverageConfigDefaults } from "vitest/config"
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        environment: "jsdom",
        globals: true,
        include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
        setupFiles: ["./vitest_setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: [...coverageConfigDefaults.exclude, 'src/index.tsx']
        }
    }
});
