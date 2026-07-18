import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 600;
const MAX_RECURSION_DEPTH = 3;

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
};

class PortfolioRenderer {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly texture: THREE.CanvasTexture;
  private previousFrame = Number.NEGATIVE_INFINITY;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;

    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("Canvas rendering is unavailable");
    this.context = context;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
  }

  drawPortfolio(
    x: number,
    y: number,
    width: number,
    height: number,
    depth: number,
    elapsed: number
  ) {
    const context = this.context;
    const scale = width / SCREEN_WIDTH;

    context.save();
    drawRoundedRect(context, x, y, width, height, Math.max(3, 14 * scale));
    context.clip();

    const background = context.createRadialGradient(
      x + width * 0.2,
      y + height * 0.12,
      0,
      x + width * 0.48,
      y + height * 0.5,
      width * 0.86
    );
    background.addColorStop(0, "#092033");
    background.addColorStop(0.48, "#03070e");
    background.addColorStop(1, "#010103");
    context.fillStyle = background;
    context.fillRect(x, y, width, height);

    const purpleGlow = context.createRadialGradient(
      x + width * 0.84,
      y + height * 0.42,
      0,
      x + width * 0.84,
      y + height * 0.42,
      width * 0.38
    );
    purpleGlow.addColorStop(0, "rgba(124, 58, 237, 0.2)");
    purpleGlow.addColorStop(1, "rgba(124, 58, 237, 0)");
    context.fillStyle = purpleGlow;
    context.fillRect(x, y, width, height);

    const scrollCycle = (1 - Math.cos(elapsed * 0.62 + depth * 0.38)) / 2;
    const scrollProgress = scrollCycle * scrollCycle * (3 - 2 * scrollCycle);
    const contentY = y - scrollProgress * height * 1.02;

    const pulse = 0.72 + Math.sin(elapsed * 1.15 + depth * 0.7) * 0.2;
    const meteorX = x + width * (0.76 + Math.sin(elapsed * 0.22) * 0.035);
    const meteorY = y + height * 0.22;
    const tail = context.createLinearGradient(
      meteorX - 82 * scale,
      meteorY - 34 * scale,
      meteorX,
      meteorY
    );
    tail.addColorStop(0, "rgba(56, 189, 248, 0)");
    tail.addColorStop(1, `rgba(125, 211, 252, ${pulse})`);
    context.strokeStyle = tail;
    context.lineWidth = Math.max(1, 4 * scale);
    context.beginPath();
    context.moveTo(meteorX - 82 * scale, meteorY - 34 * scale);
    context.lineTo(meteorX, meteorY);
    context.stroke();

    context.textAlign = "center";
    context.fillStyle = "#e7e7ef";
    context.font = `600 ${18 * scale}px "General Sans", Arial, sans-serif`;
    context.fillText(
      "Hi, I'm Khaled Alruwita  ☄",
      x + width / 2,
      contentY + 112 * scale
    );

    const titleGradient = context.createLinearGradient(
      x + width * 0.24,
      0,
      x + width * 0.76,
      0
    );
    titleGradient.addColorStop(0, "#bec1cf");
    titleGradient.addColorStop(0.55, "#ffffff");
    titleGradient.addColorStop(1, "#b9c5e9");
    context.fillStyle = titleGradient;
    context.font = `800 ${48 * scale}px "General Sans", Arial, sans-serif`;
    context.fillText(
      "Data Engineer & Analyst",
      x + width / 2,
      contentY + 162 * scale
    );

    if (depth < 2) {
      context.fillStyle = "#aeb0b8";
      context.font = `400 ${13 * scale}px "General Sans", Arial, sans-serif`;
      context.fillText(
        "Reliable data pipelines, analytics platforms, and automation.",
        x + width / 2,
        contentY + 191 * scale
      );
    }

    const laptopWidth = width * 0.44;
    const laptopHeight = laptopWidth * 0.54;
    const laptopX = x + (width - laptopWidth) / 2;
    const laptopY = contentY + height * 0.38;
    const bezel = Math.max(1.5, 10 * scale);

    context.fillStyle = "#b66a06";
    drawRoundedRect(
      context,
      laptopX,
      laptopY,
      laptopWidth,
      laptopHeight,
      Math.max(2, 10 * scale)
    );
    context.fill();
    context.fillStyle = "#111318";
    drawRoundedRect(
      context,
      laptopX + bezel,
      laptopY + bezel,
      laptopWidth - bezel * 2,
      laptopHeight - bezel * 2.5,
      Math.max(1, 5 * scale)
    );
    context.fill();

    if (depth < MAX_RECURSION_DEPTH) {
      this.drawPortfolio(
        laptopX + bezel * 1.35,
        laptopY + bezel * 1.35,
        laptopWidth - bezel * 2.7,
        laptopHeight - bezel * 3.2,
        depth + 1,
        elapsed
      );
    }

    const baseY = laptopY + laptopHeight - bezel * 0.55;
    context.fillStyle = "#d6880c";
    context.beginPath();
    context.moveTo(laptopX - laptopWidth * 0.08, baseY);
    context.lineTo(laptopX + laptopWidth * 1.08, baseY);
    context.lineTo(laptopX + laptopWidth * 0.91, baseY + 22 * scale);
    context.lineTo(laptopX + laptopWidth * 0.09, baseY + 22 * scale);
    context.closePath();
    context.fill();

    if (depth === 0) {
      const buttonY = contentY + height - 62 * scale;
      context.fillStyle = "rgba(31, 32, 39, 0.94)";
      drawRoundedRect(
        context,
        x + width * 0.3,
        buttonY,
        width * 0.24,
        34 * scale,
        5 * scale
      );
      context.fill();
      context.fillStyle = "#f8fafc";
      context.font = `600 ${11 * scale}px "General Sans", Arial, sans-serif`;
      context.fillText(
        "Explore my work  ↓",
        x + width * 0.42,
        buttonY + 17 * scale
      );

      context.fillStyle = "rgba(31, 32, 39, 0.94)";
      drawRoundedRect(
        context,
        x + width * 0.56,
        buttonY,
        width * 0.14,
        34 * scale,
        5 * scale
      );
      context.fill();
      context.fillStyle = "#f8fafc";
      context.fillText("View CV", x + width * 0.63, buttonY + 17 * scale);
    }

    const projectsY = contentY + height * 1.08;
    context.textAlign = "left";
    context.fillStyle = "#f8fafc";
    context.font = `700 ${25 * scale}px "General Sans", Arial, sans-serif`;
    context.fillText("Featured Projects", x + width * 0.08, projectsY);

    const projects = [
      ["Award-Winning", "Traffic Simulation", "#38bdf8"],
      ["Analytics", "Decision Platform", "#8b5cf6"],
      ["Data Engineering", "Automated Pipelines", "#22c55e"],
    ] as const;
    const cardGap = width * 0.025;
    const cardWidth = width * 0.265;
    const cardHeight = height * 0.27;
    const cardsX = x + width * 0.08;
    const cardsY = projectsY + 25 * scale;

    projects.forEach(([eyebrow, title, accent], index) => {
      const cardX = cardsX + index * (cardWidth + cardGap);
      const cardGradient = context.createLinearGradient(
        cardX,
        cardsY,
        cardX + cardWidth,
        cardsY + cardHeight
      );
      cardGradient.addColorStop(0, `${accent}26`);
      cardGradient.addColorStop(1, "rgba(12, 14, 22, 0.96)");
      context.fillStyle = cardGradient;
      drawRoundedRect(
        context,
        cardX,
        cardsY,
        cardWidth,
        cardHeight,
        10 * scale
      );
      context.fill();
      context.strokeStyle = `${accent}70`;
      context.lineWidth = Math.max(0.7, scale);
      context.stroke();

      context.fillStyle = accent;
      context.font = `600 ${10 * scale}px "General Sans", Arial, sans-serif`;
      context.fillText(
        eyebrow.toUpperCase(),
        cardX + 16 * scale,
        cardsY + 30 * scale
      );
      context.fillStyle = "#f8fafc";
      context.font = `700 ${18 * scale}px "General Sans", Arial, sans-serif`;
      context.fillText(title, cardX + 16 * scale, cardsY + 62 * scale);

      context.fillStyle = "rgba(255, 255, 255, 0.09)";
      drawRoundedRect(
        context,
        cardX + 16 * scale,
        cardsY + 84 * scale,
        cardWidth - 32 * scale,
        8 * scale,
        4 * scale
      );
      context.fill();
      drawRoundedRect(
        context,
        cardX + 16 * scale,
        cardsY + 101 * scale,
        (cardWidth - 32 * scale) * 0.72,
        8 * scale,
        4 * scale
      );
      context.fill();
    });

    const trackX = x + width - Math.max(5, 11 * scale);
    const trackY = y + 78 * scale;
    const trackHeight = height - 104 * scale;
    const thumbHeight = Math.max(7, 54 * scale);
    context.fillStyle = "rgba(255, 255, 255, 0.08)";
    drawRoundedRect(
      context,
      trackX,
      trackY,
      Math.max(1.5, 3 * scale),
      trackHeight,
      2 * scale
    );
    context.fill();
    context.fillStyle = "rgba(56, 189, 248, 0.85)";
    drawRoundedRect(
      context,
      trackX,
      trackY + scrollProgress * (trackHeight - thumbHeight),
      Math.max(1.5, 3 * scale),
      thumbHeight,
      2 * scale
    );
    context.fill();

    const padding = 34 * scale;
    const headerY = y + 34 * scale;
    context.fillStyle = "rgba(1, 1, 3, 0.93)";
    context.fillRect(x, y, width, 62 * scale);
    context.fillStyle = "#f8fafc";
    context.font = `700 ${18 * scale}px "General Sans", Arial, sans-serif`;
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.fillText("Khaled Alruwita", x + padding, headerY);

    if (depth < 2) {
      context.fillStyle = "#a8a8ad";
      context.font = `500 ${12 * scale}px "General Sans", Arial, sans-serif`;
      context.textAlign = "right";
      context.fillText(
        "Home     About     Projects     Experience     Contact",
        x + width - padding,
        headerY
      );
    }

    context.strokeStyle = "rgba(255, 255, 255, 0.1)";
    context.lineWidth = Math.max(0.6, scale);
    context.beginPath();
    context.moveTo(x, y + 61 * scale);
    context.lineTo(x + width, y + 61 * scale);
    context.stroke();

    context.restore();
  }

  draw(elapsed: number) {
    if (elapsed - this.previousFrame < 1 / 24) return;
    this.previousFrame = elapsed;
    this.context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.drawPortfolio(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0, elapsed);
    this.texture.needsUpdate = true;
  }

  dispose() {
    this.texture.dispose();
  }
}

export const usePortfolioTexture = () => {
  const renderer = useMemo(() => new PortfolioRenderer(), []);

  useFrame(({ clock }) => renderer.draw(clock.getElapsedTime()));
  useEffect(() => () => renderer.dispose(), [renderer]);

  return renderer.texture;
};
