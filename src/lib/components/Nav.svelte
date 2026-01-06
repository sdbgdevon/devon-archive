<script lang="ts">
  // 필요시 외부에서 현재 페이지 정보를 받아올 수 있습니다.
</script>

<nav class="brutal-nav">
    <div class="nav-section logo-section">
      <label for="logo-link">
        <a class="logo" href="/" id="logo-link">
          DEV-ON <span class="status-dot"></span>
        </a>
          
        <span class="system-text">DEV_ON_ARCHIVE</span>
    </label>
    </div>

  <div class="nav-section promo-section">
    <a href="https://solarcdev.github.io/devon/index.html" target="_blank" class="promo-link">
      <span class="label">On Recruiting:</span>
      <span class="value">모집페이지_↗</span>
    </a>
  </div>

  <div class="nav-section links-section">
    <!-- <a href="https://instagram.com/..." class="nav-link" target="_blank">INSTAGRAM</a> -->
    <a href="/upload" class="nav-link highlight">UPLOAD_PROGRAM</a>
  </div>
</nav>

<style>
  .brutal-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: grid;
    grid-template-columns: 1.2fr 1.6fr 1.2fr; /* 중앙 홍보 링크를 조금 더 넓게 배치 */
    background: var(--bg-main);
    border-bottom: 2px solid #000;
    height: 60px;
    width: 100%;
  }

  .nav-section {
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-right: 2px solid #000;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.05em;
  }

  .nav-section:last-child {
    border-right: none;
  }

  /* 로고 섹션 */
  .logo {
    text-decoration: none;
    color: #000;
    font-size: 18px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: var(--point-orange, #ff5500);
    animation: blink 1.5s infinite;
  }

  .system-text {
    color: #888;
    font-family: monospace;
    font-size: 9px;
  }

  /* 중앙 홍보 섹션 (강조 포인트) */
  .promo-section {
    justify-content: center;
    padding: 0; /* 링크가 영역 전체를 차지하게 함 */
  }

  .promo-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #000;
    transition: all 0.2s ease;
  }

  .promo-link .label { color: #888; margin-right: 8px; }
  .promo-link .value { text-decoration: underline; text-underline-offset: 4px; }

  /* 호버 시 오렌지색으로 반전 */
  .promo-link:hover {
    background: var(--point-orange, #ff5500);
    color: #fff;
  }
  .promo-link:hover .label { color: rgba(255,255,255,0.7); }

  /* 우측 링크 섹션 */
  .links-section {
    justify-content: flex-end;
    gap: 20px;
  }

  .nav-link {
    text-decoration: none;
    color: #000;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-link.highlight {
    background: #000;
    color: #fff;
    padding: 8px 15px;
    line-height: 1;
  }

  .nav-link.highlight:hover {
    background: var(--point-orange, #ff5500);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* 모바일 대응 */
  @media (max-width: 900px) {
    .brutal-nav {
      grid-template-columns: 1fr 1fr;
    }
    .promo-section {
      display: none; /* 모바일에서는 가독성을 위해 중앙 링크 숨김 */
    }
  }
</style>