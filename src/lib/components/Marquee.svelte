<div class="digital-marquee">
    <div class="marquee-track">
        <span>DEV-ON ARCHIVE: WELCOME ⯌</span>
        <span>SINCE 2026 ⯌</span>
        <span>DEV-ON ARCHIVE: WELCOME ⯌</span>
        <span>SINCE 2026 ⯌</span>
        <span>DEV-ON ARCHIVE: WELCOME ⯌</span>
        <span>SINCE 2026 ⯌</span>
        <span>DEV-ON ARCHIVE: WELCOME ⯌</span>
        <span>SINCE 2026</span>
        <span>DEV-ON ARCHIVE: WELCOME ⯌</span>
        <span>SINCE 2026 ⯌</span>
    </div>
</div>

<style>
    :root {
    --led-orange: #FF6B00;
    --dark-bg: #111111;
}

.digital-marquee {
    width: 100%;
    background-color: var(--dark-bg);
    border-top: 4px solid #000;
    border-bottom: 4px solid #000;
    padding: 15px 0;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}

/* [디테일] 전광판 특유의 도트/격자 느낌 추가 */
.digital-marquee::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1px);
    background-size: 3px 3px; /* 도트 간격 */
    z-index: 2;
    pointer-events: none;
}

.marquee-track {
    display: flex;
    white-space: nowrap;
    animation: marquee-scroll 15s linear infinite;
}

.marquee-track span {
    font-family: 'JetBrains Mono', 'Courier New', monospace; /* 고정폭 폰트 추천 */
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--led-orange);
    padding: 0 10px;
    text-transform: uppercase;
    /* [디테일] 전광판의 네온 글로우 효과 */
    text-shadow: 
        0 0 5px var(--led-orange),
        0 0 15px var(--led-orange);
}

@keyframes marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
</style>