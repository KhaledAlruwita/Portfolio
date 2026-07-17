import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const starField = Array.from({ length: 90 }, (_, index) => ({
  x: ((index * 73) % 997) / 997,
  y: ((index * 151) % 991) / 991,
  radius: 0.7 + (index % 4) * 0.45,
  phase: (index % 11) / 11,
}));

class MeteorRenderer {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly texture: THREE.CanvasTexture;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 1024;

    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("Canvas rendering is unavailable");
    this.context = context;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
  }

  draw(elapsed: number) {
    const width = this.canvas.width;
    const height = this.canvas.height;

    const background = this.context.createRadialGradient(
      width * 0.68,
      height * 0.22,
      20,
      width * 0.5,
      height * 0.5,
      width * 0.8
    );
    background.addColorStop(0, "#172554");
    background.addColorStop(0.45, "#081225");
    background.addColorStop(1, "#02040a");
    this.context.fillStyle = background;
    this.context.fillRect(0, 0, width, height);

    for (const star of starField) {
      const pulse =
        0.35 + 0.65 * Math.abs(Math.sin(elapsed * 1.4 + star.phase * 8));
      this.context.beginPath();
      this.context.fillStyle = `rgba(226, 232, 240, ${pulse})`;
      this.context.arc(
        star.x * width,
        star.y * height,
        star.radius,
        0,
        Math.PI * 2
      );
      this.context.fill();
    }

    const cycle = (elapsed * 0.16) % 1;
    const meteorX = -180 + cycle * (width + 480);
    const meteorY = 150 + cycle * 430;
    const tail = this.context.createLinearGradient(
      meteorX - 360,
      meteorY - 230,
      meteorX,
      meteorY
    );
    tail.addColorStop(0, "rgba(56, 189, 248, 0)");
    tail.addColorStop(0.55, "rgba(56, 189, 248, 0.25)");
    tail.addColorStop(1, "rgba(255, 255, 255, 0.95)");
    this.context.strokeStyle = tail;
    this.context.lineWidth = 16;
    this.context.lineCap = "round";
    this.context.beginPath();
    this.context.moveTo(meteorX - 360, meteorY - 230);
    this.context.lineTo(meteorX, meteorY);
    this.context.stroke();

    const glow = this.context.createRadialGradient(
      meteorX,
      meteorY,
      0,
      meteorX,
      meteorY,
      62
    );
    glow.addColorStop(0, "#ffffff");
    glow.addColorStop(0.15, "#7dd3fc");
    glow.addColorStop(0.45, "rgba(59, 130, 246, 0.55)");
    glow.addColorStop(1, "rgba(59, 130, 246, 0)");
    this.context.fillStyle = glow;
    this.context.beginPath();
    this.context.arc(meteorX, meteorY, 62, 0, Math.PI * 2);
    this.context.fill();

    this.context.fillStyle = "rgba(2, 6, 23, 0.7)";
    this.context.fillRect(54, height - 174, width - 108, 104);
    this.context.strokeStyle = "rgba(56, 189, 248, 0.35)";
    this.context.strokeRect(54, height - 174, width - 108, 104);
    this.context.fillStyle = "#e2e8f0";
    this.context.font = "700 42px monospace";
    this.context.fillText("METEOR // KR.SA", 88, height - 112);
    this.context.fillStyle = "#38bdf8";
    this.context.font = "24px monospace";
    this.context.fillText("DATA IN MOTION", 88, height - 78);

    this.texture.needsUpdate = true;
  }

  dispose() {
    this.texture.dispose();
  }
}

export const useMeteorTexture = () => {
  const renderer = useMemo(() => new MeteorRenderer(), []);

  useFrame(({ clock }) => renderer.draw(clock.getElapsedTime()));
  useEffect(() => () => renderer.dispose(), [renderer]);

  return renderer.texture;
};
