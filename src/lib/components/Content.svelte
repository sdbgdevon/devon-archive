<script lang="ts">
  import { slide } from 'svelte/transition';
  import comOrange from "$lib/assets/com.png";

  export let p;
  export let openedTitle;
  export let toggle;

  const handleImgError = (event: Event & { currentTarget: EventTarget & Element; }) => {
    if (event.currentTarget instanceof HTMLImageElement)
      event.currentTarget.src = comOrange;
  };
</script>

<div class="project-row" class:is-open={openedTitle === p.title}>
    <button class="summary-line" on:click={() => toggle(p.title)}>
    <div class="col-year">{p.year}</div>
    <div class="col-title">
        <span class="main-title">{p.title}</span>
        <span class="short-summary">{p.summary}</span>
    </div>
    <div class="col-category">{p.category}</div>
    <div class="col-btn">{openedTitle === p.title ? 'CLOSE —' : 'VIEW +'}</div>
    </button>

    {#if openedTitle === p.title}
    <div class="detail-area" transition:slide={{ duration: 300 }}>
        <div class="detail-content">
        <div class="image-box">
            <img src={p.thumbnail || comOrange} alt={p.title} on:error={handleImgError} />
            <div class="image-overlay"></div>
        </div>

        <div class="info-box">
            <div class="desc-group">
            <label>DESCRIPTION</label>
            <p>{p.description}</p>
            </div>

            <div class="meta-grid">
            <div class="meta-item">
                <label>MEMBERS</label>
                <p>{p.members}</p>
            </div>
            <div class="meta-item">
                <label>ACCESS</label>
                <div class="links">
                <a href={p.github_url} target="_blank">GITHUB_↗</a>
                {#if p.demo_url}
                    <a href={p.demo_url} target="_blank" class="orange-link">LIVE_DEMO_↗</a>
                {/if}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    {/if}
</div>

<style>
      /* 각 행(Row) */
  .project-row {
    border-bottom: 1px solid var(--line-color);
    background: #fff;
  }
  .project-row.is-open {
    background: #fafafa;
  }

  .summary-line {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 25px 20px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
  }
  .summary-line:hover {
    background: var(--point-orange);
    color: #fff;
  }

  .main-title { font-size: 24px; font-weight: 500; letter-spacing: -0.02em; }
  .short-summary { font-size: 12px; opacity: 0.6; }
  .summary-line:hover .short-summary { opacity: 1; }

  /* 상세 영역 */
  .detail-area {
    border-top: 1px solid var(--line-color);
    background: #ffffff;
    overflow: hidden;
  }

  .detail-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr; /* 이미지와 텍스트 비율 */
    gap: 0;
  }

  .image-box {
    position: relative;
    padding: 40px;
    background: #f9f9f9;
    border-right: 1px solid var(--line-color);
    display: flex;
    align-items: center;
  }
  .image-box img {
    width: 100%;
    height: auto;
    /* border: 1px solid #000; */
  }

  .info-box {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  label {
    display: block;
    font-size: 10px;
    font-weight: 900;
    color: var(--point-orange);
    margin-bottom: 15px;
    letter-spacing: 1px;
  }

  .desc-group p {
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    font-weight: 500;
  }

  .meta-grid {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .meta-item p { font-size: 13px; font-weight: 700; margin: 0; }

  .links { display: flex; flex-direction: column; gap: 8px; }
  .links a {
    font-size: 11px;
    font-weight: 900;
    text-decoration: none;
    color: #000;
  }
  .links a.orange-link { color: var(--point-orange); }
  .links a:hover { text-decoration: underline; }

  /* 모바일 반응형 */
  @media (max-width: 768px) {
    .detail-content { grid-template-columns: 1fr; }
    .image-box { border-right: none; border-bottom: 1px solid var(--line-color); }
    .col-category, .short-summary { display: none; }
  }

  /* 공통 컬럼 설정 */
  .col-year { width: 80px; }
  .col-title { flex: 1; display: flex; align-items: baseline; gap: 20px; }
  .col-category { width: 120px; text-align: right; }
  .col-btn { width: 100px; text-align: right; font-weight: 900; }


</style>