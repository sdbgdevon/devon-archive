<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: Particle[] = [];
  let mouse = { x: 0, y: 0, radius: 100 };
  let rafId: number;

  class Particle {
    x: number; y: number;
    baseX: number; baseY: number;
    density: number;
    size: number = 1.5;
    color: string = '#000';

    constructor(x: number, y: number) {
      // 초기 등장 위치를 캔버스 너비 안으로 제한
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * 450;
      this.baseX = x;
      this.baseY = y;
      this.density = (Math.random() * 30) + 5;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * this.density;
        this.y -= (dy / distance) * force * this.density;
      } else {
        this.x -= (this.x - this.baseX) * 0.1;
        this.y -= (this.y - this.baseY) * 0.1;
      }
    }
  }

  function init() {
    if (!canvas || !ctx) return;
    particles = [];
    
    // 1. 화면 너비에 따른 폰트 사이즈 및 간격(Gap) 동적 설정
    const w = window.innerWidth;
    const fontSize = w < 600 ? 60 : w < 1024 ? 100 : 150; 
    const gap = w < 600 ? 3 : 4; // 모바일은 입자를 더 촘촘하게
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    // 폰트 이름 'BrutalMain' 또는 'Inter' 사용
    ctx.font = `900 ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 자간 조절 (-2.5%)
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = `${fontSize * -0.025}px`;
    }

    ctx.fillText("⯌ ARCHIVE ⯌", canvas.width / 2, canvas.height / 2);
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        if (data[((y * canvas.width) + x) * 4 + 3] > 128) {
          particles.push(new Particle(x, y));
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    rafId = requestAnimationFrame(animate);
  }

  onMount(async () => {
    // 폰트 로딩 대기
    await document.fonts.ready;
    ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      // 화면 너비에 따라 캔버스 높이 조절
      canvas.height = window.innerWidth < 600 ? 250 : 400;
      mouse.radius = window.innerWidth < 600 ? 60 : 100;
      init();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  });
</script>

<div class="hero-canvas-wrapper">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .hero-canvas-wrapper {
    width: 100%;
    /* CSS 높이도 캔버스 계산값과 맞춰주거나 유동적으로 설정 */
    height: 400px;
    background: var(--bg-main, #fff);
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid #000;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none; /* 모바일 스크롤 방지 */
  }

  @media (max-width: 600px) {
    .hero-canvas-wrapper {
      height: 250px;
    }
  }
</style>