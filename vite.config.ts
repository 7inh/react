import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/components"),
            "@context": path.resolve(__dirname, "src/context"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@middleware": path.resolve(__dirname, "src/middleware"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@types": path.resolve(__dirname, "src/types"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@redux": path.resolve(__dirname, "src/redux"),
            "@features": path.resolve(__dirname, "src/features"),
        },
    },
});
