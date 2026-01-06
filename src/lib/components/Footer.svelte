<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="brutal-footer">
  <div class="footer-cta">
    <a href="https://solarcdev.github.io/devon/index.html" class="cta-link">
      <span class="cta-text">JOIN US</span>
      <span class="cta-arrow">↗</span>
    </a>
  </div>

  <div class="footer-main">
    <div class="info-grid">
      <div class="info-col">
        <h3 class="footer-logo">DEV-ON</h3>
        <p class="copyright">© {currentYear} ALL_RIGHTS_RESERVED.</p>
        <div class="system-log">
          STATUS: STABLE<br>
          BUILD: 26.01.05_V1
        </div>
      </div>

      <div class="info-col">
        <label>NAVIGATION</label>
        <ul class="footer-links">
          <li><a href="/">ARCHIVE</a></li>
          <li><a href="https://solarcdev.github.io/devon/index.html">JOIN</a></li>
        </ul>
      </div>

      <div class="info-col">
        <label>OFFICE</label>
        <p class="address">
          KONGJU_NATIONAL_UNIVERSITY<br>
          HIGH_SCHOOL <br>
          충청남도 공주시 봉황로 75
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  .brutal-footer {
    width: 100%;
    background: #fff;
    border-top: 2px solid #000;
    margin-top: 100px; /* 리스트와 간격 확보 */
  }

  /* 상단 오렌지 CTA */
  .footer-cta {
    background: #fff;
    border-bottom: 2px solid #000;
  }

  .cta-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 20px;
    text-decoration: none;
    color: #000;
    transition: background 0.2s;
  }

  .cta-link:hover {
    background: var(--point-orange, #ff5500); /* 호버 시 블랙으로 반전 */
    color: #fff;
  }

  .cta-text {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 500;
    letter-spacing: -0.05em;
  }

  .cta-arrow {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 300;
  }

  /* 하단 메인 정보 */
  .footer-main {
    padding: 60px 20px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px;
  }

  .info-col label {
    display: block;
    font-size: 10px;
    font-weight: 500;
    color: var(--point-orange, #ff5500);
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  .footer-logo {
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 10px 0;
  }

  .copyright, .address, .system-log {
    font-size: 11px;
    font-weight: 700;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .system-log {
    color: #888;
    font-weight: 300;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 8px;
  }

  .footer-links a {
    text-decoration: none;
    color: #000;
    font-size: 13px;
    font-weight: 500;
  }

  .footer-links a:hover {
    text-decoration: underline;
    color: var(--point-orange, #ff5500);
  }

  /* 반응형 */
  @media (max-width: 900px) {
    .info-grid {
      grid-template-columns: 1fr 1fr;
    }
    .cta-text {
      font-size: 3rem;
    }
  }
</style>