import { useEffect, useRef } from "react";

// Design philosophy: translate the user's dark botanical canvas into the love-letter's
// midnight garden while keeping its hand-drawn growth, pollen, and petal timing.

type CanvasFlowerBloomProps = {
  active?: boolean;
};

const duration = 5800;

export function CanvasFlowerBloom({ active = false }: CanvasFlowerBloomProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let start = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
    const smoother = (value: number) => {
      const x = clamp(value);
      return x * x * (3 - 2 * x);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pathPetal = (
      cx: number,
      cy: number,
      angle: number,
      length: number,
      petalWidth: number,
      scale: number,
      colors: readonly string[] = ["#e89cae", "#f9b9c7", "#fff0dd"],
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      const gradient = ctx.createLinearGradient(0, 0, length, 0);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.48, colors[1]);
      gradient.addColorStop(1, colors[2]);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(length * 0.28, -petalWidth, length * 0.8, -petalWidth * 0.98, length, 0);
      ctx.bezierCurveTo(length * 0.8, petalWidth * 0.98, length * 0.28, petalWidth, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawLeaf = (x: number, y: number, angle: number, size: number, grow: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(grow, grow);
      const gradient = ctx.createLinearGradient(0, 0, size, 0);
      gradient.addColorStop(0, "#2d7e59");
      gradient.addColorStop(1, "#94c86d");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.55, -size * 0.55, size, -size * 0.15);
      ctx.quadraticCurveTo(size * 0.45, size * 0.1, 0, 0);
      ctx.fill();
      ctx.strokeStyle = "rgba(244,255,190,.43)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.82, -size * 0.13);
      ctx.stroke();
      ctx.restore();
    };

    const drawFieldFlower = (x: number, y: number, size: number, hue: number, grow: number, sway: number, time: number, phase: number) => {
      const stem = size * 2.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway);
      ctx.globalAlpha = 0.72 * grow;
      ctx.strokeStyle = "#458b5d";
      ctx.lineWidth = Math.max(1, size * 0.14);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.16, -stem * 0.48, 0, -stem);
      ctx.stroke();
      ctx.translate(0, -stem);
      const breathe = 1 + Math.sin(time * 0.0024 + phase) * 0.055;
      ctx.scale(breathe, breathe);
      for (let index = 0; index < 7; index += 1) {
        ctx.save();
        ctx.rotate(index * Math.PI * 2 / 7 + Math.sin(time * 0.0018 + phase + index) * 0.035);
        ctx.fillStyle = `hsl(${hue}, 80%, 76%)`;
        ctx.beginPath();
        ctx.ellipse(size * 0.43, 0, size * 0.52, size * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = "#f3ca56";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.27, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawFlowerField = (time: number, progress: number) => {
      const grow = smoother((progress - 0.05) / 0.54);
      const horizon = height * 0.78;
      const field = [
        [0.03, 0.91, 7, 328], [0.08, 0.84, 6, 56], [0.13, 0.96, 10, 330], [0.19, 0.88, 7, 49], [0.25, 0.93, 11, 316], [0.31, 0.82, 6, 341],
        [0.37, 0.96, 9, 45], [0.43, 0.87, 7, 328], [0.5, 0.94, 10, 50], [0.57, 0.85, 7, 335], [0.63, 0.97, 11, 41], [0.69, 0.89, 7, 322],
        [0.75, 0.83, 6, 48], [0.81, 0.94, 10, 336], [0.87, 0.87, 7, 325], [0.93, 0.96, 11, 51], [0.98, 0.88, 7, 334],
        [0.04, 0.99, 12, 341], [0.22, 0.99, 13, 56], [0.39, 0.99, 12, 324], [0.59, 0.99, 13, 45], [0.78, 0.99, 12, 332], [0.95, 0.99, 13, 48],
      ];
      ctx.globalAlpha = 0.48 * grow;
      ctx.strokeStyle = "#296147";
      ctx.lineWidth = 2;
      for (let x = 0; x <= width; x += 13) {
        const base = horizon + ((x * 17) % Math.max(1, height - horizon));
        const lean = Math.sin(x * 0.09 + time * 0.0012) * 5;
        ctx.beginPath();
        ctx.moveTo(x, base);
        ctx.bezierCurveTo(x + lean * 0.25, base - 8, x + lean, base - 17, x + lean * 1.5, base - 27);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      field.forEach(([xRatio, yRatio, size, hue], index) => {
        const local = clamp((grow - index * 0.018) / 0.72);
        drawFieldFlower(xRatio * width, yRatio * height, size, hue, local, Math.sin(time * 0.0013 + index) * 0.055, time, index * 1.73);
      });
    };

    const drawHeroFlowers = (time: number, progress: number) => {
      const grow = smoother((progress - 0.18) / 0.57);
      const size = Math.min(width, height);
      const flowers = [[width * 0.29, height * 0.84, size * 0.052, 332, 0.8], [width * 0.5, height * 0.8, size * 0.068, 348, 0], [width * 0.72, height * 0.84, size * 0.052, 320, -0.8]];
      flowers.forEach(([x, baseY, flowerSize, hue, phase], index) => {
        const open = smoother((grow - index * 0.09) / 0.72);
        const sway = Math.sin(time * 0.00125 + index * 1.8) * 0.055;
        const y = baseY + Math.sin(time * 0.0015 + index) * 2;
        drawFieldFlower(x, y, flowerSize, hue, open, sway, time, index * 2.3 + phase);
      });
    };

    const drawGrandFlower = (time: number, progress: number) => {
      const size = Math.min(width, height);
      const x = width * 0.5;
      const y = height * 0.45;
      const bloom = smoother((progress - 0.39) / 0.57);
      const pollen = smoother((progress - 0.16) / 0.26);
      const stemGrow = smoother(progress / 0.42);
      const stemBase = height * 0.98;
      const stemTop = y + size * 0.025;
      const sway = Math.sin(time * 0.00105) * size * 0.012;
      const flow = Math.sin(time * 0.00105) * size * 0.026 + Math.sin(time * 0.0021) * size * 0.007;
      const headX = x + flow;
      const headY = y + Math.cos(time * 0.0013) * 2;
      ctx.save();
      ctx.globalAlpha = stemGrow * 0.9;
      ctx.strokeStyle = "#4c955b";
      ctx.lineWidth = Math.max(4, size * 0.008);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, stemBase);
      ctx.bezierCurveTo(x - sway, height * 0.79, x + flow * 0.42, height * 0.56, headX, stemTop);
      ctx.stroke();
      ctx.restore();
      const leafGrow = smoother((progress - 0.1) / 0.38);
      drawLeaf(x + flow * 0.25 - 2, height * 0.76, -2.72 + Math.sin(time * 0.001) * 0.1, size * 0.105, leafGrow);
      drawLeaf(x + flow * 0.46 + 2, height * 0.66, -0.43 + Math.sin(time * 0.0011) * 0.1, size * 0.092, leafGrow);
      drawLeaf(x + flow * 0.72 - 1, height * 0.57, -2.65 + Math.sin(time * 0.0012) * 0.09, size * 0.075, leafGrow * 0.9);
      ctx.save();
      ctx.globalAlpha = pollen * 0.78;
      for (let index = 0; index < 34; index += 1) {
        const angle = index * 2.399 + time * 0.00023;
        const orbit = size * (0.025 + (index % 7) * 0.009) * (1 - pollen * 0.45);
        const drift = (1 - pollen) * size * 0.11;
        const px = headX + Math.cos(angle) * orbit + Math.sin(time * 0.0017 + index) * 3;
        const py = headY + Math.sin(angle) * orbit - drift - (index % 5) * size * 0.006;
        ctx.fillStyle = `rgba(255, ${190 + (index % 4) * 13}, 83, ${0.28 + (index % 3) * 0.18})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + (index % 3) * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      const petals = 14;
      const length = size * 0.145;
      const petalWidth = size * 0.061;
      for (let index = 0; index < petals; index += 1) {
        const local = smoother((bloom - index * 0.027) / 0.62);
        const angle = -Math.PI / 2 + index * Math.PI * 2 / petals + Math.sin(time * 0.0012 + index) * 0.018;
        if (local > 0) {
          ctx.save();
          ctx.globalAlpha = local;
          pathPetal(headX, headY, angle, length, petalWidth, 0.14 + 0.86 * local, ["#d95d88", "#f39ab7", "#fff2e4"]);
          ctx.restore();
        }
      }
      if (bloom > 0) {
        const radius = size * 0.032 * (0.45 + 0.55 * bloom);
        const center = ctx.createRadialGradient(headX - radius * 0.25, headY - radius * 0.35, 1, headX, headY, radius);
        center.addColorStop(0, "#fff6ad");
        center.addColorStop(0.62, "#eab548");
        center.addColorStop(1, "#a95d25");
        ctx.globalAlpha = bloom;
        ctx.fillStyle = center;
        ctx.beginPath();
        ctx.arc(headX, headY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const drawBouquetFlower = (cx: number, cy: number, scale: number, progress: number, colors: readonly string[], spin: number) => {
      const length = Math.min(width, height) * 0.112 * scale;
      const petalWidth = length * 0.49;
      const petals = 11;
      const open = 0.16 + 0.84 * ease(progress);
      const bud = smoother(progress / 0.23);
      if (bud < 1) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(0.55 + bud * 0.45, 0.45 + bud * 0.55);
        ctx.globalAlpha = 0.88;
        const gradient = ctx.createRadialGradient(-length * 0.12, -length * 0.2, 1, 0, 0, length * 0.32);
        gradient.addColorStop(0, colors[2]);
        gradient.addColorStop(0.62, colors[1]);
        gradient.addColorStop(1, colors[0]);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, length * 0.24, length * 0.32, spin, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.save();
      ctx.globalAlpha = progress;
      for (let layer = 0; layer < 2; layer += 1) {
        for (let index = 0; index < petals; index += 1) {
          const angle = spin + index * Math.PI * 2 / petals + layer * 0.19;
          pathPetal(cx, cy, angle, length * (layer ? 0.78 : 1), petalWidth * (layer ? 0.76 : 1), open * (layer ? 0.88 : 1), colors);
        }
      }
      ctx.restore();
      const radius = length * 0.22 * open;
      const center = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.35, 1, cx, cy, radius);
      center.addColorStop(0, "#fff6a7");
      center.addColorStop(0.58, "#f1ba46");
      center.addColorStop(1, "#a65d25");
      ctx.fillStyle = center;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(92,48,23,.55)";
      for (let index = 0; index < 19; index += 1) {
        const angle = index * 2.39;
        const distance = (index % 5 + 1) * radius / 6;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBouquet = (time: number, progress: number) => {
      const bloomProgress = smoother((progress - 0.31) / 0.62);
      const stemProgress = smoother(progress / 0.34);
      const x = width * 0.5;
      const base = height * 0.94;
      const size = Math.min(width, height);
      const blooms: [number, number, number, readonly string[], number][] = [
        [-0.2, -0.16, 0.82, ["#c75c86", "#ef92af", "#ffe5dc"], -0.18], [0.18, -0.17, 0.8, ["#b7547b", "#e988aa", "#ffe3d9"], 0.13],
        [-0.09, -0.3, 0.92, ["#d76a8c", "#f6a5bd", "#fff0e6"], 0.07], [0.09, -0.32, 0.9, ["#e87893", "#f7acc0", "#fff1e8"], -0.09],
        [-0.28, -0.33, 0.7, ["#9b527f", "#d981a6", "#ffe4e7"], 0.26], [0.29, -0.34, 0.7, ["#be5a7e", "#ed8fac", "#ffe5df"], -0.23],
        [0, -0.45, 1.02, ["#d55b80", "#f29ab4", "#fff0df"], 0],
      ];
      const headY = height * 0.67;
      blooms.forEach(([offsetX, offsetY], index) => {
        const targetX = x + offsetX * size;
        const targetY = headY + offsetY * size;
        ctx.save();
        ctx.globalAlpha = 0.9 * stemProgress;
        ctx.strokeStyle = index % 2 ? "#398254" : "#4f9d5c";
        ctx.lineWidth = Math.max(3, size * 0.006);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x + (index - 3) * 3, base);
        ctx.bezierCurveTo(x + offsetX * size * 0.1, base - size * 0.17, targetX - offsetX * size * 0.12, targetY + size * 0.12, targetX, targetY);
        ctx.stroke();
        ctx.restore();
      });
      ctx.save();
      ctx.globalAlpha = stemProgress * 0.75;
      ctx.fillStyle = "#7fba78";
      for (let index = 0; index < 18; index += 1) {
        const side = index % 2 ? 1 : -1;
        const yy = base - size * (0.13 + (index % 6) * 0.045);
        const xx = x + side * (size * (0.09 + (index % 4) * 0.025));
        ctx.beginPath();
        ctx.ellipse(xx, yy, size * 0.026, size * 0.012, side * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      blooms.forEach(([offsetX, offsetY, flowerScale, colors, spin], index) => {
        const local = smoother((bloomProgress - index * 0.07) / 0.58);
        drawBouquetFlower(x + offsetX * size, headY + offsetY * size, flowerScale, local, colors, spin);
      });
      const wrapProgress = smoother((progress - 0.16) / 0.34);
      ctx.save();
      ctx.globalAlpha = wrapProgress;
      ctx.translate(x, base - size * 0.02);
      ctx.fillStyle = "#e7c9a3";
      ctx.beginPath();
      ctx.moveTo(-size * 0.2, -size * 0.02);
      ctx.lineTo(-size * 0.28, -size * 0.25);
      ctx.lineTo(0, -size * 0.13);
      ctx.lineTo(size * 0.28, -size * 0.25);
      ctx.lineTo(size * 0.2, -size * 0.02);
      ctx.quadraticCurveTo(0, size * 0.09, -size * 0.2, -size * 0.02);
      ctx.fill();
      ctx.strokeStyle = "rgba(120,76,54,.36)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.2, -size * 0.02);
      ctx.lineTo(0, -size * 0.13);
      ctx.lineTo(size * 0.2, -size * 0.02);
      ctx.stroke();
      ctx.fillStyle = "#b36d73";
      ctx.fillRect(-size * 0.15, -size * 0.145, size * 0.3, size * 0.032);
      ctx.restore();
    };

    const draw = (time: number) => {
      const progress = clamp(time / duration);
      ctx.clearRect(0, 0, width, height);
      const background = ctx.createRadialGradient(width * 0.5, height * 0.53, 10, width * 0.5, height * 0.53, Math.max(width, height) * 0.72);
      background.addColorStop(0, "#174634");
      background.addColorStop(0.58, "#0b2923");
      background.addColorStop(1, "#061311");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      for (let index = 0; index < 22; index += 1) {
        const fireflyX = (index * 149) % width;
        const fireflyY = (index * 83) % height;
        const alpha = 0.12 + Math.sin(time * 0.0014 + index) * 0.07;
        ctx.fillStyle = `rgba(255,230,137,${alpha})`;
        ctx.beginPath();
        ctx.arc(fireflyX, fireflyY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (active) {
        drawFlowerField(time, progress);
        drawHeroFlowers(time, progress);
        drawGrandFlower(time, progress);
      }
    };

    const animate = (now: number) => {
      draw(now - start);
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    if (active) {
      start = performance.now();
      frame = window.requestAnimationFrame(animate);
    } else {
      draw(0);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="user-flower-bloom-canvas" aria-hidden="true" />;
}
