import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const copyPortfolioAssets = () => ({
  name: "copy-portfolio-assets",
  closeBundle() {
    const root = process.cwd();
    const output = resolve(root, "dist");
    const publicRoot = resolve(root, "public");

    for (const file of ["CV.pdf", "cars.pdf", "sumo.pdf"]) {
      const publicFile = resolve(publicRoot, file);
      const source = existsSync(publicFile) ? publicFile : resolve(root, file);
      copyFileSync(source, resolve(output, file));
    }

    const publicImages = resolve(publicRoot, "images");
    const images = existsSync(publicImages)
      ? publicImages
      : resolve(root, "images");
    mkdirSync(resolve(output, "images"), { recursive: true });
    cpSync(images, resolve(output, "images"), { recursive: true });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyPortfolioAssets()],
});
